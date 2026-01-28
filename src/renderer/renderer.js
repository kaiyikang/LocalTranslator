// ============================================
// DOM Elements
// ============================================
const $ = (id) => document.getElementById(id);

const elements = {
  statusDot: $('status-dot'),
  inputText: $('input-text'),
  outputText: $('output-text'),
  sourceLang: $('source-lang'),
  targetLang: $('target-lang'),
  copyBtn: $('copy-btn'),
  autoDetect: $('auto-detect'),
  settingsBtn: $('settings-btn'),
};

// ============================================
// Ollama Status
// ============================================
async function updateOllamaStatus() {
  const isConnected = await window.api.checkOllamaStatus();
  elements.statusDot.classList.toggle('connected', isConnected);
}

updateOllamaStatus();
setInterval(updateOllamaStatus, 5000);

// ============================================
// Language Initialization
// ============================================
let allLanguages = [];

async function initLanguages() {
  // 获取语言列表
  const languages = await window.api.getLanguages();
  allLanguages = languages;

  // Initialize source language options based on auto-detect state
  updateSourceLangOptions();

  // Add to target language
  languages.forEach((lang) => {
    const targetOption = document.createElement('option');
    targetOption.value = lang.code;
    targetOption.textContent = lang.name;
    elements.targetLang.appendChild(targetOption);
  });

  // Set default target language from config
  const config = await window.api.getConfig();
  elements.targetLang.value = config.defaultTargetLang || 'en';
}

function updateSourceLangOptions() {
  const isAutoDetect = elements.autoDetect.checked;

  // Clear existing options
  elements.sourceLang.innerHTML = '';

  if (isAutoDetect) {
    // Auto detect mode: show "Detect Language" and disable select
    const autoOption = document.createElement('option');
    autoOption.value = 'auto';
    autoOption.textContent = 'Detect Language';
    elements.sourceLang.appendChild(autoOption);
    elements.sourceLang.disabled = true;
  } else {
    // Manual mode: show all languages without auto option
    allLanguages.forEach((lang) => {
      const option = document.createElement('option');
      option.value = lang.code;
      option.textContent = lang.name;
      elements.sourceLang.appendChild(option);
    });
    elements.sourceLang.disabled = false;

    // Set a default value if available
    if (allLanguages.length > 0) {
      elements.sourceLang.value = allLanguages[0].code;
    }
  }
}

// Listen to auto-detect toggle changes
elements.autoDetect.addEventListener('change', () => {
  updateSourceLangOptions();
  // Re-process text with new settings
  process();
});

initLanguages();

// ============================================
// Text Processing (Translate / Rewrite)
// ============================================
let debounceTimer = null;

async function process() {
  const text = elements.inputText.value.trim();
  if (!text) {
    elements.outputText.value = '';
    elements.outputText.classList.remove('loading');
    // Reset detected language display
    if (elements.autoDetect.checked) {
      updateDetectedLanguageDisplay(null);
    }
    return;
  }

  // Detect language in auto mode before processing
  if (elements.autoDetect.checked) {
    try {
      const detectedLang = await window.api.detectLanguage(text);
      updateDetectedLanguageDisplay(detectedLang);
    } catch (error) {
      console.error('Language detection failed:', error);
    }
  }

  // Show loading state
  elements.outputText.value = '';
  elements.outputText.classList.add('loading');
  elements.outputText.placeholder = 'Processing...';

  try {
    const { result } = await window.api.processText(
      text,
      elements.sourceLang.value,
      elements.targetLang.value,
    );
    elements.outputText.value = result;
    window.api.focusWindow();
  } catch (error) {
    elements.outputText.value = 'Failed: ' + error.message;
  } finally {
    // Remove loading state
    elements.outputText.classList.remove('loading');
    elements.outputText.placeholder = 'Translation...';
  }
}

function updateDetectedLanguageDisplay(detectedLanguage) {
  if (!elements.autoDetect.checked) return;

  const autoOption = elements.sourceLang.querySelector('option[value="auto"]');
  if (!autoOption) return;

  if (!detectedLanguage) {
    autoOption.textContent = 'Detect Language';
  } else {
    // Display the detected language from backend API
    autoOption.textContent = `Detected: ${detectedLanguage.name}`;
  }
}

elements.inputText.addEventListener('input', () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(process, 500);
});

elements.sourceLang.addEventListener('change', process);
elements.targetLang.addEventListener('change', process);

// ============================================
// Clipboard
// ============================================
elements.copyBtn.addEventListener('click', () => {
  const text = elements.outputText.value;
  if (!text) return;

  window.api.copyToClipboard(text);

  // Show "Copied!" feedback
  const originalText = elements.copyBtn.textContent;
  elements.copyBtn.textContent = 'Copied!';
  elements.copyBtn.classList.add('copied');

  setTimeout(() => {
    elements.copyBtn.textContent = originalText;
    elements.copyBtn.classList.remove('copied');
  }, 1000);
});

// ============================================
// Clipboard - Global Shortcut: Double Ctrl+C to paste clipboard to input
// ============================================
window.api.onClipboardPaste((text) => {
  elements.inputText.value = text;
  process();
});

// ============================================
// Settings Button
// ============================================
elements.settingsBtn.addEventListener('click', () => {
  window.api.openSettings();
});
