<template>
  <div>
    <LessonsTable v-if="lessons" :lessons="lessons"></LessonsTable>
  </div>

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import LessonsTable from "@/components/LessonsTable.vue";

@Component({
  components: {LessonsTable: LessonsTable},
})
export default class LessonConsole extends Vue {
  public dialog = false

  get lessons() {
    return this.$store.state.lessons
  }

  async created() {
    await this.$store.dispatch('setLessons')
    console.log("--------***", this.lessons)
  }

}
</script>
