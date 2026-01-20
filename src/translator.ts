/**
 * Main Translator Module
 * Coordinates all modules for translation
 */

import { getConfig, updateConfig, TranslatorConfig } from './config';
import { sendToOllama } from './client';
import { detectLanguage, getLanguageByName, LanguageInfo } from './languageDetector';
import { buildPrompt } from './prompt';

export interface TranslateOptions {
  sourceLang?: string;
  targetLang?: string;
}

export interface TranslateResult {
  original: string;
  translated: string;
  sourceLang: LanguageInfo;
  targetLang: LanguageInfo;
}

/**
 * Main Translator class
 */
export class Translator {
  constructor(config?: Partial<TranslatorConfig>) {
    if (config) {
      updateConfig(config);
    }
  }

  /**
   * Translate text
   */
  async translate(text: string, options?: TranslateOptions): Promise<TranslateResult> {
    const config = getConfig();

    // Detect or use provided source language
    let sourceLang: LanguageInfo;
    if (options?.sourceLang && options.sourceLang !== 'auto') {
      sourceLang = getLanguageByName(options.sourceLang) || { code: 'en', name: options.sourceLang };
    } else {
      sourceLang = detectLanguage(text);
    }

    // Use provided or default target language
    const targetLangName = options?.targetLang || config.defaultTargetLang;
    const targetLang: LanguageInfo = getLanguageByName(targetLangName) || {
      code: targetLangName.substring(0, 2).toLowerCase(),
      name: targetLangName,
    };

    // Build prompt
    const prompt = buildPrompt({
      sourceLang: sourceLang.name,
      sourceCode: sourceLang.code,
      targetLang: targetLang.name,
      targetCode: targetLang.code,
      text: text,
    });

    // Send to Ollama
    const translated = await sendToOllama(prompt);

    return {
      original: text,
      translated,
      sourceLang,
      targetLang,
    };
  }

  /**
   * Quick translate with auto detection
   */
  async quickTranslate(text: string, targetLang: string): Promise<string> {
    const result = await this.translate(text, { targetLang });
    return result.translated;
  }

  /**
   * Update translator configuration
   */
  configure(config: Partial<TranslatorConfig>): void {
    updateConfig(config);
  }

  /**
   * Get current configuration
   */
  getConfiguration(): TranslatorConfig {
    return getConfig();
  }
}

// Export a default instance
export const translator = new Translator();
