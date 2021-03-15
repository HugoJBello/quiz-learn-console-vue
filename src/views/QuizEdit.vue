<template>
  <div>
    <h1 class="title font-weight-light main-title">{{ $t("Edit quiz for lesson") }}</h1>
    <h2 v-if="lesson" class="title font-weight-light main-title">{{ lesson.title }}</h2>
    <v-btn
        large
        class="cancel"
        @click="cancel">{{ $t('Cancel') }}
    </v-btn>
    <v-btn
        large
        class="save"
        :loading="!quiz ||! lesson"
        @click="save">{{ $t('Save') }}
    </v-btn>

    <v-card
        outlined
        shaped
        tile
        class="general"
    >
      <v-card-title>{{ $t('General') }}</v-card-title>

      <div class="input">
        <v-text-field
            :label="$t('Title')"
            outlined
            v-model="title"
        ></v-text-field>
      </div>


      <div class="input">
        <v-text-field
            :label="$t('Description')"
            outlined
            v-model="description"
        ></v-text-field>
      </div>

    </v-card>


    <div>
      <QuestionEdit :index="0" action="create" @addQuestion="createQuestion" @editQuestion="createQuestion"></QuestionEdit>

      <v-card v-for="(question, index) in questions" :key="question.questionText"
              shaped
              tile
              class="general"
      >
        <v-card-title>{{$t("Question")}} {{index +1}} </v-card-title>
        <QuestionEdit :index="index" action="edit" :existingQuestion="question" @editQuestion="editQuestion"></QuestionEdit>

        <v-card-text class="question-content">
        <div class="question-text">
          <span class="body-2">{{ question.questionText }}</span>
        </div>

        <div class="question-anwers" v-for="(answer, index) in question.answerOptions" :key="answer">
          <span class="body-2">{{ index +1 }}. </span> <span class="body-2">{{ answer }}</span>
        </div>
        </v-card-text>
      </v-card>

    </div>


  </div>

</template>

<script lang="ts">
/* eslint-disable */
import {Component, Vue, Watch} from 'vue-property-decorator';
import {getLesson, getQuiz, saveLesson, saveQuiz} from "@/services/dbService";
import {Question, Quiz, QuizType} from "@/models/Quiz";
import {Lesson} from "@/models/Lessons";
import {v4 as uuidv4} from "uuid";
import QuestionEdit from "@/components/QuestionEdit.vue";

@Component({extends:QuestionEdit})
export default class QuizEdit extends Vue {

  private quiz: Quiz | null
  private questions: Question[] | null
  private id: string | null
  private type: string | null
  private lessonId: string | null
  private lesson: Lesson | null
  private title: string = this.$i18n.tc('Title')
  private description: string = this.$i18n.tc('Description')

  async created() {
    this.id = this.$route.params.id
    this.lessonId = this.$route.params.lessonId
    this.type = this.$route.params.quizType
    if (this.id && this.id !== "None") {
      try {
        this.quiz = await getQuiz(this.id)
        if (this.quiz?.questions) {
          this.questions = this.quiz.questions
        } else {
          this.questions = []
        }
      } catch (e) {
        console.log(e)
      }
    } else {
      this.id = uuidv4()
    }

    if (this.lessonId) {
      try {
        this.lesson = await getLesson(this.lessonId)
      } catch (e) {
        console.log(e)
      }
    }

    console.log(this.quiz)
    console.log(this.lesson)

    this.initQuiz()

  }

  public initQuiz() {
    if (!this.quiz) {
      this.quiz = {} as Quiz
      this.quiz.type = this.type as string
      this.questions = []
    }


    if (this.quiz?.description) {
      this.description = this.quiz?.description as string
    }

    if (this.quiz?.title) {
      this.title = this.quiz?.title as string
    }

    this.$forceUpdate();
  }

  updateQuizObject() {
    this.quiz = {
      type: this.type,
      id: this.id,
      title: this.title,
      lessonId: this.lessonId,
      description: this.description,
    } as Quiz
    this.quiz.questions = this.questions as Question[]

    console.log(this.quiz)
  }

  createQuestion(createdQuestion: Question) {
    console.log("----", createdQuestion)
    this.questions = this.questions as Question[]
    this.questions.push(createdQuestion)
    this.$forceUpdate();
  }

  editQuestion(createdQuestion: Question) {
    this.questions = this.questions as Question[]
    const index = createdQuestion.questionNumber
    this.questions[index] = createdQuestion
    console.log(index, this.questions, createdQuestion)
    this.$forceUpdate();

  }

  isCorrectEditingAnswer(question: Question, index: number) {
    return question.correctAnswers.includes(index)
  }


  async save() {
    this.updateQuizObject()
    const result = await saveQuiz(this.quiz as Quiz)
    if (this.lesson && this.type == QuizType.INITIAL) {
      this.lesson.initialQuiz = this.quiz as Quiz
    } else if (this.lesson && this.type == QuizType.FINAL) {
      this.lesson.finalQuiz = this.quiz as Quiz
    }
    await saveLesson(this.lesson as Lesson)
    this.$router.push({name: 'LessonEdit', params: {id: this.lessonId as string}})

  }

  async cancel() {
    this.$router.push({name: 'LessonEdit', params: {id: this.lessonId as string}})
  }
}


</script>

<style>
.main-title {
  margin-top: 20px;
  text-align: center;
}

.general {
  margin: 20px;
}

.input {
  margin: 10px;
}

.save {
  margin-left: 20px;
}

.cancel {
  margin-left: 20px;
}

.question-content{
  margin:10px
}

</style>
