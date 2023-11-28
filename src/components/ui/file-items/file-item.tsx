import { useCallback } from "react"
import styles from "./file-item.module.css"

interface Props {
  icon?: string
  thumbnail?: string
  label?: string
  iconWidth: number
  doubleClick?: (name: string) => void
}
export const FileItem = ({
  icon = "/icons/file-view/default-icon.webp",
  iconWidth,
  thumbnail,
  label = "",
  doubleClick,
}: Props) => {
  const doubleClickHandler = useCallback(() => {
    if (doubleClick) doubleClick(label)
  }, [doubleClick, label])

  return (
    <div
      className={styles.container}
      style={{
        width: (iconWidth - 10) * 3 + "px",
        minHeight: iconWidth + 60 + "px",
        padding: "10px " + (iconWidth - 10) / 2 + "px",
      }}
      onDoubleClick={doubleClickHandler}
    >
      <img src={thumbnail ? thumbnail : icon} alt="icon" width={iconWidth} />
      <p>{label ? label : ""}</p>
    </div>
  )
}
