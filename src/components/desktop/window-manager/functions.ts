import { windowEdges } from "../../../types/enums";

export const moveWindow = (
  windowObj: HTMLDivElement,
  movementX: number,
  movementY: number
) => {
  const left = parseInt(windowObj.style.left);
  const top = parseInt(windowObj.style.top);
  windowObj.style.left = left + movementX + "px";
  windowObj.style.top = top + movementY + "px";
  return { x: left + movementX, y: top + movementY };
};

export const resizeWindow = (
  windowObj: HTMLDivElement,
  direction: windowEdges,
  deltaX: number,
  deltaY: number
) => {
  if (!windowObj) return { newPos: { x: 0, y: 0 }, newSize: { x: 0, y: 0 } };
  const width = parseInt(windowObj.style.width);
  const height = parseInt(windowObj.style.height);
  const left = windowObj.offsetLeft;
  const top = windowObj.offsetTop;
  let newTop = top,
    newLeft = left,
    newWidth = width,
    newHeight = height;
  switch (direction) {
    case windowEdges.RIGHT:
      newWidth = width + deltaX;
      break;
    case windowEdges.BOTTOM:
      newHeight = height + deltaY;
      break;
    case windowEdges.LEFT:
      newLeft = left + deltaX;
      newWidth = width - deltaX;
      break;
    case windowEdges.TOP:
      newTop = top + deltaY;
      newHeight = height - deltaY;
      break;
    case windowEdges.BOTTOM_RIGHT:
      newWidth = width + deltaX;
      newHeight = height + deltaY;
      break;
    case windowEdges.BOTTOM_LEFT:
      newWidth = width - deltaX;
      newHeight = height + deltaY;
      newLeft = left + deltaX;
      break;
    case windowEdges.TOP_RIGHT:
      newWidth = width + deltaX;
      newTop = top + deltaY;
      newHeight = height - deltaY;
      break;
    case windowEdges.TOP_LEFT:
      newLeft = left + deltaX;
      newTop = top + deltaY;
      newHeight = height - deltaY;
      newWidth = width - deltaX;
      break;
    default:
      break;
  }
  const newPos = { x: newLeft, y: newTop };
  const newSize = { x: newWidth, y: newHeight };
  return { newPos, newSize };
};
