import { useState } from "react"
import { ToggleButton } from "../../components/ui/buttons/toggle-button/toggle-button"
import { LineDivider } from "../../components/ui/dividers/line-divider"

import styles from "./file-manager.module.css"
import { HambergurMenu } from "./hambergur-menu"
import { Vec2 } from "../../types/types"
interface Props {
  id: string
  tab: string
  addressChange: (address: string[]) => void
  currentAddress: string[]
}
export const FileManagerSidePanel = (props: Props) => {
  const [hambergurActive, setHambergurActive] = useState(false)
  const [hambergurPos, setHambergurPos] = useState<Vec2>({ x: 0, y: 0 })

  const hamburgerMenuClosedHandler = () => {
    setHambergurActive(false)
  }
  const itemClickHandler = (address: string | string[]) => {
    if (typeof address === "object") props.addressChange(address)
  }
  const hamburgerClickHandler = (
    data: string | string[],
    e?: React.MouseEvent<HTMLDivElement>
  ) => {
    if (e && e.currentTarget) {
      const menuLeft = e.currentTarget.getBoundingClientRect().left
      const menuBottom = e.currentTarget.getBoundingClientRect().bottom
      setHambergurPos({ x: menuLeft, y: menuBottom })
    }
    setHambergurActive(true)
  }
  const hambergurItemClickHandler = (id: string) => {
    console.log(id)
  }

  return (
    <>
      <div className={styles.sidePanel} object-type="side-panel">
        <div className={styles.sidePanelTitle} object-type="side-panel">
          <div></div>
          <h3 style={{ userSelect: "none" }} object-type="app-title">
            Files
          </h3>
          <ToggleButton
            id="hamburger-menu"
            icon={<img src="./icons/fm-hamburger.svg" alt="hambergur menu" />}
            onClick={hamburgerClickHandler}
            active={hambergurActive}
            styles={{
              padding: "8px",
              width: "32px",
            }}
          />
        </div>
        <div className={styles.sidePanelButtons}>
          <ToggleButton
            label="Recent"
            icon={
              <img
                src="./icons/fm-recent.svg"
                alt="recent icon"
                width="15px"
              ></img>
            }
            data={["/", "Recent"]}
            onClick={itemClickHandler}
            active={
              JSON.stringify(props.currentAddress) ===
              JSON.stringify(["/", "Recent"])
            }
          />
          <ToggleButton
            label="Home"
            icon={
              <img src="./icons/fm-home.svg" alt="home icon" width="15px"></img>
            }
            data={["/", "home", "shahab"]}
            onClick={itemClickHandler}
            active={
              JSON.stringify(props.currentAddress) ===
              JSON.stringify(["/", "home", "shahab"])
            }
          />
          <ToggleButton
            label="Documents"
            icon={
              <img
                src="./icons/fm-documents.svg"
                alt="documents icon"
                width="15px"
              ></img>
            }
            data={["/", "home", "shahab", "Documents"]}
            onClick={itemClickHandler}
            active={
              JSON.stringify(props.currentAddress) ===
              JSON.stringify(["/", "home", "shahab", "Documents"])
            }
          />
          <ToggleButton
            label="Music"
            icon={
              <img
                src="./icons/fm-music.svg"
                alt="music icon"
                width="15px"
              ></img>
            }
            data={["/", "home", "shahab", "Music"]}
            onClick={itemClickHandler}
            active={
              JSON.stringify(props.currentAddress) ===
              JSON.stringify(["/", "home", "shahab", "Music"])
            }
          />
          <ToggleButton
            label="Pictures"
            icon={
              <img
                src="./icons/fm-pictures.svg"
                alt="home icon"
                width="15px"
              ></img>
            }
            data={["/", "home", "shahab", "Pictures"]}
            onClick={itemClickHandler}
            active={
              JSON.stringify(props.currentAddress) ===
              JSON.stringify(["/", "home", "shahab", "Pictures"])
            }
          />
          <ToggleButton
            label="Videos"
            icon={
              <img
                src="./icons/fm-videos.svg"
                alt="videos icon"
                width="15px"
              ></img>
            }
            data={["/", "home", "shahab", "Videos"]}
            onClick={itemClickHandler}
            active={
              JSON.stringify(props.currentAddress) ===
              JSON.stringify(["/", "home", "shahab", "Videos"])
            }
          />
          <ToggleButton
            label="Trash"
            icon={
              <img
                src="./icons/fm-trash.svg"
                alt="trash icon"
                width="15px"
              ></img>
            }
            data={["/", "Trash"]}
            onClick={itemClickHandler}
            active={
              JSON.stringify(props.currentAddress) ===
              JSON.stringify(["/", "Trash"])
            }
          />
          <LineDivider horizontal={true} />
          <ToggleButton
            label="Other Locations"
            icon={
              <img
                src="./icons/fm-plus.svg"
                alt="other-locations icon"
                width="15px"
              ></img>
            }
            data={["/", "other-locations"]}
            onClick={itemClickHandler}
            active={
              JSON.stringify(props.currentAddress) ===
              JSON.stringify(["/", "other-locations"])
            }
          />
        </div>
      </div>
      {hambergurActive ? (
        <HambergurMenu
          onClose={hamburgerMenuClosedHandler}
          onItemClick={hambergurItemClickHandler}
          pos={hambergurPos}
        />
      ) : null}
    </>
  )
}
