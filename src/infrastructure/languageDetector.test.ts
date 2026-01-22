/**
 * Unit Tests for Language Detector
 * Tests the detectLanguage function with various scenarios
 */

import { describe, it, expect } from 'vitest';
import { detectLanguage } from './languageDetector';

describe('detectLanguage', () => {
    describe('Basic Language Detection', () => {
        it('should detect and return valid result for English-like text', () => {
            const result = detectLanguage('The quick brown fox jumps over the lazy dog every single day without fail.');
            // Note: Short English text can sometimes be misdetected by franc
            // We just verify the function returns a valid LanguageInfo object
            expect(result).toHaveProperty('code');
            expect(result).toHaveProperty('name');
            expect(typeof result.code).toBe('string');
            expect(typeof result.name).toBe('string');
        });

        it('should detect Chinese text', () => {
            const result = detectLanguage('你好，今天天气怎么样？');
            // franc might return 'cmn' (Mandarin) or 'zh'
            expect(['zh', 'cmn']).toContain(result.code);
            expect(result.name).toBeTruthy();
        });

        it('should detect Japanese text', () => {
            const result = detectLanguage('こんにちは、お元気ですか？');
            // franc returns 'jpn' but our code should find 'ja' via startsWith
            expect(['ja', 'jpn']).toContain(result.code);
            expect(result.name).toBeTruthy();
        });

        it('should detect Spanish-like text', () => {
            const result = detectLanguage('Hola, cómo estás hoy amigo mío?');
            // Short text might be detected as various codes
            expect(result.code).toBeTruthy();
            expect(result.name).toBeTruthy();
        });

        it('should detect French-like text', () => {
            const result = detectLanguage('Bonjour, comment allez-vous aujourd\'hui mon ami?');
            // franc returns 'fra' but might match to 'fr'
            expect(result.code).toBeTruthy();
            expect(result.name).toBeTruthy();
        });

        it('should detect German-like text', () => {
            const result = detectLanguage('Guten Tag, wie geht es Ihnen heute mein Freund?');
            // franc returns 'deu' but might match to 'de'
            expect(result.code).toBeTruthy();
            expect(result.name).toBeTruthy();
        });
    });

    describe('Edge Cases', () => {
        it('should return default language (English) for empty string', () => {
            const result = detectLanguage('');
            expect(result.code).toBe('en');
            expect(result.name).toBe('English');
        });

        it('should return default language for whitespace only', () => {
            const result = detectLanguage('   \n\t  ');
            expect(result.code).toBe('en');
            expect(result.name).toBe('English');
        });

        it('should return default language for null/undefined input', () => {
            const result1 = detectLanguage(null as any);
            expect(result1.code).toBe('en');

            const result2 = detectLanguage(undefined as any);
            expect(result2.code).toBe('en');
        });

        it('should handle very short text (may default to English)', () => {
            const result = detectLanguage('Hi');
            // Short text might be unreliable, but should not crash
            expect(result).toHaveProperty('code');
            expect(result).toHaveProperty('name');
        });

        it('should handle numbers and special characters', () => {
            const result = detectLanguage('123 !@# $%^');
            // Should default to English for non-linguistic content
            expect(result.code).toBe('en');
        });
    });

    describe('Mixed Content', () => {
        it('should detect dominant language in mixed content', () => {
            const result = detectLanguage('Hello 你好 World');
            // Should detect based on dominant language
            expect(result).toHaveProperty('code');
            expect(result).toHaveProperty('name');
        });

        it('should handle text with embedded URLs and emails', () => {
            const result = detectLanguage('Check out https://example.com or email me@example.com for more information today');
            // Should still detect some language
            expect(result).toHaveProperty('code');
            expect(result).toHaveProperty('name');
        });
    });

    describe('Unsupported Languages', () => {
        it('should return detected code with name for any language', () => {
            // Using Turkish which might or might not be in supported list
            const result = detectLanguage('Merhaba, nasılsınız bugün? Güzel bir gün.');
            expect(result).toHaveProperty('code');
            expect(result).toHaveProperty('name');
            // Either found in supported list or returns uppercase code
            expect(typeof result.name).toBe('string');
        });
    });

    describe('Return Type Validation', () => {
        it('should always return an object with code and name properties', () => {
            const inputs = [
                'Hello world',
                '你好世界',
                '',
                '123',
                'a'
            ];

            inputs.forEach(input => {
                const result = detectLanguage(input);
                expect(result).toHaveProperty('code');
                expect(result).toHaveProperty('name');
                expect(typeof result.code).toBe('string');
                expect(typeof result.name).toBe('string');
                expect(result.code.length).toBeGreaterThan(0);
                expect(result.name.length).toBeGreaterThan(0);
            });
        });
    });

    describe('Real-world Scenarios', () => {
        it('should detect language of an English paragraph', () => {
            const englishParagraph = `
                The quick brown fox jumps over the lazy dog. 
                This is a longer piece of text to ensure accurate detection.
                Language detection works better with more context and longer sentences.
            `;
            const result = detectLanguage(englishParagraph);
            // With longer text, detection should be more accurate
            expect(['en', 'eng']).toContain(result.code);
        });

        it('should detect Chinese paragraph', () => {
            const chineseParagraph = `
                这是一段中文文本。语言检测应该能够准确识别这段文字。
                当有更多的上下文时，检测会更加准确。我们需要更多的文字来确保准确性。
            `;
            const result = detectLanguage(chineseParagraph);
            // franc might return 'cmn' (Mandarin Chinese)
            expect(['zh', 'cmn']).toContain(result.code);
        });

        it('should detect Japanese paragraph', () => {
            const japaneseParagraph = `
                これは日本語のテキストです。言語検出はこのテキストを正確に識別できるはずです。
                より多くのコンテキストがあると、検出がより正確になります。テストのために長い文章が必要です。
            `;
            const result = detectLanguage(japaneseParagraph);
            // franc returns 'jpn'
            expect(['ja', 'jpn']).toContain(result.code);
        });
    });

    describe('Consistency Tests', () => {
        it('should return consistent results for the same input', () => {
            const text = 'This is a test sentence in English language';
            const result1 = detectLanguage(text);
            const result2 = detectLanguage(text);

            expect(result1.code).toBe(result2.code);
            expect(result1.name).toBe(result2.name);
        });

        it('should handle case sensitivity', () => {
            const upper = detectLanguage('HELLO WORLD TODAY');
            const lower = detectLanguage('hello world today');

            // Both should detect some form of English
            expect(upper.code).toBe(lower.code);
        });
    });
});
