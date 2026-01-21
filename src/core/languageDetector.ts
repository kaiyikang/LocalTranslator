/**
 * Core - Language Utilities
 * Pure domain functions for language operations (no external dependencies)
 */

import { SUPPORTED_LANGUAGES } from '@core/languages';

export interface LanguageInfo {
  code: string;
  name: string;
}

/**
 * Get language info by name
 * @param name Language name to search for
 * @returns Language information or null if not found
 */
export function getLanguageByName(name: string): LanguageInfo | null {
  const found = SUPPORTED_LANGUAGES.find((lang) =>
    lang.name.toLowerCase() === name.toLowerCase()
  );
  return found || null;
}

/**
 * Get language info by code
 * @param code Language code to search for
 * @returns Language information or null if not found
 */
export function getLanguageByCode(code: string): LanguageInfo | null {
  const found = SUPPORTED_LANGUAGES.find((lang) =>
    lang.code === code || lang.code.startsWith(code)
  );
  return found || null;
}

/**
 * Get all supported languages
 * @returns Array of all supported languages
 */
export function getAllLanguages(): typeof SUPPORTED_LANGUAGES {
  return SUPPORTED_LANGUAGES;
}
