var actions = require('../config/constants').actions

module.exports = API

function API(model, schema) {
	if (model.preventDefaultApi) { return {} }
	return {
		get: get,
		post: create,
		put: update,
		delete: remove
	}

	function get(req, res, next) {
		console.log("requesting api ", model.name)
		var id = req.params.id || req.query.id || '';
		var params = req.params.id ? req.params : {};
		// var query = req.query.with || '';
		// console.log(query)

		if (id) {
			schema.findById(id).populate('tags').exec()
				.then(data => {
					return res.send(handleResponse(actions.find, data))
				})
				.catch(error => {
					return next(handleResponse(actions.find, null, error))
				})
		} else {
			let limit = Math.min(50, req.query.limit || 20);
			let offset = parseInt(req.query.offset) || 0;
			let sort = req.query.sort || 'created'
			schema.find(params).sort('-' + sort).limit(limit).skip(offset).populate('tags').exec()
				.then(data => {
					var result = handleResponse(actions.findAll, data);
					// result.query = query
					result.params = params
					return res.send(result)
				})
				.catch((error) => {
					return next(handleResponse(actions.findAll, null, error))
				})
		}
	}

	function create(req, res, next) {
		var action = actions.create

		let model = new schema(req.body)
		model.creatorId = req.session.uid

		model.save()
			.then(data => {
				return res.send(handleResponse(action, data))
			})
			.catch(error => {
				return next(handleResponse(action, null, error))
			})
	}

	function update(req, res, next) {
		var action = actions.update
		var id = req.params.id || req.query.id || '';

		if (!id) {
			return next(handleResponse(action, null, { error: { message: 'Invalid request no id provided' } }))
		}

		schema.findById(id).select('creatorId').exec()
			.then(data => {
				if (data.creatorId.toString() != req.session.uid.toString()) {
					return next(handleResponse(action, null, { error: { message: 'Not authorized' } }))
				}
				data.update(req.body)
					// data.save()
					.then(() => {
						return res.send(handleResponse(action, { message: 'Successfully updated' }))
					})
					.catch(error => {
						return next(handleResponse(action, null, error))
					})
			})
			.catch(error => {
				return next(handleResponse(action, null, error))
			})
	}

	function remove(req, res, next) {
		var action = actions.remove
		var id = req.params.id || req.query.id || '';

		if (!id) {
			return next(handleResponse(action, null, { error: { message: 'Invalid request no id provided' } }))
		}

		schema.findById(id).select('creatorId').exec()
			.then(data => {
				if (data.creatorId.toString() != req.session.uid.toString()) {
					return next(handleResponse(action, null, { error: { message: 'Not authorized' } }))
				}

				data.remove()
					.then(() => {
						return res.send(handleResponse(action, { message: 'Successfully removed' }))
					})
					.catch(error => {
						return next(handleResponse(action, null, error))
					})
			})
			.catch(error => {
				return next(handleResponse(action, null, error))
			})
	}

	function handleResponse(action, data, error) {
		var response = {
			schemaType: model.name,
			action: action,
			data: data
		}
		if (error) {
			response.error = error
		}
		return response
	}

}