import {Quiz} from "../../models/Quiz";
import {getQuizzesAvailable} from "@/services/dbService";

export const setSelectedQuizAction = ({commit}: any, selectedQuiz: Quiz) => {
    commit('setSelectedQuizzMutation',selectedQuiz)
}
