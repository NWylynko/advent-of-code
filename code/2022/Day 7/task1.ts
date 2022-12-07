import { input } from "./input"

// const input = `$ cd /
// $ ls
// dir a
// 14848514 b.txt
// 8504156 c.dat
// dir d
// $ cd a
// $ ls
// dir e
// 29116 f
// 2557 g
// 62596 h.lst
// $ cd e
// $ ls
// 584 i
// $ cd ..
// $ cd ..
// $ cd d
// $ ls
// 4060174 j
// 8033020 d.log
// 5626152 d.ext
// 7214296 k`;

export type CustomFile = { type: "file", name: string, size: number }
export type Folder = { type: "folder", name: string, children: (Folder | CustomFile)[] }
export type FolderWithSizes = { type: "folder", name: string, size: number, children: (FolderWithSizes | CustomFile)[] }

export const decode = (terminalOutput: string[]) => {

  let fileSystem: Folder = { type: "folder", name: "/", children: [] }
  let currentDirectory: string[] = []; // start at the root dir

  terminalOutput.forEach((terminalLine) => {
    const output = terminalLine.split(' ')

    // console.log(currentDirectory, fileSystem)

    switch (output[0]) {
      case '$': { // a command
        const command = output[1] as "cd" | "ls"

        switch (command) {
          case "cd": { // change current directory
            const location = output[2]

            // console.log({ action: "change dir", location })

            switch (location) {
              case '/': { // go to root directory
                currentDirectory = []
                break;
              }
              case '..': { // go up a directory
                currentDirectory.pop()
                break;
              }
              default: { // go down a directory
                currentDirectory.push(location)
                break;
              }
            }

            break;
          }
          case 'ls': { // list out the files and folders in the current directory
            // not sure anything needs to be done here

            // console.log({ action: "list dir" })

            break;
          }
          default: {
            throw new Error(`unknown command: "${command}"`)
          }
        }
        break;
      }
      case 'dir': { // a folder

        const newFolderName = output[1]

        // console.log({ action: "create a folder", newFolderName })

        let parentFolder: Folder = fileSystem

        for (const dir of currentDirectory) {
          parentFolder = parentFolder.children.find(({ type, name }) => type === "folder" && name === dir) as Folder
        }

        const existingFolder = parentFolder.children.find(({ type, name }) => type === "folder" && name === newFolderName)

        if (!existingFolder) {
          parentFolder.children.push({ type: "folder", name: newFolderName, children: [] })
        }

        break;
      }
      default: { // a file

        const size = Number(output[0])
        const newFileName = output[1]

        // console.log({ action: "create file", newFileName, size })

        let parentFolder: Folder = fileSystem

        for (const dir of currentDirectory) {
          parentFolder = parentFolder.children.find(({ type, name }) => type === "folder" && name === dir) as Folder
        }

        const existingFile = parentFolder.children.find(({ type, name }) => type === "file" && name === newFileName)

        if (!existingFile) {
          parentFolder.children.push({ type: "file", name: newFileName, size })

        }

        break;
      }
    }

  })

  return fileSystem

}

// this seems very unoptimised lol
export const countFolderSize = (folder: Folder): FolderWithSizes => {
  return {
    ...folder,
    size: folder.children.reduce<number>((size, folderOrFile) => {
      switch (folderOrFile.type) {
        case 'file': {
          const file = folderOrFile
          return size + file.size;
        }
        case 'folder': {
          const folder = folderOrFile as FolderWithSizes
          return size + countFolderSize(folder).size
        }
      }
    }, 0),
    children: folder.children.map((folderOrFile) => {
      switch (folderOrFile.type) {
        case 'folder': {
          return countFolderSize(folderOrFile)
        }
        case 'file': {
          return folderOrFile
        }
      }
    })
  }
}

export const findSmallFolders = (folder: FolderWithSizes): FolderWithSizes[] => {
  let smallFolders: FolderWithSizes[] = []

  folder.children.forEach((folderOrFile) => {
    if (folderOrFile.type === "folder") {
      const folder = folderOrFile

      const subSmallFolders = findSmallFolders(folder)

      smallFolders = [...smallFolders, ...subSmallFolders]

      if (folder.size <= 100000) {
        smallFolders.push({ ...folder, children: [] }) // remove children to just optimise on memory a little
      }
    }
  })

  return smallFolders
}

// this doesn't need to traverse the tree
export const countFolderSizes = (folders: FolderWithSizes[]): number => {
  return folders.reduce<number>((total, folder) => {
    return total + folder.size
  }, 0)
}

export const fileSystem = decode(input.split("\n"))
export const fullFileSystem = countFolderSize(fileSystem)
export const smallFolders = findSmallFolders(fullFileSystem)
export const totalSizeOfSmallFolders = countFolderSizes(smallFolders)

console.log({ totalSizeOfSmallFolders })