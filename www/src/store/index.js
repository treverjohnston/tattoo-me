import axios from 'axios'
import vue from 'vue'
import vuex from 'vuex'
import router from '../router'

var production = !window.location.host.includes('localhost');
var baseUrl = production ? '//tattoo-me.herokuapp.com/' : '//localhost:3000/';

let api = axios.create({
	baseURL: baseUrl + 'api/',
	timeout: 40000,
	withCredentials: true
})

let auth = axios.create({
	baseURL: baseUrl,
	timeout: 4000,
	withCredentials: true
})

vue.use(vuex)

var store = new vuex.Store({
	state: {
		// NOTE: Any changed/added/removed properties must also be added to setDefaultState mutation
		tattoos: [],
		mobileView: [],
		favorites: [],
		userInfo: {},
		queue: [],
		confirm: [],
		sortType: true,
		tattoosPage: 0,
		searchTags: '',
		uploadedTattoo: {},
		topArtists: [],
		artistProfile: {},
		currentArtist: {}
		// NOTE: Any changed/added/removed properties must also be added to setDefaultState mutation
	},

	mutations: {
		setDefaultState(state) {
			state.tattoos = []
			state.mobileView = []
			state.favorites = []
			state.userInfo = {}
			state.queue = []
			state.confirm = []
			state.sortType = true
			state.tattoosPage = 0
			state.searchTags = ''
			state.uploadedTattoo = {},
			state.topArtists = [],
			state.artistProfile = {},
			state.currentArtist = {}
		},
		zoomIn(state, card) {
			state.mobileView = card
		},
		confirm(state, card) {
			state.confirm = card
		},
		setTattoos(state, payload) {
			if (payload.append)
				state.tattoos = state.tattoos.concat(payload.tattoos);
			else
				state.tattoos = payload.tattoos;
			state.tattoosPage = payload.page || 0;
			if (payload.tags)
				state.searchTags = payload.tags
		},
		setFavs(state, res) {
			var favorites = res.data.data

			for (var i = 0; i < favorites.length; i++) {
				var favorite = favorites[i];
				favorite.favorite = true
			}

			state.favorites = favorites
		},
		updateFavorites(state, tattoos) {
			vue.set(state.userInfo, 'favorites', tattoos)
		},
		setInfo(state, obj) {
			state.userInfo = obj
		},

		addToQueue(state, obj) {
			state.queue.push(obj.url)
		},

		sort(state) {
			state.sortType = !state.sortType
		},
		resetTattoos(state) {
			state.tattoos = []
			state.tattoosPage = 0
		},
		handleError(state, err) {
			state.error = err
		},
		updateTattoo(state, tattoo) {
			let index = state.tattoos.findIndex(tat => tat._id == tattoo._id)
			vue.set(state.tattoos, index, tattoo)
		},
		uploadedTat(state, tattoo) {
			state.uploadedTattoo = tattoo
		},
		setTopArtists(state, tattoos) {
			state.topArtists = tattoos
		},
		setArtistProfile(state, profile){
			state.artistProfile = profile
		},
		setCurrentArtist(state, artist){
			state.currentArtist = artist
		}
	},
	actions: {
		// *** Base Tattoo Actions *** //
		getTattoos({ commit, dispatch }, { append = true, page = 0, cb, sortType = true }) {
			let limit = 20;
			let sort = sortType ? 'created' : 'numLikes'
			api('tattoos?limit=' + limit + '&offset=' + page * limit + '&sort=' + sort)
				.then(res => {
					commit('setTattoos', { tattoos: res.data.data, append, page })
					// console.log(res)
					if (cb)
						cb();
				})
				.catch(err => {
					commit('handleError', err)
				})
		},
		removeTattoo({ commit, dispatch }, id) {
			router.push('Profile')
			api.delete('tattoos/' + id)
				.then(res => {
					console.log(res)
					dispatch('getArtistGallery')
					dispatch('getTattoos')
				})
				.catch(err => {
					commit('handleError', err)
				})
		},
		search({ commit, dispatch }, { tags, append = true, page = 0, cb }) {
			var search = tags.toLowerCase().trim().replace(/\s+/g, ',');
			let limit = 10;
			api(`tattoos/search/tags/?tags=${search}&limit=${limit}&offset=${page * limit}`)
				.then(res => {
					commit('setTattoos', { tattoos: res.data.data, append, page, tags: tags })
					if (cb)
						cb()
				})
				.catch(err => {
					commit('handleError', err)
				})
		},
		purchaseTattoo({ commit, dispatch }, { token, tattooId }) {
			api.put('tattoos/' + tattooId + '/purchase', { stripeToken: token })
				.then(res => {
					console.log(res);
				})
				.catch(err => {
					commit('handleError', err)
				})
		},

		// *** Tattoo Favorites Actions *** //
		getFavs({ commit, dispatch }) {
			api('favorites')
				.then(res => {
					commit('setFavs', res)
				})
		},
		favorite({ commit, dispatch }, tattoo) {
			api.put('favorites/' + tattoo._id, tattoo)
				.then(res => {
					commit('updateFavorites', res.data.data)
				})
				.catch(err => {
					commit('handleError', err)
				})
		},
		like({ commit, dispatch }, obj) {
			api.put(`tattoos/${obj.id}/like`)
				.then(res => {
					commit('updateTattoo', res.data.data)
				})
				.catch(err => {
					commit('handleError', err)
				})
		},

		// *** Misc Actions *** //
		
		getArtistProfile({commit, dispatch}, id){
			api(`artist/${id}`)
			.then(res=>{
				commit('setArtistProfile', res.data.data)
			})
			.catch(err => {
				commit('handleError', err)
			})
		},
		getTopArtist({ commit, dispatch }) {
			api('artists/top-weekly')
			.then(res=>{
				commit('setTopArtists', res.data.data)
			})
			.catch(err => {
				commit('handleError', err)
			})
		},
		getArtistGallery({ commit, dispatch }) {
			api('my-designs')
				.then(res => {
					commit('setTattoos', { tattoos: res.data.data })
				})
				.catch(err => {
					commit('handleError', err)
				})
		},
		sendDesign({ commit, dispatch }, payload) {
			let tags = payload[0].tags.match(/\S+/g) || [] // grabs words from string, or returns empty array if only whitespace
			payload[0].tags = [];
			api.post('tattoo/upload', payload[0])
				.then(res => {
					let tattooId = res.data.data._id
					tags.forEach(tag => {
						api.post('tags', { name: tag })
							.then(res => {
								api.put('tattoos/' + tattooId + '/update', { tag: res.data.data._id })
									.then(res => {
										console.log('Tagged tattoo:', res.data.data)
										commit('uploadedTat', res.data.data)
									})
									.catch(err => {
										commit('handleError', err)
									})
							})
							.catch(err => {
								commit('handleError', err)
							})
					}, this);
				})
				.catch(err => {
					commit('handleError', err)
				})
		},

		// *** User Auth Actions *** //
		register({ commit, dispatch }, obj) {
			auth.post("register", obj)
				.then((res) => {
					if (res.data.message) {
						commit('setInfo', res.data.data)
						router.push('home')
					} else if (res.error) {
						alert("Invalid Email or password");
					}
				})
				.catch((err) => commit('handleError', err))
		},
		login({ commit, dispatch }, obj) {
			auth.post("login", obj)
				.then((res) => {
					if (res.data.message == "Invalid Email or Password") {
						alert("Invalid Email or password");
					} else {
						commit('setInfo', res.data.data)
						router.push('home')
					}

				})
				.catch((err) => commit('handleError', err))
		},
		logout({ commit, dispatch }) {
			auth.delete('logout')
				.then((res) => {
					dispatch('getAuth')
					commit('setDefaultState')
				})
				.catch((err) => commit('handleError', err))
		},
		getAuth({ commit, dispatch }) {
			auth('authenticate')
				.then(res => {
					if (!res.data.data) {
						return router.push('/')
					}
					commit('setInfo', res.data.data)
					router.push('home')
				})
				.catch(err => {
					commit('handleError', err)
					router.push('/')
				})
		}
	}
})


export default store