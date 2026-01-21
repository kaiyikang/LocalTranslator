#!/usr/bin/env node
/**
 * CLI for the Local Translator
 */

import { translateText } from './usecase/translateUseCase';
import { detectLanguage } from './infrastructure/languageDetector';
import { getClipboardText } from './infrastructure/clipboard';

async function main() {
  const text = getClipboardText();
  if (!text) {
    console.error('Clipboard is empty');
    process.exit(1);
  }

  const detected = detectLanguage(text);
  console.log(`Detected language: ${detected.name} (${detected.code})`);

  const result = await translateText({ text });
  console.log(`\nOriginal (${result.sourceLang.name}):\n${result.original}`);
  console.log(`\nTranslated (${result.targetLang.name}):\n${result.translated}`);
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
