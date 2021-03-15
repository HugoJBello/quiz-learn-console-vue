<template>
  <div>
    <v-btn
        v-if="action==='create'"
        color="primary"
        text
        @click="questionDialog = true"
    >
      {{ $t('Create question') }}
    </v-btn>
    <v-btn
        v-if="action==='edit'"
        color="primary"
        text
        @click="questionDialog = true"
    >
      {{ $t('Edit') }}
    </v-btn>

    <v-dialog
        v-model="questionDialog"
        width="500"
    >
      <v-card>
        <v-card-title>
          {{ $t('New question') }}
        </v-card-title>

        <v-card-text>
          <div class="input">
            <v-text-field
                :label="$t('Question text')"
                outlined
                v-model="editingQuestion.questionText"
            ></v-text-field>
          </div>

          <div class="input">
            <v-text-field
                :label="$t('Question explanation')"
                outlined
                v-model="editingQuestion.explanation"
            ></v-text-field>
          </div>
          <v-divider></v-divider>
          <br/>
          <div class="subtitle-1"> {{ $t('Answers') }}
            <v-btn
                v-if="!addingQuestionNewAnswer"
                color="secondary"
                text
                @click="addNewAnswer"
            >{{ $t('add') }}
            </v-btn>
          </div>
          <div v-if="addingQuestionNewAnswer">
            <v-text-field
                :label="$t('New answer')"
                outlined
                v-model="newAnswer"
            ></v-text-field>
            <v-btn
                color="primary"
                text
                @click="saveNewAnswer"
            >{{ $t('add') }}
            </v-btn>
          </div>


          <span class="input" v-for="(answer, index) in editingQuestion.answerOptions" :key="answer">
              <v-checkbox
                  v-model="editingQuestion.correctAnswers"
                  :label="answer"
                  :value="index"
              ></v-checkbox>
              <v-btn
                  color="primary"
                  text
                  @click="removeEditingAnswer(answer, index)"
              >{{ $t('remove answer') }}</v-btn>
            </span>

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              text
              @click="questionDialog = false"
          >
            {{ $t('Cancel') }}
          </v-btn>
          <v-btn
              v-if="action==='create'"
              color="primary"
              text
              @click="createQuestion"
          >
            {{ $t('Create') }}
          </v-btn>
          <v-btn
              v-if="action==='edit'"
              color="primary"
              text
              @click="editQuestion"
          >
            {{ $t('Create') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


  </div>
</template>

<script lang="ts">
/* eslint-disable */
import {Component, Prop, Vue} from 'vue-property-decorator';
import QuizCard from "@/components/CourseCard.vue";
import {Lesson} from "@/models/Lessons";
import moment from "moment";
import {Question} from "@/models/Quiz";

@Component({
  components: {},
})
export default class QuestionEdit extends Vue {
  @Prop({required: false, type: Object}) readonly existingQuestion: Question
  @Prop({required: false, type: String, default:"create"}) readonly action: string
  @Prop({required: true, type: Number, default:0}) readonly index: number

  private editingQuestion: Question = this.initQuestion()
  private newAnswer: string
  private addingQuestionNewAnswer = false
  private questionDialog = false

  initQuestion(){
    return {questionText:"", questionNumber:this.index, explanation:"", answerOptions: [] as string[], correctAnswers: [] as number[]} as Question
  }
  async created() {
    console.log("----------", this.existingQuestion)
    if (this.existingQuestion) {
      this.editingQuestion = Object.assign({}, this.existingQuestion)
    } else {
      this.editingQuestion = this.initQuestion()
    }
  }

  createQuestion(){
    this.editingQuestion.questionNumber = this.index
    console.log(this.editingQuestion)
    this.$emit("addQuestion", this.editingQuestion)
    this.questionDialog = false
    this.newAnswer = ""
  }
  editQuestion(){
    this.editingQuestion.questionNumber = this.index
    console.log(this.editingQuestion)
    this.$emit("editQuestion", this.editingQuestion)
    this.questionDialog = false
    this.newAnswer = ""
  }
  addNewAnswer() {
    this.addingQuestionNewAnswer = true
  }

  saveNewAnswer() {
    this.addingQuestionNewAnswer = false
    this.editingQuestion.answerOptions.push(this.newAnswer)
  }

  removeEditingAnswer(answer: string, index: number) {
    console.log(this.editingQuestion.answerOptions)
    this.editingQuestion.answerOptions = this.editingQuestion.answerOptions.filter((ans: string) => ans !== answer)
    this.editingQuestion.correctAnswers = this.editingQuestion.correctAnswers.filter((ans: number) => ans !== index)
    console.log(this.editingQuestion.answerOptions)

    this.$forceUpdate();
    console.log(answer, index)
  }


}
</script>

<style>

</style>