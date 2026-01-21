// ============================================
// DOM Elements
// ============================================
const $ = (id) => document.getElementById(id)

const elements = {
  statusDot: $('status-dot'),
  inputText: $('input-text'),
  outputText: $('output-text'),
  sourceLang: $('source-lang'),
  targetLang: $('target-lang'),
  copyBtn: $('copy-btn')
}

// ============================================
// Ollama Status
// ============================================
async function updateOllamaStatus() {
  const isConnected = await window.api.checkOllamaStatus()
  elements.statusDot.classList.toggle('connected', isConnected)
}

updateOllamaStatus()
setInterval(updateOllamaStatus, 5000)

// ============================================
// Translation
// ============================================
let debounceTimer = null

async function translate() {
  const text = elements.inputText.value.trim()
  if (!text) {
    elements.outputText.value = ''
    return
  }

  try {
    const result = await window.api.translateText(
      text,
      elements.sourceLang.value,
      elements.targetLang.value
    )
    elements.outputText.value = result.translated
  } catch (error) {
    elements.outputText.value = 'Translation failed: ' + error.message
  }
}

elements.inputText.addEventListener('input', () => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(translate, 500)
})

elements.targetLang.addEventListener('change', translate)

// ============================================
// Clipboard
// ============================================
elements.copyBtn.addEventListener('click', () => {
  const text = elements.outputText.value
  if (text) window.api.copyToClipboard(text)
})
