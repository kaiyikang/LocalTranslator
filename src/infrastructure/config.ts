/**
 * Infrastructure - Configuration
 * Ollama and translator settings
 */

import Store from "electron-store";

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
    baseUrl: "http://localhost:11434",
    model: "translategemma",
    timeout: 30000,
  },
  defaultTargetLang: "Chinese",
};

const store = new Store<Config>({
  defaults,
  name: "config",
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
  if (typeof arg === "string") {
    // 点路径模式: updateConfig('ollama.model', 'new-model')
    store.set(arg as keyof Config, value);
  } else {
    // 部分更新模式: updateConfig({ ollama: { model: 'new-model' } })
    if (arg.ollama) {
      store.set("ollama", {
        ...store.get("ollama"),
        ...arg.ollama,
      });
    }

    if (arg.defaultTargetLang) {
      store.set("defaultTargetLang", arg.defaultTargetLang);
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
  const unsubscribeOllama = store.onDidChange("ollama", () => {
    callback(store.store);
  });
  
  const unsubscribeLang = store.onDidChange("defaultTargetLang", () => {
    callback(store.store);
  });

  return () => {
    unsubscribeOllama();
    unsubscribeLang();
  };
}
