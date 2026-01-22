/**
 * Infrastructure - Language Detection Service
 * Uses franc library for automatic language detection
 */

import { franc } from 'franc';
import { SUPPORTED_LANGUAGES } from '@core/languages';

export interface LanguageInfo {
    code: string;
    name: string;
}

const DEFAULT_LANG: LanguageInfo = { code: 'en', name: 'English' };

/**
 * Mapping from ISO 639-3 (three-letter codes used by franc) 
 * to ISO 639-1 (two-letter codes used in SUPPORTED_LANGUAGES)
 */
const ISO_639_3_TO_639_1: Record<string, string> = {
    'eng': 'en',  // English
    'cmn': 'zh',  // Chinese (Mandarin)
    'jpn': 'ja',  // Japanese
    'kor': 'ko',  // Korean
    'spa': 'es',  // Spanish
    'fra': 'fr',  // French
    'deu': 'de',  // German
    'ita': 'it',  // Italian
    'por': 'pt',  // Portuguese
    'rus': 'ru',  // Russian
    'ara': 'ar',  // Arabic
    'hin': 'hi',  // Hindi
    'tha': 'th',  // Thai
    'vie': 'vi',  // Vietnamese
    'ind': 'id',  // Indonesian
    'msa': 'ms',  // Malay
    'nld': 'nl',  // Dutch
    'pol': 'pl',  // Polish
    'tur': 'tr',  // Turkish
    'ukr': 'uk',  // Ukrainian
    'ces': 'cs',  // Czech
    'swe': 'sv',  // Swedish
    'dan': 'da',  // Danish
    'fin': 'fi',  // Finnish
    'ell': 'el',  // Greek
    'heb': 'he',  // Hebrew
    'hun': 'hu',  // Hungarian
    'ron': 'ro',  // Romanian
    'nor': 'no',  // Norwegian
};

/**
 * Detect language of given text using franc
 * @param text Text to detect language from
 * @returns Language information with code and name
 */
export function detectLanguage(text: string): LanguageInfo {

    if (!text?.trim()) return DEFAULT_LANG;

    // Use franc to detect language (returns ISO 639-3 code)
    const detectedCode = franc(text, { minLength: 3 });

    if (!detectedCode || detectedCode === 'und') {
        return DEFAULT_LANG;
    }

    // Convert ISO 639-3 to ISO 639-1 if mapping exists
    const normalizedCode = ISO_639_3_TO_639_1[detectedCode] || detectedCode;

    // Try to find in SUPPORTED_LANGUAGES by normalized code
    const found = SUPPORTED_LANGUAGES.find((lang) =>
        lang.code === normalizedCode || normalizedCode.startsWith(lang.code)
    );

    if (found) return found;

    // Return detected code with generic name if not in our supported list
    return { code: normalizedCode, name: normalizedCode.toUpperCase() };
}
