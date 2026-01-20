/**
 * Example Usage
 * Demonstrates how to use the LocalTranslator module
 */

import { Translator, detectLanguage, updateConfig } from './index';

async function main() {
  console.log('=== LocalTranslator Example ===\n');

  // Create translator instance
  const translator = new Translator({
    defaultTargetLang: 'Chinese',
  });

  // Example 1: Detect language
  const englishText = 'Hello, how are you today?';
  const chineseText = '你好，世界！';
  const japaneseText = 'こんにちは';

  console.log('Language Detection:');
  console.log(`"${englishText}" -> ${detectLanguage(englishText).name}`);
  console.log(`"${chineseText}" -> ${detectLanguage(chineseText).name}`);
  console.log(`"${japaneseText}" -> ${detectLanguage(japaneseText).name}`);
  console.log();

  // Example 2: Translate text
  try {
    console.log('Translation (requires Ollama running):');
    
    // English to Chinese
    const result1 = await translator.translate('Hello, world!', {
      targetLang: 'Chinese',
    });
    console.log(`EN -> ZH: "${result1.original}" -> "${result1.translated}"`);

    // Chinese to English
    const result2 = await translator.translate('你好，世界！', {
      targetLang: 'English',
    });
    console.log(`ZH -> EN: "${result2.original}" -> "${result2.translated}"`);

    // Quick translate
    const quickResult = await translator.quickTranslate('Good morning!', 'Chinese');
    console.log(`Quick: "Good morning!" -> "${quickResult}"`);

  } catch (error) {
    console.error('Translation error:', error);
    console.log('\nMake sure Ollama is running with: ollama run translategemma');
  }
}

main().catch(console.error);
