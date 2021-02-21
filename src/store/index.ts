import Vue from 'vue'
import Vuex from 'vuex'
import {State} from "../models/State";
import {setSelectedQuizMutation} from "@/store/mutations/selectedQuiz.mutations";
import {setSelectedQuizAction} from "@/store/actions/selectedQuiz.actions";
import {setAvailableQuizesForUser} from "@/store/actions/availableQuizesForUser.actions";
import {setAvailableQuizesForUserMutation} from "@/store/mutations/availableQuizesForUser.mutations";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        selectedQuiz: null,
        answers: [],
        status: null,
        availableQuizesForUser: null
    } as State,
    mutations: {
        setSelectedQuizzMutation: setSelectedQuizMutation,
        setAvailableQuizesForUserMutation: setAvailableQuizesForUserMutation,
    },
    actions: {
        setSelectedQuizAction: setSelectedQuizAction,
        setAvailableQuizesForUser: setAvailableQuizesForUser,
    },
    modules: {}
})

