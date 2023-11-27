import { useCallback, useEffect, useState } from "react"
import { Window } from "../../components/ui/window/window"
import { useAppDispatch } from "../../redux/hooks"
import {
  setWindowMinSize,
  setWindowTitle,
} from "../../redux/slices/window-manager-slice"
import { FileManagerSidePanel } from "./side-panel"
import { FileManagerTopBar } from "./top-bar"
import { FileView } from "../../types/enums"

interface Props {
  id: string
}
export const FileManager = (props: Props) => {
  const dispatch = useAppDispatch()
  const [address, setAddress] = useState<Array<Array<string>>>([["/"]])
  const [fileView, setFileView] = useState<Array<FileView>>([FileView.GRID])
  const [activeTab, setActiveTab] = useState(0)

  const onAddressChange = (newAddress: string[]) => {
    setAddress((current) => {
      let temp = current
      temp[activeTab] = [...newAddress]
      return [...temp]
    })
  }

  const changeFileView = useCallback(
    (view: FileView) => {
      setFileView((current) => {
        let temp = [...current]
        temp[activeTab] = view
        return [...temp]
      })
    },
    [activeTab]
  )

  useEffect(() => {
    dispatch(setWindowTitle({ id: props.id, title: "File Manager" }))
    dispatch(setWindowMinSize({ id: props.id, minSize: { x: 485, y: 250 } }))
  }, [dispatch, props.id])
  return (
    <Window
      id={props.id}
      sidePanelChildren={
        <FileManagerSidePanel
          id={props.id}
          tab={"0"}
          addressChange={onAddressChange}
          currentAddress={address[activeTab]}
        />
      }
      topBarChildren={
        <FileManagerTopBar
          windowId={props.id}
          tab={activeTab}
          view={fileView}
          fileViewChange={changeFileView}
        />
      }
    ></Window>
  )
}
