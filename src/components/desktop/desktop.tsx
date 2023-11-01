import { TopBar } from "./top-bar/top-bar"
import { WindowManager } from "./window-manager/window-manager"
import styles from "./desktop.module.css"
import { ReactNode, useEffect, useMemo } from "react"
import { useDispatch } from "react-redux"
import { openWindow } from "../../redux/slices/window-slice"
import { Vec2 } from "../../types/types"
import { IconManager } from "./icon-manager/icon-manager"

interface AddWindow {
  title: string
  pos?: Vec2
  size: Vec2
  id: string
  children?: ReactNode
}

type Props = {}
export const Desktop = (props: Props) => {
  const dispatch = useDispatch()
  const addWindow = useMemo(
    () =>
      ({ title, pos, size, id, children }: AddWindow) => {
        dispatch(openWindow({ id, pos, size, children, title }))
      },
    [dispatch]
  )
  useEffect(() => {
    addWindow({
      title: "window 1",
      size: { x: 300, y: 200 },
      id: "1234",
    })
    addWindow({
      title: "window 2",
      size: { x: 300, y: 200 },
      id: "2234",
    })
  }, [addWindow])
  return (
    <div className={styles.desktop}>
      <TopBar />
      <IconManager />
      <WindowManager />
    </div>
  )
}
