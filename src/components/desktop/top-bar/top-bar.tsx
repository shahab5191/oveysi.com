import { useEffect, useState } from "react";
import styles from "./top-bar.module.css";
import { getFormattedTime } from "../../../utilities/formatted-time";
type Props = {};
export const TopBar = (props: Props) => {
  const [time, setTime] = useState(getFormattedTime());
  useEffect(() => {
    setInterval(() => {
      setTime(getFormattedTime());
    }, 1000);
  }, []);
  return (
    <div className={styles.topBar}>
      <div>
        <p className={styles.date}>{time}</p>
      </div>
    </div>
  );
};
