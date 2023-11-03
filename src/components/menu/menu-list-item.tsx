import { useCallback } from "react"
import styles from "./menu-item.module.css"
import { Vec2 } from "../../types/types"

interface Props {
  id: string
  text: string
  onClick: (itemId: string, clickPos: Vec2) => void
  disabled?: boolean
}
export const MenuListItem = (props: Props) => {
  const clickHandler = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!props.disabled)
        props.onClick(props.id, { x: e.pageX, y: e.pageY })
    },
    [props]
  )

  return (
    <div
      className={`${styles.menuListItem} ${
        props.disabled ? styles.disabled : null
      }`}
      onClick={clickHandler}
    >
      {props.text}
    </div>
  )
}
