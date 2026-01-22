/**
 * Infrastructure - Language Detection Service
 * Uses eld (Efficient Language Detector) for automatic language detection
 */

// @ts-expect-error - eld is an ESM module, but works fine with our build setup
import eld from 'eld/medium';
import { SUPPORTED_LANGUAGES } from '@core/languages';

export interface LanguageInfo {
    code: string;
    name: string;
}

const DEFAULT_LANG: LanguageInfo = { code: 'en', name: 'English' };

/**
 * Detect language of given text using eld
 * @param text Text to detect language from
 * @returns Language information with code and name
 */
export function detectLanguage(text: string): LanguageInfo {

    // Log input for debugging
    const truncatedText = text?.length > 50 ? text.substring(0, 50) + '...' : text;
    console.log('[LanguageDetector] Input text:', truncatedText);

    if (!text?.trim()) {
        console.log('[LanguageDetector] Empty text, returning default:', DEFAULT_LANG);
        return DEFAULT_LANG;
    }

    // Use eld to detect language (returns ISO 639-1 code directly)
    const detectedCode = eld.detect(text);
    console.log('[LanguageDetector] ELD detected:', detectedCode);

    // Handle cases where eld returns empty string or no result
    if (!detectedCode || !detectedCode.language || detectedCode.language.trim() === '') {
        console.log('[LanguageDetector] No valid detection, returning default:', DEFAULT_LANG);
        return DEFAULT_LANG;
    }

    // Try to find in SUPPORTED_LANGUAGES
    const found = SUPPORTED_LANGUAGES.find((lang) =>
        lang.code === detectedCode.language
    );

    if (found) {
        console.log('[LanguageDetector] Found in supported languages:', found);
        return found;
    }

    // Return detected code with generic name if not in our supported list
    const result = {
        code: detectedCode.language,
        name: detectedCode.language.toUpperCase()
    };
    console.log('[LanguageDetector] Not in supported list, returning:', result);
    return result;
}
