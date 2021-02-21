import {State} from "../../models/State";
import {Quiz} from "../../models/Quiz";

export const setSelectedQuizMutation = (state: State, selectedQuiz: Quiz) => {
    state.selectedQuizz = selectedQuiz
}
