/**
 * Infrastructure - Configuration
 * Ollama and translator settings
 */

export interface Config {
  ollama: {
    baseUrl: string;
    model: string;
    timeout: number;
  };
  defaultTargetLang: string;
}

let config: Config = {
  ollama: {
    baseUrl: 'http://localhost:11434',
    model: 'translategemma',
    timeout: 30000,
  },
  defaultTargetLang: 'Chinese',
};

export function getConfig(): Config {
  return config;
}

export function updateConfig(partial: Partial<Config>): void {
  config = {
    ...config,
    ...partial,
    ollama: { ...config.ollama, ...(partial.ollama || {}) },
  };
}
