import './style.css'

const getFileHandle = async (fileName) => {
  const opfsRoot = await navigator.storage.getDirectory()
  const fileHandle = await opfsRoot.getFileHandle(fileName)
  return fileHandle
}

const getDirHandle = async (dirName) => {
  const opfsRoot = await navigator.storage.getDirectory()
  const dirHandle = await opfsRoot.getDirectoryHandle(dirName)
  return dirHandle
}

const create = async (fileName) => {
  const opfsRoot = await navigator.storage.getDirectory()
  await opfsRoot.getFileHandle(fileName, {
    create: true,
  })
}

const createDir = async (dirName) => {
  const opfsRoot = await navigator.storage.getDirectory()
  await opfsRoot.getDirectoryHandle(dirName, {
    create: true,
  })
}

const read = async (fileName) => {
  const fileHandle = await getFileHandle(fileName)
  const file = await fileHandle.getFile()
  console.log(await file.text())
}

const write = async (fileName) => {
  const fileHandle = await getFileHandle(fileName)
  const contents = 'nus3 text'
  const writable = await fileHandle.createWritable()
  await writable.write(contents)
  await writable.close()
}

const deleteFile = async (fileName) => {
  const fileHandle = await getFileHandle(fileName)
  await fileHandle.remove()
}

const deleteDir = async (dirName) => {
  const dirHandle = await getDirHandle(dirName)
  await dirHandle.remove({ recursive: true })
}

const moveToDir = async (dirName) => {
  const dirHandle = await getDirHandle(dirName)
  const fileHandle = await getFileHandle('nus1')
  await fileHandle.move(dirHandle)
}

const resolvePath = async (fileName) => {
  const opfsRoot = await navigator.storage.getDirectory()
  const fileHandle = await getFileHandle(fileName)
  console.log(await opfsRoot.resolve(fileHandle))
}

const main = () => {
  const mCreate = document.querySelector('#mCreate')
  mCreate.addEventListener('click', async () => {
    create('nus1')
  })

  const mCreateDir = document.querySelector('#mCreateDir')
  mCreateDir.addEventListener('click', async () => {
    createDir('nus1-dir')
  })

  const mRead = document.querySelector('#mRead')
  mRead.addEventListener('click', async () => {
    read('nus1')
  })

  const mWrite = document.querySelector('#mWrite')
  mWrite.addEventListener('click', async () => {
    write('nus1')
  })

  const mDelete = document.querySelector('#mDelete')
  mDelete.addEventListener('click', async () => {
    deleteFile('nus1')
  })

  const mDeleteDir = document.querySelector('#mDeleteDir')
  mDeleteDir.addEventListener('click', async () => {
    deleteDir('nus2-directory')
  })

  const mMove = document.querySelector('#mMove')
  mMove.addEventListener('click', async () => {
    moveToDir('nus1-dir')
  })

  const mResolvePath = document.querySelector('#mResolvePath')
  mResolvePath.addEventListener('click', async () => {
    resolvePath('nus1')
  })

  // TODO: ネストしたファイルの現在位置を表示する
  // TODO: フォルダ一覧を表示する
  // TODO: webworkerを使って同期的にファイル操作する
}

main()
