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
import {Quizz} from "../../models/Quizz";
import QuizzCard from "@/components/QuizzCard.vue";

@Component({
  components: {QuizzCard},
})
export default class QuizzesMenu extends Vue {
  public quizzes: Quizz[] = []
  public dialog = false


  public async getQuizzes() {
    await this.getQuizzesAvailable()
    this.$forceUpdate();

  }

  public async getQuizzesAvailable() {
    //const result  = await quizzesCollection.limit(10).where("public", "==", true).orderBy("date", "desc").get()
    const result = await quizzesCollection.limit(10).where("public", "==", true).get()
    console.log(result.docs)
    const quizzes = []
    for (const doc of result.docs) {
      quizzes.push(doc.data() as Quizz)
    }
    this.quizzes = quizzes
    console.log(quizzes)
    //this.$store.dispatch('setSelectedQuizzAction', "a")
  }


  async created() {
    await this.getQuizzes()
  }

}
</script>
