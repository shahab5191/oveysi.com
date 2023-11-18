import { Window } from "../../components/ui/window/window"
import styles from "./about-me.module.css"
interface Props {
  id: string
}
export const AboutMeApp = (props: Props) => {
  return <Window id={props.id} sidePanelChildren="test"></Window>
}
