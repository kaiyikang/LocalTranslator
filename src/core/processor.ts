/**
 * Core - Processor
 * Smart wrapper that routes to translator or rewriter based on language matching
 */

import { translate, TranslateResult } from '@core/translator';
import { rewrite } from '@core/rewriter';
import { detectLanguage, getLanguageByName, LanguageInfo } from '@core/languageDetector';
import { getConfig } from '@infrastructure/config';

export async function process(
    text: string,
    targetLang?: string,
    sourceLang?: string
): Promise<TranslateResult> {
    const config = getConfig();

    // Detect or use provided source language
    const source: LanguageInfo =
        sourceLang && sourceLang !== 'auto'
            ? getLanguageByName(sourceLang) || { code: 'en', name: sourceLang }
            : detectLanguage(text);

    // Use provided or default target language
    const targetName = targetLang || config.defaultTargetLang;
    const target: LanguageInfo = getLanguageByName(targetName) || {
        code: targetName.substring(0, 2).toLowerCase(),
        name: targetName,
    };

    // Route to rewriter if languages match, otherwise translate
    if (source.code === target.code || source.name === target.name) {
        const result = await rewrite(text, source.name);
        return {
            original: result.original,
            translated: result.rewritten,
            sourceLang: result.lang,
            targetLang: result.lang,
        };
    }

    return translate(text, targetLang, sourceLang);
}
