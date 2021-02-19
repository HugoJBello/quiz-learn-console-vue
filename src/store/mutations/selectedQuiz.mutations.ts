import {State} from "../../models/State";
import {Quizz} from "../../models/Quizz";

export const setSelectedQuizMutation = (state: State, selectedQuiz: Quizz) => {
    state.selectedQuizz = selectedQuiz
}
