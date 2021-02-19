import {quizzesCollection} from "@/firebase";
import {Quizz} from "../models/Quizz";

export const getQuizzesAvailable = async (limit: number, skip: number) => {
    //const result  = await quizzesCollection.limit(10).where("public", "==", true).orderBy("date", "desc").get()
    const result = await quizzesCollection.limit(limit).where("public", "==", true).get()
    const quizzes = []

    for (const doc of result.docs) {
        quizzes.push(doc.data() as Quizz)
    }
    console.log(quizzes)
    return quizzes

}
