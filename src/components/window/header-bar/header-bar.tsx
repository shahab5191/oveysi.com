import { objectTypes } from "../../../types/enums"
import { AiOutlineClose } from "react-icons/ai"
import { MdMinimize } from "react-icons/md"
import { VscChromeMaximize } from "react-icons/vsc"
import styles from "./header-bar.module.css"
import { useCallback, useState } from "react"
import { Vec2 } from "../../../types/types"
import { HeaderBarMenu } from "./header-bar-menu"

type Props = {
  title: string
  isFocused: boolean
  toggleMaximize: (e: React.MouseEvent) => void
  closeHandler: (e: React.MouseEvent) => void
}
export const HeaderBar = (props: Props) => {
  const [showMenu, setShowMenu] = useState(false)
  const [clickPos, setClickPos] = useState<Vec2>({ x: 0, y: 0 })

  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button === 2) {
      setClickPos({ x: e.clientX, y: e.clientY })
      setShowMenu(true)
    }
  }

  const itemClickHandler = useCallback((itemId: string) => {
    console.log(itemId)
    setShowMenu(false)
  }, [])

  return (
    <>
      <div
        className={`${styles.topBar} ${props.isFocused ? styles.focused : ""}`}
        object-type={objectTypes.TOP_BAR}
        onMouseDown={clickHandler}
      >
        <h2 className={styles.header} object-type={objectTypes.TOP_BAR}>
          {props.title}
        </h2>
        <div className={styles.buttonsContainer}>
          <button
            className={`${styles.button} ${
              props.isFocused ? styles.focused : ""
            }`}
          >
            <MdMinimize />
          </button>
          <button
            className={`${styles.button} ${
              props.isFocused ? styles.focused : ""
            }`}
            onClick={props.toggleMaximize}
          >
            <VscChromeMaximize />
          </button>
          <button
            className={`${styles.button} ${
              props.isFocused ? styles.focused : ""
            }`}
            onClick={props.closeHandler}
          >
            <AiOutlineClose />
          </button>
        </div>
      </div>
      {showMenu ? (
        <HeaderBarMenu
          onClose={() => setShowMenu(false)}
          clickPos={clickPos}
          onItemClicked={itemClickHandler}
        />
      ) : null}
    </>
  )
}
