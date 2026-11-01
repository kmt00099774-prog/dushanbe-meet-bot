import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Book, BOOKS } from '../data/books';
import { useStore } from '../lib/store';
import { C, SERIF } from '../theme';

export default function LibraryScreen({ onOpen }: { onOpen: (b: Book) => void }) {
  const { progress, words } = useStore();
  const all = Object.values(words);
  const learning = all.filter((w) => !w.learned).length;
  const learned = all.length - learning;

  return (
    <ScrollView contentContainerStyle={s.content}>
      <Text style={s.title}>Читай книги на английском{'\n'}по 10 минут в день</Text>
      <Text style={s.hint}>Нажми на любое слово, чтобы увидеть перевод</Text>

      <View style={s.stats}>
        <View style={s.stat}>
          <Text style={s.statNum}>{learning}</Text>
          <Text style={s.statLabel}>учу</Text>
        </View>
        <View style={s.stat}>
          <Text style={s.statNum}>{learned}</Text>
          <Text style={s.statLabel}>выучено</Text>
        </View>
      </View>

      {BOOKS.map((b) => {
        const ch = progress[b.id];
        return (
          <Pressable key={b.id} style={s.book} onPress={() => onOpen(b)}>
            <View style={[s.cover, { backgroundColor: b.color }]}>
              <Text style={s.emoji}>{b.emoji}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.bookTitle}>{b.title}</Text>
              <Text style={s.bookRu}>{b.titleRu}</Text>
              <Text style={s.meta}>
                Уровень {b.level} · {b.chapters.length} главы
                {ch !== undefined ? ` · глава ${ch + 1}` : ''}
              </Text>
            </View>
            <Text style={s.arrow}>›</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  content: { padding: 16, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: '800', textAlign: 'center', color: C.text, marginTop: 8 },
  hint: { textAlign: 'center', color: C.muted, marginTop: 6, marginBottom: 16 },
  stats: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  stat: { flex: 1, backgroundColor: C.card, borderRadius: 14, padding: 14, alignItems: 'center' },
  statNum: { fontSize: 26, fontWeight: '800', color: C.primary },
  statLabel: { color: C.muted, marginTop: 2 },
  book: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: C.card,
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
  },
  cover: { width: 64, height: 84, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 32 },
  bookTitle: { fontSize: 17, fontWeight: '700', color: C.text, fontFamily: SERIF },
  bookRu: { fontSize: 14, color: C.muted, marginTop: 2 },
  meta: { fontSize: 12, color: C.muted, marginTop: 6 },
  arrow: { fontSize: 28, color: C.muted },
});
