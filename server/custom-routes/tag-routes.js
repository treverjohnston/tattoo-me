// let Tags = require('../models/tag')

// module.exports = {
// 	upsertTag: {
// 		path: '/upsert/tags',
// 		reqType: 'put',
// 		method(req, res, next) {
// 			let action = 'Upsert tag'
// 			Tags.findOne({ name: req.body.name }, {}, { upsert: true, new: true, runValidators: true })
// 				.then(tag => {
// 					res.send(handleResponse(action, tag))
// 				}).catch(error => {
// 					return next(handleResponse(action, null, error))
// 				})
// 		}
// 	}
// }


// function handleResponse(action, data, error) {
// 	var response = {
// 		action: action,
// 		data: data
// 	}
// 	if (error) {
// 		response.error = error
// 	}
// 	return response
// }