import styles from "./icon-manager.module.css"

interface Props {
  style: React.CSSProperties
}
export const IconManager = (props: Props) => {
  console.log(props.style)
  return <div className={styles.IconManager} style={{ ...props.style }}></div>
}
