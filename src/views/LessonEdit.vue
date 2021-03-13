<template>
  <div>
    <h1 class="title font-weight-light main-title">{{ $t("Edit Lesson") }}</h1>
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
        <vue-editor useCustomImageHandler @imageAdded="handleImageAdded" v-model="description"/>

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

    </v-card>

    <v-card
        elevation="2"
        outlined
        shaped
        tile
        class="general"
    >
      <v-card-title>{{ $t('Initial Quiz') }}</v-card-title>
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
import {Component, Vue} from 'vue-property-decorator';
import {getLesson} from "@/services/dbService";
import {Lesson} from "@/models/Lessons";
import {Quiz} from "@/models/Quiz";
import {VueEditor} from "vue2-editor";

@Component({extends: VueEditor})
export default class LessonEdit extends Vue {

  private lesson: Lesson | null
  private initialQuiz: Quiz | null
  private finalQuiz: Quiz | null
  private parts: string[] | null

  private title: string
  private description: string

  async handleImageAdded(file: File, Editor: any, cursorLocation: any, resetUploader: any) {
    console.log(file)
  }

  async created() {
    const id = this.$route.params.id
    this.lesson = await getLesson(id)
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
    }

    if (this.lesson?.finalQuiz) {
      this.finalQuiz = this.lesson?.finalQuiz as Quiz
    }

    if (this.lesson?.parts) {
      this.parts = this.lesson?.parts as string[]
    } else {
      this.parts = []
    }

    this.$forceUpdate();
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
</style>
