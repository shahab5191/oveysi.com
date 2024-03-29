import { useCallback } from "react"
import { MenuModal } from "../../components/ui/menu/menu"
import { Vec2 } from "../../types/types"
import { MenuListItem } from "../../components/ui/menu/menu-list-item"
import { LineDivider } from "../../components/ui/dividers/line-divider"
import { ToggleButton } from "../../components/ui/buttons/toggle-button/toggle-button"
import { BiSolidMinusSquare, BiSolidPlusSquare } from "react-icons/bi"

interface Props {
  onClose: () => void
  pos: Vec2
  currentZoom: number
  onItemClick: (id: string) => void
  zoomClicked: (change: number) => void
}
export const HambergurMenu = (props: Props) => {
  const clickHandler = useCallback(() => {
    props.onItemClick("1")
    props.onClose()
  }, [props])
  return (
    <MenuModal clickPos={props.pos} onClose={props.onClose}>
      <MenuListItem
        id="new-window"
        text="New Window"
        onClick={clickHandler}
        style={{ height: "25px", fontSize: "11pt" }}
        shortcut="Ctrl+N"
      />
      <MenuListItem
        id="new-tab"
        text="New Tab"
        onClick={clickHandler}
        style={{ height: "25px", fontSize: "11pt" }}
        shortcut="Ctrl+T"
      />
      <LineDivider horizontal={true} margin={5} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          padding: "5px 5px 5px 15px",
          alignItems: "center",
        }}
      >
        <p style={{ margin: 0, textAlign: "left" }}>Icon Size</p>
        <div style={{ display: "flex" }}>
          <ToggleButton
            icon={<BiSolidMinusSquare />}
            data={-1}
            styles={{ padding: "7px", width: "max-content" }}
            onClick={props.zoomClicked}
            disable={props.currentZoom <= 1}
          />
          <ToggleButton
            icon={<BiSolidPlusSquare />}
            styles={{ padding: "7px", width: "max-content" }}
            data={1}
            onClick={props.zoomClicked}
            disable={props.currentZoom >= 5}
          />
        </div>
      </div>
      <LineDivider horizontal={true} margin={5} />
      <MenuListItem
        id="undo"
        text="Undo"
        onClick={clickHandler}
        style={{ height: "25px", fontSize: "11pt" }}
        shortcut="Ctrl+Z"
      />
      <MenuListItem
        id="redo"
        text="Redo"
        disabled={true}
        onClick={clickHandler}
        style={{ height: "25px", fontSize: "11pt" }}
        shortcut="Shift+Ctrl+Z"
      />
      <LineDivider horizontal={true} margin={5} />
      <MenuListItem
        id="show-hidden"
        text="Show Hidden Files"
        onClick={clickHandler}
        style={{ height: "25px", fontSize: "11pt" }}
        shortcut="Ctrl+H"
      />
      <LineDivider horizontal={true} margin={5} />
      <MenuListItem
        id="preferences"
        text="Preferences"
        onClick={clickHandler}
        style={{ height: "25px", fontSize: "11pt" }}
        shortcut="Ctrl+,"
      />
      <MenuListItem
        id="keyboard-shortcuts"
        text="Keyboard Shortcuts"
        onClick={clickHandler}
        style={{ height: "25px", fontSize: "11pt" }}
        shortcut="Ctrl+?"
      />
      <MenuListItem
        id="help"
        text="Help"
        onClick={clickHandler}
        style={{ height: "25px", fontSize: "11pt" }}
        shortcut="F1"
      />
      <MenuListItem
        id="about-files"
        text="About Files"
        onClick={clickHandler}
        style={{ height: "25px", fontSize: "11pt" }}
      />
    </MenuModal>
  )
}
