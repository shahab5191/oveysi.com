import { ReactNode } from "react"
import styles from "./side-panel.module.css"

interface Props {
  children?: ReactNode
}
export const SidePanel = (props: Props) => {
  return <div className={styles.sidePanel}>{props.children}</div>
}
