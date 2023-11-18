import { ActionType, objectTypes } from "../../../../types/enums"
import { AiOutlineClose } from "react-icons/ai"
import { MdMinimize } from "react-icons/md"
import { VscChromeMaximize } from "react-icons/vsc"
import styles from "./header-bar.module.css"
import { useCallback, useState } from "react"
import { Vec2 } from "../../../../types/types"
import { HeaderBarMenu } from "./header-bar-menu"
import { useAppDispatch } from "../../../../redux/hooks"
import {
  changeWindow,
  setFocusedWindow,
  setWindowAction,
} from "../../../../redux/slices/window-manager-slice"

type Props = {
  title: string
  isFocused: boolean
  toggleMaximize: (e?: React.MouseEvent) => void
  closeHandler: (e?: React.MouseEvent) => void
  winId: string
}
export const HeaderBar = (props: Props) => {
  const [showMenu, setShowMenu] = useState(false)
  const [clickPos, setClickPos] = useState<Vec2>({ x: 0, y: 0 })

  const dispatch = useAppDispatch()

  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button === 2) {
      setClickPos({ x: e.clientX, y: e.clientY })
      setShowMenu(true)
    }
  }
  const moveHandler = useCallback(
    (clickPos: Vec2) => {
      const window = document.getElementById(props.winId)
      if (!window) return
      const width = parseInt(window.style.width)
      const height = parseInt(window.style.height)
      const centerX = clickPos.x - width / 2
      const centerY = clickPos.y - height / 2
      dispatch(
        changeWindow({ id: props.winId, pos: { x: centerX, y: centerY } })
      )
      dispatch(
        setWindowAction({ id: props.winId, action: { type: ActionType.Move } })
      )
    },
    [dispatch, props.winId]
  )
  const minimizeHandler = useCallback(() => {}, [])

  const itemClickHandler = useCallback(
    (itemId: string, clickPos: Vec2) => {
      dispatch(setFocusedWindow({ id: props.winId }))

      switch (itemId) {
        case `win_${props.winId}_headerMenuItem_maximize`:
          props.toggleMaximize()
          break
        case `win_${props.winId}_headerMenuItem_move`:
          moveHandler(clickPos)
          break
        case `win_${props.winId}_headerMenuItem_hide`:
          minimizeHandler()
          break
        case `win_${props.winId}_headerMenuItem_close`:
          props.closeHandler()
          break
        default:
          break
      }
      setShowMenu(false)
    },
    [dispatch, minimizeHandler, moveHandler, props]
  )

  return (
    <>
      <div
        className={`${styles.topBar} ${props.isFocused ? styles.focused : ""}`}
        object-type={objectTypes.TOP_BAR}
        onMouseDown={clickHandler}
        onDoubleClick={props.toggleMaximize}
      >
        <h2 className={styles.header} object-type={objectTypes.TOP_BAR}>
          {props.title}
        </h2>
        <div className={styles.buttonsContainer}>
          <button
            className={`${styles.button} ${
              props.isFocused ? styles.focused : ""
            }`}
          >
            <MdMinimize />
          </button>
          <button
            className={`${styles.button} ${
              props.isFocused ? styles.focused : ""
            }`}
            onClick={props.toggleMaximize}
          >
            <VscChromeMaximize />
          </button>
          <button
            className={`${styles.button} ${
              props.isFocused ? styles.focused : ""
            }`}
            onClick={props.closeHandler}
          >
            <AiOutlineClose />
          </button>
        </div>
      </div>
      {showMenu ? (
        <HeaderBarMenu
          onClose={() => setShowMenu(false)}
          clickPos={clickPos}
          onItemClicked={itemClickHandler}
          winId={props.winId}
        />
      ) : null}
    </>
  )
}
