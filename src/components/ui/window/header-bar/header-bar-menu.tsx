import { useAppSelector } from "../../../../redux/hooks"
import { getWindows } from "../../../../redux/slices/window-manager-slice"
import { Vec2 } from "../../../../types/types"
import { MenuModal } from "../../../ui/menu/menu"
import { MenuListDivider } from "../../../ui/menu/menu-list-divider"
import { MenuListItem } from "../../../ui/menu/menu-list-item"

interface Props {
  clickPos: Vec2
  onItemClicked: (itemId: string, clickPos: Vec2) => void
  onClose: () => void
  winId: string
}
export const HeaderBarMenu = (props: Props) => {
  const windows = useAppSelector(getWindows)
  return (
    <MenuModal clickPos={props.clickPos} onClose={props.onClose}>
      <MenuListItem
        id={`win_${props.winId}_headerMenuItem_hide`}
        text="Hide"
        onClick={props.onItemClicked}
      />
      <MenuListItem
        id={`win_${props.winId}_headerMenuItem_maximize`}
        text={windows[props.winId].maximized ? "Restore" : "Maximize"}
        onClick={props.onItemClicked}
      />
      <MenuListItem
        id={`win_${props.winId}_headerMenuItem_move`}
        text="Move"
        onClick={props.onItemClicked}
        disabled={windows[props.winId].maximized}
      />
      <MenuListDivider />
      <MenuListItem
        id={`win_${props.winId}_headerMenuItem_close`}
        text="Close"
        onClick={props.onItemClicked}
      />
    </MenuModal>
  )
}
