import Vue from 'vue'
import Vuex from 'vuex'
import {State} from "../models/State";
import {setSelectedQuizMutation} from "@/store/mutations/selectedQuiz.mutations";
import {setSelectedQuizzAction} from "@/store/actions/selectedQuiz.actions";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        selectedQuizz: null,
        answers: [],
        status: null
    } as State,
    mutations: {
        setSelectedQuizzMutation: setSelectedQuizMutation,
    },
    actions: {
        setSelectedQuizzAction,
    },
    modules: {}
})

