import './style.css'
import { start, stop, reset } from './timer'

declare const documentPictureInPicture: {
  requestWindow: (options: { copyStyleSheets: boolean }) => Promise<Window>
  addEventListener: Window['addEventListener']
  window: Window
}

const main = () => {
  const button = document.querySelector('#pipButton')
  if (!(button instanceof HTMLButtonElement)) return

  button.addEventListener('click', async () => {
    const player = document.querySelector('#timerWrapper')
    if (!player) return

    const pipWindow = await documentPictureInPicture.requestWindow({
      copyStyleSheets: true,
    })

    pipWindow.document.body.append(player)

    player.removeAttribute('style')
    button.disabled = true

    const time = pipWindow.document.getElementById('time')
    const handleStart = () => {
      start(time)
    }
    const handleStop = () => {
      stop()
    }
    const handleReset = () => {
      reset(time)
    }

    const startBtn = pipWindow.document.getElementById('start')
    const stopBtn = pipWindow.document.getElementById('stop')
    const resetBtn = pipWindow.document.getElementById('reset')
    startBtn?.addEventListener('click', handleStart)
    stopBtn?.addEventListener('click', handleStop)
    resetBtn?.addEventListener('click', handleReset)

    pipWindow.addEventListener('unload', (event) => {
      startBtn?.removeEventListener('click', handleStart)
      stopBtn?.removeEventListener('click', handleStop)
      resetBtn?.removeEventListener('click', handleReset)

      const playerContainer = document.querySelector('#pipContainer')
      const target = event.target as Document
      const pipPlayer = target.querySelector('#timerWrapper') as HTMLDivElement
      pipPlayer.style.display = 'none'
      playerContainer?.append(pipPlayer)
      button.disabled = false
    })
  })
}

main()
