/**
 * Use Case: Translate Text
 * Orchestrates language detection, prompt building, and translation
 */

import { buildPrompt } from '@core/prompt';
import { getLanguageByName } from '@core/languages';
import { sendToOllama } from '@infrastructure/ollamaClient';
import { getConfig } from '@infrastructure/config';
import { detectLanguage } from '@infrastructure/languageDetector';

export interface TranslateInput {
    text: string;
    sourceLang?: string;
    targetLang?: string;
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
export async function translateText(input: TranslateInput): Promise<TranslateOutput> {
    const { text, sourceLang: sourceName, targetLang: targetName } = input;
    const config = getConfig();

    // Determine source language
    const source =
        sourceName && sourceName !== 'auto'
            ? getLanguageByName(sourceName) || detectLanguage(text)
            : detectLanguage(text);

    // Determine target language
    const targetNameResolved = targetName || config.defaultTargetLang;
    const target = getLanguageByName(targetNameResolved) || {
        code: targetNameResolved.substring(0, 2).toLowerCase(),
        name: targetNameResolved,
    };

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
