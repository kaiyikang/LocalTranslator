/**
 * Core - Language Detector
 * Detects input text language using Unicode patterns
 */

export interface LanguageInfo {
  code: string;
  name: string;
}

const patterns: { pattern: RegExp; info: LanguageInfo }[] = [
  { pattern: /[\u4e00-\u9fff]/, info: { code: 'zh', name: 'Chinese' } },
  { pattern: /[\u3040-\u309f\u30a0-\u30ff]/, info: { code: 'ja', name: 'Japanese' } },
  { pattern: /[\uac00-\ud7af]/, info: { code: 'ko', name: 'Korean' } },
  { pattern: /[\u0400-\u04ff]/, info: { code: 'ru', name: 'Russian' } },
  { pattern: /[\u0600-\u06ff]/, info: { code: 'ar', name: 'Arabic' } },
  { pattern: /[äöüß]/i, info: { code: 'de', name: 'German' } },
  { pattern: /[àâçéèêëîïôùûü]/i, info: { code: 'fr', name: 'French' } },
  { pattern: /[áéíóúñü¿¡]/i, info: { code: 'es', name: 'Spanish' } },
];

const defaultLang: LanguageInfo = { code: 'en', name: 'English' };

export function detectLanguage(text: string): LanguageInfo {
  if (!text?.trim()) return defaultLang;

  for (const { pattern, info } of patterns) {
    if (pattern.test(text)) return info;
  }
  return defaultLang;
}

export function getLanguageByName(name: string): LanguageInfo | null {
  if (name.toLowerCase() === 'english') return defaultLang;
  const found = patterns.find((p) => p.info.name.toLowerCase() === name.toLowerCase());
  return found?.info || null;
}
