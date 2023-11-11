import { ReactNode, useCallback } from "react"
import styles from "./icon.module.css"

interface Props {
  icon: ReactNode
  label?: string
  onClick?: () => void
}

export const IconItem = (props: Props) => {
  const clickHandler = useCallback(() => {
    if (props.onClick) {
      props.onClick()
    }
  }, [props])

  return (
    <div className={styles.Icon} onClick={clickHandler}>
      {props.icon}
      {props.label ? <p>{props.label}</p> : null}
    </div>
  )
}
