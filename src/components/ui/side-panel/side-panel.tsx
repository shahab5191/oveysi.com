import { ReactNode } from "react"
import styles from "./side-panel.module.css"

interface Props {
  children?: ReactNode
  windowHasFocuse: boolean
}
export const SidePanel = (props: Props) => {
  return (
    <div
      className={`${styles.sidePanel} ${
        props.windowHasFocuse ? styles.focused : ""
      }`}
    >
      {props.children}
    </div>
  )
}
