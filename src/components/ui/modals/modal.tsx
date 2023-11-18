import { ReactNode } from "react"
import { Vec2 } from "../../../types/types"
import styles from "./modal.module.css"
import { createPortal } from "react-dom"
interface Props {
  pos: Vec2
  children?: ReactNode
  onClose: () => void
}
export const Modal = (props: Props) => {
  return (
    <>
      {createPortal(
        <div
          className={styles.modalWrapper}
          onMouseDown={(_) => {
            props.onClose()
          }}
        >
          <div
            className={styles.modal}
            style={{ left: props.pos.x, top: props.pos.y }}
            onMouseDown={(e: React.MouseEvent) => {
              e.stopPropagation()
            }}
          >
            {props.children}
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
