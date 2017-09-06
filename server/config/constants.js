const actions = {
  create: 'Create',
  update: 'Update',
  remove: 'Remove',
  find: 'Find',
  findAll: 'Find All'
}

const models = {
  user: {
    name: 'User',
    endpoint: 'users',
    preventDefaultApi: true,
    useCustomRoutes: true
  },
  tattoo: {
    name: 'Tattoo',
    endpoint: 'tattoos',
    useCustomRoutes: true
  },
  tag: {
    name: 'Tag',
    endpoint: 'tags',
    // useCustomRoutes: true
  }
}


module.exports = {
  actions,
  models
}