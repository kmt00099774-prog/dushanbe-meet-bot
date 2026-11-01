import * as Speech from 'expo-speech';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { GestureResponderEvent, HostInstance, Pressable, ScrollViewInstance, ScrollView, StyleSheet, Text, View } from 'react-native';
import WordPopup from '../components/WordPopup';
import { Book } from '../data/books';
import { DictEntry } from '../data/dictionary';
import { useStore } from '../lib/store';
import { lookupLocal, normalize, translate } from '../lib/translate';

const lemmaOf = (w: string) => lookupLocal(w)?.word ?? normalize(w);
import { C, SERIF } from '../theme';

type Token = { text: string; isWord: boolean; start: number };

function tokenize(p: string): Token[] {
  const out: Token[] = [];
  const re = /[A-Za-z]+(?:['’][A-Za-z]+)?/g;
  let last = 0;
  for (const m of p.matchAll(re)) {
    const i = m.index!;
    if (i > last) out.push({ text: p.slice(last, i), isWord: false, start: last });
    out.push({ text: m[0], isWord: true, start: i });
    last = i + m[0].length;
  }
  if (last < p.length) out.push({ text: p.slice(last), isWord: false, start: last });
  return out;
}

/** Предложение, в котором стоит слово (для примера в словаре). */
function sentenceAt(p: string, pos: number): string {
  const ends = /[.!?]["”]?(\s+|$)/g;
  let start = 0;
  for (const m of p.matchAll(ends)) {
    const end = m.index! + m[0].length;
    if (pos < end) return p.slice(start, end).trim();
    start = end;
  }
  return p.slice(start).trim();
}

type Selection = { key: string; tapped: string; y: number; example: string; entry: DictEntry | null };

export default function ReaderScreen({ book, onBack }: { book: Book; onBack: () => void }) {
  const { words, progress, addToLearn, markKnown, setProgress } = useStore();
  const [chapter, setChapter] = useState(Math.min(progress[book.id] ?? 0, book.chapters.length - 1));
  const [mode, setMode] = useState<'read' | 'listen'>('read');
  const [speaking, setSpeaking] = useState<number | null>(null);
  const [sel, setSel] = useState<Selection | null>(null);
  const rootRef = useRef<HostInstance>(null);
  const offsetY = useRef(0);
  const scrollRef = useRef<ScrollViewInstance>(null);
  const ch = book.chapters[chapter];
  const tokens = useMemo(() => ch.paragraphs.map(tokenize), [ch]);

  useEffect(() => {
    setProgress(book.id, chapter);
    scrollRef.current?.scrollTo({ y: 0, animated: false });
    stopSpeech();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapter]);

  useEffect(() => () => void Speech.stop(), []);

  function stopSpeech() {
    Speech.stop();
    setSpeaking(null);
  }

  function speakFrom(i: number) {
    if (i >= ch.paragraphs.length) return setSpeaking(null);
    setSpeaking(i);
    Speech.speak(ch.paragraphs[i], {
      language: 'en-US',
      rate: 0.85,
      onDone: () => speakFrom(i + 1),
      onStopped: () => setSpeaking(null),
      onError: () => setSpeaking(null),
    });
  }

  async function onWord(e: GestureResponderEvent, word: string, key: string, para: string, pos: number) {
    const pageY = e.nativeEvent.pageY ?? 300;
    const y = pageY - offsetY.current;
    const s: Selection = { key, tapped: word, y, example: sentenceAt(para, pos), entry: null };
    setSel(s);
    const entry = await translate(word);
    setSel((cur) => (cur && cur.key === key ? { ...cur, entry } : cur));
  }

  const isLearning = (w: string) => {
    const e = words[normalize(w)];
    return !!e && !e.learned;
  };
  const inListWord = (entry: DictEntry | null) => !!entry && isLearning(entry.word);
  // Подсвечиваем слова из списка «Учить» прямо в тексте.
  const learningSet = useMemo(() => {
    const set = new Set<string>();
    for (const t of tokens.flat()) {
      if (!t.isWord) continue;
      const n = lemmaOf(t.text);
      if (isLearning(n)) set.add(n);
    }
    return set;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokens, words]);

  return (
    <View
      ref={rootRef}
      style={s.root}
      onLayout={() => rootRef.current?.measureInWindow((_x, y) => (offsetY.current = y))}
    >
      <View style={s.header}>
        <Pressable onPress={onBack} hitSlop={12}>
          <Text style={s.back}>‹ Книги</Text>
        </Pressable>
        <Text style={s.headerTitle} numberOfLines={1}>
          {book.title}
        </Text>
        <View style={{ width: 80 }} />
      </View>

      <View style={s.modes}>
        <Pressable
          style={[s.mode, mode === 'read' && s.modeActive]}
          onPress={() => {
            setMode('read');
            stopSpeech();
          }}
        >
          <Text style={[s.modeText, mode === 'read' && s.modeTextActive]}>📖 Читай</Text>
        </Pressable>
        <Pressable style={[s.mode, mode === 'listen' && s.modeActive]} onPress={() => setMode('listen')}>
          <Text style={[s.modeText, mode === 'listen' && s.modeTextActive]}>🎧 Слушай</Text>
        </Pressable>
        <View style={s.chip}>
          <Text style={s.chipText}>
            Глава {chapter + 1}/{book.chapters.length}
          </Text>
        </View>
      </View>

      {mode === 'listen' && (
        <Pressable style={s.play} onPress={() => (speaking === null ? speakFrom(0) : stopSpeech())}>
          <Text style={s.playText}>{speaking === null ? '▶  Слушать главу' : '■  Остановить'}</Text>
        </Pressable>
      )}

      <ScrollView ref={scrollRef} contentContainerStyle={s.content} onScrollBeginDrag={() => setSel(null)}>
        <Text style={s.chapter}>{ch.title}</Text>
        {tokens.map((toks, pi) => (
          <Text key={pi} style={[s.para, speaking === pi && s.paraSpeaking]}>
            {toks.map((t, ti) => {
              if (!t.isWord) return t.text;
              const key = `${chapter}-${pi}-${ti}`;
              const n = lemmaOf(t.text);
              const selected = sel?.key === key;
              const learning = learningSet.has(n);
              return (
                <Text
                  key={ti}
                  onPress={(e) => onWord(e, t.text, key, ch.paragraphs[pi], t.start)}
                  style={[learning && s.learning, selected && s.selected]}
                >
                  {t.text}
                </Text>
              );
            })}
          </Text>
        ))}

        <View style={s.nav}>
          {chapter > 0 ? (
            <Pressable style={s.navBtn} onPress={() => setChapter(chapter - 1)}>
              <Text style={s.navText}>← Назад</Text>
            </Pressable>
          ) : (
            <View />
          )}
          {chapter < book.chapters.length - 1 ? (
            <Pressable style={[s.navBtn, s.navNext]} onPress={() => setChapter(chapter + 1)}>
              <Text style={[s.navText, { color: '#fff' }]}>Следующая глава →</Text>
            </Pressable>
          ) : (
            <Text style={s.theEnd}>🎉 Книга прочитана!</Text>
          )}
        </View>
      </ScrollView>

      {sel && (
        <WordPopup
          entry={sel.entry}
          tapped={sel.tapped}
          y={sel.y}
          inList={inListWord(sel.entry)}
          onClose={() => setSel(null)}
          onKnow={() => {
            if (sel.entry) markKnown(sel.entry.word);
            setSel(null);
          }}
          onLearn={() => {
            if (sel.entry)
              addToLearn({
                word: sel.entry.word,
                ru: sel.entry.ru,
                ipa: sel.entry.ipa,
                example: sel.example,
                bookTitle: book.title,
              });
            setSel(null);
          }}
        />
      )}
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  back: { fontSize: 17, color: C.primary, width: 80 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 16, fontWeight: '600', color: C.text },
  modes: { flexDirection: 'row', paddingHorizontal: 16, gap: 8, alignItems: 'center' },
  mode: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: C.primary,
  },
  modeActive: { backgroundColor: C.primary },
  modeText: { color: C.primary, fontWeight: '600' },
  modeTextActive: { color: '#fff' },
  chip: { marginLeft: 'auto' },
  chipText: { color: C.muted, fontSize: 13 },
  play: {
    marginHorizontal: 16,
    marginTop: 10,
    backgroundColor: C.text,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  playText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  content: { padding: 20, paddingBottom: 60 },
  chapter: { fontSize: 22, fontWeight: '700', color: C.text, marginBottom: 14, fontFamily: SERIF },
  para: { fontSize: 21, lineHeight: 32, color: C.text, marginBottom: 16, fontFamily: SERIF },
  paraSpeaking: { backgroundColor: '#fff6d6', borderRadius: 6 },
  learning: { backgroundColor: C.learnSoft, fontWeight: '700' },
  selected: { backgroundColor: C.selected, fontWeight: '700' },
  nav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  navBtn: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: C.border },
  navNext: { backgroundColor: C.primary, borderColor: C.primary },
  navText: { fontSize: 15, fontWeight: '600', color: C.text },
  theEnd: { fontSize: 16, color: C.text },
});
