/**
 * Use Case: Translate Text
 * Orchestrates language detection, prompt building, and translation
 */

import { buildPrompt } from '@core/prompt';
import { getLanguageByCode } from '@core/languages';
import { sendToOllama } from '@infrastructure/ollamaClient';
import { getConfig } from '@infrastructure/config';
import { detectLanguage } from '@infrastructure/languageDetector';

export interface TranslateInput {
    text: string;
    autoDetect: boolean;      // 明确的自动检测标志
    sourceLang?: string;      // 语言代码（如 'en', 'zh'），仅在 autoDetect=false 时使用
    targetLang: string;       // 目标语言代码，必需
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
    const { text, autoDetect, sourceLang, targetLang } = input;

    // Determine source language - 逻辑更加清晰
    let source;
    if (autoDetect) {
        // 自动检测模式：忽略 sourceLang，直接检测
        source = detectLanguage(text);
    } else {
        // 手动模式：使用提供的 sourceLang
        if (!sourceLang) {
            throw new Error('sourceLang is required when autoDetect is false');
        }
        source = getLanguageByCode(sourceLang) || {
            code: sourceLang,
            name: sourceLang.toUpperCase()
        };
    }

    // Determine target language
    const target = getLanguageByCode(targetLang) || {
        code: targetLang,
        name: targetLang.toUpperCase()
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
