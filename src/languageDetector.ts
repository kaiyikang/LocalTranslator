/**
 * Language Detector Module
 * Detects input text language using simple heuristics
 */

export interface LanguageInfo {
  code: string;
  name: string;
}

// Common language patterns
const languagePatterns: { pattern: RegExp; info: LanguageInfo }[] = [
  { pattern: /[\u4e00-\u9fff]/, info: { code: 'zh', name: 'Chinese' } },
  { pattern: /[\u3040-\u309f\u30a0-\u30ff]/, info: { code: 'ja', name: 'Japanese' } },
  { pattern: /[\uac00-\ud7af]/, info: { code: 'ko', name: 'Korean' } },
  { pattern: /[\u0400-\u04ff]/, info: { code: 'ru', name: 'Russian' } },
  { pattern: /[\u0600-\u06ff]/, info: { code: 'ar', name: 'Arabic' } },
  { pattern: /[\u0e00-\u0e7f]/, info: { code: 'th', name: 'Thai' } },
  { pattern: /[\u0900-\u097f]/, info: { code: 'hi', name: 'Hindi' } },
  { pattern: /[äöüß]/i, info: { code: 'de', name: 'German' } },
  { pattern: /[àâçéèêëîïôùûü]/i, info: { code: 'fr', name: 'French' } },
  { pattern: /[áéíóúñü¿¡]/i, info: { code: 'es', name: 'Spanish' } },
  { pattern: /[àèìòùç]/i, info: { code: 'it', name: 'Italian' } },
  { pattern: /[ãõç]/i, info: { code: 'pt', name: 'Portuguese' } },
];

// Default to English
const defaultLanguage: LanguageInfo = { code: 'en', name: 'English' };

/**
 * Detect language from text
 */
export function detectLanguage(text: string): LanguageInfo {
  if (!text || text.trim().length === 0) {
    return defaultLanguage;
  }

  // Count character matches for each pattern
  const scores: Map<string, number> = new Map();

  for (const char of text) {
    for (const { pattern, info } of languagePatterns) {
      if (pattern.test(char)) {
        scores.set(info.code, (scores.get(info.code) || 0) + 1);
      }
    }
  }

  // Find language with highest score
  let maxScore = 0;
  let detectedLang = defaultLanguage;

  for (const { pattern, info } of languagePatterns) {
    const score = scores.get(info.code) || 0;
    if (score > maxScore) {
      maxScore = score;
      detectedLang = info;
    }
  }

  return detectedLang;
}

/**
 * Get language info by code
 */
export function getLanguageByCode(code: string): LanguageInfo | null {
  const lang = languagePatterns.find((l) => l.info.code === code.toLowerCase());
  if (lang) return lang.info;
  if (code.toLowerCase() === 'en') return defaultLanguage;
  return null;
}

/**
 * Get language info by name
 */
export function getLanguageByName(name: string): LanguageInfo | null {
  const lang = languagePatterns.find(
    (l) => l.info.name.toLowerCase() === name.toLowerCase()
  );
  if (lang) return lang.info;
  if (name.toLowerCase() === 'english') return defaultLanguage;
  return null;
}
