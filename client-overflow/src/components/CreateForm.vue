<template>

  <v-layout>
      
    <v-flex xs12 sm6 offset-sm3>
        <form class="form-signin" @submit.prevent="createArticle">
      <v-card height="400px" width="600px">
      

        <v-card-title primary-title>

        </v-card-title>
               <v-text-field
            label="Question Title"
            v-model="questionTitle"
            single-line
          ></v-text-field>
          <br>
         <wysiwyg v-model="myHTML" height="700px" />

       <v-btn
            type='submit'
            color="primary"
            flat>
            Post
           </v-btn>

      </v-card>
       </form>

    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
import swal from "sweetalert";

export default {
  data: function() {
    return {
      token: localStorage.getItem("token"),
      questionTitle: "",
      myHTML: ""
    };
  },

  methods: {
    createArticle: function() {
      axios({
        method: "POST",
        url: "http://35.186.157.131/users/createQuestion",
        data: {
          questionTitle: this.questionTitle,
          questionBody: this.myHTML
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
          token: localStorage.getItem("token")
        }
      })
        .then(() => {
          swal({
            title: "Good job!",
            text: "Article Created!",
            icon: "success",
            button: "back to Home!"
          }).then(() => {
            this.$router.push("/");
          });
          this.message = "success";
        })
        .catch(err => {
          swal("Ooops", "All input must be filled buddy!", "error");

          this.message = err.message;
        });
    }
  }
};
</script>


<style>

@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
