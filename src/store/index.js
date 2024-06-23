import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


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