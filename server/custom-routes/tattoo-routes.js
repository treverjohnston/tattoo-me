let Tattoos = require('../models/tattoo')
let Tags = require('../models/tag')
let Cloudinary = require('cloudinary');
let User = require('../models/user')

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

			// decide how much to degrade
			let pixelateValue = Math.floor(.00001003 * (req.body.width * req.body.height)) 
			let blurValue = Math.floor(.0001203 * (req.body.width * req.body.height))

			if(pixelateValue < 3) {
				pixelateValue = 3
			}
			if(blurValue < 50) {
				blurValue = 50
			}

			console.log('pixelate: ' + pixelateValue + '\nblur: ' + blurValue)
			
			// upload another degraded version
			var url = 'http://res.cloudinary.com/tattoo-me/image/upload/e_pixelate:' + pixelateValue + '/e_blur:' + blurValue + '/' + tattoo.public_id + '.png';
			
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
	},
	purchaseTattoo: {
		/* 
		front end will submit the id to purchase over the URL. Then it will wait for the server response. If the
 		server responds with object that has a 'success' key, charge the user. if server responds with
 		an object with an 'alert' key, don't charge the user.
		*/
		path: '/tattoos/:tattooId/purchase',
		reqType: 'put',
		method(req, res, next) {
			let action = 'Add tattoo to the user purchased array'
			let tattooId = req.params.tattooId
			User.findById(req.session.uid)
				.then(user => {
					if (!user.purchased.includes(tattooId)) {
						user.purchased.push(tattooId)
						user.save().then(() => {
							
							res.send(handleResponse(action, { success: 'successfully purchased tattoo' }))
						})
					} else {
						res.send(handleResponse(action, { alert: 'user already owns this item' }))
					}
				}).catch(error => {
					return next(handleResponse(action, null, error))
				})
		}

	},
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