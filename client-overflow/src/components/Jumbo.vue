<template>
  <v-jumbotron>
    <v-container fill-height>
      <v-layout align-center>
        <v-flex>
          <h3 class="display-3">Welcome to the site</h3>
          <br>
          <span class="subheading">Superflow is the largest, most trusted online community for developers to learn, share​ ​their programming ​knowledge, and build their careers. We   serve as a platform for users to ask and answer questions, and, through membership and active participation, to vote questions and answers up or down and edit questions, So feel free to sign up and ask some Questions!.</span>

          <v-divider class="my-3"></v-divider>

          <div class="title mb-3">Lets Ask Some Questions you wish to know!</div>

          <v-btn
            class="mx-0"
            color="grey"
            large
          >
            <router-link to="/account">Ask Question</router-link>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-jumbotron>
</template>


