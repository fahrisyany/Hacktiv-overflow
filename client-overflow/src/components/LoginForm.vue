<template>


  <form  @submit.prevent="login">
      <h1>Login Form</h1>
       <v-text-field
        v-validate="'required|email'"
      v-model="email"
      :error-messages="errors.collect('email')"
      label="E-mail"
      data-vv-name="email"
      required
    ></v-text-field>
    <v-text-field
      v-model="password"
       :type="'password'"
      label="Password"
      required
    ></v-text-field>
    <v-btn @click="loginFb">Login with facebook</v-btn>

    <v-btn type="submit" >Login</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </form>
</template>

<script>
import swal from "sweetalert2";
import axios from "axios";
import { provider, fbLogin } from "../firebase/firebase.js";
// import store from "vuex";
import { mapMutations } from "vuex";

export default {
  $_veeValidate: {
    validator: "new"
  },
  data() {
    return {
      username: "",
      password: "",
      email: "",
      dictionary: {
        attributes: {
          email: "E-mail Address"
          // custom attributes
        },
        custom: {
          name: {
            required: () => "Name can not be empty",
            max: "The name field may not be greater than 10 characters"
            // custom messages
          },
          select: {
            required: "Select field is required"
          }
        }
      }
    };
  },

  methods: {
    loginFb() {
      fbLogin
        .signInWithPopup(provider)
        .then(function(result) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          localStorage.setItem("token", token);
          localStorage.setItem("username", user.displayName);

          //   swal("Login", "Successs", "success").then(() => {
          //     swal(
          //       `Wellcome ${
          //         localStorage.username
          //       } feel free to write whatever you want!`
          //     );
          //     // console.log(`++++++`,this.$router);
          //   });
          //   this.$router.push("/");

          this.logIn();
          this.$router.push("/");
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    },
    login() {
      axios({
        method: "POST",
        url: "http://localhost:3000/login",
        data: {
          email: this.email,
          password: this.password
        },
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      })
        .then(response => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("username", response.data.username);
          localStorage.setItem("id", response.data.id);
          swal("Login", "Successs", "success").then(() => {
            swal(
              `Wellcome ${
                localStorage.username
              } feel free to write whatever you want!`
            );
            this.logIn();
            this.$router.push("/");
          });
        })
        .catch(err => {
          swal("Ooops", "wrong username or password", "error");

          if (err.message == "Request failed with status code 400") {
            this.message = "wrong username or password";
          }
        });
    },
    clear() {
      this.username = "";
      this.email = "";
      this.password = null;
      this.checkbox = null;
      //   this.$validator.reset();
    },
    submit() {
      this.$validator.validateAll();
    },
    ...mapMutations(["setLoggedIn"]),

    logIn() {
      this.$store.commit(`setLoggedIn`, true); // mutate loggedIn state in vuex
    }
  },
  
  mounted() {
    this.$validator.localize("en", this.dictionary);
  }
};
</script>








<style>
form {
  margin-left: 0px;
  min-width: 300px;
  min-width: 600px;

  /* border: solid red 2px; */
}
</style>
