let Tattoos = require('../models/tattoo')
let Tags = require('../models/tag')

module.exports = {
	searchByTag: {
		path: '/tattoos/search/tags',
		reqType: 'get',
		method(req, res, next) {
			let action = 'Find tattoo by tag'
			Tags.findOne({ name: req.query.tag })
				.then(tag => {
					Tattoos.find({ tags: tag.id }).then(tattoos => {
						res.send(handleResponse(action, tattoos))
					})
				}).catch(error => {
					return next(handleResponse(action, null, error))
				})
		}
	},
	like: {
		path: '/tattoos/:tattooId/like',
		reqType: 'put',
		method(req, res, next) {
			let action = 'Like tattoo';
			Tattoos.findById(req.params.tattooId)
				.then(tattoo => {
					updateTattooLikes(tattoo, req.session.uid);
					tattoo.save()
						.then(() => {
							res.send(handleResponse(action, tattoo))
						})
						.catch(error => {
							return next(handleResponse(action, null, error))
						})
		
				})
				.catch(error => {
					return next(handleResponse(action, null, error))
				})
		}
	}
}

function updateTattooLikes(tattoo, userId) {
	let index = tattoo.likes.indexOf(userId);
	if (index == -1) {
		tattoo.likes.push(userId);
	} else {
		tattoo.likes.splice(index, 1);
	}
	tattoo.numLikes = tattoo.likes.length;
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