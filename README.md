# LocalTranslator

A simple, modular translator using Ollama for local translation.

## Project Structure

```
src/
├── config.ts          # Configuration module (Ollama settings)
├── client.ts          # Ollama client (sends prompts, returns text)
├── languageDetector.ts # Language auto-detection
├── prompt.ts          # Prompt template builder
├── translator.ts      # Main translator logic
├── index.ts           # Entry point (exports all modules)
└── example.ts         # Usage examples
```

## Installation

```bash
npm install
npm run build
```

## Requirements

- Node.js 18+
- Ollama running locally
- translategemma model: `ollama run translategemma`

## Usage

### Basic Translation

```typescript
import { Translator } from "local-translator";

const translator = new Translator();

// Translate with auto language detection
const result = await translator.translate("Hello, world!", {
  targetLang: "Chinese",
});

console.log(result.translated);
```

### Quick Translate

```typescript
const translated = await translator.quickTranslate("Good morning!", "Chinese");
```

### Language Detection

```typescript
import { detectLanguage } from "local-translator";

const lang = detectLanguage("你好");
console.log(lang); // { code: 'zh', name: 'Chinese' }
```

### Custom Configuration

```typescript
import { Translator, updateConfig } from "local-translator";

// Update global config
updateConfig({
  ollama: {
    baseUrl: "http://localhost:11434",
    model: "translategemma",
    timeout: 60000,
  },
  defaultTargetLang: "English",
});

// Or create with custom config
const translator = new Translator({
  defaultTargetLang: "Japanese",
});
```

## Modules

| Module                | Description                        |
| --------------------- | ---------------------------------- |
| `config.ts`           | Ollama configuration with defaults |
| `client.ts`           | HTTP client for Ollama API         |
| `languageDetector.ts` | Unicode-based language detection   |
| `prompt.ts`           | Translation prompt template        |
| `translator.ts`       | Main translation orchestrator      |

## License

MIT
