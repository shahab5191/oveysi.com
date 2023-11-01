import { Vec2 } from "../../../types/types"
import { MenuModal } from "../../menu/menu"
import { MenuListDivider } from "../../menu/menu-list-divider"
import { MenuListItem } from "../../menu/menu-list-item"

interface Props {
  clickPos: Vec2
  onItemClicked: (itemId: string) => void
  onClose: () => void
}
export const HeaderBarMenu = (props: Props) => {
  return (
    <MenuModal clickPos={props.clickPos} onClose={props.onClose}>
      <MenuListItem id="1" text="Maximize" onClick={props.onItemClicked} />
      <MenuListItem id="2" text="Move" onClick={props.onItemClicked} />
      <MenuListItem id="3" text="Resize" onClick={props.onItemClicked} />
      <MenuListDivider />
      <MenuListItem id="4" text="Close" onClick={props.onItemClicked} />
    </MenuModal>
  )
}
