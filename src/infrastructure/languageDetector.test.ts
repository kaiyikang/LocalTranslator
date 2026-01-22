/**
 * Unit Tests for Language Detector
 * Tests the detectLanguage function with various scenarios
 * Strengthened tests with specific code and name expectations
 */

import { describe, it, expect } from 'vitest';
import { detectLanguage } from './languageDetector';

describe('detectLanguage', () => {
    describe('Basic Language Detection - Specific Expectations', () => {
        it('should detect English text and return code "en" with name "English"', () => {
            const result = detectLanguage('The quick brown fox jumps over the lazy dog every single day without fail.');
            // franc detects this as 'eng' which should map to 'en'
            expect(result.code).toBe('en');
            expect(result.name).toBe('English');
        });

        it('should detect Chinese text and return code "zh" with name "Chinese"', () => {
            const result = detectLanguage('你好，今天天气怎么样？这是一个测试文本，用来检测中文语言。');
            // franc returns 'cmn' which should map to 'zh'
            expect(result.code).toBe('zh');
            expect(result.name).toBe('Chinese');
        });

        it('should detect Japanese text and return code "ja" with name "Japanese"', () => {
            const result = detectLanguage('こんにちは、お元気ですか？これは日本語のテストテキストです。');
            // franc returns 'jpn' which should map to 'ja'
            expect(result.code).toBe('ja');
            expect(result.name).toBe('Japanese');
        });

        it('should detect Spanish text and return code "es" with name "Spanish"', () => {
            const result = detectLanguage('Hola, ¿cómo estás hoy amigo mío? Este es un texto de prueba en español.');
            // franc returns 'spa' which should map to 'es'
            expect(result.code).toBe('es');
            expect(result.name).toBe('Spanish');
        });

        it('should detect French text and return code "fr" with name "French"', () => {
            const result = detectLanguage('Bonjour, comment allez-vous aujourd\'hui mon ami? Ceci est un texte de test en français.');
            // franc returns 'fra' which should map to 'fr'
            expect(result.code).toBe('fr');
            expect(result.name).toBe('French');
        });

        it('should detect German text and return code "de" with name "German"', () => {
            const result = detectLanguage('Guten Tag, wie geht es Ihnen heute mein Freund? Dies ist ein deutscher Testtext.');
            // franc returns 'deu' which should map to 'de'
            expect(result.code).toBe('de');
            expect(result.name).toBe('German');
        });

        it('should detect Korean text and return code "ko" with name "Korean"', () => {
            const result = detectLanguage('안녕하세요, 오늘 어떻게 지내세요? 이것은 한국어 테스트 텍스트입니다.');
            // franc returns 'kor' which should map to 'ko'
            expect(result.code).toBe('ko');
            expect(result.name).toBe('Korean');
        });

        it('should detect Russian text and return code "ru" with name "Russian"', () => {
            const result = detectLanguage('Привет, как дела сегодня? Это тестовый текст на русском языке.');
            // franc returns 'rus' which should map to 'ru'
            expect(result.code).toBe('ru');
            expect(result.name).toBe('Russian');
        });

        it('should detect Italian text and return code "it" with name "Italian"', () => {
            const result = detectLanguage('Ciao, come stai oggi amico mio? Questo è un testo di prova in italiano.');
            // franc returns 'ita' which should map to 'it'
            expect(result.code).toBe('it');
            expect(result.name).toBe('Italian');
        });

        it('should detect Portuguese text and return code "pt" with name "Portuguese"', () => {
            const result = detectLanguage('Olá, como você está hoje meu amigo? Este é um texto de teste em português.');
            // franc returns 'por' which should map to 'pt'
            expect(result.code).toBe('pt');
            expect(result.name).toBe('Portuguese');
        });

        it('should detect Arabic text and return code "ar" with name "Arabic"', () => {
            const result = detectLanguage('مرحبا، كيف حالك اليوم؟ هذا نص تجريبي باللغة العربية.');
            // franc returns 'ara' which should map to 'ar'
            expect(result.code).toBe('ar');
            expect(result.name).toBe('Arabic');
        });

        it('should detect Turkish text and return code "tr" with name "Turkish"', () => {
            const result = detectLanguage('Merhaba, nasılsınız bugün? Bu Türkçe bir test metnidir.');
            // franc returns 'tur' which should map to 'tr'
            expect(result.code).toBe('tr');
            expect(result.name).toBe('Turkish');
        });

        it('should detect Dutch text and return code "nl" with name "Dutch"', () => {
            const result = detectLanguage('Hallo, hoe gaat het vandaag met je? Dit is een Nederlandse testtekst.');
            // franc returns 'nld' which should map to 'nl'
            expect(result.code).toBe('nl');
            expect(result.name).toBe('Dutch');
        });

        it('should detect Polish text and return code "pl" with name "Polish"', () => {
            const result = detectLanguage('Cześć, jak się masz dzisiaj? To jest polski tekst testowy.');
            // franc returns 'pol' which should map to 'pl'
            expect(result.code).toBe('pl');
            expect(result.name).toBe('Polish');
        });

        it('should detect Swedish text and return code "sv" with name "Swedish"', () => {
            const result = detectLanguage('Hej, hur mår du idag? Detta är en svensk testtext.');
            // franc returns 'swe' which should map to 'sv'
            expect(result.code).toBe('sv');
            expect(result.name).toBe('Swedish');
        });

        it('should detect Vietnamese text and return code "vi" with name "Vietnamese"', () => {
            const result = detectLanguage('Xin chào, hôm nay bạn thế nào? Đây là văn bản thử nghiệm tiếng Việt.');
            // franc returns 'vie' which should map to 'vi'
            expect(result.code).toBe('vi');
            expect(result.name).toBe('Vietnamese');
        });

        it('should detect Thai text and return code "th" with name "Thai"', () => {
            const result = detectLanguage('สวัสดี คุณเป็นอย่างไรบ้างวันนี้? นี่คือข้อความทดสอบภาษาไทย');
            // franc returns 'tha' which should map to 'th'
            expect(result.code).toBe('th');
            expect(result.name).toBe('Thai');
        });

        it('should detect Hindi text and return code "hi" with name "Hindi"', () => {
            const result = detectLanguage('नमस्ते, आज आप कैसे हैं? यह हिंदी में एक परीक्षण पाठ है।');
            // franc returns 'hin' which should map to 'hi'
            expect(result.code).toBe('hi');
            expect(result.name).toBe('Hindi');
        });
    });

    describe('Edge Cases - Specific Expectations', () => {
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

        it('should return default language for null input', () => {
            const result = detectLanguage(null as any);
            expect(result.code).toBe('en');
            expect(result.name).toBe('English');
        });

        it('should return default language for undefined input', () => {
            const result = detectLanguage(undefined as any);
            expect(result.code).toBe('en');
            expect(result.name).toBe('English');
        });

        it('should handle very short text - single character', () => {
            const result = detectLanguage('a');
            // franc might return 'und' (undefined) for single character, should default to English
            expect(result.code).toBe('en');
            expect(result.name).toBe('English');
        });

        it('should handle very short text - two characters', () => {
            const result = detectLanguage('Hi');
            // Too short for reliable detection, likely defaults to English
            expect(result.code).toBe('en');
            expect(result.name).toBe('English');
        });

        it('should handle numbers only', () => {
            const result = detectLanguage('123456789');
            // Should default to English for non-linguistic content
            expect(result.code).toBe('en');
            expect(result.name).toBe('English');
        });

        it('should handle special characters only', () => {
            const result = detectLanguage('!@# $%^ &*()');
            // Should default to English for non-linguistic content
            expect(result.code).toBe('en');
            expect(result.name).toBe('English');
        });

        it('should handle mixed numbers and special characters', () => {
            const result = detectLanguage('123 !@# $%^ 456');
            // Should default to English for non-linguistic content
            expect(result.code).toBe('en');
            expect(result.name).toBe('English');
        });
    });

    describe('Mixed Content - Specific Expectations', () => {
        it('should detect dominant language (English) in English-Chinese mix', () => {
            const result = detectLanguage('Hello world this is a test 你好 with some Chinese');
            // English is dominant, should detect as English
            expect(result.code).toBe('en');
            expect(result.name).toBe('English');
        });

        it('should detect dominant language (Chinese) in Chinese-English mix', () => {
            const result = detectLanguage('你好世界这是一个测试文本 Hello 包含一些英文单词');
            // Chinese is dominant, should detect as Chinese
            expect(result.code).toBe('zh');
            expect(result.name).toBe('Chinese');
        });

        it('should handle text with embedded URLs', () => {
            const result = detectLanguage('Check out https://example.com for more information today and tomorrow');
            // Should detect English despite URL
            expect(result.code).toBe('en');
            expect(result.name).toBe('English');
        });

        it('should handle text with embedded email addresses', () => {
            const result = detectLanguage('Please contact me at test@example.com for further details about this matter');
            // Should detect English despite email
            expect(result.code).toBe('en');
            expect(result.name).toBe('English');
        });

        it('should handle text with numbers embedded', () => {
            const result = detectLanguage('The year 2024 was great and 2025 will be even better for everyone');
            // Should detect English despite numbers
            expect(result.code).toBe('en');
            expect(result.name).toBe('English');
        });
    });

    describe('Unsupported Languages - Specific Expectations', () => {
        it('should handle languages not in ISO_639_3_TO_639_1 mapping', () => {
            // Using Esperanto which might not be in our mapping
            const result = detectLanguage('Saluton, kiel vi fartas hodiaŭ? Ĉi tio estas testa teksto en Esperanto.');
            // Should return some code and name (either from SUPPORTED_LANGUAGES or uppercase code)
            expect(result).toHaveProperty('code');
            expect(result).toHaveProperty('name');
            expect(typeof result.code).toBe('string');
            expect(typeof result.name).toBe('string');
            expect(result.code.length).toBeGreaterThan(0);
            expect(result.name.length).toBeGreaterThan(0);
        });

        it('should handle Latin text', () => {
            const result = detectLanguage('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.');
            // franc should detect 'lat' for Latin
            expect(result).toHaveProperty('code');
            expect(result).toHaveProperty('name');
            // If not in supported languages, should return uppercase code as name
            if (result.code === 'lat') {
                expect(result.name).toBe('LAT');
            }
        });
    });

    describe('Return Type Validation - Comprehensive', () => {
        it('should always return valid LanguageInfo for various inputs', () => {
            const testCases = [
                { input: 'Hello world', expectedCode: 'en', expectedName: 'English' },
                { input: '你好世界', expectedCode: 'zh', expectedName: 'Chinese' },
                { input: 'こんにちは', expectedCode: 'ja', expectedName: 'Japanese' },
                { input: '', expectedCode: 'en', expectedName: 'English' },
                { input: '123', expectedCode: 'en', expectedName: 'English' },
                { input: 'a', expectedCode: 'en', expectedName: 'English' },
            ];

            testCases.forEach(({ input, expectedCode, expectedName }) => {
                const result = detectLanguage(input);
                expect(result).toHaveProperty('code');
                expect(result).toHaveProperty('name');
                expect(typeof result.code).toBe('string');
                expect(typeof result.name).toBe('string');
                expect(result.code.length).toBeGreaterThan(0);
                expect(result.name.length).toBeGreaterThan(0);
                expect(result.code).toBe(expectedCode);
                expect(result.name).toBe(expectedName);
            });
        });
    });

    describe('Real-world Scenarios - Specific Expectations', () => {
        it('should detect English paragraph with high accuracy', () => {
            const englishParagraph = `
                The quick brown fox jumps over the lazy dog. 
                This is a longer piece of text to ensure accurate detection.
                Language detection works better with more context and longer sentences.
                We need sufficient text to make sure the detection is reliable and consistent.
            `;
            const result = detectLanguage(englishParagraph);
            expect(result.code).toBe('en');
            expect(result.name).toBe('English');
        });

        it('should detect Chinese paragraph with high accuracy', () => {
            const chineseParagraph = `
                这是一段中文文本。语言检测应该能够准确识别这段文字。
                当有更多的上下文时，检测会更加准确。我们需要更多的文字来确保准确性。
                中文是一种非常美丽的语言，有着悠久的历史和丰富的文化内涵。
            `;
            const result = detectLanguage(chineseParagraph);
            expect(result.code).toBe('zh');
            expect(result.name).toBe('Chinese');
        });

        it('should detect Japanese paragraph with high accuracy', () => {
            const japaneseParagraph = `
                これは日本語のテキストです。言語検出はこのテキストを正確に識別できるはずです。
                より多くのコンテキストがあると、検出がより正確になります。テストのために長い文章が必要です。
                日本語は美しい言語であり、豊かな文化的背景を持っています。
            `;
            const result = detectLanguage(japaneseParagraph);
            expect(result.code).toBe('ja');
            expect(result.name).toBe('Japanese');
        });

        it('should detect Spanish paragraph with high accuracy', () => {
            const spanishParagraph = `
                Este es un texto en español. La detección de idioma debería poder identificar este texto con precisión.
                Cuando hay más contexto, la detección es más precisa. Necesitamos más texto para garantizar la precisión.
                El español es un idioma hermoso con una rica historia cultural.
            `;
            const result = detectLanguage(spanishParagraph);
            expect(result.code).toBe('es');
            expect(result.name).toBe('Spanish');
        });

        it('should detect French paragraph with high accuracy', () => {
            const frenchParagraph = `
                Ceci est un texte en français. La détection de langue devrait pouvoir identifier ce texte avec précision.
                Lorsqu'il y a plus de contexte, la détection est plus précise. Nous avons besoin de plus de texte pour garantir la précision.
                Le français est une belle langue avec une riche histoire culturelle.
            `;
            const result = detectLanguage(frenchParagraph);
            expect(result.code).toBe('fr');
            expect(result.name).toBe('French');
        });
    });

    describe('Consistency Tests - Specific Expectations', () => {
        it('should return consistent results for the same English input', () => {
            const text = 'This is a test sentence in English language for consistency testing';
            const result1 = detectLanguage(text);
            const result2 = detectLanguage(text);
            const result3 = detectLanguage(text);

            expect(result1.code).toBe('en');
            expect(result1.name).toBe('English');
            expect(result2.code).toBe('en');
            expect(result2.name).toBe('English');
            expect(result3.code).toBe('en');
            expect(result3.name).toBe('English');
        });

        it('should return consistent results for the same Chinese input', () => {
            const text = '这是一个中文测试句子，用于一致性测试';
            const result1 = detectLanguage(text);
            const result2 = detectLanguage(text);

            expect(result1.code).toBe('zh');
            expect(result1.name).toBe('Chinese');
            expect(result2.code).toBe('zh');
            expect(result2.name).toBe('Chinese');
        });

        it('should handle case sensitivity - uppercase vs lowercase English', () => {
            const upper = detectLanguage('HELLO WORLD TODAY IS A BEAUTIFUL DAY');
            const lower = detectLanguage('hello world today is a beautiful day');
            const mixed = detectLanguage('Hello World Today Is A Beautiful Day');

            expect(upper.code).toBe('en');
            expect(upper.name).toBe('English');
            expect(lower.code).toBe('en');
            expect(lower.name).toBe('English');
            expect(mixed.code).toBe('en');
            expect(mixed.name).toBe('English');
        });

        it('should handle case sensitivity - uppercase vs lowercase Spanish', () => {
            const upper = detectLanguage('HOLA MUNDO HOY ES UN DÍA HERMOSO');
            const lower = detectLanguage('hola mundo hoy es un día hermoso');

            expect(upper.code).toBe('es');
            expect(upper.name).toBe('Spanish');
            expect(lower.code).toBe('es');
            expect(lower.name).toBe('Spanish');
        });
    });

    describe('Boundary Cases - Minimum Text Length', () => {
        it('should handle text at minLength threshold (3 characters)', () => {
            const result = detectLanguage('The');
            // At minimum length, might default to English
            expect(result).toHaveProperty('code');
            expect(result).toHaveProperty('name');
        });

        it('should handle text slightly above minLength threshold', () => {
            const result = detectLanguage('Hello');
            // Should have enough to detect
            expect(result.code).toBe('en');
            expect(result.name).toBe('English');
        });

        it('should handle medium length text (20-30 characters)', () => {
            const result = detectLanguage('This is a medium text');
            expect(result.code).toBe('en');
            expect(result.name).toBe('English');
        });
    });

    describe('Special Character Handling', () => {
        it('should handle text with punctuation', () => {
            const result = detectLanguage('Hello, world! How are you? I am fine, thank you.');
            expect(result.code).toBe('en');
            expect(result.name).toBe('English');
        });

        it('should handle text with quotes and apostrophes', () => {
            const result = detectLanguage('It\'s a beautiful day, isn\'t it? "Yes," she said.');
            expect(result.code).toBe('en');
            expect(result.name).toBe('English');
        });

        it('should handle text with line breaks', () => {
            const result = detectLanguage('Hello world\nThis is a new line\nAnd another one');
            expect(result.code).toBe('en');
            expect(result.name).toBe('English');
        });

        it('should handle text with tabs', () => {
            const result = detectLanguage('Hello\tworld\tthis\tis\ta\ttest');
            expect(result.code).toBe('en');
            expect(result.name).toBe('English');
        });
    });
});
