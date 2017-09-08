let Tattoos = require('../models/tattoo')
let User = require('../models/user')

module.exports = {
	favorites: {
		path: '/favorites',
		reqType: 'get',
		method(req, res, next) {
			let action = 'Find User favorites'
			User.findById(req.session.uid)
				.then(user => {
					Tattoos.find({ _id: { $in: user.favorites } }).then(tattoos => {
						res.send(handleResponse(action, tattoos))
					})
				}).catch(error => {
					return next(handleResponse(action, null, error))
				})
		}
	},
	getUserDesigns: {
		path: '/my-designs',
		reqType: 'get',
		method(req, res, next) {
			let action = 'Get designs/tattoos that the user (artist) has uploaded'
			// query the tattoos collection to find all tattoos with a creatorId that matches the uid on the session
			Tattoos.find({ creatorId: req.session.uid }).then(tattoos => {
				res.send(handleResponse(action, tattoos))
				})
				.catch(error => {
					return next(handleResponse(action, null, error))
				})
		}
	},
	addFavorite: {
		path: '/favorites',
		reqType: 'put',
		method(req, res, next) {
			let action = 'Add favorite to user'
			User.findById(req.session.uid)
				.then(user => {
					user.favorites.push(req.body.favorite)
					user.save().then(() => {
						res.send(handleResponse(action, { message: 'successfully added favorite' }))
					})
				}).catch(error => {
					return next(handleResponse(action, null, error))
				})
		}
	},
	removeFavorite: {
		path: '/favorites/:tattooIid',
		reqType: 'put',
		method(req, res, next) {
			let action = 'Remove favorite'
			User.findById(req.session.uid)
				.then(user => {
					user.favorites.splice(user.favorites.indexOf(req.params.tattooId), 1)
					user.save().then(() => {
						res.send(handleResponse(action, { message: 'successfully removed favorite' }))
					})
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