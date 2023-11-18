import styles from "./window.module.css";
import settings from "../../../settings/settings.json";
import { objectTypes, windowEdges } from "../../../types/enums";

interface Props{}
export const ResizeEdges = (props:Props) => {
  return(
    <>
    <div
      className={`${styles.edge} ${styles.leftEdgeIndicator}`}
      style={{
        width: settings.windowResizeOffset,
        bottom: settings.windowResizeOffset,
        top: settings.windowResizeOffset,
      }}
      object-type={objectTypes.WINDOW_EDGE}
      window-edge={windowEdges.LEFT}
    ></div>
    <div
      className={`${styles.edge} ${styles.topEdgeIndicator}`}
      style={{
        height: settings.windowResizeOffset,
        left: settings.windowResizeOffset,
        right: settings.windowResizeOffset,
      }}
      object-type={objectTypes.WINDOW_EDGE}
      window-edge={windowEdges.TOP}
    ></div>
    <div
      className={`${styles.edge} ${styles.rightEdgeIndicator}`}
      style={{
        width: settings.windowResizeOffset,
        bottom: settings.windowResizeOffset,
        top: settings.windowResizeOffset,
      }}
      object-type={objectTypes.WINDOW_EDGE}
      window-edge={windowEdges.RIGHT}
    ></div>
    <div
      className={`${styles.edge} ${styles.bottomEdgeIndicator}`}
      style={{
        height: settings.windowResizeOffset,
        left: settings.windowResizeOffset,
        right: settings.windowResizeOffset,
      }}
      object-type={objectTypes.WINDOW_EDGE}
      window-edge={windowEdges.BOTTOM}
    ></div>
    <div
      className={`${styles.edge} ${styles.topRightEdgeIndicator}`}
      style={{
        width: settings.windowResizeOffset * 2,
        height: settings.windowResizeOffset * 2,
      }}
      object-type={objectTypes.WINDOW_EDGE}
      window-edge={windowEdges.TOP_RIGHT}
    ></div>
    <div
      className={`${styles.edge} ${styles.topLeftEdgeIndicator}`}
      style={{
        width: settings.windowResizeOffset * 2,
        height: settings.windowResizeOffset * 2,
      }}
      object-type={objectTypes.WINDOW_EDGE}
      window-edge={windowEdges.TOP_LEFT}
    ></div>
    <div
      className={`${styles.edge} ${styles.bottomRightEdgeIndicator}`}
      style={{
        width: settings.windowResizeOffset * 2,
        height: settings.windowResizeOffset * 2,
      }}
      object-type={objectTypes.WINDOW_EDGE}
      window-edge={windowEdges.BOTTOM_RIGHT}
    ></div>
    <div
      className={`${styles.edge} ${styles.bottomLeftEdgeIndicator}`}
      style={{
        width: settings.windowResizeOffset * 2,
        height: settings.windowResizeOffset * 2,
      }}
      object-type={objectTypes.WINDOW_EDGE}
      window-edge={windowEdges.BOTTOM_LEFT}
    ></div>
  </>
  )
}
