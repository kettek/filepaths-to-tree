/**
 * Module for creating and manipulating a tree-style object from POSIX or win32 style paths. 
 * @module filepaths-to-tree
 */

/**
 * Make creates a new tree object from an array of POSIX or win32 style paths.
 * 
 * @example
 * // returns { a: { b: { c: 'a/b/c', d: 'a\\b\\d', e: 'a\\b/e' } }, b: { c: { a: 'b/c\\a' } } }
 * ftt.Make(['a/b/c', 'a\\b\\d', 'a\\b/e', 'b/c\\a'], p => p)
 * 
 * @param paths An array of POSIX or win32 style paths to build the tree object.
 * @param cb A optional callback to assign to the end node of the path.
 * @returns The resulting tree.
 */
export function Make(paths: string[], cb: (fullpath: string) => any = (s: string) => s): any {
    let tree = {}
    for (let p of paths) {
        Insert(tree, p, cb(p))
    }
    return tree
}

/**
 * Insert inserts the given path into the root object and assigns the value to the end node.
 * 
 * @example
 * // returns { my: { mixed: { path: 'something' } } }
 * Insert({}, '/my\\mixed/path', 'something')
 * 
 * @param root The root tree object to grow to fit the path.
 * @param lpath The POSIX or win32 path to create as a branch.
 * @param value The value to set the end of the branch as.
 * @returns The root tree object.
 */
export function Insert(root: any, lpath: string, value: any): any {
    const parts = SplitPath(lpath)
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
    return root
}

/**
 * Remove removes the given path from the root object. Also removes any branches that are made empty during this process.
 * 
 * @example
 * // returns { a: { '1': 'a/1', '2': 'a/2' }, b: { '1': 'b\\1' } }
 * let t = Make(['a/1', 'a/2', 'b\\1'])
 * // returns { a: { '2': 'a/2' }, b: { '1': 'b\\1' } }
 * Remove(t, 'a/1')
 * // returns { a: { '2': 'a/2' } }
 * Remove(t, 'b/1')
 * 
 * @param root The root tree object to grow to fit the path.
 * @param lpath The POSIX or win32 path to remove from the tree.
 * @returns The root tree object.
 */
export function Remove(root: any, lpath: string): any {
    const parts = SplitPath(lpath)
    let node = root
    let traversed = []
    for (let i = 0; i < parts.length; i++) {
        let p = parts[i]
        if (node[p] === undefined) return root // Doesn't exist, return early.

        traversed.push(node)
        node = node[p]
    }

    for (let i = parts.length-1; i >= 0; i--) {
        let p = parts[i]
        let o = traversed[i]
        if (i === parts.length-1) {
            delete o[p]
        } else if (Object.keys(o[p]).length === 0) {
            delete o[p]
        }
    }

    return root
}

/**
 * Find returns the tree branch, end node value, or undefined from the given path in the tree.
 * 
 * @param root The root tree object to grow to fit the path.
 * @param lpath The POSIX or win32 path to remove from the tree.
 * @returns The tree branch, end value, or undefined.
 */
export function Find(root: any, lpath: string): any {
    const parts = SplitPath(lpath)
    let node = root
    for (let i = 0; i < parts.length; i++) {
        let p = parts[i]
        if (node[p] === undefined) return undefined
        node = node[p]
    }
    return node
}

/**
 * SplitPath returns an array of strings representing a path's structure split by forward or back slashes.
 * 
 * @param lpath The POSIX or win32 path to remove from the tree.
 * @returns An array of paths separated by '/' or '\\'.
 */
export function SplitPath(lpath: string): string[] {
    return lpath.split('\\').map(v=>v.split('/')).reduce((p,c)=>Array.isArray(c)?[...p,...c]:[...p,c], []).filter(v=>v!=='')
}