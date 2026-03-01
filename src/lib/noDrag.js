export function mountNoDrag(root = document.body) {
  if (!root) return () => {}

  const prevent = (e) => {
    e.preventDefault()
    e.stopPropagation()
    return false
  }

  const rootElement = document.body

  root.addEventListener('dragstart', prevent, { capture: true })
  root.addEventListener('drop', prevent, { capture: true })

  return () => {
    root.removeEventListener('dragstart', prevent, { capture: true })
    root.removeEventListener('drop', prevent, { capture: true })
    rootElement.classList.remove('no-drag-active')
  }
}
