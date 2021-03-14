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
    parts: Part[],
    difficulty: string,
    initialQuiz: Quiz,
    finalQuiz: Quiz,
    quizzes: Quiz[],
    public: boolean,
    courseId: string,
    date: Date
}

export interface Part {
    id:string,
    lessonId:string,
    title: string,
    subtitle: string,
    content: string,
    partNumber: number,
    headImageUrl: string,
}