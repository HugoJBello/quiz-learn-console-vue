import Vue from 'vue'
import Vuex from 'vuex'
import {State} from "../models/State";
import {setSelectedQuizMutation} from "@/store/mutations/selectedQuiz.mutations";
import {setSelectedQuizAction} from "@/store/actions/selectedQuiz.actions";
import {setAvailableQuizesForUser} from "@/store/actions/availableQuizesForUser.actions";
import {setAvailableQuizesForUserMutation} from "@/store/mutations/availableQuizesForUser.mutations";
import {setUserMutation} from "@/store/mutations/user.mutations";
import {setUser} from "@/store/actions/user.actions";
import {setLessonsMutation} from "@/store/mutations/lesson.mutations";
import {setLessons} from "@/store/actions/lesson.actions";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        selectedQuiz: null,
        answers: [],
        status: null,
        lessons: null,
        user: null,
        availableQuizesForUser: null
    } as State,
    mutations: {
        setSelectedQuizzMutation: setSelectedQuizMutation,
        setUserMutation: setUserMutation,
        setLessonsMutation: setLessonsMutation,
        setAvailableQuizesForUserMutation: setAvailableQuizesForUserMutation,
    },
    actions: {
        setSelectedQuizAction: setSelectedQuizAction,
        setUser: setUser,
        setLessons: setLessons,
        setAvailableQuizesForUser: setAvailableQuizesForUser,
    },
    modules: {}
})

