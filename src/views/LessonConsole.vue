<template>
  <div>

  </div>

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import QuizCard from "@/components/QuizzCard.vue";
import {getQuizzesAvailable} from "@/services/quizesService";

@Component({
  components: {QuizCard: QuizCard},
})
export default class LessonConsole extends Vue {
  public dialog = false

  get lessons() {
    return this.$store.state.lessons
  }

  async created() {
    //await this.$store.dispatch('setLessonsForUser')
    //console.log("--------__", this.lessons)
  }

}
</script>
