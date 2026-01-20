/**
 * Configuration Module
 * Default configuration for Ollama translator
 */

export interface OllamaConfig {
  baseUrl: string;
  model: string;
  timeout: number;
}

export interface TranslatorConfig {
  ollama: OllamaConfig;
  defaultSourceLang: string;
  defaultTargetLang: string;
}

// Default configuration
const defaultConfig: TranslatorConfig = {
  ollama: {
    baseUrl: 'http://localhost:11434',
    model: 'translategemma',
    timeout: 30000,
  },
  defaultSourceLang: 'auto',
  defaultTargetLang: 'Chinese',
};

let currentConfig: TranslatorConfig = { ...defaultConfig };

/**
 * Get current configuration
 */
export function getConfig(): TranslatorConfig {
  return { ...currentConfig };
}

/**
 * Update configuration with partial values
 */
export function updateConfig(partial: Partial<TranslatorConfig>): TranslatorConfig {
  currentConfig = {
    ...currentConfig,
    ...partial,
    ollama: {
      ...currentConfig.ollama,
      ...(partial.ollama || {}),
    },
  };
  return getConfig();
}

/**
 * Reset configuration to default
 */
export function resetConfig(): TranslatorConfig {
  currentConfig = { ...defaultConfig };
  return getConfig();
}
