import { useCallback } from "react"
import styles from "./menu-item.module.css"
import { Vec2 } from "../../../types/types"

interface Props {
  id: string
  text: string
  onClick: (itemId: string, clickPos: Vec2) => void
  disabled?: boolean
  style?: React.CSSProperties
  shortcut?: string
}
export const MenuListItem = (props: Props) => {
  const clickHandler = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!props.disabled) props.onClick(props.id, { x: e.pageX, y: e.pageY })
    },
    [props]
  )

  return (
    <div
      className={`${styles.menuListItem} ${
        props.disabled ? styles.disabled : null
      }`}
      style={props.style}
      onClick={clickHandler}
    >
      <div className={styles.label}>{props.text}</div>
      {props.shortcut ? <div className={styles.shortcut}>{props.shortcut}</div> : null}
    </div>
  )
}
