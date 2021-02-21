import {Quiz} from "../../models/Quiz";

export const setSelectedQuizzAction = ({commit}: any, selectedQuizz: Quiz) => {
    commit('setSelectedQuizzMutation',selectedQuizz)
}
