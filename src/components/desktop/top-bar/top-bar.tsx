import { useEffect, useState } from "react"
import styles from "./top-bar.module.css"
import { getFormattedTime } from "../../../utilities/formatted-time"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import {
  ViewState,
  getViewState,
  setViewState,
} from "../../../redux/slices/desktop-slice"
type Props = {}
export const TopBar = (props: Props) => {
  const [time, setTime] = useState(getFormattedTime())
  const viewstate = useAppSelector(getViewState)
  const dispatch = useAppDispatch()

  const activitiesClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (viewstate === ViewState.desktopview)
      dispatch(setViewState(ViewState.overview))
    else dispatch(setViewState(ViewState.desktopview))
  }

  useEffect(() => {
    setInterval(() => {
      setTime(getFormattedTime())
    }, 1000)
  }, [])
  return (
    <div className={styles.topBar}>
      <button
        className={`${styles.activities} ${styles.topBarButton}`}
        onClick={activitiesClickHandler}
      >
        Activities
      </button>
      <button className={`${styles.date} ${styles.topBarButton}`}>
        {time}
      </button>
      <div></div>
    </div>
  )
}
