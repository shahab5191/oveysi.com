import { ReactNode } from "react"
import { ActionType, windowEdges } from "./enums"
import { AppID } from "../utilities/get-app-by-id"

export interface Vec2 {
  x: number
  y: number
}
export interface WindowProperties {
  id: string
  appId: AppID
  title: string
  pos: Vec2
  size: Vec2
  children?: ReactNode
  maximized: boolean
  zIndex: number
  scale: number
  canAnimate: boolean
  lastState: { pos: Vec2; size: Vec2 }
  appState: Record<string, any>
  minSize: Vec2
}

export interface Action {
  type: ActionType
  option?: {
    direction: windowEdges
  }
}

export enum FileType {
  IMAGE,
  SOUND,
  VIDEO,
  TEXT,
  PDF,
}
export interface File {
  name: string
  icon: string
  type: FileType
}
export interface FolderStruct {
  name?: string
  files?: File[]
  subFolders: string[]
  address: string[]
}
