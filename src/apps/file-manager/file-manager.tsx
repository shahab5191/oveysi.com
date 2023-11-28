import { useCallback, useEffect, useState } from "react"
import { Window } from "../../components/ui/window/window"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import {
  setWindowMinSize,
  setWindowTitle,
} from "../../redux/slices/window-manager-slice"
import { FileManagerSidePanel } from "./side-panel"
import { FileManagerTopBar } from "./top-bar"
import { FileView } from "../../types/enums"
import { getFolder } from "../../utilities/file-system-utils"
import { getRoot } from "../../redux/slices/file-system"
import { FolderStruct } from "../../types/types"
import { FolderViewer } from "./folder-view"

/** TODO */
/** Create history for folders */
interface Props {
  id: string
}
export const FileManager = (props: Props) => {
  const dispatch = useAppDispatch()
  const rootFolder = useAppSelector(getRoot)
  const [address, setAddress] = useState<Array<Array<string>>>([["/"]])
  const [fileView, setFileView] = useState<Array<FileView>>([FileView.GRID])
  const [activeTab, setActiveTab] = useState(0)
  const [currentFolder, setCurrentFolder] = useState<FolderStruct[]>([])
  const [zoom, setZoom] = useState<number>(3)
  const [history, setHistory] = useState<string[][][]>([[]])

  const onAddressChange = useCallback(
    (newAddress: string[]) => {
      const folder = getFolder(rootFolder, newAddress)
      if (!folder) return
      setAddress((current) => {
        let temp = current
        temp[activeTab] = [...newAddress]
        return [...temp]
      })
      setCurrentFolder((current) => {
        let temp = current
        temp[activeTab] = { ...folder }
        return [...temp]
      })
    },
    [activeTab, rootFolder]
  )
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
  const zoomChange = useCallback((change: number) => {
    setZoom((current) => Math.min(Math.max(current + change, 1), 5))
  }, [])
  const changeToSubFolder = useCallback(
    (name: string) => {
      const folder = getFolder(rootFolder, [...address[activeTab], name])
      if (!folder) return
      setCurrentFolder((current) => {
        const temp = [...current]
        temp[activeTab] = { ...folder }
        return [...temp]
      })
      setAddress((current) => {
        const temp = [...current]
        temp[activeTab] = [...current[activeTab], name]
        return [...temp]
      })
      setHistory((current) => {
        let temp = [...current]
        temp[activeTab].push(address[activeTab])
        if (temp[activeTab].length > 20) {
          temp[activeTab].shift()
        }
        return [...temp]
      })
    },
    [activeTab, address, rootFolder]
  )

  useEffect(() => {
    dispatch(setWindowTitle({ id: props.id, title: "File Manager" }))
    dispatch(setWindowMinSize({ id: props.id, minSize: { x: 485, y: 250 } }))
  }, [dispatch, props.id])
  useEffect(() => {
    onAddressChange(["/", "home", "shahab"])
  }, [onAddressChange])
  console.log(history)
  return (
    <Window
      id={props.id}
      sidePanelChildren={
        <FileManagerSidePanel
          id={props.id}
          tab={"0"}
          addressChange={onAddressChange}
          currentAddress={address[activeTab]}
          zoomChanged={zoomChange}
          currentZoom={zoom}
        />
      }
      topBarChildren={
        <FileManagerTopBar
          windowId={props.id}
          tab={activeTab}
          view={fileView}
          fileViewChange={changeFileView}
          address={address[activeTab]}
        />
      }
    >
      <FolderViewer
        items={currentFolder[activeTab]}
        view={fileView[activeTab]}
        zoom={zoom}
        folderDoubleClicked={changeToSubFolder}
      />
    </Window>
  )
}
