onmessage = async (e) => {
  const { fileName, text } = e.data
  if (!fileName || !text) {
    postMessage('File name or Text is empty!')
    return
  }

  const opfsRoot = await navigator.storage.getDirectory()
  const fileHandle = await opfsRoot.getFileHandle(fileName, { create: true })
  const accessHandle = await fileHandle.createSyncAccessHandle()

  const textEncoder = new TextEncoder()
  const textDecoder = new TextDecoder()

  let size
  size = accessHandle.getSize()
  const content = textEncoder.encode(`${text}\n`)
  accessHandle.write(content, { at: size })
  accessHandle.flush()

  size = accessHandle.getSize()
  const dataView = new DataView(new ArrayBuffer(size))
  accessHandle.read(dataView, { at: 0 })
  console.info(textDecoder.decode(dataView))

  accessHandle.close()
}
