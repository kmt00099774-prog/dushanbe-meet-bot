import { DICTIONARY, DictEntry } from '../data/dictionary';

/** Нормализует слово: нижний регистр, типографские апострофы → '. */
export function normalize(word: string): string {
  return word.toLowerCase().replace(/[‘’]/g, "'").replace(/^'+|'+$/g, '');
}

/** Возможные начальные формы слова (простые правила английской морфологии). */
export function candidates(word: string): string[] {
  const w = normalize(word);
  const out = [w];
  const add = (s: string) => s.length > 1 && !out.includes(s) && out.push(s);

  if (w.endsWith("'s")) add(w.slice(0, -2));
  if (w.endsWith('ies')) add(w.slice(0, -3) + 'y');
  if (w.endsWith('es')) add(w.slice(0, -2));
  if (w.endsWith('s')) add(w.slice(0, -1));
  if (w.endsWith('ied')) add(w.slice(0, -3) + 'y');
  if (w.endsWith('ed')) {
    const stem = w.slice(0, -2);
    add(stem);
    add(stem + 'e');
    if (/(.)\1$/.test(stem)) add(stem.slice(0, -1)); // dropped → drop
    add(w.slice(0, -1)); // closed → close
  }
  if (w.endsWith('ing')) {
    const stem = w.slice(0, -3);
    add(stem);
    add(stem + 'e');
    if (/(.)\1$/.test(stem)) add(stem.slice(0, -1)); // sitting → sit
  }
  if (w.endsWith('ly')) add(w.slice(0, -2));
  return out;
}

export function lookupLocal(word: string): DictEntry | null {
  for (const c of candidates(word)) {
    const e = DICTIONARY[c];
    if (e) return e;
  }
  return null;
}

/** Онлайн-перевод для слов, которых нет во встроенном словаре. */
async function lookupOnline(word: string): Promise<DictEntry | null> {
  const w = normalize(word);
  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(w)}&langpair=en|ru`,
    );
    const data = await res.json();
    const ru: string | undefined = data?.responseData?.translatedText;
    if (!ru || ru.toLowerCase() === w) return null;
    let ipa = '';
    try {
      const r2 = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(w)}`);
      const d2 = await r2.json();
      ipa = (d2?.[0]?.phonetic || d2?.[0]?.phonetics?.find((p: any) => p.text)?.text || '').replace(/^\/|\/$/g, '');
    } catch {}
    return { word: w, ipa, ru };
  } catch {
    return null;
  }
}

export async function translate(word: string): Promise<DictEntry> {
  return (
    lookupLocal(word) ??
    (await lookupOnline(word)) ?? { word: normalize(word), ipa: '', ru: 'перевод не найден' }
  );
}
