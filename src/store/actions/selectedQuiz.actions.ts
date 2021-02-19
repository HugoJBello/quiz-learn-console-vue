import {Quizz} from "../../models/Quizz";

export const setSelectedQuizzAction = ({commit}: any, selectedQuizz: Quizz) => {
    commit('setSelectedQuizzMutation',selectedQuizz)
}
