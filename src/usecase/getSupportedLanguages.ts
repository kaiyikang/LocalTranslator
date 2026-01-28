import { getUniqueLanguages } from '@core/languages';
import { detectLanguage } from '@infrastructure/languageDetector';

export function getSupportedLanguages() {
  return getUniqueLanguages();
}

export function detectLanguageFromText(text: string) {
  return detectLanguage(text);
}
