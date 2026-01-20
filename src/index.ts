/**
 * LocalTranslator - Main Entry Point
 * Export all modules for use in ElectronJS
 */

// Export configuration
export { getConfig, updateConfig, resetConfig } from './config';
export type { OllamaConfig, TranslatorConfig } from './config';

// Export client
export { sendToOllama } from './client';
export type { OllamaResponse, GenerateRequest } from './client';

// Export language detector
export { detectLanguage, getLanguageByCode, getLanguageByName } from './languageDetector';
export type { LanguageInfo } from './languageDetector';

// Export prompt builder
export { buildPrompt, buildSimplePrompt } from './prompt';
export type { PromptParams } from './prompt';

// Export translator
export { Translator, translator } from './translator';
export type { TranslateOptions, TranslateResult } from './translator';
