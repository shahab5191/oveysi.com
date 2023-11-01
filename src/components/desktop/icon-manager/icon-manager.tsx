import settings from "../../../settings/settings.json"
import styles from "./icon-manager.module.css"

interface Props {}
export const IconManager = (props: Props) => {
  return (
    <div
      className={styles.IconManager}
      style={{
        backgroundImage: `url(${settings.wallpaper})`,
        backgroundSize: "cover",
      }}
    >
    </div>
  )
}
