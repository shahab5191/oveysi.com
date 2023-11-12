import { ReactNode } from "react"
import { ActionType, windowEdges } from "./enums"

export interface Vec2 {
  x: number
  y: number
}
export interface WindowProperties {
  id: string
  title: string
  pos: Vec2
  size: Vec2
  children?: ReactNode
  maximized: boolean
  zIndex: number
  scale: number
  canAnimate: boolean
  lasState: { pos: Vec2; size: Vec2 }
}

export interface Action {
  type: ActionType
  option?: {
    direction: windowEdges
  }
}
