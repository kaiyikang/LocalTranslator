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
// Language Initialization
// ============================================
async function initLanguages() {
  const languages = await window.api.getLanguages()

  languages.forEach(lang => {
    // Add to source language (after "Detect Language")
    const sourceOption = document.createElement('option')
    sourceOption.value = lang.code
    sourceOption.textContent = lang.name
    elements.sourceLang.appendChild(sourceOption)

    // Add to target language
    const targetOption = document.createElement('option')
    targetOption.value = lang.code
    targetOption.textContent = lang.name
    elements.targetLang.appendChild(targetOption)
  })

  // Default target language to English
  elements.targetLang.value = 'en'
}

initLanguages()

// ============================================
// Text Processing (Translate / Rewrite)
// ============================================
let debounceTimer = null

async function process() {
  const text = elements.inputText.value.trim()
  if (!text) {
    elements.outputText.value = ''
    elements.outputText.classList.remove('loading')
    return
  }

  // Show loading state
  elements.outputText.value = ''
  elements.outputText.classList.add('loading')
  elements.outputText.placeholder = 'Processing...'

  try {
    const { result } = await window.api.processText(
      text,
      elements.sourceLang.value,
      elements.targetLang.value
    )
    elements.outputText.value = result
  } catch (error) {
    elements.outputText.value = 'Failed: ' + error.message
  } finally {
    // Remove loading state
    elements.outputText.classList.remove('loading')
    elements.outputText.placeholder = 'Translation...'
  }
}

elements.inputText.addEventListener('input', () => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(process, 500)
})

elements.targetLang.addEventListener('change', process)

// ============================================
// Clipboard
// ============================================
elements.copyBtn.addEventListener('click', () => {
  const text = elements.outputText.value
  if (!text) return

  window.api.copyToClipboard(text)

  // Show "Copied!" feedback
  const originalText = elements.copyBtn.textContent
  elements.copyBtn.textContent = 'Copied!'
  elements.copyBtn.classList.add('copied')

  setTimeout(() => {
    elements.copyBtn.textContent = originalText
    elements.copyBtn.classList.remove('copied')
  }, 1000)
})
