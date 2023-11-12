import styles from "./workspace.module.css"
import { IconManager } from "./icon-manager/icon-manager"
import { Docker } from "./docker/docker"
import { useEffect, useState } from "react"
import { useAppSelector } from "../../../redux/hooks"
import { ViewState, getViewState } from "../../../redux/slices/window-manager-slice"
import settings from "../../../settings/settings.json"

interface Props {}
export const Workspace = (props: Props) => {
  const viewstate = useAppSelector(getViewState)
  const [iconManagerTop, setIconManagerTop] = useState<number>(0)
  const [iconManagerHeight, setIconManagerHeight] = useState<number>(0)

  useEffect(() => {
    const desktopItem = document.getElementById(
      "desktop-window-manager"
    ) as HTMLDivElement
    if (!desktopItem) return

    let scale = settings.viewState.iconViewScale

    let icTop =
      (window.innerHeight - settings.topBarHeight) * scale +
      settings.topBarHeight +
      20

    let height =
      window.innerHeight - icTop - (settings.docker.dockerHeight + 40)

      setIconManagerTop(icTop)
    setIconManagerHeight(height)
  }, [viewstate])

  return (
    <div className={styles.Workspace}>
      <IconManager
        style={{
          top:
            viewstate === ViewState.iconview
              ? iconManagerTop + 10 + "px"
              : window.innerHeight + "px",
          height: iconManagerHeight + "px",
        }}
      />
      <Docker />
    </div>
  )
}
