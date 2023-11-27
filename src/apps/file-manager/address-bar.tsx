import { useAppSelector } from '../../redux/hooks'
import { getFocusedWindow } from '../../redux/slices/window-manager-slice'
import styles from './address-bar.module.css'

interface Props {
  windowId: string
}
export const AddressBar = (props: Props) => {
  const focusedWindow = useAppSelector(getFocusedWindow)

  return (
    <div
      className={`${styles.addressBarContainer} ${
        focusedWindow === props.windowId ? styles.focused : ""
      }`}
    ></div>
  )
}
