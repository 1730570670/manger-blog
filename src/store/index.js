import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading:false
  },
  getters: {
  },
  mutations: {
    //触发行为(将loading赋值为传的状态)
    changeLoading(state,status){
      state.loading=status
    }
  },
  actions: {
  },
  modules: {
  }
})
