import styles from "./file-manager.module.css"
interface Props{}
export const FileManagerSidePanel = (props:Props) => {
  return (
  <div className={styles.sidePanel}>
    <h3>Files</h3>
  </div>
  )
}
