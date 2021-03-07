import {Quiz} from "./Quiz";

export interface Lesson {
    id: string,
    type: string,
    title: string,
    createdAt: Date,
    updatedAt: Date,
    description: string,
    frontImage: string,
    subtitle: string,
    parts: string[],
    difficulty: string,
    initialQuiz: Quiz,
    finalQuiz: Quiz,
    quizzes: Quiz[],
    public: boolean,
    courseId: string,
    date: Date
}