import { FileItem } from "../../components/ui/file-items/file-item"
import { FileView } from "../../types/enums"
import { FolderStruct } from "../../types/types"
import styles from "./folder-view.module.css"

interface Props {
  items?: FolderStruct
  view: FileView
  zoom: number
  folderDoubleClicked?: (name: string) => void
}
export const FolderViewer = (props: Props) => {
  return (
    <div className={styles.scrollWrapper}>
      <div
        className={`${styles.container} ${
          props.view === FileView.GRID ? styles.grid : styles.list
        } ${styles["zoom" + props.zoom]}`}
      >
        {props.items?.subFolders.map((item, i) => {
          return (
            <div className={styles.itemWrapper}>
              <FileItem
                key={i}
                icon="/icons/file-view/folder.webp"
                label={item}
                iconWidth={props.zoom * 20 + 10}
                doubleClick={props.folderDoubleClicked}
              />
            </div>
          )
        })}
        {props.items?.files?.map((item, i) => {
          return (
            <FileItem
              key={i + 100}
              label={item.name}
              iconWidth={props.zoom * 20 + 10}
            />
          )
        })}
      </div>
    </div>
  )
}
