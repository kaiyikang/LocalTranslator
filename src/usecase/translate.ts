/**
 * Use Case: Translate Text
 * Orchestrates language detection, prompt building, and translation
 */

import { buildPrompt } from "@core/prompt";
import { getLanguageByCode } from "@core/languages";
import { sendToOllama, checkConnection } from "@infrastructure/ollamaClient";
import { detectLanguage } from "@infrastructure/languageDetector";

export interface TranslateInput {
  text: string;
  autoDetect: boolean; // 明确的自动检测标志
  sourceLang?: string; // 语言代码（如 'en', 'zh'），仅在 autoDetect=false 时使用
  targetLang: string; // 目标语言代码，必需
}

export interface TranslateOutput {
  original: string;
  translated: string;
  sourceLang: { code: string; name: string };
  targetLang: { code: string; name: string };
}

/**
 * Translate text from source language to target language
 */
export async function translateText(
  input: TranslateInput,
): Promise<TranslateOutput> {
  const { text, autoDetect, sourceLang, targetLang } = input;

  let source;
  if (autoDetect) {
    source = detectLanguage(text);
  } else {
    if (!sourceLang) {
      throw new Error("sourceLang is required when autoDetect is false");
    }
    source = getLanguageByCode(sourceLang) || {
      code: sourceLang,
      name: sourceLang.toUpperCase(),
    };
  }

  // Determine target language
  const target = getLanguageByCode(targetLang) || {
    code: targetLang,
    name: targetLang.toUpperCase(),
  };

  // Check Ollama connection before sending
  const isConnected = await checkConnection();
  if (!isConnected) {
    throw new Error("Cannot connect to Ollama service. Please make sure Ollama is running.");
  }

  // Build and send prompt
  const prompt = buildPrompt({
    text,
    sourceLang: source.name,
    sourceCode: source.code,
    targetLang: target.name,
    targetCode: target.code,
  });

  const translated = await sendToOllama(prompt);

  return {
    original: text,
    translated,
    sourceLang: source,
    targetLang: target,
  };
}
