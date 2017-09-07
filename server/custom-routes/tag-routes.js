let Tags = require('../models/tag')

module.exports = {
	upsertTag: {
		path: '/tags',
		reqType: 'post',
		method(req, res, next) {
			let action = 'Get tag or create if nonexistent'
			Tags.findOne({ name: req.body.name })
				.then(tag => {
					if (tag) {
						res.send(handleResponse(action, tag))
					} else {
						Tags.create(req.body)
							.then(newTag => {
								res.send(handleResponse(action, newTag))
							})
							.catch(error => {
								return next(handleResponse(action, null, error))
							})
					}
				}).catch(error => {
					return next(handleResponse(action, null, error))
				})
		}
	}
}


function handleResponse(action, data, error) {
	var response = {
		action: action,
		data: data
	}
	if (error) {
		response.error = error
	}
	return response
}