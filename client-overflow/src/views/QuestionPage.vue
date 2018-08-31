<template>
   <div class="question" >
     <div class="content" v-for="(question,index) in oneQuestion" :key="index" >
<h1>{{question.questionTitle}}</h1>
<div class="blockquote">
<p v-html="question.questionBody"></p>
<div class="text-xs-center">
    <v-dialog
      width="800">
      <v-btn
      @click="launch()"
      flat small
      slot="activator"
      color="red lighten-2"
      dark>
        Answer
      </v-btn>

    <form @submit.prevent="createAnswer">
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
{{question.questionTitle}}
</v-card-title>

        <v-card-text>
          <wysiwyg v-model="myHTML" />
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            type='submit'
            color="primary"
            flat
            @click="dialog = false"
          >
            Answer
          </v-btn>
        </v-card-actions>

      </v-card>
          </form>
    </v-dialog>
  </div>

</div>
     </div>
      <v-flex xs12 sm6 offset-sm3>
        <v-card div class="card" v-for="(answer,index) in questionAnswers" :key="index" >
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{answer.userId.username}}</h3>
              <br>
              <div class="content" v-html="answer.answerBody" ></div>
            </div>
          </v-card-title>
          <v-card-actions>
                    <a class="button is-danger is-small" v-if="answer.userId._id==id" v-on:click.stop="dialog = true,getOneAnswer(index)">Update</a>




<v-dialog v-model="dialog"  transition="dialog-bottom-transition" width="80%">
      <v-card>
        <form class="form-signin" @submit.prevent="updateQuestion">

        <v-toolbar dark class="primary">
          <v-btn icon @click.native="dialog = false" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="dialog = false,editAnswer()">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
       
        <v-card-title primary-title>
            <h3 class="headline mb-0">Edit your Answer</h3>
             <wysiwyg class="text-area" v-model="oneAnswer"/>

        </v-card-title>
        <v-card-actions>
          <v-btn flat class="orange--text">Share</v-btn>
          <v-btn flat class="orange--text">Explore</v-btn>
        </v-card-actions>
                 </form>            

      </v-card>

    </v-dialog>







          </v-card-actions>
        </v-card>
      </v-flex>
   </div>
</template>


<script>
import axios from "axios";
import swal from "sweetalert2";

export default {
  data: function() {
    return {
      id: localStorage.getItem("id"),
      questionId: this.$route.params.id,
      oneQuestion: "",
      questionAnswers: "",
      myHTML: "",
      isActive: false,
      dialog: false,
      oneAnswerId: "",
      oneAnswer: ""
    };
  },
  methods: {
    getQuestion: function() {
      let token = localStorage.getItem("token");
      axios
        .get(`http://35.186.157.131/users/showOneQuestion/${this.questionId}`, {
          headers: {
            token
          }
        })
        .then(result => {
          this.oneQuestion = result.data.question;
        })
        .catch(err => {
          if (err.message) {
            this.$router.push("/");

            console.log(err.message);
          }
        });
    },
    createAnswer: function() {
      axios({
        method: "POST",
        url: `http://35.186.157.131/users/createAnswer/${this.questionId}`,
        data: {
          answerBody: this.myHTML
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
          token: localStorage.getItem("token")
        }
      })
        .then(response => {
          this.$router.push(`/question/${this.questionId}`);
          this.isActive = false;

          let data = response.data.answer;
          this.questionAnswers.push(data);
          this.getAnswer();
          this.myHTML = "";
        })
        .catch(err => {
          this.message = err.message;
        });
    },
    getAnswer: function() {
      axios
        .get(`http://35.186.157.131/users/getAnswer/${this.questionId}`, {})
        .then(result => {
          this.questionAnswers = result.data.answer;
        })
        .catch(err => {
          this.message = err.message;
          console.log(err.message);
        });
    },
    getOneAnswer: function(index) {
      let ChoosenAnswerId = this.questionAnswers[index]._id;
      let token = localStorage.getItem("token");

      axios
        .get(`http://35.186.157.131/users/getOneAnswer/${ChoosenAnswerId}`, {
          headers: {
            token
          }
        })
        .then(result => {
          this.oneAnswerId = result.data.answer[0]._id;
          this.oneAnswer = result.data.answer[0].answerBody;
        })
        .catch(err => {
          this.message = err.message;
          console.log(err.message);
        });
    },
    editAnswer: function() {
      axios({
        method: "PUT",
        url: `http://35.186.157.131/users/editAnswer/${this.oneAnswerId}`,
        data: {
          answerBody: this.oneAnswer
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
          token: localStorage.getItem("token")
        }
      })
        .then(result => {
          swal("your Answer has been Updated", " ", "success").then(() => {
            this.dialog = false;
            this.getAnswer();
          });
          this.message = "success";
        })
        .catch(err => {
          console.log("gagal");

          this.message = err.message;
        });
    },
    launch: function() {
      this.isActive = true;
    },
    close: function() {
      this.isActive = false;
    }
  },
  mounted() {
    this.getAnswer(this.questionId);
    this.getQuestion(this.questionId);
  }
};
</script>








<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

.card {
  margin-left: 6em;

  margin-top: 30px;
}
.content {
  margin-left: 90px;
  display: grid;
  grid-template-columns: 1fr 1fr 10px 740px 10px 1fr 1fr;
}
.articcontentle > * {
  grid-column: 4;
}

.content > .figure {
  grid-column: 2 / -2;
  margin: 20px 0;
}

.content > .blockquote {
  grid-column: 3 / 5;
  padding-left: 40px;
  color: #666;
  border-left: 3px solid black;
}

.aside {
  grid-column: 5;
}
</style>

