/**
 * Core - Rewriter
 * Grammar correction and rewriting logic
 */

import { detectLanguage, getLanguageByName, LanguageInfo } from '@core/languageDetector';
import { buildGrammarPrompt } from '@core/prompt';
import { sendToOllama } from '@infrastructure/ollamaClient';

export interface RewriteResult {
    original: string;
    rewritten: string;
    lang: LanguageInfo;
}

export async function rewrite(
    text: string,
    lang?: string
): Promise<RewriteResult> {
    // Detect or use provided language
    const language: LanguageInfo =
        lang && lang !== 'auto'
            ? getLanguageByName(lang) || { code: 'en', name: lang }
            : detectLanguage(text);

    // Build and send grammar correction prompt
    const prompt = buildGrammarPrompt({
        lang: language.name,
        langCode: language.code,
        text,
    });

    const rewritten = await sendToOllama(prompt);

    return { original: text, rewritten, lang: language };
}
