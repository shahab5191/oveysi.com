import styles from "./line-divider.module.css"
interface Props {
  horizontal: boolean
  margin?: number
}
export const LineDivider = (props: Props) => {
  return (
    <div
      className={props.horizontal ? styles.horizontal : styles.vertical}
      style={{
        marginTop: props.margin + "px",
        marginBottom: props.margin + "px",
      }}
    ></div>
  )
}
