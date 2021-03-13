<template>
  <div>
    <h1 class="title font-weight-light main-title">{{ $t("Edit quiz for lesson") }}</h1>
    <v-btn
        large
        @click="save">{{ $t('Save') }}
    </v-btn>
    <v-card
        elevation="2"
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


  </div>

</template>

<script lang="ts">
/* eslint-disable */
import {Component, Vue, Watch} from 'vue-property-decorator';
import {getLesson, getQuiz, saveLesson, saveQuiz} from "@/services/dbService";
import {Question, Quiz} from "@/models/Quiz";

@Component({})
export default class QuizEdit extends Vue {

  private quiz: Quiz | null
  private questions: Question[] | null
  private id: string | null
  private type: string | null
  private lessonId: string | null
  private title: string = this.$i18n.tc('Title')
  private description: string = this.$i18n.tc('Description')


  async created() {
    this.id = this.$route.params.id
    this.lessonId = this.$route.params.lessonId
    this.type = this.$route.params.type
    if (this.id && this.id!== "None"){
      try {
        this.quiz = await getQuiz(this.id)
      } catch (e) {

      }
    }
    console.log(this.quiz)

    this.initQuiz()

  }

  public initQuiz() {
    if (!this.quiz) this.quiz = {} as Quiz


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
      id: this.id,
      title: this.title,
      description: this.description,
    } as Quiz
  }

  async save() {
    this.updateQuizObject()
    const result = await saveQuiz(this.quiz as Quiz)
    console.log(result)
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

#editor1 {
  height: 200px;
}

#editor2 {
  height: 350px
}

</style>
