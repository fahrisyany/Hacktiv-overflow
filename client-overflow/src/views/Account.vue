<template>
    

<div class='account'>

 


<v-content>
      <v-container>
        <v-layout row wrap align-center>
          <v-flex xs12 md4>
            <div class="text-xs-center">
              <v-avatar size="125px">
                <img
                  class="img-circle elevation-7 mb-1"
                  src="https://raw.githubusercontent.com/vuetifyjs/docs/dev/static/doc-images/lists/1.jpg"
                >
              </v-avatar>
              
              <div class="headline">John <span style="font-weight:bold">Carter</span></div>
              <div class="subheading text-xs-center grey--text pt-1 pb-3">Lorem ipsum dolor sit amet</div>
              <v-layout justify-space-between>
                <a href="javascript:;" class="body-2">Home</a>
                <a href="javascript:;" class="body-2">About</a>
                <a href="javascript:;" class="body-2">Github</a>
                <a href="javascript:;" class="body-2">Other</a>
              </v-layout>

            </div>
          </v-flex>
          <v-flex xs12 md5 offset-md2>
              
            <div v-for="(question,index) in myQuestions" :key="index">
                
              <v-card class="my-3" hover width="400">
           <v-btn color="primary" v-on:click.stop="dialog = true,getQuestion(index)" fab small dark>
    
 <v-dialog v-model="dialog"  transition="dialog-bottom-transition" width="80%">
      <v-card height="450">
<form class="form-signin" @submit.prevent="updateQuestion">
        <v-toolbar dark class="primary">
          <v-btn icon @click.native="dialog = false" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title >Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>

          </v-toolbar-items>
        </v-toolbar>
      
        <v-card-title primary-title >
             <input class="input is-rounded" type="text" v-model="updateQuestionTitle">
       
               <wysiwyg class="text-area" v-model="updateQuestionBody"/>
        </v-card-title>
         <v-btn class="button is-block is-info is-large is-fullwidth" @click.native="dialog = false" type="submit">Submit</v-btn>

         </form>            
      </v-card>
    </v-dialog>
              <v-icon >edit</v-icon>
            </v-btn>
                  <v-container fill-height fluid>
                    <v-layout>
                      <v-flex xs12 align-end d-flex>
                        <span class="headline">{{ question.questionTitle }}</span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                <v-card-text>
                  {{ question.questionBody }}
                </v-card-text>
                <v-card-actions>
          
                  <v-spacer></v-spacer>

         <div>
        <v-btn small color="error" @click="deleteQuestion(index)">Delete</v-btn>
         </div>
                  <v-btn flat class="blue--text"><router-link :to='`/question/${question._id}`'>Read More</router-link></v-btn>
                </v-card-actions>

              </v-card>

            </div>
          </v-flex>
        </v-layout>
        
         <createfForm></createfForm>

         
      </v-container>
    </v-content>
    
</div>

</template>
<script>
import createfForm from "../components/CreateForm";
import axios from "axios";

export default {
  data() {
    return {
      // title: 'Your Logo',
      // posts: [
      //   {
      //     title: 'Fusce ullamcorper tellus',
      //     content: 'Fusce ullamcorper tellus sed maximus rutrum. Donec imperdiet ultrices maximus. Donec non tellus non neque pellentesque fermentum. Aenean in pellentesque urna.',
      //   },
      //   {
      //     title: 'Donec vitae suscipit lectus, a luctus diam.',
      //     content: 'Donec vitae suscipit lectus, a luctus diam. Proin vitae felis gravida, lobortis massa sit amet, efficitur erat. Morbi vel ultrices nisi.',
      //   },
      //   {
      //     title: 'Vestibulum condimentum quam',
      //     content: 'At sagittis sapien vulputate. Vivamus laoreet lacus id magna rutrum dapibus. Donec vel pellentesque arcu. Maecenas mollis odio tempus felis elementum commodo.',
      //   }
      // ]
      myQuestions: [],
      updateQuestionId: "",
      updateQuestionTitle: "",
      updateQuestionBody: "",
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false
    };
  },

  methods: {
    getOwnQuestion() {
      let token = localStorage.getItem("token");
      axios
        .get("http://35.186.157.131/users/showMyQuestion", {
          headers: {
            token
          }
        })
        .then(result => {
          //   console.log(result);

          this.myQuestions = result.data.question;
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteQuestion: function(index) {
      let ChoosenQuestionId = this.myQuestions[index]._id;
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this Article!",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          this.myQuestions.splice(index, 1);
          swal("Poof! Your Question  has been deleted!", {
            icon: "success"
          }).then(() => {
            axios({
              method: "DELETE",
              url: `http://35.186.157.131/users/deleteQuestion/${ChoosenQuestionId}`,

              headers: {
                token: localStorage.getItem("token")
              }
            });
          });
        } else {
          swal("Your Question  is safe!");
        }
      });
    },
    getQuestion: function(index) {
      let ChoosenQuestionId = this.myQuestions[index]._id;

      let token = localStorage.getItem("token");
      axios
        .get(
          `http://35.186.157.131/users/showOneQuestion/${ChoosenQuestionId}`,
          {
            headers: {
              token
            }
          }
        )
        .then(result => {
          this.oneQuestion = result.data.question;
          this.updateQuestionId = this.oneQuestion[0]._id;
          this.updateQuestionTitle = this.oneQuestion[0].questionTitle;
          this.updateQuestionBody = this.oneQuestion[0].questionBody;
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateQuestion: function() {
      axios({
        method: "PUT",
        url: `http://35.186.157.131/users/editQuestion/${
          this.updateQuestionId
        }`,
        data: {
          questionTitle: this.updateQuestionBody,
          questionBody: this.updateQuestionTitle
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
          token: localStorage.getItem("token")
        }
      })
        .then(result => {
          this.oneArticle = result;
          swal("your Question has been Updated", " ", "success").then(() => {
            // this.$router.push(`/account`);
            this.dialog = false;
            this.getOwnQuestion();
          });
          this.message = "success";
        })
        .catch(err => {
          console.log("gagal");

          this.message = err.message;
        });
    }
  },

  components: {
    createfForm
  },
  created() {
    this.getOwnQuestion();
  }
  //   watch: {
  //     myQuestions: function(value) {
  //       this.getOwnQuestion;
  //     }
  //   }
};
</script>



<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

/* .createfForm{
padding-left: 4000px;
} */

.account {
  /* height: 400px; */
  padding-left: 400px;
  padding-right: 400px;
  /* padding-top: 400px; */

  /* border:a solid red 2px; */
}
</style>
