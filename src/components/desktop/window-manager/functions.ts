import { windowEdges } from "../../../types/enums"
import { Vec2 } from "../../../types/types"

export const moveWindow = (
  windowObj: HTMLDivElement,
  movementX: number,
  movementY: number
) => {
  const left = parseInt(windowObj.style.left)
  const top = parseInt(windowObj.style.top)
  const width = parseInt(windowObj.style.width)
  const height = parseInt(windowObj.style.height)
  let newLeft = Math.max(
    Math.min(left + movementX, window.innerWidth - 10),
    10 - width
  )
  let newTop = Math.max(
    Math.min(top + movementY, window.innerHeight - 10),
    10 - height
  )
  return {
    x: newLeft,
    y: newTop,
  }
}

export const resizeWindow = (
  windowObj: HTMLDivElement,
  direction: windowEdges,
  deltaX: number,
  deltaY: number,
  minSize: Vec2
) => {
  if (!windowObj) return { newPos: { x: 0, y: 0 }, newSize: { x: 0, y: 0 } }
  const width = parseInt(windowObj.style.width)
  const height = parseInt(windowObj.style.height)
  const left = windowObj.offsetLeft
  const top = windowObj.offsetTop
  let newTop = top,
    newLeft = left,
    newWidth = width,
    newHeight = height
  switch (direction) {
    case windowEdges.RIGHT:
      newWidth = Math.max(width + deltaX, minSize.x)
      break
    case windowEdges.BOTTOM:
      newHeight = Math.max(height + deltaY, minSize.y)
      break
    case windowEdges.LEFT:
      if (width > minSize.x || deltaX < 0) {
        newLeft = left + deltaX
        newWidth = width - deltaX
      }
      break
    case windowEdges.TOP:
      if (height > minSize.y || deltaY < 0) {
        newTop = top + deltaY
        newHeight = height - deltaY
      }
      break
    case windowEdges.BOTTOM_RIGHT:
      newWidth = Math.max(width + deltaX, minSize.x)
      newHeight = Math.max(height + deltaY, minSize.y)
      break
    case windowEdges.BOTTOM_LEFT:
      newHeight = Math.max(height + deltaY, minSize.y)
      if (width > minSize.x || deltaX < 0) {
        newWidth = width - deltaX
        newLeft = left + deltaX
      }
      break
    case windowEdges.TOP_RIGHT:
      newWidth = Math.max(width + deltaX, minSize.x)
      if (height > minSize.y || deltaY < 0) {
        newTop = top + deltaY
        newHeight = height - deltaY
      }
      break
    case windowEdges.TOP_LEFT:
      if (width > minSize.x || deltaX < 0) {
        newLeft = left + deltaX
        newWidth = width - deltaX
      }
      if (height > minSize.y || deltaY < 0) {
        newTop = top + deltaY
        newHeight = height - deltaY
      }
      break
    default:
      break
  }
  const newPos = { x: newLeft, y: newTop }
  const newSize = { x: newWidth, y: newHeight }
  return { newPos, newSize }
}
