import { ReactNode, useCallback } from "react"
import styles from "./icon.module.css"
import settings from "../../../../settings/settings.json"
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
    <div
      className={styles.Icon}
      onClick={clickHandler}
      style={{ width: settings.docker.dockerHeight - 10}}
    >
      {props.icon}
      {props.label ? <p>{props.label}</p> : null}
    </div>
  )
}
