export interface Quizz {
    type: string,
    title: string,
    subtitle: string,
    description: string,
    difficulty: string,
    questions: Question[],
    public: boolean,
    date: Date
}

export interface Question {
    type: string,
    questionText: string,
    answerOptions: string[],
    correctAnswers: number[],
    tips: string[],
    explanation: string
}