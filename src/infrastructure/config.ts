/**
 * Infrastructure - Configuration
 * Ollama and translator settings
 */

import Store from 'electron-store';

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
    model: 'translategemma',
    timeout: 30000,
  },
  defaultTargetLang: 'Chinese',
};

const store = new Store<Config>({ defaults });

export function getConfig(): Config {
  return store.store;
}

export function updateConfig(partial: Partial<Config>): void {
  if (partial.ollama) {
    store.set('ollama', {
      ...store.get('ollama'),
      ...partial.ollama,
    });
  }

  if (partial.defaultTargetLang) {
    store.set('defaultTargetLang', partial.defaultTargetLang);
  }

}