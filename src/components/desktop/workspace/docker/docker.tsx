import styles from "./docker.module.css"
import settings from "../../../../settings/settings.json"
import { PiDotsNineBold } from "react-icons/pi"
import { IconItem } from "../icon-manager/icon"
import { IconContext } from "react-icons"
import { useCallback } from "react"
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks"
import {
  ViewState,
  getViewState,
  setViewState,
} from "../../../../redux/slices/desktop-slice"

interface Props {}
export const Docker = (props: Props) => {
  const dispatch = useAppDispatch()
  const viewstate = useAppSelector(getViewState)
  const iconViewButtonHandler = useCallback(() => {
    if (viewstate === ViewState.iconview)
      dispatch(setViewState(ViewState.desktopview))
    else dispatch(setViewState(ViewState.iconview))
  }, [dispatch, viewstate])
  return (
    <div
      className={styles.DockerContainer}
      style={{ height: settings.docker.dockerHeight }}
    >
      <IconContext.Provider value={{ size: "50px" }}>
        <IconItem
          icon={<PiDotsNineBold color="white" />}
          onClick={iconViewButtonHandler}
        />
      </IconContext.Provider>
    </div>
  )
}
