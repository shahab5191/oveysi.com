import { Folder } from "../redux/slices/file-system"

export const checkForDuplicateFolders = (arr: Array<Folder>, name: string) => {
  for (let item of arr) {
    if (item.name === name) return true
  }
  return false
}
export const indexOfFolder = (name: string, arr: Array<Folder>) => {
  let j = -1
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].name === name) {
      j = i
      break
    }
  }
  return j
}

export const getFolder = (rootFolder: Folder[], address: string[]) => {
  let current = rootFolder
  let folder: Folder | undefined
  for (let i = 0; i < address.length; i++) {
    const index = indexOfFolder(address[i], current)
    if (index === -1) return
    if (i !== address.length - 1) {
      current = current[index].folders
    } else {
      folder = current[index]
    }
  }
  const subFolders: string[] = []
  folder!.folders.forEach((item) => {
    subFolders.push(item.name)
  })
  const result = {
    name: folder?.name,
    files: folder?.files,
    subFolders,
    address,
  }
  console.log(result)
  return result
}
