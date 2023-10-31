import styles from "./window.module.css";
import { ResizeEdges } from "./resize-area";
import { objectTypes } from "../types/enums";
import { Vec2 } from "../types/types";
import { ReactNode, useEffect, useRef, useState } from "react";
import { HeaderBar } from "./header-bar";

interface Props {
  pos: Vec2;
  size: Vec2;
  isFocused: boolean;
  id: string;
  children?: ReactNode;
  title: string;
  closeWindow: (id: string) => void;
}

export const Window = (props: Props) => {
  const [maximized, setMaximized] = useState(false);
  const [lastPos, setLastPos] = useState(props.pos);
  const [lastSize, setLastSize] = useState(props.size);
  const [animateTransform, setAnimateTransform] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const toggleMaximize = (e: React.MouseEvent<HTMLButtonElement>) => {
    setMaximized((current) => !current);
    if (ref.current) {
      if (!maximized) {
        setAnimateTransform(true);
        setLastPos({
          x: parseInt(ref.current.style.left),
          y: parseInt(ref.current.style.top),
        });
        setLastSize({
          x: parseInt(ref.current.style.width),
          y: parseInt(ref.current.style.height),
        });
      } else {
        setTimeout(() => setAnimateTransform(false), 200);
      }
    }
  };

  const closeHandler = () => {
    props.closeWindow(props.id);
  };

  useEffect(() => {
    setLastPos(props.pos);
    setLastSize(props.size);
  }, [props]);
  console.log(props.id, lastPos)
  return (
    <div
      ref={ref}
      className={`${styles.window} ${props.isFocused ? styles.focused : ""} ${
        maximized ? styles.maximized : ""
      } ${animateTransform ? styles.animateTransform : ""}`}
      style={{
        left: maximized ? 0 : lastPos.x,
        top: maximized ? 0 : lastPos.y,
        width: maximized ? "calc(100% - 2px)" : lastSize.x,
        height: maximized ? "calc(100% - 2px)" : lastSize.y,
        zIndex: props.isFocused ? 9999 : 1,
      }}
      object-type={objectTypes.WINDOW}
      window-id={props.id}
      is-movable={maximized ? 0 : 1}
    >
      {maximized ? null : <ResizeEdges />}
      <HeaderBar
        title={props.title}
        isFocused={props.isFocused}
        toggleMaximize={toggleMaximize}
        closeHandler={closeHandler}
      />
      <div>{props.children}</div>
    </div>
  );
};
