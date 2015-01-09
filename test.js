var test = require('tap').test
var Retrieve = require('./')

test('retrieve the index and the posts it references', function(t) {
	var retrieve = new Retrieve('./test-content')

	retrieve.getIndex(function(err, index) {
		t.notOk(err, (err && err.message) || 'no error')
		t.ok(index, "there is an index")
		if (index) {
			t.equal(index && index.length, 2, 'correct amout of posts')

			retrieve.getPost(index[0], function(err, post) {
				t.notOk(err, 'no error')
				t.equal(post && post.metadata.title, 'This is the first post', 'first title is correct')
				t.equal(post && post.content, 'Howdy, and thanks for reading this post!', 'first body is correct')

				retrieve.getPost(index[1], function(err, post) {
					t.notOk(err, 'no error')
					t.equal(post && post.metadata.title, 'This is ANOTHER post', 'second title is correct')
					t.equal(post && post.content, 'Two posts, whaaat?', 'second body is correct')

					t.end()
				})
			})
		} else {
			t.end()
		}
	})
})

test('retrieve a post by filename', function(t) {
	var retrieve = new Retrieve('./test-content')

	retrieve.getPost('post1.md', function(err, post) {
		t.notOk(err, (err && err.message) || "no error retrieving post1.md")
		t.equal(post.metadata.title, 'This is the first post', 'first title is correct')
		t.equal(post.filename, 'post1.md', 'first filename is correct')
		t.end()
	})
})

test('retrieve a non-existant post', function(t) {
	var retrieve = new Retrieve('./test-content')

	retrieve.getPost('nothing.lol', function(err, post) {
		t.ok(err, "error retrieving nothing.lol")
		t.end()
	})
})

test('retrieve from a non-existant server', function(t) {
	var retrieve = new Retrieve('./nothere/')

	retrieve.getPost('nothing.lol', function(err, post) {
		t.ok(err, "error retrieving nothing.lol")
		t.end()
	})
})

test('Make sure the returned metadata is of the correct type', function(t) {
	var retrieve = new Retrieve('./test-content')

	retrieve.getPost('post1.md', function(err, post) {
		t.notOk(err, (err && err.message) || 'no error')
		t.ok(post.metadata.date instanceof Date || !isNaN(post.metadata.date), "The date parameter is a date")
		t.equal(post.metadata.markdown, true, 'The "markdown" property is a boolean, and true')
		t.end()
	})
})
