import { ReactNode } from "react"
import { Vec2 } from "../../types/types"
import { Modal } from "../modals/modal"
import styles from "./menu.module.css"
interface Props {
  clickPos: Vec2
  onClose: () => void
  children?: ReactNode
  onItemClicked?: (itemId: string) => void
}
export const MenuModal = (props: Props) => {
  return (
    <Modal pos={props.clickPos} onClose={props.onClose}>
      <div className={styles.menuContainer}>{props.children}</div>
    </Modal>
  )
}
