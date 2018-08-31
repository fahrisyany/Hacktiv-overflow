<template>
    <v-expansion-panel v-if="listQuestions">
   
      <v-expansion-panel-content
        v-for="(question,index) in listQuestions"
        :key="index"
        expand-icon="mdi-menu-down">

        <div slot="header">{{question.questionTitle}}  </div>
        <v-card>
          <v-card-text class="grey lighten-3">  
           <v-textarea
             disabled
            :value=question.questionBody
          ></v-textarea>
            
   <div>
      <v-btn flat icon color="blue lighten-2" @click="upvoteQuestion(index)">
      {{question.upvote.length}}
        <v-icon>thumb_up</v-icon>
      </v-btn>
      <v-btn flat icon color="red lighten-2" @click="downQuestion(index)">
        <v-icon>thumb_down</v-icon>
      {{question.downvote.length}}
      </v-btn>
    </div>
            
        <v-btn small><router-link :to='`/question/${question._id}`'>Read More</router-link></v-btn>
            </v-card-text>
        </v-card>
          <div>
            
      </div>
       <v-layout>
      
  </v-layout>
      </v-expansion-panel-content>
      
    </v-expansion-panel>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      listQuestions: [],
      dialog: false
    };
  },
  props: {
    msg: String
  },
  methods: {
    showQuestion: function() {
      axios
        .get("http://35.186.157.131/users/showQuestion")
        .then(result => {
          // console.log(`===>`, result.data.question);
          this.listQuestions = result.data.question;
        })
        .catch(err => {
          console.log(err);
        });
    },
    upvoteQuestion: function(index) {
      let ChoosenQuestionId = this.listQuestions[index]._id;
      console.log(ChoosenQuestionId);
      
      let token = localStorage.getItem("token");
      axios
        .put(
          `http://35.186.157.131/users/upvoteQuestion/${ChoosenQuestionId}`,
          {},
          {
            headers: {
              token
            }
          }
        )
        .then(() => {
          alert("You just upvoted");
          this.showQuestion();
        })
        .catch(err => {
          console.log(err);

          alert(`sorry ${err}`);
        });
    },
    downQuestion: function(index) {
      let ChoosenQuestionId = this.listQuestions[index]._id;
      let token = localStorage.getItem("token");

      axios
        .put(
          `http://35.186.157.131/users/downvoteQuestion/${ChoosenQuestionId}`,
          {},
          {
            headers: {
              token
            }
          }
        )
        .then(() => {
          alert("You just downvoted");
          this.showQuestion();
        })
        .catch(err => {
          console.log(err);

          alert(`sorry ${err}`);
        });
    }
  },
  created() {
    this.showQuestion();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
