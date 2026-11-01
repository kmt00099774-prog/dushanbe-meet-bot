import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Book } from './src/data/books';
import { StoreProvider, useStore } from './src/lib/store';
import LibraryScreen from './src/screens/LibraryScreen';
import ReaderScreen from './src/screens/ReaderScreen';
import ReviewScreen from './src/screens/ReviewScreen';
import WordsScreen from './src/screens/WordsScreen';
import { C } from './src/theme';

type Tab = 'books' | 'words' | 'review';

function Main() {
  const { ready, dueWords } = useStore();
  const [tab, setTab] = useState<Tab>('books');
  const [book, setBook] = useState<Book | null>(null);
  const [reviewKey, setReviewKey] = useState(0);

  if (!ready) return <ActivityIndicator style={{ flex: 1 }} color={C.primary} />;

  const go = (t: Tab) => {
    if (t === 'review') setReviewKey((k) => k + 1); // новая сессия повторения
    setTab(t);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {tab === 'books' &&
          (book ? (
            <ReaderScreen book={book} onBack={() => setBook(null)} />
          ) : (
            <LibraryScreen onOpen={setBook} />
          ))}
        {tab === 'words' && <WordsScreen onTrain={() => go('review')} />}
        {tab === 'review' && <ReviewScreen key={reviewKey} />}
      </View>

      <View style={s.bar}>
        {(
          [
            ['books', '📚', 'Книги'],
            ['words', '📝', 'Мои слова'],
            ['review', '🧠', 'Тренировка'],
          ] as const
        ).map(([key, icon, label]) => (
          <Pressable key={key} style={s.tab} onPress={() => go(key)}>
            <Text style={s.icon}>{icon}</Text>
            <Text style={[s.label, tab === key && s.labelActive]}>{label}</Text>
            {key === 'review' && dueWords.length > 0 && (
              <View style={s.badge}>
                <Text style={s.badgeText}>{dueWords.length}</Text>
              </View>
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StoreProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }} edges={['top', 'bottom']}>
          <StatusBar style="dark" />
          <Main />
        </SafeAreaView>
      </StoreProvider>
    </SafeAreaProvider>
  );
}

const s = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: C.border,
    backgroundColor: C.card,
    paddingVertical: 6,
  },
  tab: { flex: 1, alignItems: 'center' },
  icon: { fontSize: 22 },
  label: { fontSize: 12, color: C.muted, marginTop: 2 },
  labelActive: { color: C.primary, fontWeight: '700' },
  badge: {
    position: 'absolute',
    top: -2,
    right: '28%',
    backgroundColor: C.primary,
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: '700' },
});
