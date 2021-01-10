<template>
  <v-card
      class="mx-auto"
      max-width="344"
  >
    <v-card-text>
      <div>Quizz</div>
      <p class="display-1 text--primary">
        {{ quizz.title }}
      </p>
      <p>{{ quizz.subtitle }}</p>
      <div class="text--primary">
        {{ quizz.description }}
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
          text
          color="teal accent-4"
          v-on:click="select(quizz)"
      >
        Go for it
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {Quizz} from "../../models/Quizz";

@Component({
  components: {},
})
export default class QuizzCard extends Vue {
  @Prop({required: false})
  public quizz: Quizz | undefined

  public select = (quizz: Quizz) => {
    this.$store.dispatch('setSelectedQuizzAction', quizz)
    this.$router.push('quizz-progress')

  }

}
</script>
