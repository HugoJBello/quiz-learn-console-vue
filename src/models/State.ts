import {Quiz} from "./Quiz";

export interface State {
    selectedQuizz: Quiz | null,
    availableQuizesForUser: Quiz[] | null,
    answers: Answer[],
    status: string | null
}

export interface Answer {
    questionId: string
    questionNumber: string
    answer: string
    correct:boolean
}
