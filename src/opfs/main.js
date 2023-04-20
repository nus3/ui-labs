import './style.css'
import { createList, list, registerEvent, getValues } from './main-thread'
import MyWorker from './worker?worker'

const main = async () => {
  const entries = await list()
  const ul = createList(entries)
  document.querySelector('#mListWrapper')?.appendChild(ul)
  registerEvent()

  document.querySelector('#webWorker')?.addEventListener('click', () => {
    const worker = new MyWorker()
    worker.onmessage = (e) => {
      alert(e.data)
    }

    worker.postMessage(getValues())
  })

  // TODO: opgsのファイルをコピーしてダウンロードできるように
}

main()
