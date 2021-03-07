import {Quiz} from "../../models/Quiz";
import {getLessonsAvailable, getQuizzesAvailable} from "@/services/dbService";
import {Lesson} from "@/models/Lessons";

export const setLessons = ({commit}: any) => {
    getLessonsAvailable(1000,0).then((lessons: Lesson[]) => {
        console.log(lessons)
        commit('setLessonsMutation',lessons)
    })
}
