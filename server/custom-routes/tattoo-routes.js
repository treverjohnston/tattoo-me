let Tattoos = require('../models/tattoo')
let Tags = require('../models/tag')


module.exports = {
  specificBoard: {
    path: '/tattoos/search/tags',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find tattoo by tag'
      console.log(req.query)
      Tags.findOne({ name: req.query.tag })
        .then(tag => {
          Tattoos.find({ tags: tag.id }).then(tattoos => {
            res.send(handleResponse(action, tattoos))
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