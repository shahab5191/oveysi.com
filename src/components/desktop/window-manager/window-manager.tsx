import { ReactElement, useMemo, useState } from "react"
import { Window } from "../../window/window"
import styles from "./window-manager.module.css"
import { ActionType, objectTypes, windowEdges } from "../../../types/enums"
import { moveWindow, resizeWindow } from "./functions"
import { Vec2 } from "../../../types/types"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import {
  getFocusedWindow,
  getWindows,
  setFocusedWindow,
} from "../../../redux/slices/window-slice"
import { changeWindow } from "../../../redux/slices/window-slice"
import { Modal } from "../../modals/modal"

interface Props {}
interface Action {
  type: ActionType
  option?: {
    direction: windowEdges
  }
}

export const WindowManager = (props: Props) => {
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 })
  const [mouseIsDown, setMouseIsDown] = useState(false)
  const [windowObj, setWindowObj] = useState<HTMLDivElement | null>(null)
  const [action, setAction] = useState<Action>({
    type: ActionType.Resize,
    option: { direction: windowEdges.TOP_LEFT },
  })
  const windowsList = useAppSelector(getWindows)
  const focusedWindow = useAppSelector(getFocusedWindow)

  const dispatch = useAppDispatch()

  const changeDimension = (id: string, newPos?: Vec2, newSize?: Vec2) => {
    dispatch(changeWindow({ id, pos: newPos, size: newSize }))
  }

  const checkForWindowMove = (e: React.MouseEvent) => {
    if (e.target) {
      const target = e.target as HTMLDivElement
      if (target.getAttribute("object-type") === objectTypes.WINDOW) {
        setMouseIsDown(true)
        setWindowObj(target)
        setAction({ type: ActionType.Move })
        setLastMousePos({ x: e.pageX, y: e.pageY })
        dispatch(setFocusedWindow({ id: target.getAttribute("window-id")! }))
      } else if (
        target.getAttribute("object-type") === objectTypes.WINDOW_EDGE
      ) {
        const direction = target.getAttribute("window-edge") as windowEdges
        if (direction) {
          const window = target.parentElement as HTMLDivElement
          setMouseIsDown(true)
          setWindowObj(window)
          setAction({
            type: ActionType.Resize,
            option: { direction },
          })
          setLastMousePos({ x: e.pageX, y: e.pageY })
          dispatch(setFocusedWindow({ id: window.getAttribute("window-id")! }))
        }
      } else if (target.getAttribute("object-type")) {
        const window = target.closest(
          `[object-type=${objectTypes.WINDOW}]`
        ) as HTMLDivElement
        if (!window) return
        setMouseIsDown(true)
        setWindowObj(window)
        setAction({
          type: ActionType.Move,
        })
        setLastMousePos({ x: e.pageX, y: e.pageY })
        dispatch(setFocusedWindow({ id: window.getAttribute("window-id")! }))
      }
    }
  }

  const mouseDownHandler = (e: React.MouseEvent) => {
    if (e.button === 0) {
      checkForWindowMove(e)
    }
  }
  const mouseUpHandler = (e: React.MouseEvent) => {
    setMouseIsDown(false)
    setWindowObj(null)
  }
  const mouseMoveHandler = (e: React.MouseEvent) => {
    if (!mouseIsDown) return
    if (windowObj === null) return
    switch (action.type) {
      case ActionType.Move: {
        const movable = windowObj.getAttribute("is-movable")
        if (movable !== undefined && movable !== "0") {
          const newPos = moveWindow(windowObj, e.movementX, e.movementY)
          const id = windowObj.getAttribute("window-id")
          if (id) {
            return changeDimension(id, newPos)
          }
        }
        break
      }
      case ActionType.Resize: {
        if (action.option) {
          const deltaX = e.pageX - lastMousePos.x
          const deltaY = e.pageY - lastMousePos.y
          const { newPos, newSize } = resizeWindow(
            windowObj,
            action.option?.direction,
            deltaX,
            deltaY
          )
          setLastMousePos({ x: e.pageX, y: e.pageY })
          const id = windowObj.getAttribute("window-id")
          if (id) {
            changeDimension(id, newPos, newSize)
            return
          }
        }
        break
      }
    }
  }

  const createWindowNodes = useMemo(() => {
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
        ></Window>
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
      {createWindowNodes}
    </div>
  )
}
