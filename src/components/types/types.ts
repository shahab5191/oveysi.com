import { ReactNode } from "react";

export interface Vec2 {
  x: number;
  y: number;
}
export interface WindowProperties {
  id: string;
  pos: Vec2;
  size: Vec2;
  children?: ReactNode;
  maximized: boolean;
}