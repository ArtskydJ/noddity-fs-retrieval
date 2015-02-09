Noddity FS Retrieval
=====

[![Build Status](https://travis-ci.org/ArtskydJ/noddity-fs-retrieval.svg?branch=master)](https://travis-ci.org/ArtskydJ/noddity-fs-retrieval)

Alternative to [noddity-retrieval](https://github.com/TehShrike/noddity-retrieval), that uses the file system instead of a server.

# example

```js
	var retrieve = new Retrieve('./content')

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

# license

[VOL](http://veryopenlicense.com/)
