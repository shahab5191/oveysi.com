import { useEffect } from "react"
import { Window } from "../../components/ui/window/window"
import { useAppDispatch } from "../../redux/hooks"
import {
  setWindowTitle,
} from "../../redux/slices/window-manager-slice"
import { FileManagerSidePanel } from "./side-panel"

interface Props {
  id: string
}
export const FileManager = (props: Props) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(setWindowTitle({ id: props.id, title: "File Manager" }))
  }, [dispatch, props.id])
  return (
    <Window
      id={props.id}
      sidePanelChildren={<FileManagerSidePanel id={props.id} tab={"0"} />}
      topBarChildren={<div style={{ backgroundColor: "red" }}>shahab</div>}
    ></Window>
  )
}
