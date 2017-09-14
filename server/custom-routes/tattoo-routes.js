let Tattoos = require('../models/tattoo')
let Tags = require('../models/tag')
let Cloudinary = require('cloudinary');
let User = require('../models/user')
let Mailer = require('../config/nodemailer')
var stripe = require("stripe")("sk_test_vmegeOO2Sm43P9mhnexU1RpM");
let mongoose = require('mongoose')

module.exports = {
	searchByTag: {
		path: '/tattoos/search/tags',
		reqType: 'get',
		method(req, res, next) {
			let action = 'Find tattoo by tag'
			let names = req.query.tags.split(',');
			let limit = Math.min(50, req.query.limit || 20);
			let offset = parseInt(req.query.offset) || 0;
			Tags.find({ name: { $in: names } })
				.then(tags => {
					if (tags.length < names.length)
						return res.send(handleResponse(action, []))
					Tattoos.find({ tags: { $all: tags } }).limit(limit).skip(offset)
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
			Tattoos.findById(req.params.tattooId)//.select('likes').exec()
				.then(tattoo => {
					if (updateTattooLikes(tattoo, req.session.uid)) {
						User.findById(tattoo.creatorId)
							.then(user => {
								user.weeklyLikes.push(Date.now())
								user.save()
									.then(() => {
										console.log('updated weekly likes')
									})
							})
					}
					tattoo.save()
						.then(() => {
							// tattoo.likes = []
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

			if (pixelateValue < 3) {
				pixelateValue = 3
			}
			if (blurValue < 50) {
				blurValue = 50
			}

			console.log('pixelate: ' + pixelateValue + '\nblur: ' + blurValue)

			// upload another degraded version
			var url = 'http://res.cloudinary.com/tattoo-me/image/upload/e_pixelate:' + pixelateValue + '/e_blur:' + blurValue + '/' + tattoo.public_id + '.png';

			Cloudinary.uploader.upload(url, lowRes => {
				req.body.url = lowRes.secure_url;
				req.body.hdUrl = tattoo.secure_url;
				req.body.creatorId = req.session.uid;
				req.body.artistName = req.session.username;
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
					let objId = mongoose.Types.ObjectId(tattooId);
					if (!user.purchased.includes(mongoose.Types.ObjectId(tattooId))) {
						// TODO: Add stripe card charge and verification
						// Set your secret key: remember to change this to your live secret key in production
						// See your keys here: https://dashboard.stripe.com/account/apikeys

						// Token is created using Stripe.js or Checkout!
						// Get the payment token ID submitted by the form:
						var token = req.body.stripeToken.id; // Using Express

						// Charge the user's card:
						Tattoos.findById(tattooId).select('hdUrl price').exec()
							.then(tattoo => {
								// send hdUrl to user in an email.
								stripe.charges.create({
									amount: tattoo.price * 100,
									currency: "usd",
									description: "Example charge",
									source: token,
								}, function (err, charge) {
									if (err) {
										return next(handleResponse(action, null, err))
									}
									console.log(charge)
									// asynchronously called
									user.purchased.push(tattooId)
									user.save()
										.then(() => {
											res.send(handleResponse(action, { success: 'successfully purchased tattoo' }))
											var account = {
												email: user.email,
												hdUrl: tattoo.hdUrl
											}
											Mailer.createMailer(account)
										})
										.catch(error => {
											return next(handleResponse(action, null, error))
										})
								})
							})
							.catch(error => {
								return next(handleResponse(action, null, error))
							})

					} else {
						res.send(handleResponse(action, { alert: 'user already owns this item' }))
					}
				}).catch(error => {
					return next(handleResponse(action, null, error))
				})
		}
	},
	getWeeklyTopArtists: {
		path: '/artists/top-weekly',
		reqType: 'get',
		method(req, res, next) {
			let action = 'Find artists with most likes on their designs in the past week'
			let limit = Math.min(req.query.limit || 10, 50);
			User.find({ accountType: 'artist' })
				.then(users => {
					let artists = []
					users.forEach(artist => {
						for (let i = 0; i < artist.weeklyLikes.length; i++) {
							if (Date.now() - artist.weeklyLikes[i] > (1000 * 60 * 60 * 24 * 7)) {
								artist.weeklyLikes.splice(i, 1)
								i--;
							}
						}
						artists.push({ _id: artist._id, numWeeklyLikes: artist.weeklyLikes.length, name: artist.name })
						// artist.numWeeklyLikes = artist.weeklyLikes.length;
					});
					artists.sort((a, b) => {
						return b.numWeeklyLikes - a.numWeeklyLikes;
					})
					res.send(handleResponse(action, artists.slice(0, limit)))
					// artists.save() // array of documents don't have a save function
					//     .then(() => {
					//         User.find({ accountType: 'artist' }).limit(limit).sort('-numWeeklyLikes')
					//             .then(users => {
					//                 res.send(handleResponse(action, users))
					//             })
					//             .catch(error => {
					//                 return next(handleResponse(action, null, error))
					//             })
					//     })
					//     .catch(error => {
					//         return next(handleResponse(action, null, error))
					//     })
				})
				.catch(error => {
					return next(handleResponse(action, null, error))
				})
		}
	}
}

function updateTattooLikes(tattoo, userId) {
	let index = tattoo.likes.indexOf(userId);
	let liked;
	if (index == -1) {
		tattoo.likes.push(userId);
		liked = true
	} else {
		tattoo.likes.splice(index, 1);
		liked = false
	}
	tattoo.numLikes = tattoo.likes.length;
	return liked;
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