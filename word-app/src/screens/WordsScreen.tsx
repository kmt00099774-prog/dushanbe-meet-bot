import React, { useState } from 'react';
import { Alert, FlatList, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { speak } from '../components/WordPopup';
import { INTERVALS_DAYS, SavedWord, daysUntil, useStore } from '../lib/store';
import { C } from '../theme';

export default function WordsScreen({ onTrain }: { onTrain: () => void }) {
  const { words, dueWords, removeWord, relearn } = useStore();
  const [tab, setTab] = useState<'learn' | 'learned'>('learn');
  const all = Object.values(words);
  const learning = all.filter((w) => !w.learned).sort((a, b) => b.addedAt - a.addedAt);
  const learned = all.filter((w) => w.learned).sort((a, b) => b.addedAt - a.addedAt);
  const list = tab === 'learn' ? learning : learned;

  const confirmRemove = (w: SavedWord) => {
    if (Platform.OS === 'web') return removeWord(w.word);
    Alert.alert('Удалить слово?', w.word, [
      { text: 'Отмена', style: 'cancel' },
      { text: 'Удалить', style: 'destructive', onPress: () => removeWord(w.word) },
    ]);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={s.tabs}>
        <Pressable style={[s.tab, tab === 'learn' && s.tabActive]} onPress={() => setTab('learn')}>
          <Text style={[s.tabText, tab === 'learn' && s.tabTextActive]}>Учить ({learning.length})</Text>
        </Pressable>
        <Pressable style={[s.tab, tab === 'learned' && s.tabActive]} onPress={() => setTab('learned')}>
          <Text style={[s.tabText, tab === 'learned' && s.tabTextActive]}>Выученные ({learned.length})</Text>
        </Pressable>
      </View>

      {tab === 'learn' && learning.length > 0 && (
        <Pressable style={[s.train, !dueWords.length && s.trainOff]} onPress={onTrain}>
          <Text style={s.trainText}>
            {dueWords.length ? `Повторить слова: ${dueWords.length}` : 'На сегодня всё повторено ✓'}
          </Text>
        </Pressable>
      )}

      <FlatList
        data={list}
        keyExtractor={(w) => w.word}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        ListEmptyComponent={
          <Text style={s.empty}>
            {tab === 'learn'
              ? 'Здесь появятся слова, которые вы отметили «Учить» во время чтения.'
              : 'Пока нет выученных слов. Повторяйте слова, и они будут переходить сюда.'}
          </Text>
        }
        renderItem={({ item: w }) => (
          <View style={s.item}>
            <View style={{ flex: 1 }}>
              <Pressable style={s.row} onPress={() => speak(w.word)}>
                <Text style={s.word}>🔊 {w.word}</Text>
                {!!w.ipa && <Text style={s.ipa}> |{w.ipa}|</Text>}
              </Pressable>
              <Text style={s.ru}>{w.ru}</Text>
              {!!w.example && <Text style={s.example}>«{w.example}»</Text>}
              {!w.learned && (
                <View style={s.progressRow}>
                  {INTERVALS_DAYS.map((_, i) => (
                    <View key={i} style={[s.dot, i < w.stage && s.dotOn]} />
                  ))}
                  <Text style={s.due}>Повтор: {daysUntil(w.due)}</Text>
                </View>
              )}
            </View>
            <View style={s.actions}>
              {w.learned && (
                <Pressable onPress={() => relearn(w.word)} hitSlop={8}>
                  <Text style={s.action}>↺</Text>
                </Pressable>
              )}
              <Pressable onPress={() => confirmRemove(w)} hitSlop={8}>
                <Text style={[s.action, { color: C.danger }]}>✕</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const s = StyleSheet.create({
  tabs: { flexDirection: 'row', margin: 16, marginBottom: 8, backgroundColor: C.border, borderRadius: 12, padding: 3 },
  tab: { flex: 1, paddingVertical: 9, alignItems: 'center', borderRadius: 10 },
  tabActive: { backgroundColor: C.card },
  tabText: { color: C.muted, fontWeight: '600' },
  tabTextActive: { color: C.text },
  train: { marginHorizontal: 16, marginTop: 4, backgroundColor: C.primary, borderRadius: 12, padding: 14, alignItems: 'center' },
  trainOff: { backgroundColor: '#9b9186' },
  trainText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  empty: { textAlign: 'center', color: C.muted, marginTop: 40, fontSize: 15, lineHeight: 22 },
  item: { flexDirection: 'row', backgroundColor: C.card, borderRadius: 14, padding: 14, marginBottom: 10 },
  row: { flexDirection: 'row', alignItems: 'baseline', flexWrap: 'wrap' },
  word: { fontSize: 19, fontWeight: '700', color: C.text },
  ipa: { fontSize: 14, color: C.muted },
  ru: { fontSize: 16, color: C.text, marginTop: 4 },
  example: { fontSize: 13, color: C.muted, fontStyle: 'italic', marginTop: 6 },
  progressRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 4 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: C.border },
  dotOn: { backgroundColor: C.know },
  due: { fontSize: 12, color: C.muted, marginLeft: 8 },
  actions: { justifyContent: 'space-between', alignItems: 'center', paddingLeft: 10, gap: 12 },
  action: { fontSize: 20, color: C.muted },
});
