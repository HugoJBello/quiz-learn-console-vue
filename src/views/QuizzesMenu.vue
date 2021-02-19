<template>
  <div>
    <v-container fluid>
      <div id="example-1">
        <div v-for="item in quizzes" :key="item.id">
          <QuizzCard :quizz="item"></QuizzCard>
        </div>
      </div>
    </v-container>
  </div>

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {quizzesCollection, results, storage} from '../firebase'
import {Quizz} from "../models/Quizz";
import QuizzCard from "@/components/QuizzCard.vue";
import {getQuizzesAvailable} from "@/services/quizesService";

@Component({
  components: {QuizzCard},
})
export default class QuizzesMenu extends Vue {
  public quizzes: Quizz[] = []
  public dialog = false


  public async getQuizzes() {
    await this.getQuizzesAvailableForUser()
    this.$forceUpdate();

  }

  public async getQuizzesAvailableForUser() {
    const quizzes = await getQuizzesAvailable(10,0)
    this.quizzes = quizzes
    console.log(quizzes)
    //this.$store.dispatch('setSelectedQuizzAction', "a")
  }


  async created() {
    await this.getQuizzes()
  }

}
</script>
