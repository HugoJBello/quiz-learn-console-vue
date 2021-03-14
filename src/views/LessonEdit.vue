<template>
  <div>
    <h1 class="title font-weight-light main-title">{{ $t("Edit Lesson") }}</h1>
    <v-btn
        large
        class="save"
        :loading="!lesson"
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
            :label="$t('Subtitle')"
            outlined
            v-model="subtitle"
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


    <v-card
        elevation="2"
        outlined
        shaped
        tile
        class="general"
    >
      <v-card-title>{{ $t('Parts') }}</v-card-title>
      <v-card-text>
        <div>
          <v-btn
              large
              @click="createPart">{{ $t('Create new lesson part') }}
          </v-btn>
        </div>

        <div v-for="part in lesson.parts" :key="part.partNumber">
          <span class="body-2">{{part.title}}</span>
          <v-btn
              class="quiz-button"
              large
              @click="editPart(part)">{{ $t('EditPart') }}
          </v-btn>
        </div>

      </v-card-text>

    </v-card>

    <v-card
        elevation="2"
        outlined
        shaped
        tile
        class="general"
    >
      <v-card-title>{{ $t('Initial Quiz') }}</v-card-title>

      <v-card-text>
        <div v-if="initialQuiz && initialQuiz.id">
          <span class="body-2">{{initialQuiz.title}}</span>
          <v-btn
              class="quiz-button"
              large
              @click="editInitialQuiz">{{ $t('Edit') }}
          </v-btn>
        </div>
        <div v-else>
          <v-btn
              large
              @click="createInitialQuiz">{{ $t('Create initial Quiz') }}
          </v-btn>
        </div>

      </v-card-text>

    </v-card>

    <v-card
        elevation="2"
        outlined
        shaped
        tile
        class="general"
    >
      <v-card-title>{{ $t('Final Quiz') }}</v-card-title>
      <v-card-text>
        <div v-if="finalQuiz && finalQuiz.id">
          <span class="body-2">{{finalQuiz.title}}</span>
          <v-btn
              class="quiz-button"
              large
              @click="editFinalQuiz">{{ $t('Edit') }}
          </v-btn>
        </div>
        <div v-else>
          <v-btn
              large
              @click="createFinalQuiz">{{ $t('Create final Quiz') }}
          </v-btn>
        </div>

      </v-card-text>
    </v-card>

  </div>

</template>

<script lang="ts">
/* eslint-disable */
import {Component, Vue, Watch} from 'vue-property-decorator';
import {getLesson, saveLesson} from "@/services/dbService";
import {Lesson, Part} from "@/models/Lessons";
import {Quiz, QuizType} from "@/models/Quiz";
import {VueEditor} from "vue2-editor";
import {uploadFile} from "@/services/filesService";

@Component({extends: VueEditor})
export default class LessonEdit extends Vue {

  private lesson: Lesson | null
  private initialQuiz: Quiz | null
  private finalQuiz: Quiz | null
  private id: string | null
  private content: string = this.$i18n.tc('Content')

  private title: string = this.$i18n.tc('Title')
  private subtitle: string = this.$i18n.tc('Subtitle')
  private description: string = this.$i18n.tc('Description')

  async created() {
    this.id = this.$route.params.id
    this.lesson = await getLesson(this.id)
    console.log(this.lesson)

    this.initLesson()

  }

  public initLesson() {
    if (!this.lesson) this.lesson = {} as Lesson


    if (this.lesson?.description) {
      this.description = this.lesson?.description as string
    }

    if (this.lesson?.title) {
      this.title = this.lesson?.title as string
    }

    if (this.lesson?.subtitle) {
      this.subtitle = this.lesson?.subtitle as string
    }

    if (this.lesson?.initialQuiz) {
      this.initialQuiz = this.lesson?.initialQuiz as Quiz
    } else {
      this.initialQuiz = {} as Quiz
    }

    if (this.lesson?.finalQuiz) {
      this.finalQuiz = this.lesson?.finalQuiz as Quiz
    } else {
      this.finalQuiz = {} as Quiz
    }
    this.$forceUpdate();
  }

  updateLessonObject() {
    this.lesson = {
      id: this.id,
      title: this.title,
      subtitle: this.subtitle,
      description: this.description,
      parts: [] as Part[],
      initialQuiz: this.initialQuiz,
      finalQuiz: this.finalQuiz
    } as Lesson
  }

  async save() {
    this.updateLessonObject()
    const result = await saveLesson(this.lesson as Lesson)
    console.log(result)
  }
  async createInitialQuiz(){
    await this.save()
    await this.$router.push({ name: 'QuizEdit', params: { id: "None", lessonId:this.id || "",quizType:QuizType.INITIAL } })
  }
  async editInitialQuiz(){
    await this.save()
    await this.$router.push({ name: 'QuizEdit', params: { id: (this.initialQuiz as any).id, lessonId:this.id || "",quizType:QuizType.INITIAL } })
  }
  async createFinalQuiz(){
    await this.save()
    await this.$router.push({ name: 'QuizEdit', params: { id: "None", lessonId:this.id || "",quizType:QuizType.FINAL } })
  }
  async editFinalQuiz(){
    await this.save()
    await this.$router.push({ name: 'QuizEdit', params: { id: (this.finalQuiz as any).id, lessonId:this.id || "",quizType:QuizType.FINAL } })
  }
  async createPart(){
    await this.save()
    await this.$router.push({ name: 'PartEdit', params: { id: "None", lessonId:this.id || "",partNumber:"0",action:"create" } })
  }
  async editPart(part:Part){
    await this.save()
    await this.$router.push({ name: 'PartEdit', params: { id: part.id, lessonId:this.id || "",partNumber:""+ part.partNumber,action:"edit" } })
  }

  @Watch('description')
  onPropertyChanged(value: string, oldValue: string) {
    console.log(value)
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

.save{
  margin-left: 10px;
}
.quiz-button{
  margin-left: 10px;
}


</style>
