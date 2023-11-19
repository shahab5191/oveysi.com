import { useState } from "react"
import { ToggleButton } from "../../components/ui/buttons/toggle-button/toggle-button"
import { LineDivider } from "../../components/ui/dividers/line-divider"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import {
  getAppState,
  setAppState,
} from "../../redux/slices/window-manager-slice"
import styles from "./file-manager.module.css"
import { HambergurMenu } from "./hambergur-menu"
import { Vec2 } from "../../types/types"
interface Props {
  id: string
  tab: string
}
export const FileManagerSidePanel = (props: Props) => {
  const dispatch = useAppDispatch()
  const appState = useAppSelector((state) => getAppState(state, props.id))
  const [hambergurActive, setHambergurActive] = useState(false)
  const [hambergurPos, setHambergurPos] = useState<Vec2>({ x: 0, y: 0 })

  const hamburgerMenuClosedHandler = () => {
    setHambergurActive(false)
  }
  const itemClickHandler = (address: string) => {
    dispatch(
      setAppState({
        id: props.id,
        state: props.tab,
        value: { "current-address": address },
      })
    )
    return
  }
  const hamburgerClickHandler = (
    id: string,
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
      <div className={styles.sidePanel}>
        <div className={styles.sidePanelTitle}>
          <div></div>
          <h3>Files</h3>
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
        <ToggleButton
          label="Recent"
          icon={
            <img
              src="./icons/fm-recent.svg"
              alt="recent icon"
              width="15px"
            ></img>
          }
          id="recent"
          onClick={itemClickHandler}
          active={
            appState[props.tab].hasOwnProperty("current-address") &&
            appState[props.tab]["current-address"] === "recent"
          }
        />
        <ToggleButton
          label="Home"
          icon={
            <img src="./icons/fm-home.svg" alt="home icon" width="15px"></img>
          }
          id="/home"
          onClick={itemClickHandler}
          active={
            JSON.stringify(appState[props.tab]) ===
            JSON.stringify({ "current-address": "/home" })
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
          id="/home/documents"
          onClick={itemClickHandler}
          active={
            JSON.stringify(appState[props.tab]) ===
            JSON.stringify({ "current-address": "/home/documents" })
          }
        />
        <ToggleButton
          label="Music"
          icon={
            <img src="./icons/fm-music.svg" alt="music icon" width="15px"></img>
          }
          id="/home/music"
          onClick={itemClickHandler}
          active={
            JSON.stringify(appState[props.tab]) ===
            JSON.stringify({ "current-address": "/home/music" })
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
          id="/home/pictures"
          onClick={itemClickHandler}
          active={
            JSON.stringify(appState[props.tab]) ===
            JSON.stringify({ "current-address": "/home/pictures" })
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
          id="/home/videos"
          onClick={itemClickHandler}
          active={
            JSON.stringify(appState[props.tab]) ===
            JSON.stringify({ "current-address": "/home/videos" })
          }
        />
        <ToggleButton
          label="Trash"
          icon={
            <img src="./icons/fm-trash.svg" alt="trash icon" width="15px"></img>
          }
          id="/trash"
          onClick={itemClickHandler}
          active={
            JSON.stringify(appState[props.tab]) ===
            JSON.stringify({ "current-address": "/trash" })
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
          id="other-locations"
          onClick={itemClickHandler}
          active={
            JSON.stringify(appState[props.tab]) ===
            JSON.stringify({ "current-address": "other-locations" })
          }
        />
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
