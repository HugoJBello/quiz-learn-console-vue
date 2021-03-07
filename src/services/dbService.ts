import {coursesCollection, lessonsCollection, quizzesCollection} from "@/firebase";
import {Quiz} from "../models/Quiz";
import {Lesson} from "@/models/Lessons";
import {Course} from "@/models/Course";
import { v4 as uuidv4 } from 'uuid';

export const getQuizzesAvailable = async (limit: number, skip: number): Promise<Quiz[]> => {
    //const result  = await quizzesCollection.limit(10).where("public", "==", true).orderBy("date", "desc").get()
    const result = await quizzesCollection.limit(limit).where("public", "==", true).get()
    const quizzes = []

    for (const doc of result.docs) {
        quizzes.push(doc.data() as Quiz)
    }
    console.log(quizzes)
    return quizzes
}

export const saveQuiz = async (quiz: Quiz) => {
    if (!quiz.id) {
        quiz.id = uuidv4()
    }
    return quizzesCollection.doc(quiz.id).set(quiz)
}

export const getLessonsAvailable = async (limit: number, skip: number): Promise<Lesson[]> => {
    //const result  = await quizzesCollection.limit(10).where("public", "==", true).orderBy("date", "desc").get()
    const result = await lessonsCollection.limit(limit).get()
    const lessons = []

    for (const doc of result.docs) {
        lessons.push(doc.data() as Lesson)
    }
    console.log(lessons)
    return lessons
}

export const saveLesson = async (lesson: Lesson) => {
    if (!lesson.id) {
        lesson.id = uuidv4()
    }
    return lessonsCollection.doc(lesson.id).set(lesson)
}


export const getCoursesAvailable = async (limit: number, skip: number): Promise<Course[]> => {
    const result = await coursesCollection.limit(limit).get()
    const lessons = []

    for (const doc of result.docs) {
        lessons.push(doc.data() as Course)
    }
    console.log(lessons)
    return lessons
}

export const saveCourse = async (course: Course) => {
    if (!course.id) {
        course.id = uuidv4()
    }
    return coursesCollection.doc(course.id).set(course)
}