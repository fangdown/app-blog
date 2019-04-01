export default {
  namespaced: true,
  state: {
    name: ''
  },
  getters: {
    name: state => state.name
  },
  mutations: {
    SET_NAME (state, data) {
      state.name = data
    }
  },
  actions: {},
  modules: {}
}
