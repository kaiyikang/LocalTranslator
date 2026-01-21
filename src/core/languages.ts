/**
 * Core - Supported Languages
 * Source of truth for all supported languages
 * And also provide some language utilities
 */

export const SUPPORTED_LANGUAGES = [
    // === Mainstream Languages ===
    { code: 'en', name: '🇬🇧 English' },
    { code: 'zh', name: '🇨🇳 Chinese' },
    { code: 'ja', name: '🇯🇵 Japanese' },
    { code: 'ko', name: '🇰🇷 Korean' },
    { code: 'es', name: '🇪🇸 Spanish' },
    { code: 'fr', name: '🇫🇷 French' },
    { code: 'de', name: '🇩🇪 German' },
    { code: 'it', name: '🇮🇹 Italian' },
    { code: 'pt', name: '🇵🇹 Portuguese' },
    { code: 'ru', name: '🇷🇺 Russian' },
    { code: 'ar', name: '🇸🇦 Arabic' },
    { code: 'hi', name: '🇮🇳 Hindi' },
    { code: 'th', name: '🇹🇭 Thai' },
    { code: 'vi', name: '🇻🇳 Vietnamese' },
    { code: 'id', name: '🇮🇩 Indonesian' },
    { code: 'ms', name: '🇲🇾 Malay' },
    { code: 'nl', name: '🇳🇱 Dutch' },
    { code: 'pl', name: '🇵🇱 Polish' },
    { code: 'tr', name: '🇹🇷 Turkish' },
    { code: 'uk', name: '🇺🇦 Ukrainian' },
    { code: 'cs', name: '🇨🇿 Czech' },
    { code: 'sv', name: '🇸🇪 Swedish' },
    { code: 'da', name: '🇩🇰 Danish' },
    { code: 'fi', name: '🇫🇮 Finnish' },
    { code: 'el', name: '🇬🇷 Greek' },
    { code: 'he', name: '🇮🇱 Hebrew' },
    { code: 'hu', name: '🇭🇺 Hungarian' },
    { code: 'ro', name: '🇷🇴 Romanian' },
    { code: 'no', name: '🇳🇴 Norwegian' },

    // === Uncomment to add more languages ===
    // { code: 'aa', name: 'Afar' },
    // { code: 'ab', name: 'Abkhazian' },
    // { code: 'af', name: 'Afrikaans' },
    // { code: 'ak', name: 'Akan' },
    // { code: 'am', name: 'Amharic' },
    // { code: 'an', name: 'Aragonese' },
    // { code: 'as', name: 'Assamese' },
    // { code: 'az', name: 'Azerbaijani' },
    // { code: 'ba', name: 'Bashkir' },
    // { code: 'be', name: 'Belarusian' },
    // { code: 'bg', name: 'Bulgarian' },
    // { code: 'bm', name: 'Bambara' },
    // { code: 'bn', name: 'Bengali' },
    // { code: 'bo', name: 'Tibetan' },
    // { code: 'br', name: 'Breton' },
    // { code: 'bs', name: 'Bosnian' },
    // { code: 'ca', name: 'Catalan' },
    // { code: 'ce', name: 'Chechen' },
    // { code: 'co', name: 'Corsican' },
    // { code: 'cv', name: 'Chuvash' },
    // { code: 'cy', name: 'Welsh' },
    // { code: 'dv', name: 'Divehi' },
    // { code: 'dz', name: 'Dzongkha' },
    // { code: 'ee', name: 'Ewe' },
    // { code: 'eo', name: 'Esperanto' },
    // { code: 'et', name: 'Estonian' },
    // { code: 'eu', name: 'Basque' },
    // { code: 'fa', name: 'Persian' },
    // { code: 'ff', name: 'Fulah' },
    // { code: 'fo', name: 'Faroese' },
    // { code: 'fy', name: 'Western Frisian' },
    // { code: 'ga', name: 'Irish' },
    // { code: 'gd', name: 'Scottish Gaelic' },
    // { code: 'gl', name: 'Galician' },
    // { code: 'gn', name: 'Guarani' },
    // { code: 'gu', name: 'Gujarati' },
    // { code: 'gv', name: 'Manx' },
    // { code: 'ha', name: 'Hausa' },
    // { code: 'hr', name: 'Croatian' },
    // { code: 'ht', name: 'Haitian' },
    // { code: 'hy', name: 'Armenian' },
    // { code: 'ia', name: 'Interlingua' },
    // { code: 'ie', name: 'Interlingue' },
    // { code: 'ig', name: 'Igbo' },
    // { code: 'ii', name: 'Sichuan Yi' },
    // { code: 'ik', name: 'Inupiaq' },
    // { code: 'io', name: 'Ido' },
    // { code: 'is', name: 'Icelandic' },
    // { code: 'iu', name: 'Inuktitut' },
    // { code: 'jv', name: 'Javanese' },
    // { code: 'ka', name: 'Georgian' },
    // { code: 'ki', name: 'Kikuyu' },
    // { code: 'kk', name: 'Kazakh' },
    // { code: 'kl', name: 'Kalaallisut' },
    // { code: 'km', name: 'Central Khmer' },
    // { code: 'kn', name: 'Kannada' },
    // { code: 'ks', name: 'Kashmiri' },
    // { code: 'ku', name: 'Kurdish' },
    // { code: 'kw', name: 'Cornish' },
    // { code: 'ky', name: 'Kyrgyz' },
    // { code: 'la', name: 'Latin' },
    // { code: 'lb', name: 'Luxembourgish' },
    // { code: 'lg', name: 'Ganda' },
    // { code: 'ln', name: 'Lingala' },
    // { code: 'lo', name: 'Lao' },
    // { code: 'lt', name: 'Lithuanian' },
    // { code: 'lu', name: 'Luba-Katanga' },
    // { code: 'lv', name: 'Latvian' },
    // { code: 'mg', name: 'Malagasy' },
    // { code: 'mi', name: 'Maori' },
    // { code: 'mk', name: 'Macedonian' },
    // { code: 'ml', name: 'Malayalam' },
    // { code: 'mn', name: 'Mongolian' },
    // { code: 'mr', name: 'Marathi' },
    // { code: 'mt', name: 'Maltese' },
    // { code: 'my', name: 'Burmese' },
    // { code: 'nb', name: 'Norwegian Bokmål' },
    // { code: 'nd', name: 'North Ndebele' },
    // { code: 'ne', name: 'Nepali' },
    // { code: 'nn', name: 'Norwegian Nynorsk' },
    // { code: 'nr', name: 'South Ndebele' },
    // { code: 'nv', name: 'Navajo' },
    // { code: 'ny', name: 'Chichewa' },
    // { code: 'oc', name: 'Occitan' },
    // { code: 'om', name: 'Oromo' },
    // { code: 'or', name: 'Oriya' },
    // { code: 'os', name: 'Ossetian' },
    // { code: 'pa', name: 'Punjabi' },
    // { code: 'ps', name: 'Pashto' },
    // { code: 'qu', name: 'Quechua' },
    // { code: 'rm', name: 'Romansh' },
    // { code: 'rn', name: 'Rundi' },
    // { code: 'rw', name: 'Kinyarwanda' },
    // { code: 'sa', name: 'Sanskrit' },
    // { code: 'sc', name: 'Sardinian' },
    // { code: 'sd', name: 'Sindhi' },
    // { code: 'se', name: 'Northern Sami' },
    // { code: 'sg', name: 'Sango' },
    // { code: 'si', name: 'Sinhala' },
    // { code: 'sk', name: 'Slovak' },
    // { code: 'sl', name: 'Slovenian' },
    // { code: 'sn', name: 'Shona' },
    // { code: 'so', name: 'Somali' },
    // { code: 'sq', name: 'Albanian' },
    // { code: 'sr', name: 'Serbian' },
    // { code: 'ss', name: 'Swati' },
    // { code: 'st', name: 'Southern Sotho' },
    // { code: 'su', name: 'Sundanese' },
    // { code: 'sw', name: 'Swahili' },
    // { code: 'ta', name: 'Tamil' },
    // { code: 'te', name: 'Telugu' },
    // { code: 'tg', name: 'Tajik' },
    // { code: 'ti', name: 'Tigrinya' },
    // { code: 'tk', name: 'Turkmen' },
    // { code: 'tl', name: 'Tagalog' },
    // { code: 'tn', name: 'Tswana' },
    // { code: 'to', name: 'Tonga' },
    // { code: 'ts', name: 'Tsonga' },
    // { code: 'tt', name: 'Tatar' },
    // { code: 'ug', name: 'Uyghur' },
    // { code: 'ur', name: 'Urdu' },
    // { code: 'uz', name: 'Uzbek' },
    // { code: 've', name: 'Venda' },
    // { code: 'vo', name: 'Volapük' },
    // { code: 'wa', name: 'Walloon' },
    // { code: 'wo', name: 'Wolof' },
    // { code: 'xh', name: 'Xhosa' },
    // { code: 'yi', name: 'Yiddish' },
    // { code: 'yo', name: 'Yoruba' },
    // { code: 'za', name: 'Zhuang' },
    // { code: 'zu', name: 'Zulu' },
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