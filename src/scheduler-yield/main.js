import './style.css'

const MAX_TASK_COUNT = 10
let taskCount = 0
let intervalId = null

function yieldToMain() {
  return new Promise((resolve) => {
    setTimeout(resolve, 0)
  })
}

function logTask(msg) {
  const output = document.querySelector('#wrapper')
  output.innerHTML += `<p>${msg}</p>`
  taskCount++
}

function clearLog() {
  const output = document.querySelector('#wrapper')
  output.innerHTML = ''
  taskCount = 0
}

function blockingTask(ms = 200) {
  let arr = []
  const blockingStart = performance.now()

  console.log(`Synthetic task running for ${ms} ms`)

  while (performance.now() < blockingStart + ms) {
    arr.push((Math.random() * performance.now) / blockingStart / ms)
  }
}

function validateForm(ms = 100) {
  logTask('Processing validateForm')
  let arr = []
  const blockingStart = performance.now()
  while (performance.now() < blockingStart + ms) {
    arr.push((Math.random() * performance.now) / blockingStart / ms)
  }
}
function showSpinner(ms = 100) {
  logTask('Processing showSpinner')
  let arr = []
  const blockingStart = performance.now()
  while (performance.now() < blockingStart + ms) {
    arr.push((Math.random() * performance.now) / blockingStart / ms)
  }
}
function saveToDatabase(ms = 100) {
  logTask('Processing saveToDatabase')
  let arr = []
  const blockingStart = performance.now()
  while (performance.now() < blockingStart + ms) {
    arr.push((Math.random() * performance.now) / blockingStart / ms)
  }
}
function updateUI(ms = 100) {
  logTask('Processing updateUI')
  let arr = []
  const blockingStart = performance.now()
  while (performance.now() < blockingStart + ms) {
    arr.push((Math.random() * performance.now) / blockingStart / ms)
  }
}
function sendAnalytics(ms = 100) {
  logTask('Processing sendAnalytics')
  let arr = []
  const blockingStart = performance.now()
  while (performance.now() < blockingStart + ms) {
    arr.push((Math.random() * performance.now) / blockingStart / ms)
  }
}

const tasks = [
  validateForm,
  showSpinner,
  saveToDatabase,
  updateUI,
  sendAnalytics,
]

function handleStart() {
  intervalId = setInterval(() => {
    if (taskCount < MAX_TASK_COUNT) {
      blockingTask()
      logTask('Run blocking task via setInterval')
    }
  })
}

async function handleRun() {
  for (const task of tasks) {
    // Use async/await to create yield points
    // task(1000)
    // await yieldToMain()

    // Yield only when necessary
    if (navigator.scheduling.isInputPending()) {
      await yieldToMain()
    } else {
      task(1000)
    }
  }
}

async function handleSetTimeout() {
  clearLog()

  if (!intervalId) {
    alert('Click the button to run blocking tasks periodically first.')
    return
  }

  for (const task of tasks) {
    task()
    await yieldToMain()
  }
}

async function handleSchedulerYield() {
  clearLog()

  if (!intervalId) {
    alert('Click the button to run blocking tasks periodically first.')
    return
  }

  if (!('scheduler' in window && 'yield' in scheduler)) {
    alert(`scheduler.yield isn't available in this browser :(`)
    return
  }

  for (const task of tasks) {
    task()
    await scheduler.yield()
  }
}

function handleClear() {
  clearLog()
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

function handleInput(event) {
  logTask(`Input value: '${event.target.value}'`)
}

function main() {
  document.querySelector('#start').addEventListener('click', handleStart)
  document.querySelector('#name').addEventListener('input', handleInput)
  document.querySelector('#run').addEventListener('click', handleRun)
  document.querySelector('#clear').addEventListener('click', handleClear)
  document
    .querySelector('#setTimeout')
    .addEventListener('click', handleSetTimeout)
  document
    .querySelector('#scheduler')
    .addEventListener('click', handleSchedulerYield)
}

main()
