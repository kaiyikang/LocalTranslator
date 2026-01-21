const statusDot = document.getElementById('status-dot')
const inputText = document.getElementById('input-text')
const outputText = document.getElementById('output-text')
const sourceLang = document.getElementById('source-lang')
const targetLang = document.getElementById('target-lang')

async function updateStatus() {
  const isConnected = await window.api.checkOllamaStatus()
  
  if (isConnected) {
    statusDot.classList.add('connected')
  } else {
    statusDot.classList.remove('connected')
  }
}

// 立即运行一次
updateStatus()

// 每 5 秒轮询一次
setInterval(updateStatus, 5000)

// Copy 按钮逻辑
document.getElementById('copy-btn').addEventListener('click', () => {
  const output = document.getElementById('output-text')
  output.select()
  document.execCommand('copy')
})

// 翻译逻辑 (防抖)
let debounceTimer = null

async function doTranslate() {
  const text = inputText.value.trim()
  if (!text) {
    outputText.value = ''
    return
  }
  
  try {
    const result = await window.api.translateText(
      text,
      sourceLang.value,
      targetLang.value
    )
    outputText.value = result.translated
  } catch (error) {
    outputText.value = 'Translation failed: ' + error.message
  }
}

inputText.addEventListener('input', () => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(doTranslate, 500)
})

// 目标语言改变时重新翻译
targetLang.addEventListener('change', doTranslate)
