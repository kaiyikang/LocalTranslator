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

const defaultLang: LanguageInfo = { code: 'en', name: 'English' };

/**
 * Detect language of given text using franc
 * @param text Text to detect language from
 * @returns Language information with code and name
 */
export function detectLanguage(text: string): LanguageInfo {
    if (!text?.trim()) return defaultLang;

    // Use franc to detect language (returns ISO 639-3 code)
    const detectedCode = franc(text, { minLength: 3 });

    if (!detectedCode || detectedCode === 'und') {
        return defaultLang;
    }

    // Try to find in SUPPORTED_LANGUAGES by code
    const found = SUPPORTED_LANGUAGES.find((lang) =>
        lang.code === detectedCode || lang.code.startsWith(detectedCode)
    );

    if (found) return found;

    // Return detected code with generic name if not in our supported list
    return { code: detectedCode, name: detectedCode.toUpperCase() };
}
