const namespaced=true;

const state = {
    fileListSelect: false
  }
  
  const mutations = {
    FILE_LIST_SELECT (state, value) {
      console.log('FILE_LIST_SELECT', value)
      state.fileListSelect = value
    }
  }
  
  const actions = {
    FILE_LIST_SELECT ({ state, commit, rootState }, value) {
      // do something async
      commit('FILE_LIST_SELECT', value)
    }
  }
  
  const getters = {
    FILE_LIST_SELECT (state, getters, rootState) {
      return state.fileListSelect+' from getter';
    }
  }


export default {
    namespaced,
    state,
    getters,
    mutations,
    actions
}