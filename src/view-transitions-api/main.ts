import './style.css'

declare global {
  interface Document {
    startViewTransition: (callback: () => void) => void
  }
}

const toggleHidden = (element: Element) => {
  if (element.hasAttribute('hidden')) {
    element.removeAttribute('hidden')
    return
  }

  element.setAttribute('hidden', '')
}

const main = () => {
  if (!('startViewTransition' in document)) return

  const btn = document.querySelector('#toggleButton')
  if (!(btn instanceof HTMLButtonElement)) return

  btn.addEventListener('click', () => {
    document.startViewTransition(() => {
      const section1 = document.querySelector('#section1')
      const section2 = document.querySelector('#section2')

      if (section1 && section2) {
        toggleHidden(section1)
        toggleHidden(section2)
      }
    })
  })
}

main()
