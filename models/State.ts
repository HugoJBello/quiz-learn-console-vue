import {Quizz} from "./Quizz";

export interface State {
    selectedQuizz: Quizz | null,
    answers: Answer[],
    status: string | null
}

export interface Answer {
    questionId: string
    questionNumber: string
    answer: string
    correct:boolean
}