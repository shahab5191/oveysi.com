import { ReactElement, ReactNode, useEffect, useMemo, useState } from "react";
import { Window } from "../../window/window";
import styles from "./window-manager.module.css";
import { ActionType, objectTypes, windowEdges } from "../../types/enums";
import { moveWindow, resizeWindow } from "./functions";
import { Vec2, WindowProperties } from "../../types/types";

/** TODO: use a state manager like redux to manage state of windows */
interface Props {
}
interface Action {
  type: ActionType;
  option?: {
    direction: windowEdges;
  };
}



export const WindowManager = (props: Props) => {
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [mouseIsDown, setMouseIsDown] = useState(false);
  const [windowObj, setWindowObj] = useState<HTMLDivElement | null>(null);
  const [focusedWindow, setFocusedWindow] = useState("");
  const [windowList, setWindowList] = useState<WindowProperties[]>([]);
  const [action, setAction] = useState<Action>({
    type: ActionType.Resize,
    option: { direction: windowEdges.TOP_LEFT },
  });

  const changeDimension = (id: string, newPos?: Vec2, newSize?: Vec2) => {
    const temp = [...windowList];
    for (let window of temp) {
      if (window.id === id) {
        if (newPos) window.pos = newPos;
        if (newSize) window.size = newSize;
        return setWindowList([...temp]);
      }
    }
  };

  const mouseDownHandler = (e: React.MouseEvent) => {
    if (e.target) {
      const target = e.target as HTMLDivElement;
      if (target.getAttribute("object-type") === objectTypes.WINDOW) {
        setMouseIsDown(true);
        setWindowObj(target);
        setAction({ type: ActionType.Move });
        setLastMousePos({ x: e.pageX, y: e.pageY });
        setFocusedWindow(target.getAttribute("window-id")!);
      } else if (
        target.getAttribute("object-type") === objectTypes.WINDOW_EDGE
      ) {
        const direction = target.getAttribute("window-edge") as windowEdges;
        if (direction) {
          const window = target.parentElement as HTMLDivElement;
          setMouseIsDown(true);
          setWindowObj(window);
          setAction({
            type: ActionType.Resize,
            option: { direction },
          });
          setLastMousePos({ x: e.pageX, y: e.pageY });
          setFocusedWindow(window.getAttribute("window-id")!);
        }
      } else if (target.getAttribute("object-type")) {
        const window = target.closest(
          `[object-type=${objectTypes.WINDOW}]`
        ) as HTMLDivElement;
        if (!window) return;
        setMouseIsDown(true);
        setWindowObj(window);
        setAction({
          type: ActionType.Move,
        });
        setLastMousePos({ x: e.pageX, y: e.pageY });
        setFocusedWindow(window.getAttribute("window-id")!);
      }
    }
  };
  const mouseUpHandler = (e: React.MouseEvent) => {
    setMouseIsDown(false);
    setWindowObj(null);
  };
  const mouseMoveHandler = (e: React.MouseEvent) => {
    if (!mouseIsDown) return;
    if (windowObj === null) return;
    switch (action.type) {
      case ActionType.Move: {
        const movable = windowObj.getAttribute("is-movable");
        if (movable !== undefined && movable !== "0") {
          const newPos = moveWindow(windowObj, e.movementX, e.movementY);
          const id = windowObj.getAttribute("window-id");
          if (id) {
            return changeDimension(id, newPos);
          }
        }
        break;
      }
      case ActionType.Resize: {
        if (action.option) {
          const deltaX = e.pageX - lastMousePos.x;
          const deltaY = e.pageY - lastMousePos.y;
          const { newPos, newSize } = resizeWindow(
            windowObj,
            action.option?.direction,
            deltaX,
            deltaY
          );
          setLastMousePos({ x: e.pageX, y: e.pageY });
          const id = windowObj.getAttribute("window-id");
          if (id) {
            changeDimension(id, newPos, newSize);
            return;
          }
        }
        break;
      }
    }
  };

  const addWindow = (
    pos: Vec2,
    size: Vec2,
    id: string,
    children?: ReactNode
  ) => {
    setWindowList((current) => {
      for (let item of current) {
        if (item.id === id) return current;
      }
      return [...current, { pos, size, id, children, maximized: false }];
    });
  };
  const closeWindow = (id: string) => {
    setWindowList((current) => {
      const temp = [...current];
      for (let i = 0; i < current.length; i++) {
        if (current[i].id === id) {
          temp.splice(i, 1);
        }
      }
      return [...temp];
    });
  };

  useEffect(() => {
    addWindow({ x: 100, y: 100 }, { x: 300, y: 200 }, "2323", <div>test</div>);
    addWindow({ x: 200, y: 200 }, { x: 300, y: 200 }, "2354");
  }, []);

  const createWindowNodes = useMemo(() => {
    const arrayOfWindows: ReactElement[] = [];
    let i = 0;
    windowList.forEach((item) => {
      arrayOfWindows.push(
        <Window
          pos={item.pos}
          size={item.size}
          isFocused={item.id === focusedWindow}
          id={item.id}
          key={i}
          title={item.id}
          closeWindow={closeWindow}
        >
          {item.children}
        </Window>
      );
      i++;
    });
    return arrayOfWindows;
  }, [windowList, focusedWindow]);

  return (
    <div
      className={styles.windowManager}
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
      onMouseMove={mouseMoveHandler}
    >
      {createWindowNodes}
    </div>
  );
};
