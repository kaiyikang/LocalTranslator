// Settings page logic

// Default configuration
const defaultConfig = {
  ollama: {
    baseUrl: 'http://localhost:11434',
    model: 'translategemma',
    timeout: 30000,
  },
  defaultTargetLang: 'Chinese',
};

// DOM Elements
const elements = {
  ollamaBaseUrl: document.getElementById('ollama-baseurl'),
  ollamaModel: document.getElementById('ollama-model'),
  ollamaTimeout: document.getElementById('ollama-timeout'),
  defaultTargetLang: document.getElementById('default-target-lang'),
  saveBtn: document.getElementById('save-btn'),
  cancelBtn: document.getElementById('cancel-btn'),
  resetBtn: document.getElementById('reset-btn'),
  testBtn: document.getElementById('test-btn'),
  testStatus: document.getElementById('test-status'),
};

// Load configuration from main process
async function loadConfig() {
  try {
    const config = await window.api.getConfig();

    if (config) {
      elements.ollamaBaseUrl.value = config.ollama?.baseUrl || defaultConfig.ollama.baseUrl;
      elements.ollamaModel.value = config.ollama?.model || defaultConfig.ollama.model;
      elements.ollamaTimeout.value = config.ollama?.timeout || defaultConfig.ollama.timeout;
      elements.defaultTargetLang.value = config.defaultTargetLang || defaultConfig.defaultTargetLang;
    }
  } catch (error) {
    console.error('Failed to load config:', error);
  }
}

// Save configuration to main process
async function saveConfig() {
  try {
    const config = {
      ollama: {
        baseUrl: elements.ollamaBaseUrl.value.trim() || defaultConfig.ollama.baseUrl,
        model: elements.ollamaModel.value.trim() || defaultConfig.ollama.model,
        timeout: parseInt(elements.ollamaTimeout.value) || defaultConfig.ollama.timeout,
      },
      defaultTargetLang: elements.defaultTargetLang.value,
    };

    await window.api.updateConfig(config);
    closeWindow();
  } catch (error) {
    console.error('Failed to save config:', error);
  }
}

// Reset configuration to defaults
async function resetConfig() {
  if (!confirm('Are you sure you want to reset all settings to defaults?')) {
    return;
  }

  try {
    await window.api.resetConfig();

    elements.ollamaBaseUrl.value = defaultConfig.ollama.baseUrl;
    elements.ollamaModel.value = defaultConfig.ollama.model;
    elements.ollamaTimeout.value = defaultConfig.ollama.timeout;
    elements.defaultTargetLang.value = defaultConfig.defaultTargetLang;
  } catch (error) {
    console.error('Failed to reset config:', error);
  }
}

// Test Ollama connection
async function testConnection() {
  elements.testBtn.disabled = true;
  elements.testStatus.textContent = 'Testing...';
  elements.testStatus.className = 'test-status loading';

  try {
    const isConnected = await window.api.checkOllamaStatus();

    if (isConnected) {
      elements.testStatus.textContent = 'Connected successfully!';
      elements.testStatus.className = 'test-status success';
    } else {
      elements.testStatus.textContent = 'Connection failed';
      elements.testStatus.className = 'test-status error';
    }
  } catch (error) {
    elements.testStatus.textContent = 'Connection error';
    elements.testStatus.className = 'test-status error';
  } finally {
    elements.testBtn.disabled = false;
  }
}

// Close settings window
function closeWindow() {
  window.api.closeSettings();
}

// Event listeners
elements.saveBtn.addEventListener('click', saveConfig);
elements.cancelBtn.addEventListener('click', closeWindow);
elements.resetBtn.addEventListener('click', resetConfig);
elements.testBtn.addEventListener('click', testConnection);

// Initialize
document.addEventListener('DOMContentLoaded', loadConfig);
