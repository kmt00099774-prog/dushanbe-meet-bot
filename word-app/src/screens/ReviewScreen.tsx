import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { speak } from '../components/WordPopup';
import { INTERVALS_DAYS, daysUntil, useStore } from '../lib/store';
import { C } from '../theme';

/** Тренировка: карточки с интервальным повторением. */
export default function ReviewScreen() {
  const { words, dueWords, review } = useStore();
  // Очередь фиксируется в начале сессии; забытые слова возвращаются в конец.
  const [queue, setQueue] = useState<string[]>(() => dueWords.map((w) => w.word));
  const [shown, setShown] = useState(false);
  const [done, setDone] = useState(0);

  const current = queue.length ? words[queue[0]] : undefined;

  if (!current) {
    const upcoming = Object.values(words)
      .filter((w) => !w.learned)
      .sort((a, b) => a.due - b.due)[0];
    return (
      <View style={s.center}>
        <Text style={s.big}>{done ? '🎉' : '📚'}</Text>
        <Text style={s.title}>{done ? `Отлично! Повторено: ${done}` : 'Нет слов для повторения'}</Text>
        <Text style={s.sub}>
          {dueWords.length
            ? `Готово к повторению: ${dueWords.length}`
            : upcoming
              ? `Следующее повторение: ${daysUntil(upcoming.due)}`
              : 'Читайте книги и добавляйте незнакомые слова кнопкой «Учить».'}
        </Text>
        {dueWords.length > 0 && (
          <Pressable
            style={[s.btn, { backgroundColor: C.primary, flex: 0, paddingHorizontal: 30, marginTop: 20 }]}
            onPress={() => {
              setQueue(dueWords.map((w) => w.word));
              setDone(0);
            }}
          >
            <Text style={[s.btnText, { color: '#fff' }]}>Начать</Text>
          </Pressable>
        )}
      </View>
    );
  }

  const answer = (remembered: boolean) => {
    review(current.word, remembered);
    setShown(false);
    setQueue((q) => (remembered ? q.slice(1) : [...q.slice(1), q[0]]));
    if (remembered) setDone((d) => d + 1);
  };

  return (
    <View style={s.wrap}>
      <Text style={s.counter}>Осталось: {queue.length}</Text>
      <Pressable style={s.card} onPress={() => setShown(true)}>
        <Pressable onPress={() => speak(current.word)} hitSlop={10}>
          <Text style={s.word}>🔊 {current.word}</Text>
        </Pressable>
        {!!current.ipa && <Text style={s.ipa}>|{current.ipa}|</Text>}
        {shown ? (
          <>
            <Text style={s.ru}>{current.ru}</Text>
            {!!current.example && <Text style={s.example}>«{current.example}»</Text>}
          </>
        ) : (
          <Text style={s.tap}>Вспомните перевод и нажмите, чтобы проверить</Text>
        )}
        <View style={s.dots}>
          {INTERVALS_DAYS.map((_, i) => (
            <View key={i} style={[s.dot, i < current.stage && s.dotOn]} />
          ))}
        </View>
      </Pressable>

      {shown ? (
        <View style={s.row}>
          <Pressable style={[s.btn, { backgroundColor: '#f6b3ad' }]} onPress={() => answer(false)}>
            <Text style={s.btnText}>Не помню</Text>
          </Pressable>
          <Pressable style={[s.btn, { backgroundColor: C.know }]} onPress={() => answer(true)}>
            <Text style={s.btnText}>Помню</Text>
          </Pressable>
        </View>
      ) : (
        <Pressable style={[s.btn, s.show]} onPress={() => setShown(true)}>
          <Text style={s.btnText}>Показать перевод</Text>
        </Pressable>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, padding: 16, justifyContent: 'center' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  big: { fontSize: 56 },
  title: { fontSize: 20, fontWeight: '700', color: C.text, marginTop: 12, textAlign: 'center' },
  sub: { fontSize: 15, color: C.muted, marginTop: 8, textAlign: 'center', lineHeight: 22 },
  counter: { textAlign: 'center', color: C.muted, marginBottom: 12 },
  card: {
    backgroundColor: C.card,
    borderRadius: 20,
    padding: 24,
    minHeight: 280,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  word: { fontSize: 34, fontWeight: '600', color: C.text },
  ipa: { fontSize: 17, color: C.muted, marginTop: 6 },
  ru: { fontSize: 24, color: C.text, marginTop: 18, textAlign: 'center' },
  example: { fontSize: 14, color: C.muted, fontStyle: 'italic', marginTop: 12, textAlign: 'center' },
  tap: { fontSize: 14, color: C.muted, marginTop: 24, textAlign: 'center' },
  dots: { flexDirection: 'row', gap: 6, marginTop: 24 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: C.border },
  dotOn: { backgroundColor: C.know },
  row: { flexDirection: 'row', gap: 12, marginTop: 20 },
  btn: { flex: 1, borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
  show: { flex: 0, marginTop: 20, backgroundColor: C.learn },
  btnText: { fontSize: 18, fontWeight: '600', color: C.text },
});
