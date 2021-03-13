<template>
  <div>
    <h1 class="title font-weight-light main-title">{{ $t("Edit Lesson") }}</h1>
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


    <v-card
        elevation="2"
        outlined
        shaped
        tile
        class="general"
    >
      <v-card-title>{{ $t('Content') }}</v-card-title>
      <div class="input">
        <vue-editor id="editor2" useCustomImageHandler @image-added="handleImageAdded" v-model="content"/>

      </div>

    </v-card>

    <v-card
        elevation="2"
        outlined
        shaped
        tile
        class="general"
    >
      <v-card-title>{{ $t('Initial Quiz') }}</v-card-title>
      <v-btn
          large
          @click="createInitialQuiz">{{ $t('Create initial Quiz') }}
      </v-btn>
    </v-card>

    <v-card
        elevation="2"
        outlined
        shaped
        tile
        class="general"
    >
      <v-card-title>{{ $t('Final Quiz') }}</v-card-title>

    </v-card>

  </div>

</template>

<script lang="ts">
/* eslint-disable */
import {Component, Vue, Watch} from 'vue-property-decorator';
import {getLesson, saveLesson} from "@/services/dbService";
import {Lesson} from "@/models/Lessons";
import {Quiz} from "@/models/Quiz";
import {VueEditor} from "vue2-editor";
import {uploadFile} from "@/services/filesService";

@Component({extends: VueEditor})
export default class LessonEdit extends Vue {

  private lesson: Lesson | null
  private initialQuiz: Quiz | null
  private finalQuiz: Quiz | null
  private parts: string[] | null
  private id: string | null
  private content: string | null

  private title: string = this.$i18n.tc('Title')
  private description: string = this.$i18n.tc('Description')

  async handleImageAdded(file: File, Editor: any, cursorLocation: any) {
    const snapshot = await uploadFile(file)
    const url = snapshot
    Editor.insertEmbed(cursorLocation, 'image', url);
  }

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

    if (this.lesson?.parts) {
      this.parts = this.lesson?.parts as string[]
      this.content = this.parts[0]
    } else {
      this.parts = [""]
    }

    this.$forceUpdate();
  }

  updateLessonObject() {
    this.lesson = {
      id: this.id,
      title: this.title,
      description: this.description,
      parts: [this.content],
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
    await this.$router.push({ name: 'QuizEdit', params: { id: "None", lessonId:this.id || "",quizType:"initial" } })

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

</style>
