<template>
  <div>
    <v-container fluid>

    </v-container>
  </div>

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {quizzesCollection, results, storage} from '../firebase'
import {Quizz} from "../../models/Quizz";

@Component({
  components: {
  },
})
export default class Console extends Vue {
  public quizzes: any = {}
  public dialog = false

  public async getQuizzes() {
    await this.getQuizzesAvailable()
    this.$forceUpdate();

  }

  public async getQuizzesAvailable() {
    //const result  = await quizzesCollection.limit(10).where("public", "==", true).orderBy("date", "desc").get()
    const result  = await quizzesCollection.limit(10).where("public", "==", true).get()
    console.log(result.docs)
    const quizzes = []
    for (const doc of result.docs) {
      quizzes.push(doc.data() as Quizz)
    }
    this.quizzes = quizzes
    console.log(quizzes)
    console.log(quizzes[0].questions[0].answerOptions)
  }




  async created() {
    await this.getQuizzes()
  }

}
</script>
