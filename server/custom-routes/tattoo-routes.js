let Tattoos = require('../models/tattoo')
let Tags = require('../models/tag')
let Cloudinary = require('cloudinary');

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
	},
	upload: {
		path: '/tattoos/upload/upload',
		reqType: 'post',
		method(req, res, next) {
			let action = 'Upload tattoo';
			// Cloudinary.uploader.upload(req.body.url, result => {

			// })
			Cloudinary.uploader.upload(req.body.url, result => {
				// var img = Cloudinary.image(error.public_id, { quality: 1 })
				var url = 'http://res.cloudinary.com/tattoo-me/image/upload/e_pixelate:25/e_blur:300/' + result.public_id + '.png';
				Cloudinary.uploader.upload(url, result2 => {
					console.log(result)
					console.log(result2);
				})
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