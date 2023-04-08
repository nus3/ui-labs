let startTime = 0
let elapsedTime = 0
let timerInterval: number | null = null

const formatTime = (time: number) => {
  const date = new Date(time)
  const hours = date.getUTCHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')
  const milliseconds = date.getMilliseconds().toString().padStart(3, '0')
  return hours + ':' + minutes + ':' + seconds + '.' + milliseconds
}

const start = (target: Element | null) => {
  if (!target) return
  if (timerInterval) return

  startTime = Date.now() - elapsedTime
  timerInterval = window.setInterval(function printTime() {
    elapsedTime = Date.now() - startTime
    target.innerHTML = formatTime(elapsedTime)
  }, 10)
}

const stop = () => {
  if (!timerInterval) return
  window.clearInterval(timerInterval)
  timerInterval = null
}

const reset = (target: Element | null) => {
  if (!target) return

  stop()
  elapsedTime = 0
  target.innerHTML = formatTime(elapsedTime)
}

export { start, stop, reset }
