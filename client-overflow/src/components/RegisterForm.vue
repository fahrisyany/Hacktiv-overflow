<template>


  <form  @submit.prevent="register">
      <h1>Register</h1>
    <v-text-field
     v-validate="'required|max:10'"
      v-model="username"
      :counter="10"
      :error-messages="errors.collect('name')"
      label="username"
      data-vv-name="username"
      required
    ></v-text-field>
    <v-text-field
      v-model="password"
       :type="'password'"

      label="Password"
      required
    
    ></v-text-field>
       <v-text-field
        v-validate="'required|email'"
      v-model="email"
      :error-messages="errors.collect('email')"
      label="E-mail"
      data-vv-name="email"
      required
    ></v-text-field>
 
    <v-checkbox
      label="By clicking Register, you acknowledge that you have read our updated terms of service, privacy policy and cookie policy, and that your continued use of the website is subject to these policies."
      required
  
    ></v-checkbox>

    <v-btn type="submit">Register</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </form>
</template>

<script>
import swal from "sweetalert2";
import axios from "axios";


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
    register() {
      axios({
        method: "POST",
        url: "http://35.186.157.131/register",
        data: {
          username: this.username,
          email: this.email,
          password: this.password
        },
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      })
        .then(() => {
          swal("Registration Success", "But Wait!!", "success").then(() => {
            swal(`please loggin first just to make sure `);

            this.$router.push({ name: "login" });
          });
        })
        .catch(err => {
          swal(
            "Ooops",
            "username/password is invalid please try another",
            "error"
          );

          this.message = err.message;
        });
    },
    clear() {
      this.username = "";
      this.email = "";
      this.password = null;
      //   this.checkbox = null;
      // this.$validator.reset();
    },
    submit() {
      this.$validator.validateAll();
    }
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
  },
  
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
