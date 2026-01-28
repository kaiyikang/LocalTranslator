/**
 * UseCase: Process Text (Orchestrator)
 * Routes to translate or rewrite based on source/target language
 */

import { translateText } from './translate';
import { rewriteText } from './rewrite';
import { detectLanguage } from '@infrastructure/languageDetector';

export interface ProcessInput {
  text: string;
  sourceLang: string; // 可以是 'auto' 或具体的语言代码
  targetLang: string;
}

export interface ProcessOutput {
  result: string;
  mode: 'translate' | 'rewrite';
}

export async function processText(input: ProcessInput): Promise<ProcessOutput> {
  const { text, sourceLang, targetLang } = input;

  try {
    // Determine if auto-detect is enabled
    const autoDetect = sourceLang === 'auto';

    // Determine actual source language
    const actualSource = autoDetect ? detectLanguage(text).code : sourceLang;

    // Route: same language → rewrite, different → translate
    if (actualSource === targetLang) {
      const output = await rewriteText({ text, lang: targetLang });
      return { result: output.rewritten, mode: 'rewrite' };
    } else {
      const output = await translateText({
        text,
        autoDetect,
        sourceLang: autoDetect ? undefined : sourceLang,
        targetLang,
      });
      return { result: output.translated, mode: 'translate' };
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Processing failed: ${message}`);
  }
}
