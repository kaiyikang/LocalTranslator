/**
 * Use Case: Rewrite/Grammar Check Text
 * Orchestrates language detection, grammar prompt building, and rewriting
 */

import { buildGrammarPrompt } from '@core/prompt';
import { getLanguageByName } from '@core/language';
import { sendToOllama } from '@infrastructure/ollamaClient';
import { detectLanguage } from '@infrastructure/languageDetector';

export interface RewriteInput {
    text: string;
    lang?: string;
}

export interface RewriteOutput {
    original: string;
    rewritten: string;
    lang: { code: string; name: string };
}

/**
 * Rewrite/grammar check text in the detected or specified language
 */
export async function rewriteText(input: RewriteInput): Promise<RewriteOutput> {
    const { text, lang: langName } = input;

    // Detect or use provided language
    const language =
        langName && langName !== 'auto'
            ? getLanguageByName(langName) || { code: 'en', name: langName }
            : detectLanguage(text);

    // Build and send grammar correction prompt
    const prompt = buildGrammarPrompt({
        text,
        lang: language.name,
        langCode: language.code,
    });

    const rewritten = await sendToOllama(prompt);

    return {
        original: text,
        rewritten,
        lang: language,
    };
}
