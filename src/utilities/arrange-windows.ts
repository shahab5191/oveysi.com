import { Vec2, WindowProperties } from "../types/types"
import settings from "../settings/settings.json"

function isKey<T extends object>(x: T, k: PropertyKey): k is keyof T {
  return k in x
}

export const arrangeWindows = (
  windows: Record<string, WindowProperties>
): { positions: Record<string, Vec2>; scale: number } => {
  const screenH = window.innerHeight
  const screenW = window.innerWidth
  const gap = settings.viewState.gap

  let positions: Record<string, Vec2> = {}
  let lastScale = 0
  let scale = 1
  do {
    lastScale = scale
    let totalHeight = gap
    let currentWidth = gap
    let currentMaxHeight = gap
    for (let key in windows) {
      if (isKey(windows, key)) {
        const window = document.getElementById(windows[key].id)
        if (!window) return { positions: {}, scale: 1 }
        let pos = { x: 0, y: 0 }
        let winH = window.getBoundingClientRect().height * scale
        let winW = window.getBoundingClientRect().width * scale
        currentMaxHeight = Math.max(currentMaxHeight, winH)
        currentWidth += winW + gap

        if (currentWidth >= screenW) {
          totalHeight += currentMaxHeight + gap
          currentMaxHeight = 0
          currentWidth = winW + gap
        }

        if (totalHeight + winH + gap * 2 >= screenH) {
          scale -= 0.01
          break
        }

        pos.x = currentWidth - winW
        pos.y = totalHeight
        positions[windows[key].id] = pos
      }
    }
  } while (lastScale >= scale + 0.01 || lastScale <= scale - 0.01)
  return { positions, scale }
}
