/**
 * Core - Supported Languages
 * Source of truth for all supported languages
 * And also provide some language utilities
 */

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
  { code: 'th', name: 'Thai' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'id', name: 'Indonesian' },
  { code: 'ms', name: 'Malay' },
  { code: 'nl', name: 'Dutch' },
  { code: 'pl', name: 'Polish' },
  { code: 'tr', name: 'Turkish' },
  { code: 'uk', name: 'Ukrainian' },
  { code: 'cs', name: 'Czech' },
  { code: 'sv', name: 'Swedish' },
  { code: 'da', name: 'Danish' },
  { code: 'fi', name: 'Finnish' },
  { code: 'el', name: 'Greek' },
  { code: 'he', name: 'Hebrew' },
  { code: 'hu', name: 'Hungarian' },
  { code: 'ro', name: 'Romanian' },
  { code: 'no', name: 'Norwegian' },
] as const;

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
  const found = SUPPORTED_LANGUAGES.find((lang) => lang.name.toLowerCase() === name.toLowerCase());
  return found || null;
}

/**
 * Get language info by code
 * @param code Language code to search for
 * @returns Language information or null if not found
 */
export function getLanguageByCode(code: string): LanguageInfo | null {
  const found = SUPPORTED_LANGUAGES.find(
    (lang) => lang.code === code || lang.code.startsWith(code),
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

/**
 * Get unique languages for UI display (deduplicated by name)
 * @returns Array of unique languages with base code only
 */
export function getUniqueLanguages(): LanguageInfo[] {
  const seen = new Set<string>();
  return SUPPORTED_LANGUAGES.filter((lang) => {
    // Only keep base codes (no hyphen) to avoid duplicates
    if (lang.code.includes('-')) return false;
    if (seen.has(lang.name)) return false;
    seen.add(lang.name);
    return true;
  });
}
