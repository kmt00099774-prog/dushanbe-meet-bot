import * as Speech from 'expo-speech';
import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { DictEntry } from '../data/dictionary';
import { C } from '../theme';

type Props = {
  entry: DictEntry | null; // null — идёт загрузка перевода
  tapped: string;
  y: number; // экранная координата слова
  inList: boolean;
  onKnow: () => void;
  onLearn: () => void;
  onClose: () => void;
};

export const CARD_H = 170;

export function speak(text: string) {
  Speech.stop();
  Speech.speak(text, { language: 'en-US', rate: 0.9 });
}

/** Карточка с переводом, которая появляется над словом (или под ним, если сверху нет места). */
export default function WordPopup({ entry, tapped, y, inList, onKnow, onLearn, onClose }: Props) {
  const { width, height } = useWindowDimensions();
  const cardW = Math.min(320, width - 32);
  let top = y - CARD_H - 24;
  if (top < 60) top = y + 30;
  top = Math.min(top, height - CARD_H - 20);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      <View style={[s.card, { top, width: cardW, left: (width - cardW) / 2 }]}>
        <View style={s.body}>
          {entry ? (
            <>
              <Pressable style={s.wordRow} onPress={() => speak(entry.word)} hitSlop={10}>
                <Text style={s.speaker}>🔊</Text>
                <Text style={s.word}>{entry.word}</Text>
              </Pressable>
              {!!entry.ipa && <Text style={s.ipa}>|{entry.ipa}|</Text>}
              <Text style={s.ru} numberOfLines={2}>
                {entry.ru}
              </Text>
            </>
          ) : (
            <>
              <Text style={s.word}>{tapped}</Text>
              <ActivityIndicator style={{ marginTop: 12 }} color={C.primary} />
            </>
          )}
        </View>
        <View style={s.buttons}>
          <Pressable style={[s.btn, { backgroundColor: C.know }]} onPress={onKnow} disabled={!entry}>
            <Text style={s.btnText}>Знаю</Text>
          </Pressable>
          <Pressable style={[s.btn, { backgroundColor: C.learn }]} onPress={onLearn} disabled={!entry || inList}>
            <Text style={s.btnText}>{inList ? 'В списке ✓' : 'Учить'}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    position: 'absolute',
    height: CARD_H,
    backgroundColor: C.card,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },
  body: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 12 },
  wordRow: { flexDirection: 'row', alignItems: 'center' },
  speaker: { fontSize: 20, marginRight: 6 },
  word: { fontSize: 26, color: C.text, fontWeight: '500' },
  ipa: { fontSize: 15, color: C.muted, marginTop: 2 },
  ru: { fontSize: 19, color: C.text, marginTop: 6, textAlign: 'center' },
  buttons: { flexDirection: 'row', height: 52 },
  btn: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  btnText: { fontSize: 18, color: C.text, fontWeight: '500' },
});
