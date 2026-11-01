import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type SavedWord = {
  word: string;
  ru: string;
  ipa: string;
  example: string; // предложение из книги, где встретилось слово
  bookTitle: string;
  addedAt: number;
  stage: number; // этап интервального повторения
  due: number; // когда повторить (timestamp)
  learned: boolean;
};

// Интервалы повторения в днях для каждого этапа. После последнего этапа слово считается выученным.
export const INTERVALS_DAYS = [0, 1, 3, 7, 14, 30];
const DAY = 24 * 60 * 60 * 1000;

type State = {
  words: Record<string, SavedWord>;
  known: Record<string, true>;
  progress: Record<string, number>; // bookId → номер главы
};

type Store = State & {
  ready: boolean;
  addToLearn: (w: Omit<SavedWord, 'addedAt' | 'stage' | 'due' | 'learned'>) => void;
  markKnown: (word: string) => void;
  removeWord: (word: string) => void;
  review: (word: string, remembered: boolean) => void;
  relearn: (word: string) => void;
  setProgress: (bookId: string, chapter: number) => void;
  dueWords: SavedWord[];
};

const KEY = 'word-app-state-v1';
const empty: State = { words: {}, known: {}, progress: {} };
const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>(empty);
  const [ready, setReady] = useState(false);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    AsyncStorage.getItem(KEY)
      .then((raw) => raw && setState({ ...empty, ...JSON.parse(raw) }))
      .catch(() => {})
      .finally(() => setReady(true));
    const t = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (ready) AsyncStorage.setItem(KEY, JSON.stringify(state)).catch(() => {});
  }, [state, ready]);

  const update = useCallback((fn: (s: State) => State) => {
    setState((s) => fn(s));
    setNow(Date.now());
  }, []);

  const addToLearn: Store['addToLearn'] = (w) =>
    update((s) => {
      const known = { ...s.known };
      delete known[w.word];
      if (s.words[w.word] && !s.words[w.word].learned) return { ...s, known };
      return {
        ...s,
        known,
        words: {
          ...s.words,
          [w.word]: { ...w, addedAt: Date.now(), stage: 0, due: Date.now(), learned: false },
        },
      };
    });

  const markKnown: Store['markKnown'] = (word) =>
    update((s) => ({ ...s, known: { ...s.known, [word]: true } }));

  const removeWord: Store['removeWord'] = (word) =>
    update((s) => {
      const words = { ...s.words };
      delete words[word];
      return { ...s, words };
    });

  const review: Store['review'] = (word, remembered) =>
    update((s) => {
      const w = s.words[word];
      if (!w) return s;
      let next: SavedWord;
      if (remembered) {
        const stage = w.stage + 1;
        next =
          stage >= INTERVALS_DAYS.length
            ? { ...w, stage, learned: true }
            : { ...w, stage, due: Date.now() + INTERVALS_DAYS[stage] * DAY };
      } else {
        next = { ...w, stage: 0, due: Date.now() };
      }
      const known = next.learned ? { ...s.known, [word]: true as const } : s.known;
      return { ...s, known, words: { ...s.words, [word]: next } };
    });

  const relearn: Store['relearn'] = (word) =>
    update((s) => {
      const w = s.words[word];
      if (!w) return s;
      const known = { ...s.known };
      delete known[word];
      return { ...s, known, words: { ...s.words, [word]: { ...w, stage: 0, due: Date.now(), learned: false } } };
    });

  const setProgress: Store['setProgress'] = (bookId, chapter) =>
    update((s) => ({ ...s, progress: { ...s.progress, [bookId]: chapter } }));

  const dueWords = useMemo(
    () => Object.values(state.words).filter((w) => !w.learned && w.due <= now).sort((a, b) => a.due - b.due),
    [state.words, now],
  );

  return (
    <Ctx.Provider
      value={{ ...state, ready, addToLearn, markKnown, removeWord, review, relearn, setProgress, dueWords }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useStore(): Store {
  const s = useContext(Ctx);
  if (!s) throw new Error('StoreProvider missing');
  return s;
}

export function daysUntil(ts: number): string {
  const d = Math.ceil((ts - Date.now()) / DAY);
  if (d <= 0) return 'сегодня';
  if (d === 1) return 'завтра';
  const mod10 = d % 10, mod100 = d % 100;
  const word = mod10 === 1 && mod100 !== 11 ? 'день' : mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20) ? 'дня' : 'дней';
  return `через ${d} ${word}`;
}
