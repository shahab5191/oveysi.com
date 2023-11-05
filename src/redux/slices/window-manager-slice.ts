import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Action, Vec2, WindowProperties } from "../../types/types"
import { RootState } from "../store"
import { ReactNode } from "react"
import settings from "../../settings/settings.json"
import { ActionType, SettingsNewWindowPos } from "../../types/enums"

interface State {
  windows: Record<string, WindowProperties>
  lastPos: Vec2
  lastColFirstItemPos: Vec2
  focusedWindow: string
  maxZindex: number
  windowAction: {
    canChangWindow: boolean
    action: Action
    windowId?: string
  }
}

interface OpenWindow {
  id: string
  title: string
  pos?: Vec2
  size: Vec2
  children: ReactNode
}
interface CloseWindow {
  id: string
}

interface ChangeWindow {
  id: string
  pos?: Vec2
  size?: Vec2
}

export const windowSlice = createSlice({
  name: "window",
  initialState: {
    windows: {},
    lastPos: { x: -settings.cascadeGap, y: -settings.cascadeGap },
    lastColFirstItemPos: { x: 0, y: 0 },
    focusedWindow: "",
    maxZindex: 10,
    windowAction: {
      canChangWindow: false,
      action: { type: ActionType.Move },
      windowId: undefined,
    },
  } as State,
  reducers: {
    openWindow: (state, action: PayloadAction<OpenWindow>) => {
      if (state.windows[action.payload.id] !== undefined) return state
      let pos = { x: 0, y: 0 }
      if (action.payload.pos) {
        pos = action.payload.pos
      } else {
        const winH = window.innerHeight
        const winW = window.innerWidth
        if (settings.newWindowPos === SettingsNewWindowPos.CASCADE) {
          const lastPos = state.lastPos
          if (lastPos.x + action.payload.size.x + settings.cascadeGap > winW) {
            pos.x = 0
          } else {
            pos.x = lastPos.x + settings.cascadeGap
          }
          if (lastPos.y + action.payload.size.y + settings.cascadeGap > winH) {
            pos.y = 0
            pos.x = state.lastColFirstItemPos.x + settings.cascadeGap * 1.5
            state.lastColFirstItemPos = pos
          } else {
            pos.y = lastPos.y + settings.cascadeGap
          }
        } else if (settings.newWindowPos === SettingsNewWindowPos.CENTER) {
          pos.x = winW / 2 - action.payload.size.x / 2
          pos.y = winH / 2 - action.payload.size.y / 2
        }
      }
      state.lastPos = pos
      state.windows[action.payload.id] = {
        id: action.payload.id,
        title: action.payload.title,
        maximized: false,
        pos,
        size: action.payload.size,
        zIndex: state.maxZindex++,
        children: action.payload.children,
      }
    },
    closeWindow: (state, action: PayloadAction<CloseWindow>) => {
      if (state.windows[action.payload.id] === undefined) return state
      delete state.windows[action.payload.id]
    },
    changeWindow: (state, action: PayloadAction<ChangeWindow>) => {
      if (state.windows[action.payload.id] === undefined) return state
      if (action.payload.pos)
        state.windows[action.payload.id].pos = action.payload.pos
      if (action.payload.size)
        state.windows[action.payload.id].size = action.payload.size

      return state
    },
    toggleMaximize: (state, action: PayloadAction<{ id: string }>) => {
      state.windows[action.payload.id].maximized =
        !state.windows[action.payload.id].maximized
      return state
    },
    setFocusedWindow: (state, action: PayloadAction<{ id: string }>) => {
      state.focusedWindow = action.payload.id
      state.windows[action.payload.id].zIndex = state.maxZindex++
    },
    setCanChangeWindow: (state, action: PayloadAction<{ state: boolean }>) => {
      state.windowAction.canChangWindow = action.payload.state
    },
    setWindowId: (state, action: PayloadAction<{ windowId?: string }>) => {
      state.windowAction.windowId = action.payload.windowId
    },
    setWindowAction: (state, action: PayloadAction<Action>) => {
      state.windowAction.action = action.payload
    },
  },
})

export const getWindows = (state: RootState) => {
  return state.windowReducer.windows
}
export const getFocusedWindow = (state: RootState) => {
  return state.windowReducer.focusedWindow
}
export const getWindowAction = (state: RootState) => {
  return state.windowReducer.windowAction
}
export const isMaximized = (state: RootState) => {
  return state.windowReducer.windows
}
export const {
  openWindow,
  closeWindow,
  changeWindow,
  toggleMaximize,
  setFocusedWindow,
  setCanChangeWindow,
  setWindowAction,
  setWindowId,
} = windowSlice.actions
export default windowSlice.reducer
