import {Quiz} from "../../models/Quiz";
import {getQuizzesAvailable} from "@/services/quizesService";

export const setAvailableQuizesForUser = ({commit}: any) => {
    getQuizzesAvailable(1000,0).then((quizes: Quiz[]) => {
        console.log(quizes)
        commit('setAvailableQuizesForUserMutation',quizes)
    })
}
