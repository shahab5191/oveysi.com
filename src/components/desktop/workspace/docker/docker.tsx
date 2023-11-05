import styles from "./docker.module.css"
import settings from "../../../../settings/settings.json"

interface Props{}
export const Docker = (props:Props)=>{
  return (
  <div className={styles.DockerContainer} style={{height:settings.docker.dockerHeight}}>
    test
  </div>
  )
}
