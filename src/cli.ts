#!/usr/bin/env node
/**
 * CLI - Command Line Interface
 */

import { translate, detectLanguage } from './index';

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: npx ts-node src/cli.ts "text" [targetLang]');
    console.log('       npx ts-node src/cli.ts --detect "text"');
    return;
  }

  if (args[0] === '--detect') {
    const lang = detectLanguage(args[1] || '');
    console.log(`${lang.name} (${lang.code})`);
    return;
  }

  try {
    const result = await translate(args[0], args[1] || 'Chinese');
    console.log(result.translated);
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : error);
  }
}

main();
