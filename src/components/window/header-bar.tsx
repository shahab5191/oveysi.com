import { objectTypes } from "../types/enums";
import { AiOutlineClose } from "react-icons/ai";
import { MdMinimize } from "react-icons/md";
import { VscChromeMaximize } from "react-icons/vsc";
import styles from "./header-bar.module.css";
type Props = {
  title: string;
  isFocused: boolean;
  toggleMaximize: (e: React.MouseEvent<HTMLButtonElement>) => void;
  closeHandler: () => void;
};
export const HeaderBar = (props: Props) => {
  return (
    <div
      className={`${styles.topBar} ${props.isFocused ? styles.focused : ""}`}
      object-type={objectTypes.TOP_BAR}
    >
      <h2 className={styles.header} object-type={objectTypes.TOP_BAR}>
        {props.title}
      </h2>
      <div className={styles.buttonsContainer}>
        <button
          className={`${styles.button} ${
            props.isFocused ? styles.focused : ""
          }`}
        >
          <MdMinimize />
        </button>
        <button
          className={`${styles.button} ${
            props.isFocused ? styles.focused : ""
          }`}
          onClick={props.toggleMaximize}
        >
          <VscChromeMaximize />
        </button>
        <button
          className={`${styles.button} ${
            props.isFocused ? styles.focused : ""
          }`}
          onClick={props.closeHandler}
        >
          <AiOutlineClose />
        </button>
      </div>
    </div>
  );
};
