const preventDrag = (e) => {
  e.preventDefault()
  e.stopPropagation()
}

export function mountNoDrag (root = document.body) {
  if (!root) return
  root.addEventListener('dragstart', preventDrag, { capture: true })
  root.addEventListener('drop', preventDrag, { capture: true })
}
