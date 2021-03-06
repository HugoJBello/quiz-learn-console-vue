import {Quiz} from "./Quiz";
import {Lesson} from "./Lessons";
import {User, UserInfo} from "firebase";

export interface State {
    selectedQuiz: Quiz | null,
    availableQuizesForUser: Quiz[] | null,
    answers: Answer[],
    status: string | null
    user: User | null
    userFirebase?: UserInfo | null
    lessons: Lesson[] | null
}

export interface Answer {
    questionId: string
    questionNumber: string
    answer: string
    correct:boolean
}
