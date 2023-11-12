import { ReactElement, useCallback, useState } from "react"
import { Window } from "../../window/window"
import styles from "./window-manager.module.css"
import { ActionType, objectTypes, windowEdges } from "../../../types/enums"
import { moveWindow, resizeWindow } from "./functions"
import { Action, Vec2 } from "../../../types/types"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import {
  getFocusedWindow,
  getWindowAction,
  getWindows,
  setCanChangeWindow,
  setFocusedWindow,
  setWindowAction,
  setWindowId,
  toggleCanAnimate,
} from "../../../redux/slices/window-manager-slice"
import {
  changeWindow,
  ViewState,
  getViewState,
} from "../../../redux/slices/window-manager-slice"

interface Props {}
export const WindowManager = (props: Props) => {
  const [currentWindow, setCurrentWindow] = useState<string>("")
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 })
  const { canChangWindow, action, windowId } = useAppSelector(getWindowAction)
  const windowsList = useAppSelector(getWindows)
  const focusedWindow = useAppSelector(getFocusedWindow)
  const viewstate = useAppSelector(getViewState)
  const dispatch = useAppDispatch()

  const changeDimension = (newPos?: Vec2, newSize?: Vec2) => {
    dispatch(changeWindow({ id: windowId!, pos: newPos, size: newSize }))
  }

  const initializeWindowChange = (
    e: React.MouseEvent,
    window: HTMLDivElement,
    action: { type: ActionType; option?: { direction: windowEdges } }
  ) => {
    const id = window.id
    if (!id) return
    dispatch(setWindowAction({ action, id }))
    setLastMousePos({ x: e.pageX, y: e.pageY })
  }

  const getWindowObject = (
    e: React.MouseEvent
  ): { window: HTMLDivElement | null; action: Action | null } => {
    if (e.target) {
      const target = e.target as HTMLDivElement
      if (target.getAttribute("object-type") === objectTypes.WINDOW) {
        return {
          window: target,
          action: {
            type: ActionType.Move,
          },
        }
      } else if (
        target.getAttribute("object-type") === objectTypes.WINDOW_EDGE
      ) {
        const direction = target.getAttribute("window-edge") as windowEdges
        if (direction) {
          const window = target.parentElement as HTMLDivElement
          return {
            window,
            action: {
              type: ActionType.Resize,
              option: { direction },
            },
          }
        }
      } else if (target.getAttribute("object-type")) {
        const window = target.closest(
          `[object-type=${objectTypes.WINDOW}]`
        ) as HTMLDivElement
        if (window) {
          return {
            window: window,
            action: {
              type: ActionType.Move,
            },
          }
        }
      }
    }
    return { window: null, action: null }
  }

  const mouseDownHandler = (e: React.MouseEvent) => {
    if (e.button === 0) {
      const { window, action } = getWindowObject(e)
      if (!window || !action) return
      const id = window.getAttribute("id")
      if (!id) return
      setCurrentWindow(id)
      dispatch(toggleCanAnimate({ windowId: id }))

      if (viewstate === ViewState.desktopview) {
        initializeWindowChange(e, window, action)
      } else {
        dispatch(setFocusedWindow({ id }))
      }
    }
  }

  const mouseUpHandler = (e: React.MouseEvent) => {
    dispatch(setCanChangeWindow({ state: false }))
    dispatch(setWindowId({}))
    if (currentWindow) dispatch(toggleCanAnimate({ windowId: currentWindow }))
    setCurrentWindow("")
  }

  const mouseMoveHandler = (e: React.MouseEvent) => {
    if (!canChangWindow) return
    if (windowId === undefined) return
    const windowDom = document.getElementById(windowId) as HTMLDivElement
    if (!windowDom) return
    switch (action.type) {
      case ActionType.Move: {
        const movable = windowDom.getAttribute("is-movable")
        if (movable !== undefined && movable !== "0") {
          const newPos = moveWindow(windowDom, e.movementX, e.movementY)
          if (windowId) {
            return changeDimension(newPos)
          }
        }
        break
      }
      case ActionType.Resize: {
        if (action.option) {
          const deltaX = e.pageX - lastMousePos.x
          const deltaY = e.pageY - lastMousePos.y
          const { newPos, newSize } = resizeWindow(
            windowDom,
            action.option?.direction,
            deltaX,
            deltaY
          )
          setLastMousePos({ x: e.pageX, y: e.pageY })
          if (windowId) {
            changeDimension(newPos, newSize)
            return
          }
        }
        break
      }
    }
  }

  const createWindowNodes = useCallback(() => {
    const arrayOfWindows: ReactElement[] = []
    let i = 0
    for (let key in windowsList) {
      arrayOfWindows.push(
        <Window
          pos={windowsList[key].pos}
          size={windowsList[key].size}
          isFocused={focusedWindow === windowsList[key].id}
          id={windowsList[key].id}
          title={windowsList[key].title}
          key={i}
        >
          {windowsList[key].children}
        </Window>
      )
      i++
    }
    return arrayOfWindows
  }, [windowsList, focusedWindow])

  return (
    <div
      className={styles.windowManager}
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
      onMouseMove={mouseMoveHandler}
    >
      {createWindowNodes()}
    </div>
  )
}
