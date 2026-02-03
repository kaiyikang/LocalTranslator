/**
 * Infrastructure - Configuration
 * Ollama and translator settings
 */

import Store from 'electron-store';

export const AVAILABLE_MODELS = [
  // Basic
  { label: 'TranslateGemma 4B (Latest/Fast)', value: 'translategemma:latest' },
  { label: 'TranslateGemma 12B (Balanced)', value: 'translategemma:12b' },
  { label: 'TranslateGemma 27B (High Quality)', value: 'translategemma:27b' },

  // 4B
  { label: 'TranslateGemma 4B (q4_K_M)', value: 'translategemma:4b-it-q4_K_M' },
  { label: 'TranslateGemma 4B (High Precision q8)', value: 'translategemma:4b-it-q8_0' },
  { label: 'TranslateGemma 4B (Full bf16)', value: 'translategemma:4b-it-bf16' },

  // 12B
  { label: 'TranslateGemma 12B (q4_K_M)', value: 'translategemma:12b-it-q4_K_M' },
  { label: 'TranslateGemma 12B (High Precision q8)', value: 'translategemma:12b-it-q8_0' },
  { label: 'TranslateGemma 12B (Full bf16)', value: 'translategemma:12b-it-bf16' },

  // 27B
  { label: 'TranslateGemma 27B (q4_K_M)', value: 'translategemma:27b-it-q4_K_M' },
  { label: 'TranslateGemma 27B (High Precision q8)', value: 'translategemma:27b-it-q8_0' },
  { label: 'TranslateGemma 27B (Full bf16)', value: 'translategemma:27b-it-bf16' },
];

export interface Config {
  ollama: {
    baseUrl: string;
    model: string;
    timeout: number;
  };
  defaultTargetLang: string;
}

const defaults: Config = {
  ollama: {
    baseUrl: 'http://localhost:11434',
    model: 'translategemma:latest',
    timeout: 30000,
  },
  defaultTargetLang: 'zh',
};

const store = new Store<Config>({
  defaults,
  name: 'config',
  clearInvalidConfig: true,
});

export function getConfig(): Config {
  return store.store;
}

// 函数重载声明
export function updateConfig(partial: Partial<Config>): void;
export function updateConfig(path: string, value: any): void;

// 统一的实现
export function updateConfig(arg: Partial<Config> | string, value?: any): void {
  if (typeof arg === 'string') {
    // 点路径模式: updateConfig('ollama.model', 'new-model')
    store.set(arg as keyof Config, value);
  } else {
    // 部分更新模式: updateConfig({ ollama: { model: 'new-model' } })
    if (arg.ollama) {
      store.set('ollama', {
        ...store.get('ollama'),
        ...arg.ollama,
      });
    }

    if (arg.defaultTargetLang) {
      store.set('defaultTargetLang', arg.defaultTargetLang);
    }
  }
}

/**
 * 重置配置为默认值
 */
export function resetConfig(): void {
  store.clear();
  store.set(defaults);
}

/**
 * 监听配置变更
 * @param callback 配置变化时的回调函数
 * @returns 取消监听的函数
 */
export function onConfigChange(callback: (config: Config) => void): () => void {
  const unsubscribeOllama = store.onDidChange('ollama', () => {
    callback(store.store);
  });

  const unsubscribeLang = store.onDidChange('defaultTargetLang', () => {
    callback(store.store);
  });

  return () => {
    unsubscribeOllama();
    unsubscribeLang();
  };
}
