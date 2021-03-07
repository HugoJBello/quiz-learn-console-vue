<template>
  <div>

  </div>

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
})
export default class LessonEdit extends Vue {


  async created() {
    console.log(this.$route.params.id
  )
  }

}
</script>
