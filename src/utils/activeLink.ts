export const activeLink = (currentPath: string, targetPath: string[]): boolean => {
    return targetPath.includes(currentPath)
}