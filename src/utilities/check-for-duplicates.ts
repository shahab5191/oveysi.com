import { Folder } from "../redux/slices/file-system"

export const checkForDuplicateFolders = (arr: Array<Folder>, name: string) => {
  for(let item of arr){
    if(item.name === name) return true
  }
  return false
}
