/**
 * Prompt Module
 * Builds translation prompts from template
 */

export interface PromptParams {
  sourceLang: string;
  sourceCode: string;
  targetLang: string;
  targetCode: string;
  text: string;
}

// Prompt template
const PROMPT_TEMPLATE = `You are a professional {SOURCE_LANG} ({SOURCE_CODE}) to {TARGET_LANG} ({TARGET_CODE}) translator. Your goal is to accurately convey the meaning and nuances of the original {SOURCE_LANG} text while adhering to {TARGET_LANG} grammar, vocabulary, and cultural sensitivities.
Produce only the {TARGET_LANG} translation, without any additional explanations or commentary. Please translate the following {SOURCE_LANG} text into {TARGET_LANG}:


{TEXT}`;

/**
 * Build a translation prompt from parameters
 */
export function buildPrompt(params: PromptParams): string {
  return PROMPT_TEMPLATE
    .replace(/{SOURCE_LANG}/g, params.sourceLang)
    .replace(/{SOURCE_CODE}/g, params.sourceCode)
    .replace(/{TARGET_LANG}/g, params.targetLang)
    .replace(/{TARGET_CODE}/g, params.targetCode)
    .replace(/{TEXT}/g, params.text);
}

/**
 * Build prompt with simplified parameters
 */
export function buildSimplePrompt(
  text: string,
  sourceLang: string,
  sourceCode: string,
  targetLang: string,
  targetCode: string
): string {
  return buildPrompt({
    sourceLang,
    sourceCode,
    targetLang,
    targetCode,
    text,
  });
}
