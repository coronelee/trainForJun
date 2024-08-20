import Vue from 'vue'
import Vuex from 'vuex'
import hljs from 'highlight.js'
Vue.use(Vuex)
Vue.use(hljs.vuePlugin);

export default new Vuex.Store({
    state: {
        nameRoom: '',
        typeLanguage: '',
        resultCode: '',
        inputData: '',
        inputDataValue: '',
    },
    mutations: {
         
    },
    actions: {
    },
    modules: {
    },
    getters: {
        returnNameRoom(state) {
            return state.nameRoom
        }
    }
})