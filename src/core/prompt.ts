/**
 * Core - Prompt Builder
 * Builds translation prompts from template
 */

const TEMPLATE_STD = `You are a professional {SOURCE_LANG} ({SOURCE_CODE}) to {TARGET_LANG} ({TARGET_CODE}) translator. Your goal is to accurately convey the meaning and nuances of the original {SOURCE_LANG} text while adhering to {TARGET_LANG} grammar, vocabulary, and cultural sensitivities.
Produce only the {TARGET_LANG} translation, without any additional explanations or commentary. Please translate the following {SOURCE_LANG} text into {TARGET_LANG}:


{TEXT}`;

const TEMPLATE_AUTO = `You are a professional translator. Your goal is to accurately translate the input text into {TARGET_LANG} ({TARGET_CODE}). Detect the source language automatically.
Produce only the {TARGET_LANG} translation, without any additional explanations or commentary. Please translate the following text into {TARGET_LANG}:


{TEXT}`;

const GRAMMAR_TEMPLATE = `You are a professional {LANG} ({LANG_CODE}) grammar expert. Your goal is to correct any grammatical errors in the input text while preserving the original meaning and style.
Produce only the corrected {LANG} text, without any additional explanations or commentary. Please correct the grammar of the following {LANG} text:


{TEXT}`;

export interface PromptParams {
  sourceLang?: string;
  sourceCode?: string;
  targetLang: string;
  targetCode: string;
  text: string;
  template?: string;
}

export function buildPrompt(params: PromptParams): string {
  const hasSource = params.sourceLang && params.sourceCode;

  let template = params.template;
  if (!template) {
    template = hasSource ? TEMPLATE_STD : TEMPLATE_AUTO;
  }

  let prompt = template
    .replace(/{TARGET_LANG}/g, params.targetLang)
    .replace(/{TARGET_CODE}/g, params.targetCode)
    .replace(/{TEXT}/g, params.text);

  if (params.sourceLang) {
    prompt = prompt.replace(/{SOURCE_LANG}/g, params.sourceLang);
  }

  if (params.sourceCode) {
    prompt = prompt.replace(/{SOURCE_CODE}/g, params.sourceCode);
  }

  return prompt;
}

export interface GrammarPromptParams {
  lang: string;
  langCode: string;
  text: string;
  template?: string;
}

export function buildGrammarPrompt(params: GrammarPromptParams): string {
  const template = params.template || GRAMMAR_TEMPLATE;
  return template
    .replace(/{LANG}/g, params.lang)
    .replace(/{LANG_CODE}/g, params.langCode)
    .replace(/{TEXT}/g, params.text);
}
