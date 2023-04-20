import './style.css'
import { createList, list, registerEvent } from './main-thread'

const main = async () => {
  const entries = await list()
  const ul = createList(entries)
  document.querySelector('#mListWrapper')?.appendChild(ul)

  registerEvent()

  // TODO: webworkerを使って同期的にファイル操作する
}

main()
