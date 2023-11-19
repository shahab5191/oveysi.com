import { ReactElement } from "react"
import styles from "./toggle-button.module.css"
interface Props {
  id: string
  icon?: ReactElement
  label?: string
  active?: boolean
  styles?: React.CSSProperties
  onClick: (id: string, e?: React.MouseEvent<HTMLDivElement>) => void
}
export const ToggleButton = (props: Props) => {
  const toggleActive = (e: React.MouseEvent<HTMLDivElement>) => {
    props.onClick(props.id, e)
  }
  return (
    <div
      className={`${styles.toggleButton} ${props.active ? styles.active : ""}`}
      onClick={toggleActive}
      style={props.styles}
    >
      {props.icon}
      {props.label ? <p>{props.label}</p> : null}
    </div>
  )
}
