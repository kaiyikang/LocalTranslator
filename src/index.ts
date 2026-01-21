/**
 * Main entry point - exports use cases and domain entities
 */

// Use Cases (Application Layer)
export { translateText, TranslateInput, TranslateOutput } from './usecase/translateUseCase';
export { rewriteText, RewriteInput, RewriteOutput } from './usecase/rewriteUseCase';

// Core Domain
export { LanguageInfo, getLanguageByName, getLanguageByCode, getAllLanguages } from './core/language';
export { SUPPORTED_LANGUAGES } from './core/languages';
export { buildPrompt, buildGrammarPrompt, PromptParams } from './core/prompt';

// Infrastructure (for advanced usage)
export { getConfig, updateConfig, Config } from './infrastructure/config';
export { sendToOllama, checkConnection } from './infrastructure/ollamaClient';
export { detectLanguage } from './infrastructure/languageDetector';
