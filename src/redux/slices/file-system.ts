import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { checkForDuplicateFolders } from "../../utilities/check-for-duplicates"
enum FileType {
  IMAGE,
  SOUND,
  VIDEO,
  TEXT,
  PDF,
}

interface File {
  name: string
  icon: string
  type: FileType
}
export interface Folder {
  name: string
  files: File[]
  folders: Folder[]
}
interface State {
  root: Folder
}

export const fileSystemSlice = createSlice({
  name: "folder",
  initialState: {
    root: { name: "/", files: [], folders: [] },
  } as State,
  reducers: {
    createFolder: (
      state,
      action: PayloadAction<{ address: Array<number>; name: string }>
    ) => {
      let current = state.root
      for (let i = 0; i < action.payload.address.length; i++) {
        if (current.folders.length <= action.payload.address[i]) {
          return
        }
        current = current.folders[action.payload.address[i]]
      }
      if (checkForDuplicateFolders(current.folders, action.payload.name)) return
      current.folders.push({
        name: action.payload.name,
        files: [],
        folders: [],
      })
      console.log(current.name)
    },
  },
})

export const { createFolder } = fileSystemSlice.actions

export default fileSystemSlice.reducer
