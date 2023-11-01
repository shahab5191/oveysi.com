import { useCallback } from "react"
import styles from "./menu-item.module.css"

interface Props {
  id: string
  text: string
  onClick: (itemId: string) => void
}
export const MenuListItem = (props: Props) => {
  const clickHandler = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      props.onClick(props.id)
    },
    [props]
  )

  return (
    <div className={styles.menuListItem} onClick={clickHandler}>
      {props.text}
    </div>
  )
}
