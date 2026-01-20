/**
 * Core - Translator
 * Main translation logic
 */

import { detectLanguage, getLanguageByName, LanguageInfo } from '@core/languageDetector';
import { buildPrompt } from '@core/prompt';
import { sendToOllama } from '@infrastructure/ollamaClient';
import { getConfig } from '@infrastructure/config';

export interface TranslateResult {
  original: string;
  translated: string;
  sourceLang: LanguageInfo;
  targetLang: LanguageInfo;
}

export async function translate(
  text: string,
  targetLang?: string,
  sourceLang?: string
): Promise<TranslateResult> {
  const config = getConfig();

  // Detect or use provided source language
  const source: LanguageInfo =
    sourceLang && sourceLang !== 'auto'
      ? getLanguageByName(sourceLang) || { code: 'en', name: sourceLang }
      : detectLanguage(text);

  // Use provided or default target language
  const targetName = targetLang || config.defaultTargetLang;
  const target: LanguageInfo = getLanguageByName(targetName) || {
    code: targetName.substring(0, 2).toLowerCase(),
    name: targetName,
  };

  // Build and send prompt
  const prompt = buildPrompt({
    sourceLang: source.name,
    sourceCode: source.code,
    targetLang: target.name,
    targetCode: target.code,
    text,
  });

  const translated = await sendToOllama(prompt);

  return { original: text, translated, sourceLang: source, targetLang: target };
}
