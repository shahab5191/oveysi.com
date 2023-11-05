import { TopBar } from "./top-bar/top-bar"
import { WindowManager } from "./window-manager/window-manager"
import styles from "./desktop.module.css"
import { ReactNode, useEffect, useMemo } from "react"
import { useDispatch } from "react-redux"
import { openWindow } from "../../redux/slices/window-manager-slice"
import { Vec2 } from "../../types/types"
import { useAppSelector } from "../../redux/hooks"
import { ViewState, getViewState } from "../../redux/slices/desktop-slice"
import settings from "../../settings/settings.json"
import { Workspace } from "./workspace/workspace"
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
  const viewState = useAppSelector(getViewState)

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
      children: "test\ntest",
    })
    addWindow({
      title: "window 2",
      size: { x: 600, y: 400 },
      id: "2234",
    })
  }, [addWindow])
  return (
    <div
      className={`${styles.workspace} ${viewState ? styles.isOverview : ""}`}
    >
      <TopBar />
      <Workspace />

      <div
        id="desktop-window-manager"
        className={`${styles.desktop} ${
          viewState === ViewState.overview ? styles.overview : ""
        } ${viewState === ViewState.iconview ? styles.iconView : ""}`}
        style={{
          backgroundImage: `url(${settings.wallpaper})`,
          backgroundSize: "cover",
        }}
      >
        <WindowManager />
      </div>
    </div>
  )
}
