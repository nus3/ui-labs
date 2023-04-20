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

const moveToDir = async (dirName, fileName) => {
  const dirHandle = await getDirHandle(dirName)
  const fileHandle = await getFileHandle(fileName)
  await fileHandle.move(dirHandle)
}

const resolvePath = async (dirName, fileName) => {
  const opfsRoot = await navigator.storage.getDirectory()
  const dirHandle = await getDirHandle(dirName)
  const fileHandle = await dirHandle.getFileHandle(fileName)
  console.log(await opfsRoot.resolve(fileHandle))
}

const getDirectoryEntriesRecursive = async (
  directoryHandle,
  relativePath = '.',
) => {
  const entries = {}
  const directoryIterator = directoryHandle.values()
  const directoryEntryPromises = []

  for await (const handle of directoryIterator) {
    const nestedPath = `${relativePath}/${handle.name}`
    if (handle.kind === 'file') {
      directoryEntryPromises.push(handle)
    } else if (handle.kind === 'directory') {
      directoryEntryPromises.push(
        (async () => {
          return {
            name: handle.name,
            kind: handle.kind,
            relativePath: nestedPath,
            entries: await getDirectoryEntriesRecursive(handle, nestedPath),
            handle,
          }
        })(),
      )
    }
  }
  const directoryEntries = await Promise.all(directoryEntryPromises)
  directoryEntries.forEach((directoryEntry) => {
    entries[directoryEntry.name] = directoryEntry
  })
  return entries
}

const createList = (entries) => {
  const ul = document.createElement('ul')

  for (let key in entries) {
    const entry = entries[key]
    const li = document.createElement('li')
    const label = entry.kind === 'directory' ? `dir: ${entry.name}` : entry.name
    li.innerText = label
    if (entry.kind === 'directory' && entry.entries) {
      li.appendChild(createList(entry.entries))
    }
    ul.appendChild(li)
  }

  return ul
}

const list = async () => {
  const opfsRoot = await navigator.storage.getDirectory()
  const entries = await getDirectoryEntriesRecursive(opfsRoot)
  console.log(entries)
  return entries
}

const main = async () => {
  const entries = await list()
  const ul = createList(entries)
  document.querySelector('#mListWrapper')?.appendChild(ul)

  const mCreate = document.querySelector('#mCreate')
  mCreate.addEventListener('click', () => {
    create('nus3-1')
  })

  const mCreateDir = document.querySelector('#mCreateDir')
  mCreateDir.addEventListener('click', () => {
    createDir('nus3-dir')
  })

  const mRead = document.querySelector('#mRead')
  mRead.addEventListener('click', () => {
    read('nus1')
  })

  const mWrite = document.querySelector('#mWrite')
  mWrite.addEventListener('click', () => {
    write('nus1')
  })

  const mDelete = document.querySelector('#mDelete')
  mDelete.addEventListener('click', () => {
    deleteFile('nus1')
  })

  const mDeleteDir = document.querySelector('#mDeleteDir')
  mDeleteDir.addEventListener('click', () => {
    deleteDir('nus2-directory')
  })

  const mMove = document.querySelector('#mMove')
  mMove.addEventListener('click', () => {
    moveToDir('nus3-dir', 'nus3-1')
  })

  const mResolvePath = document.querySelector('#mResolvePath')
  mResolvePath.addEventListener('click', () => {
    resolvePath('nus1-dir', 'nus1')
  })

  const mList = document.querySelector('#mList')
  mList.addEventListener('click', () => {
    list()
  })

  // TODO: webworkerを使って同期的にファイル操作する
}

main()
