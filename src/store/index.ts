import Vue from 'vue'
import Vuex from 'vuex'
import {State} from "../../models/State";
import {Quizz} from "../../models/Quizz";

Vue.use(Vuex)

const setSelectedQuizzMutation = (state: State, selectedQuizz: Quizz) => {
    state.selectedQuizz = selectedQuizz
}

const setSelectedQuizzAction = ({commit}: any, selectedQuizz: Quizz) => {
    commit('setSelectedQuizzMutation',selectedQuizz)
}
export default new Vuex.Store({
    state: {
        selectedQuizz: null,
        answers: [],
        status: null
    } as State,
    mutations: {
        setSelectedQuizzMutation,
    },
    actions: {
        setSelectedQuizzAction,
    },
    modules: {}
})

