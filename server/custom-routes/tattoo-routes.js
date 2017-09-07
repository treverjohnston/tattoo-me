let Tattoos = require('../models/tattoo')
let Tags = require('../models/tag')
let Cloudinary = require('cloudinary');

module.exports = {
	searchByTag: {
		path: '/tattoos/search/tags',
		reqType: 'get',
		method(req, res, next) {
			let action = 'Find tattoo by tag'
			let names = req.query.tags.split(',');
			Tags.find({ name: { $in: names } })
				.then(tags => {
					if (tags.length < names.length)
						return res.send(handleResponse(action, []))
					Tattoos.find({ tags: { $all: tags } })
						.then(tattoos => {
							res.send(handleResponse(action, tattoos))
						})
						.catch(error => {
							return next(handleResponse(action, null, error))
						})
				})
				.catch(error => {
					return next(handleResponse(action, null, error))
				})
		}
	},
	like: {
		path: '/tattoos/:tattooId/like',
		reqType: 'put',
		method(req, res, next) {
			let action = 'Like tattoo';
			Tattoos.findById(req.params.tattooId).select('likes').exec()
				.then(tattoo => {
					updateTattooLikes(tattoo, req.session.uid);
					tattoo.save()
						.then(() => {
							tattoo.likes = []
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
	},
	upload: {
		path: '/tattoo/upload',
		reqType: 'post',
		method(req, res, next) {
			console.log(req)
			let action = 'Upload tattoo';
			let tattoo = req.body

			// upload another degraded version
			var url = 'http://res.cloudinary.com/tattoo-me/image/upload/e_pixelate:25/e_blur:300/' + tattoo.public_id + '.png';
			Cloudinary.uploader.upload(url, lowRes => {
				req.body.url = lowRes.secure_url;
				req.body.hdUrl = tattoo.secure_url;
				req.body.creatorId = req.session.uid;
				req.body.artistName = "P-Diddy"
				Tattoos.create(req.body)
					.then(tattoo => {
						tattoo.hdUrl = '';
						res.send(handleResponse(action, tattoo))
					})
					.catch(error => {
						return next(handleResponse(action, null, error))
					})
			})
		}
	},
	updateTag: {
		path: '/tattoos/:tattooId/update',
		reqType: 'put',
		method(req, res, next) {
			let action = 'Build array of tag ids and update tattoo';

			Tattoos.findById(req.params.tattooId)
				.then(tattoo => {
					tattoo.tags.push(req.body.tag)
					tattoo.save()
						.then(() => {
							res.send(handleResponse(action, tattoo))
						})
						.catch(error => {
							return next(handleResponse(action, null, error))
						})
				})
				.catch(error => {
					next(handleResponse(action, null, error))
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