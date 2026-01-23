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

- **Ollama** running locally with the `translategemma` model
  ```bash
  ollama run translategemma
  ```

## Installation

### Option 1: Download macOS App (Recommended)

1. Download the latest release:
   - `LocalTranslator-x.x.x-arm64.dmg` (for Apple Silicon)
   - Or `LocalTranslator-x.x.x-arm64-mac.zip`

2. Open the DMG file and drag **LocalTranslator** to your Applications folder

3. **⚠️ First-time usage**: macOS will block the app since it's not signed
   - Right-click the app → select **"Open"**
   - Click **"Open"** in the confirmation dialog
   
   Or use Terminal:
   ```bash
   xattr -cr /Applications/LocalTranslator.app
   open /Applications/LocalTranslator.app
   ```

### Option 2: Build from Source

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build macOS app
npm run build:mac
# The app will be in dist/LocalTranslator-x.x.x-arm64.dmg
```

## Features

- 🌍 **Auto Language Detection**: Automatically detects source language
- ⚡ **Quick Paste**: Press `Command+D` to paste clipboard content and translate
- 🪟 **Auto Focus**: Window automatically comes to front after translation
- 🔄 **Real-time Translation**: Translates as you type (with debounce)
- 📋 **One-click Copy**: Copy translation results to clipboard

## Development

```bash
npm run dev     # Start with hot reload
npm run build   # Build for production
npm start       # Preview production build
npm run build:mac  # Package as macOS app
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
