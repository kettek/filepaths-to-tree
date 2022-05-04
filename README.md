# filepaths-to-tree
This module provides functions for creating and manipulating a plain object tree built from POSIX and win32 style paths. There are no classes, only functions that manipulate a POJO representing a tree structure.

## Functions

<dl>
<dt><a href="#Make">Make(paths, cb)</a> ⇒ <code>Object</code></dt>
<dd><p>Make creates a new tree object from an array of POSIX or win32 style paths.</p></dd>
<dt><a href="#Insert">Insert(root, lpath, value)</a> ⇒ <code>Object</code></dt>
<dd><p>Insert inserts the given path into the root object and assigns the value to the end node.</p></dd>
<dt><a href="#Remove">Remove(root, lpath)</a> ⇒ <code>Object</code></dt>
<dd><p>Remove removes the given path from the root object. Also removes any branches that are made empty during this process.</p></dd>
<dt><a href="#Find">Find(root, lpath)</a> ⇒ <code>Object</code></dt>
<dd><p>Find returns the tree branch, end node value, or undefined from the given path in the tree.</p></dd>
<dt><a href="#SplitPath">SplitPath(lpath)</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd><p>SplitPath returns an array of strings representing a path's structure split by forward or back slashes.</p></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#MakeCallback">MakeCallback</a> ⇒ <code>any</code></dt>
<dd></dd>
</dl>

<a name="Make"></a>

## Make(paths, cb) ⇒ <code>Object</code>
<p>Make creates a new tree object from an array of POSIX or win32 style paths.</p>

**Returns**: <code>Object</code> - <p>The resulting tree.</p>  

| Param | Type | Description |
| --- | --- | --- |
| paths | <code>Array.&lt;string&gt;</code> | <p>An array of POSIX or win32 style paths to build the tree object.</p> |
| cb | [<code>MakeCallback</code>](#MakeCallback) | <p>A optional callback to assign to the end node of the path.</p> |

**Example**  
```js
// returns { a: { b: { c: 'a/b/c', d: 'a\\b\\d', e: 'a\\b/e' } }, b: { c: { a: 'b/c\\a' } } }
Make(['a/b/c', 'a\\b\\d', 'a\\b/e', 'b/c\\a'], p => p)
```
<a name="Insert"></a>

## Insert(root, lpath, value) ⇒ <code>Object</code>
<p>Insert inserts the given path into the root object and assigns the value to the end node.</p>

**Returns**: <code>Object</code> - <p>The root tree object.</p>  

| Param | Type | Description |
| --- | --- | --- |
| root | <code>Object</code> | <p>The root tree object to grow to fit the path.</p> |
| lpath | <code>string</code> | <p>The POSIX or win32 path to create as a branch.</p> |
| value | <code>any</code> | <p>The value to set the end of the branch to.</p> |

**Example**  
```js
// returns { my: { mixed: { path: 'something' } } }
Insert({}, '/my\\mixed/path', 'something')
```
<a name="Remove"></a>

## Remove(root, lpath) ⇒ <code>Object</code>
<p>Remove removes the given path from the root object. Also removes any branches that are made empty during this process.</p>

**Returns**: <code>Object</code> - <p>The root tree object.</p>  

| Param | Type | Description |
| --- | --- | --- |
| root | <code>Object</code> | <p>The root tree object to grow to fit the path.</p> |
| lpath | <code>string</code> | <p>The POSIX or win32 path to remove from the tree.</p> |

**Example**  
```js
// returns { a: { '1': 'a/1', '2': 'a/2' }, b: { '1': 'b\\1' } }
let t = Make(['a/1', 'a/2', 'b\\1'])
// returns { a: { '2': 'a/2' }, b: { '1': 'b\\1' } }
Remove(t, 'a/1')
// returns { a: { '2': 'a/2' } }
Remove(t, 'b/1')
```
<a name="Find"></a>

## Find(root, lpath) ⇒ <code>Object</code>
<p>Find returns the tree branch, end node value, or undefined from the given path in the tree.</p>

**Returns**: <code>Object</code> - <p>The tree branch, end value, or undefined.</p>  

| Param | Type | Description |
| --- | --- | --- |
| root | <code>Object</code> | <p>The root tree object to grow to fit the path.</p> |
| lpath | <code>string</code> | <p>The POSIX or win32 path to remove from the tree.</p> |

<a name="SplitPath"></a>

## SplitPath(lpath) ⇒ <code>Array.&lt;string&gt;</code>
<p>SplitPath returns an array of strings representing a path's structure split by forward or back slashes.</p>

**Returns**: <code>Array.&lt;string&gt;</code> - <p>An array of paths separated by <code>/</code> or <code>\\</code>.</p>  

| Param | Type | Description |
| --- | --- | --- |
| lpath | <code>string</code> | <p>The POSIX or win32 path to remove from the tree.</p> |

<a name="MakeCallback"></a>

## MakeCallback ⇒ <code>any</code>
**Returns**: <code>any</code> - <p>The value to assign to the given entry.</p>  

| Param | Type | Description |
| --- | --- | --- |
| fullpath | <code>string</code> | <p>The full path of the given entry.</p> |


* * *

&copy; 2022 Ketchetwahmeegwun T. Southall
