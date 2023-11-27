import { ReactElement } from "react"
import styles from "./toggle-button.module.css"
interface Props {
  id?: string
  icon?: ReactElement
  label?: string
  active?: boolean
  styles?: React.CSSProperties
  data?: any
  canMoveParent?: boolean
  onClick?: (data: any, e: React.MouseEvent<HTMLDivElement>) => void
}
export const ToggleButton = (props: Props) => {
  const toggleActive = (e: React.MouseEvent<HTMLDivElement>) => {
    if (props.onClick) {
      if (props.data !== undefined) {
        props.onClick(props.data, e)
      } else if (props.id) props.onClick(props.id, e)
    }
  }
  return (
    <div
      className={`${styles.toggleButton} ${props.active ? styles.active : ""} ${
        !props.label ? styles.center : ""
      }`}
      onClick={toggleActive}
      style={props.styles}
      object-type={props.canMoveParent ? "window-topbar" : ""}
    >
      {props.icon}
      {props.label ? <p>{props.label}</p> : null}
    </div>
  )
}
