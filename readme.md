Noddity FS Retrieval
=====

[![Build Status](https://travis-ci.org/ArtskydJ/noddity-fs-retrieval.svg?branch=master)](https://travis-ci.org/ArtskydJ/noddity-fs-retrieval)

Implements the same api as [noddity-retrieval](https://github.com/TehShrike/noddity-retrieval), but retrieves from the file system instead of a server.

# example

```js
var Retrieval = require('noddity-fs-retrieval')
var Butler = require('noddity-butler')

var retrieve = new Retrieval('./content')
var butler = new Butler(retrieve, levelUpDb, opts)
```

```js
var Retrieval = require('noddity-fs-retrieval')
var retrieve = new Retrieval('./content')

retrieve.getIndex(function(err, index) {
	if (!err && index.length > 0) {
		// Get the most recent post
		retrieve.getPost(index.pop(), function(err, post) {
			console.log("Found post named " + post.metadata.title)
			console.log("The words inside it are:\n" + post.content)
		})
	}
})
```

# api

```js
var Retrieval = require('noddity-fs-retrieval')
```

## `var retrieval = Retrieval(dir)`

- `dir` is the directory from which to serve the content.
- **Returns** `retrieval`
	- `retrieval.getIndex(cb)`
		- `cb(err, postsArray)`
	- `retrieval.getPost(filename, cb)`
		- `filename` string, e.g. `'index.md'`, `'blog/2015/09/25.md'`
		- `cb(err, post)`

# license

[VOL](http://veryopenlicense.com/)
