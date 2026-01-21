# LocalTranslator

A simple, modular translator using Ollama for local translation. Built with **Electron** and **electron-vite** for hot reload development.

## Project Structure

```
src/
├── main/               # Electron main process
│   └── index.ts
├── preload/            # Preload scripts
│   └── index.ts
├── renderer/           # UI (HTML/CSS/JS)
│   └── index.html
├── core/               # Core domain logic
│   ├── languages.ts    # Supported languages
│   └── prompt.ts       # Prompt templates
├── usecase/            # Application use cases
│   ├── translateUseCase.ts
│   └── checkStatus.ts
└── infrastructure/     # External services
    ├── config.ts       # Ollama configuration
    ├── ollamaClient.ts # Ollama API client
    └── languageDetector.ts
```

## Requirements

- Node.js 20.19+ or 22.12+
- Ollama running locally
- translategemma model: `ollama run translategemma`

## Installation

```bash
npm install
```

## Development

```bash
npm run dev     # Start with hot reload
```

## Build

```bash
npm run build   # Build for production
npm start       # Preview production build
```

## Usage

### Basic Translation

```typescript
import { translateText } from "local-translator";

const result = await translateText({
  text: "Hello, world!",
  targetLang: "Chinese",
});

console.log(result.translated);
```

### Language Detection

```typescript
import { detectLanguage } from "local-translator";

const lang = detectLanguage("你好");
console.log(lang); // { code: 'zh', name: 'Chinese' }
```

## Path Aliases

This project uses path aliases for clean imports:

- `@core/*` → `src/core/*`
- `@usecase/*` → `src/usecase/*`
- `@infrastructure/*` → `src/infrastructure/*`

## License

MIT
