
type Funcs<File, Folder> = {
  onFileOrFolder?: (fileOrFolder: File | Folder) => void,
  onFile?: (file: File) => void,
  onFolder?: (folder: Folder) => void
}



const defaultFuncs = {
  onFileOrFolder: () => { },
  onFile: () => { },
  onFolder: () => { }
}

export const traverseFileSystem = <File extends { type: "file" }, Folder extends { type: "folder", children: (File | Folder)[] }>(fileSystem: Folder, funcs: Funcs<File, Folder>) => {
  const { onFileOrFolder, onFile, onFolder } = { ...defaultFuncs, ...funcs }
  onFileOrFolder(fileSystem)
  onFolder(fileSystem)
  return {
    ...fileSystem,
    children: fileSystem.children.map((fileOrFolder) => {
      if (fileOrFolder.type === "folder") {
        return traverseFileSystem(fileOrFolder, funcs);
      } else {
        onFileOrFolder(fileOrFolder)
        onFile(fileOrFolder)
      }
    })
  };
};
