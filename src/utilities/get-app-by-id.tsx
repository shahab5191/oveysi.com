import { AboutMeApp } from "../apps/about-me/about-me"
import { FileManager } from "../apps/file-manager/file-manager"

export enum AppID {
  AboutMe,
  FileManager,
}
interface Props {
  appId: AppID
  windowId: string
}
export const GetAppByID = ({ appId, windowId }: Props) => {
  switch (appId) {
    case AppID.AboutMe:
      return <AboutMeApp id={windowId} />
    case AppID.FileManager:
      return <FileManager id={windowId} />
    default:
      return <div></div>
  }
}
