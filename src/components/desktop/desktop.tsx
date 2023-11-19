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
import { AppID } from "../../utilities/get-app-by-id"
interface AddWindow {
  appId: AppID
  pos?: Vec2
  size?: Vec2
  id: string
  children?: ReactNode
  appInitialState: Record<string, any>
}

type Props = {}
export const Desktop = (props: Props) => {
  const dispatch = useDispatch()
  const viewState = useAppSelector(getViewState)

  const addWindow = useCallback(
    ({ appId, pos, size, id, children, appInitialState }: AddWindow) => {
      dispatch(openWindow({ appId, id, pos, size, children, appInitialState }))
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
      appId: AppID.FileManager,
      size: { x: 600, y: 400 },
      id: "1234",
      appInitialState: { "0": {} },
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
