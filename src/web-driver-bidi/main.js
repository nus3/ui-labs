import './style.css'
import { EventEmitter } from "./event-emitter";

let socket = null
let requestId = 1
// TODO: なんでeventEmitterを使ったら動くのか調べるところから
const eventEmitter = new EventEmitter()

function addLog(log) {
  const p = document.createElement('p')
  p.textContent = log
  document.querySelector('#result').appendChild(p)
}

function reset() {
  if (socket) {
    socket.close()
    socket = null
  }
  document.querySelector('#result').textContent = ''
}

function formatMessage(msg) {
  const obj = JSON.parse(msg)
  return JSON.stringify(obj, null, 2)
}

function onMessage (e) {
  console.log('Message received from server:', e)
  eventEmitter.emit('websocket-message', JSON.parse(e.data))
  // addLog(`Message received from server: ${formatMessage(e.data)}`)
}

function connect() {
  reset()

  const input = document.querySelector('input[name="url"]')
  let url = ''
  if (input.value.includes('/session')) {
    url = `ws://${input.value}`
  } else {
    url = `ws://${input.value}/session`
  }
  socket = new WebSocket(url)

  socket.onopen = (e) => {
    console.log('WebSocket connection opened')
    // addLog('WebSocket connection opened')
  }
  socket.onmessage = onMessage
  socket.onclose = (e) => {
    console.log('WebSocket connection closed')
    // addLog('WebSocket connection closed')
  }
}

const btn = document.querySelector('#connect')
btn.addEventListener('click', connect)

function sendMessage(msg) {
  if (!socket) return null

  const id = requestId++
  msg.id = id
  console.log(`Message sent to server:`, msg)
  // addLog(`Message sent to server: ${formatMessage(msg)}`)
  socket.send(JSON.stringify(msg))
  return id
}

// リモートエンドにコマンドを送り、帰ってきたIDをみて、同一のIDの場合にresolveする
function sendCommand(method, params) {
  const id = sendMessage({ method, params })

  return new Promise((resolve) => {
    const listener = (eventName, data) => {
      if (data.id === id) {
        eventEmitter.off('websocket-message', listener)
        // socket.removeEventListener('message', listener)
        resolve(data)
      }
    }
    eventEmitter.on('websocket-message', listener)
    // socket.addEventListener('message', listener)
  })
}

const navigateBtn = document.querySelector('#navigate')
navigateBtn.addEventListener('click', async () => {
  await sendCommand("session.new", { capabilities: {} });

  const res = await sendCommand("browsingContext.getTree", {}, {});
  console.log('browsingContext.getTree', res);

  const context = res.result.contexts[0].context;
  await sendCommand("browsingContext.navigate", {
    context,
    url: "https://example.com",
    wait: "complete"
  });
})
