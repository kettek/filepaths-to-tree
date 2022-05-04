import * as path from 'path'

export function Insert(root: any, lpath: string, value: any) {
    const parts = lpath.split(path.win32.sep).join(path.posix.sep).split(path.posix.sep)
    let node = root
    for (let i = 0; i < parts.length; i++) {
        let p = parts[i]
        if (i === parts.length-1) {
            node[p] = value
        } else if (node[p] === undefined) {
            node[p] = {}
        }
        node = node[p]
    }
}

export function Make(paths: string[], cb: (fullpath: string) => any): any {
    let tree = {}
    for (let p of paths) {
        Insert(tree, p, cb(p))
    }
    return tree
}
