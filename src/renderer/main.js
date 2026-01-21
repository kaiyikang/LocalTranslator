const statusDot = document.getElementById('status-dot')

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
