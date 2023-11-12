import styles from "./window.module.css"
import { ResizeEdges } from "./resize-area"
import { objectTypes } from "../../types/enums"
import { Vec2 } from "../../types/types"
import { ReactNode } from "react"
import { HeaderBar } from "./header-bar/header-bar"
import { useAppSelector } from "../../redux/hooks"
import {
  closeWindow,
  getWindows,
  setFocusedWindow,
  toggleMaximize,
} from "../../redux/slices/window-manager-slice"
import { useDispatch } from "react-redux"
import {
  ViewState,
  getViewState,
} from "../../redux/slices/window-manager-slice"

interface Props {
  pos: Vec2
  size: Vec2
  isFocused: boolean
  id: string
  children?: ReactNode
  title: string
}

export const Window = (props: Props) => {
  const windows = useAppSelector(getWindows)
  const viewstate = useAppSelector(getViewState)
  const dispatch = useDispatch()

  const maximizeButtonClicked = (e?: React.MouseEvent) => {
    dispatch(toggleMaximize({ id: props.id }))
    if (!props.isFocused) dispatch(setFocusedWindow({ id: props.id }))
  }

  const closeHandler = (e?: React.MouseEvent) => {
    dispatch(closeWindow({ id: props.id }))
  }

  return (
    <div
      className={`${styles.window} ${props.isFocused ? styles.focused : ""} ${
        windows[props.id].maximized ? styles.maximized : ""
      } ${viewstate !== ViewState.desktopview ? styles.overview : ""} ${
        windows[props.id].canAnimate ? styles.canAnimate : ""
      }`}
      style={{
        left: windows[props.id].pos.x,
        top: windows[props.id].pos.y,
        width: windows[props.id].size.x,
        height: windows[props.id].size.y,
        zIndex: windows[props.id].zIndex,
        transform: `scale(${windows[props.id].scale})`,
      }}
      object-type={objectTypes.WINDOW}
      id={props.id}
      is-movable={windows[props.id].maximized ? 0 : 1}
    >
      <HeaderBar
        title={props.title}
        isFocused={props.isFocused}
        toggleMaximize={maximizeButtonClicked}
        closeHandler={closeHandler}
        winId={props.id}
      />
      <div className={styles.childWrapper} object-type="window-body">
        {props.children}
      </div>
      {windows[props.id].maximized ? null : <ResizeEdges />}
    </div>
  )
}
