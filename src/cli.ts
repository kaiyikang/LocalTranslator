#!/usr/bin/env node
/**
 * CLI Tool for LocalTranslator
 * Usage: npx ts-node src/cli.ts "text to translate" [targetLang]
 */

import { Translator, detectLanguage } from './index';

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('LocalTranslator CLI');
    console.log('-------------------');
    console.log('Usage:');
    console.log('  npx ts-node src/cli.ts "text" [targetLang]');
    console.log('');
    console.log('Examples:');
    console.log('  npx ts-node src/cli.ts "Hello world"           # -> Chinese (default)');
    console.log('  npx ts-node src/cli.ts "Hello world" Japanese  # -> Japanese');
    console.log('  npx ts-node src/cli.ts "你好世界" English       # -> English');
    console.log('');
    console.log('Detect language only:');
    console.log('  npx ts-node src/cli.ts --detect "你好"');
    process.exit(0);
  }

  // Detect language only
  if (args[0] === '--detect') {
    const text = args[1] || '';
    const lang = detectLanguage(text);
    console.log(`Detected: ${lang.name} (${lang.code})`);
    process.exit(0);
  }

  const text = args[0];
  const targetLang = args[1] || 'Chinese';

  const translator = new Translator();
  const sourceLang = detectLanguage(text);

//   console.log(`Source:  "${text}"`);
//   console.log(`From:    ${sourceLang.name} (${sourceLang.code})`);
//   console.log(`To:      ${targetLang}`);
//   console.log('---');

  try {
    const result = await translator.translate(text, { targetLang });
    console.log(`Result:  "${result.translated}"`);
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : error);
    console.log('\nMake sure Ollama is running: ollama serve');
  }
}

main();
