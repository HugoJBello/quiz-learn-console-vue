import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const setSelectedQuizz = (state: any, selectedQuizz: string) => {
    state.selectedQuizz = selectedQuizz
    return state
}
export default new Vuex.Store({
    state: {
        selectedQuizz: null,
        answers: [],
        status: null
    },
    mutations: {
        setSelectedQuizz,
    },
    actions: {},
    modules: {}
})

