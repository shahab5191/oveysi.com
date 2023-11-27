import { AddressBar } from "./address-bar"
import styles from "./top-bar.module.css"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { IoSearchSharp, IoGrid } from "react-icons/io5"
import { ImList } from "react-icons/im";
import { FaCaretDown } from "react-icons/fa"
import { FileView } from "../../types/enums"
import { ToggleButton } from "../../components/ui/buttons/toggle-button/toggle-button"
import { useCallback } from "react"
import { LineDivider } from "../../components/ui/dividers/line-divider"

interface Props {
  windowId: string
  tab: number
  view: FileView[]
  fileViewChange: (view: FileView) => void
}
export const FileManagerTopBar = (props: Props) => {
  const listViewButtonClicked = useCallback(
    (data: FileView, e: React.MouseEvent) => {
      props.fileViewChange(data)
    },
    [props]
  )
  const searchButtonClicked = useCallback(() => {}, [])

  return (
    <div className={styles.container} object-type="window-topbar">
      <div className={styles.historyButtonsContainer}>
        <ToggleButton
          icon={<IoIosArrowBack />}
          canMoveParent={true}
          styles={{
            paddingLeft: "3px",
            paddingRight: "3px",
            height: "100%",
            width: "30px",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={searchButtonClicked}
        />
        <ToggleButton
          icon={<IoIosArrowForward />}
          canMoveParent={true}
          styles={{
            paddingLeft: "3px",
            paddingRight: "3px",
            height: "100%",
            width: "30px",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={searchButtonClicked}
        />
      </div>
      <AddressBar windowId={props.windowId} />
      <ToggleButton
        icon={<IoSearchSharp />}
        canMoveParent={true}
        styles={{
          padding: 0,
          height: "100%",
          width: "60px",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={searchButtonClicked}
      />
      <div className={styles.fileView} object-type="window-topbar">
        {props.view[props.tab] === FileView.GRID ? (
          <ToggleButton
            icon={<ImList />}
            styles={{
              paddingLeft: "8px",
              paddingRight: "8px",
              height: "100%",
              width: "30px",
              alignItems: "center",
            }}
            data={FileView.LIST}
            canMoveParent={true}
            onClick={listViewButtonClicked}
          />
        ) : (
          <ToggleButton
            icon={<IoGrid />}
            styles={{
              paddingLeft: "5px",
              paddingRight: "5px",
              height: "100%",
              width: "30px",
              alignItems: "center",
            }}
            canMoveParent={true}
            data={FileView.GRID}
            onClick={listViewButtonClicked}
          />
        )}
        <LineDivider horizontal={false} />
        <ToggleButton
          icon={<FaCaretDown />}
          styles={{
            padding: 0,
            height: "100%",
            alignItems: "center",
            width: "max-content",
          }}
          canMoveParent={true}
        />
      </div>
    </div>
  )
}
