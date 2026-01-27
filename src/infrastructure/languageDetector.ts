/**
 * Infrastructure - Language Detection Service
 * Uses eld (Efficient Language Detector) for automatic language detection
 */

import eld from "eld/medium";
import { SUPPORTED_LANGUAGES } from "@core/languages";

export interface LanguageInfo {
  code: string;
  name: string;
}

const DEFAULT_LANG: LanguageInfo = { code: "en", name: "English" };

/**
 * Detect language of given text using eld
 * @param text Text to detect language from
 * @returns Language information with code and name
 */
export function detectLanguage(text: string): LanguageInfo {
  if (!text?.trim()) {
    return DEFAULT_LANG;
  }

  // Use eld to detect language (returns ISO 639-1 code directly)
  const detectedCode = eld.detect(text);

  // Handle cases where eld returns empty string or no result
  if (
    !detectedCode ||
    !detectedCode.language ||
    detectedCode.language.trim() === ""
  ) {
    return DEFAULT_LANG;
  }

  // Try to find in SUPPORTED_LANGUAGES
  const found = SUPPORTED_LANGUAGES.find(
    (lang) => lang.code === detectedCode.language,
  );

  if (found) {
    return found;
  }

  // Return detected code with generic name if not in our supported list
  const result = {
    code: detectedCode.language,
    name: detectedCode.language.toUpperCase(),
  };
  return result;
}
