<a name="module_filepaths-to-tree"></a>

## filepaths-to-tree
Module for creating and manipulating a tree-style object from POSIX or win32 style paths.


* [filepaths-to-tree](#module_filepaths-to-tree)
    * [~Make(paths, cb)](#module_filepaths-to-tree..Make) ⇒
    * [~Insert(root, lpath, value)](#module_filepaths-to-tree..Insert) ⇒
    * [~Remove(root, lpath)](#module_filepaths-to-tree..Remove) ⇒
    * [~Find(root, lpath)](#module_filepaths-to-tree..Find) ⇒
    * [~SplitPath(lpath)](#module_filepaths-to-tree..SplitPath) ⇒

<a name="module_filepaths-to-tree..Make"></a>

### filepaths-to-tree~Make(paths, cb) ⇒
Make creates a new tree object from an array of POSIX or win32 style paths.

**Kind**: inner method of [<code>filepaths-to-tree</code>](#module_filepaths-to-tree)  
**Returns**: The resulting tree.  

| Param | Description |
| --- | --- |
| paths | An array of POSIX or win32 style paths to build the tree object. |
| cb | A optional callback to assign to the end node of the path. |

**Example**  
```js
// returns { a: { b: { c: 'a/b/c', d: 'a\\b\\d', e: 'a\\b/e' } }, b: { c: { a: 'b/c\\a' } } }
ftt.Make(['a/b/c', 'a\\b\\d', 'a\\b/e', 'b/c\\a'], p => p)
```
<a name="module_filepaths-to-tree..Insert"></a>

### filepaths-to-tree~Insert(root, lpath, value) ⇒
Insert inserts the given path into the root object and assigns the value to the end node.

**Kind**: inner method of [<code>filepaths-to-tree</code>](#module_filepaths-to-tree)  
**Returns**: The root tree object.  

| Param | Description |
| --- | --- |
| root | The root tree object to grow to fit the path. |
| lpath | The POSIX or win32 path to create as a branch. |
| value | The value to set the end of the branch as. |

**Example**  
```js
// returns { my: { mixed: { path: 'something' } } }
Insert({}, '/my\\mixed/path', 'something')
```
<a name="module_filepaths-to-tree..Remove"></a>

### filepaths-to-tree~Remove(root, lpath) ⇒
Remove removes the given path from the root object. Also removes any branches that are made empty during this process.

**Kind**: inner method of [<code>filepaths-to-tree</code>](#module_filepaths-to-tree)  
**Returns**: The root tree object.  

| Param | Description |
| --- | --- |
| root | The root tree object to grow to fit the path. |
| lpath | The POSIX or win32 path to remove from the tree. |

**Example**  
```js
// returns { a: { '1': 'a/1', '2': 'a/2' }, b: { '1': 'b\\1' } }
let t = Make(['a/1', 'a/2', 'b\\1'])
// returns { a: { '2': 'a/2' }, b: { '1': 'b\\1' } }
Remove(t, 'a/1')
// returns { a: { '2': 'a/2' } }
Remove(t, 'b/1')
```
<a name="module_filepaths-to-tree..Find"></a>

### filepaths-to-tree~Find(root, lpath) ⇒
Find returns the tree branch, end node value, or undefined from the given path in the tree.

**Kind**: inner method of [<code>filepaths-to-tree</code>](#module_filepaths-to-tree)  
**Returns**: The tree branch, end value, or undefined.  

| Param | Description |
| --- | --- |
| root | The root tree object to grow to fit the path. |
| lpath | The POSIX or win32 path to remove from the tree. |

<a name="module_filepaths-to-tree..SplitPath"></a>

### filepaths-to-tree~SplitPath(lpath) ⇒
SplitPath returns an array of strings representing a path's structure split by forward or back slashes.

**Kind**: inner method of [<code>filepaths-to-tree</code>](#module_filepaths-to-tree)  
**Returns**: An array of paths separated by '/' or '\\'.  

| Param | Description |
| --- | --- |
| lpath | The POSIX or win32 path to remove from the tree. |

