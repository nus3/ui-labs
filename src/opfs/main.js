import './style.css'
import { createList, list, registerEvent, getValues } from './main-thread'

const main = async () => {
  const entries = await list()
  const ul = createList(entries)
  document.querySelector('#mListWrapper')?.appendChild(ul)
  registerEvent()

  document.querySelector('#webWorker')?.addEventListener('click', () => {
    const worker = new Worker('worker.js')
    worker.onmessage = (e) => {
      alert(e.data)
    }

    worker.postMessage(getValues())
  })

  // TODO: opgsのファイルをコピーしてダウンロードできるように
}

main()
