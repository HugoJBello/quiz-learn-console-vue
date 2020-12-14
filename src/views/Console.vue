<template>
  <div>
    <v-container fluid>

    </v-container>
  </div>

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {quizzesCollection, results, storage} from '../firebase'

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
    const result  = await quizzesCollection.limit(10).where("public", "==", true).orderBy("date", "desc").get()
    console.log(result)
    this.quizzes = result
  }


  async created() {
    await this.getQuizzes()
  }

}
</script>
