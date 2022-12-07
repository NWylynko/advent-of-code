// import { input } from "./input"
import { CustomFile, fullFileSystem as fileSystem, type FolderWithSizes as Folder } from "./task1"

const TOTAL_SIZE = 70000000
const NEEDED_SPACE = 30000000

const TOTAL_USED_SIZE = fileSystem.size
const TOTAL_UNUSED_SIZE = TOTAL_SIZE - TOTAL_USED_SIZE
const EXTRA_NEEDED_SPACE = NEEDED_SPACE - TOTAL_UNUSED_SIZE

// console.log({
//   TOTAL_SIZE,
//   NEEDED_SPACE,
//   TOTAL_UNUSED_SIZE,
//   EXTRA_NEEDED_SPACE
// })

const traverseFileSystem = (fileSystem: Folder, fn: (fileOrFolder: Folder | CustomFile) => void) => {
  return {
    ...fileSystem,
    children: fileSystem.children.map((fileOrFolder) => {
      fn(fileOrFolder)
      if (fileOrFolder.type === "folder") {
        return traverseFileSystem(fileOrFolder, fn)
      }
    })
  }
}

const possibleFoldersToDelete: number[] = []

traverseFileSystem(fileSystem, (fileOrFolder) => {
  if (fileOrFolder.type === "folder") {
    if (fileOrFolder.size >= EXTRA_NEEDED_SPACE) {
      possibleFoldersToDelete.push(fileOrFolder.size)
    }
  }
})

const folderToDelete = possibleFoldersToDelete.sort((a, b) => a - b)[0]

console.log({ folderToDelete })