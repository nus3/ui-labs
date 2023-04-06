import './style.css'

const button = document.querySelector('#pipButton')

button?.addEventListener('click', async () => {
  const player = document.querySelector('#timerWrapper')

  // Open a Picture-in-Picture window.
  // @ts-ignore
  const pipWindow = await documentPictureInPicture.requestWindow({
    copyStyleSheets: true,
  })

  // Move the player to the Picture-in-Picture window.
  pipWindow.document.body.append(player)

  // @ts-ignore
  pipWindow.addEventListener('unload', (event) => {
    const playerContainer = document.querySelector('#pipContainer')
    const pipPlayer = event.target.querySelector('#timerWrapper')
    pipPlayer.style.display = 'none'
    playerContainer?.append(pipPlayer)
  })
})

// @ts-ignore
documentPictureInPicture.addEventListener('enter', (event) => {
  const player = document.querySelector('#timerWrapper')
  player?.removeAttribute('style')

  // この中だとdocumentPictureInPicture.windowの中だと判定されてる
  const startBtn = document.getElementById('start')
  startBtn?.addEventListener('click', start)
  const stopBtn = document.getElementById('stop')
  stopBtn?.addEventListener('click', stop)
  const resetBtn = document.getElementById('reset')
  resetBtn?.addEventListener('click', reset)

  console.log('pipが開かれたよ')
})

let startTime = 0
let elapsedTime = 0
let timerInterval: ReturnType<typeof setInterval>

const formatTime = (time: number) => {
  const date = new Date(time)
  const hours = date.getUTCHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')
  const milliseconds = date.getMilliseconds().toString().padStart(3, '0')
  return hours + ':' + minutes + ':' + seconds + '.' + milliseconds
}

const start = () => {
  startTime = Date.now() - elapsedTime
  timerInterval = setInterval(function printTime() {
    elapsedTime = Date.now() - startTime
    // @ts-ignore
    const time = documentPictureInPicture.window.document.getElementById('time')
    if (time) {
      time.innerHTML = formatTime(elapsedTime)
    }
  }, 10)
}

const stop = () => {
  window.clearInterval(timerInterval)
}

const reset = () => {
  stop()
  elapsedTime = 0
  // @ts-ignore
  const time = documentPictureInPicture.window.document.getElementById('time')
  if (time) {
    time.innerHTML = formatTime(elapsedTime)
  }
}
