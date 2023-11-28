import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import {
  indexOfFolder,
  checkForDuplicateFolders,
} from "../../utilities/file-system-utils"
import { RootState } from "../store"
import { File } from "../../types/types"

export interface Folder {
  name: string
  files: File[]
  folders: Folder[]
}
interface State {
  root: Folder[]
}

export const fileSystemSlice = createSlice({
  name: "folder",
  initialState: {
    root: [{ name: "/", files: [], folders: [] }],
  } as State,
  reducers: {
    createFolder: (
      state,
      action: PayloadAction<{ address: Array<string>; name: string }>
    ) => {
      let current = state.root
      for (let i = 0; i < action.payload.address.length; i++) {
        const index = indexOfFolder(action.payload.address[i], current)
        if (index === -1) return
        current = current[index].folders
      }
      if (checkForDuplicateFolders(current, action.payload.name)) return
      current.push({
        name: action.payload.name,
        files: [],
        folders: [],
      })
    },
  },
})

export const getRoot = (state: RootState) => {
  return state.fileSystemReducer.root
}

export const { createFolder } = fileSystemSlice.actions
export default fileSystemSlice.reducer
