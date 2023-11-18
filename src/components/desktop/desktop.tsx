import { TopBar } from "./top-bar/top-bar"
import { WindowManager } from "./window-manager/window-manager"
import styles from "./desktop.module.css"
import { ReactNode, useCallback, useEffect } from "react"
import { useDispatch } from "react-redux"
import { openWindow } from "../../redux/slices/window-manager-slice"
import { Vec2 } from "../../types/types"
import { useAppSelector } from "../../redux/hooks"
import {
  ViewState,
  getViewState,
  setViewState,
} from "../../redux/slices/window-manager-slice"
import settings from "../../settings/settings.json"
import { Workspace } from "./workspace/workspace"
interface AddWindow {
  appId: string
  title: string
  pos?: Vec2
  size?: Vec2
  id: string
  children?: ReactNode
}

type Props = {}
export const Desktop = (props: Props) => {
  const dispatch = useDispatch()
  const viewState = useAppSelector(getViewState)

  const addWindow = useCallback(
    ({ appId, title, pos, size, id, children }: AddWindow) => {
      dispatch(openWindow({ appId, id, pos, size, children, title }))
    },
    [dispatch]
  )

  const desktopClickHandler = useCallback(() => {
    if (viewState !== ViewState.desktopview) {
      dispatch(setViewState(ViewState.desktopview))
    }
  }, [dispatch, viewState])

  useEffect(() => {
    addWindow({
      appId: "1",
      title: "window 1",
      id: "1234",
      children: "test\ntest",
    })
    addWindow({
      appId: "2",
      title: "window 2",
      size: { x: 600, y: 400 },
      id: "2234",
    })
    addWindow({
      appId: "1",
      title: "window 3",
      size: { x: 300, y: 200 },
      id: "1264",
      children: "test\ntest",
    })
    addWindow({
      appId: "3",
      title: "window 4",
      size: { x: 600, y: 400 },
      id: "2274",
    })
  }, [addWindow])

  useEffect(() => {
    setTimeout(() => {
      dispatch(setViewState(ViewState.overview))
    }, 0)
  }, [dispatch])

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
        onClick={desktopClickHandler}
      >
        <WindowManager />
      </div>
    </div>
  )
}
