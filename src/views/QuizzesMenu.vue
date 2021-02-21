<template>
  <div>
    <v-container fluid>
      <div id="example-1">
        <div v-for="item in quizes" :key="item.id">
          <QuizCard :quizz="item"></QuizCard>
        </div>
      </div>
    </v-container>
  </div>

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {quizzesCollection, results, storage} from '../firebase'
import {Quiz} from "../models/Quiz";
import QuizCard from "@/components/QuizzCard.vue";
import {getQuizzesAvailable} from "@/services/quizesService";

@Component({
  components: {QuizCard: QuizCard},
})
export default class QuizzesMenu extends Vue {
  public dialog = false

  get quizes() {
    return this.$store.state.availableQuizesForUser
  }

  async created() {
    await this.$store.dispatch('setAvailableQuizesForUser')
    console.log("--------__", this.quizes)
  }

}
</script>
