import styles from "./icon-manager.module.css"

interface Props {
  style: React.CSSProperties
}
export const IconManager = (props: Props) => {
  return <div className={styles.IconManager} style={{ ...props.style }}></div>
}
