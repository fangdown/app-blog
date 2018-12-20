export default {
  namespaced: true,
  state: {
    sys_guid: ''
  },
  getters: {},
  mutations: {
    SET_SYS_GUID (state, payload) {
      state.sys_guid = payload.id
    }
  },
  actions: {},
  modules: {}
}
