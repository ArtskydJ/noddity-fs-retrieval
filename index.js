var fs = require('fs')
var path = require('path')
var parser = require('text-metadata-parser')

module.exports = function NoddityRetrieval(root) {
	var lookup = function(file, cb, parse) {
		var data = ''
		var fullPath = path.resolve(root, file)
		fs.readFile(fullPath, {encoding: 'utf8'}, function (err, data) {
			if (err) {
				cb(err)
			} else {
				try {
					var parsedData = parse(data)
					parsedData && cb(false, parsedData)
				} catch (e) {
					cb(new Error("Error parsing file with contents:\n" + data + "\n==========\n" + e.message))
				}
			}
		})
	}

	return {
		getIndex: function(cb) {
			lookup('index.json', cb, JSON.parse)
		},
		getPost: function(filename, cb) {
			lookup(filename, cb, function(textToParse) {
				var post = parser(textToParse, {
					date: 'date',
					boolean: 'markdown'
				})
				post.filename = filename
				return post
			});
		}
	}
}
