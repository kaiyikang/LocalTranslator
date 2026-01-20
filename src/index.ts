/**
 * LocalTranslator - Main Entry Point
 */

// Core
export { translate, TranslateResult } from '@core/translator';
export { detectLanguage, getLanguageByName, LanguageInfo } from '@core/languageDetector';
export { buildPrompt, PromptParams } from '@core/prompt';

// Infrastructure
export { getConfig, updateConfig, Config } from '@infrastructure/config';
export { sendToOllama } from '@infrastructure/ollamaClient';
