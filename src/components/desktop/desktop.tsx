import { TopBar } from "./top-bar/top-bar";
import { WindowManager } from "./window-manager/window-manager";
import styles from "./desktop.module.css"
type Props = {};
export const Desktop = (props: Props) => {
  return (
    <div className={styles.desktop}>
      <TopBar />
      <WindowManager />
    </div>
  );
};
