// import { input } from "./input"
import { fullFileSystem as fileSystem } from "./task1"
import { traverseFileSystem } from "./traverseFileSystem"

const TOTAL_SIZE = 70000000
const NEEDED_SPACE = 30000000

const TOTAL_USED_SIZE = fileSystem.size
const TOTAL_UNUSED_SIZE = TOTAL_SIZE - TOTAL_USED_SIZE
const EXTRA_NEEDED_SPACE = NEEDED_SPACE - TOTAL_UNUSED_SIZE

const possibleFoldersToDelete: number[] = []

traverseFileSystem(fileSystem, {
  onFolder: (folder) => {
    if (folder.size >= EXTRA_NEEDED_SPACE) {
      possibleFoldersToDelete.push(folder.size)
    }
  }
})

const folderToDelete = possibleFoldersToDelete.sort((a, b) => a - b)[0]

console.log({ folderToDelete })