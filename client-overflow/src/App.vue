<template>
 <div id="app">
  <v-app id="inspire">
    <v-toolbar>
      <v-toolbar-title>Superflow</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down" v-if="!loggedIn && !token">
         <v-btn
          v-for="item in menu"  
          :key="item.icon"
          :to="item.path"
          flat
        >{{ item.title }}</v-btn>
      </v-toolbar-items>
        <v-toolbar-items class="hidden-sm-and-down" v-else>
         <v-btn
          v-for="item in loginMenu"  
          :key="item.icon"
          :to="item.path"
          flat
        >{{ item.title }}</v-btn>
      <v-btn @click="logOut" >logout</v-btn>

      </v-toolbar-items>
      
      <v-menu class="hidden-md-and-up">
        <v-toolbar-side-icon slot="activator"></v-toolbar-side-icon>
        <v-list v-if="loggedIn">
          <v-list-tile v-for="item in menu" :key="item.icon">
            <v-list-tile-content>
              <v-list-tile-title >{{ item.title }}</v-list-tile-title>
             </v-list-tile-content>
          </v-list-tile>   
        </v-list>
      </v-menu>
      
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex shrink>
    <transition name="fade" mode ="out-in" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutDown">
    <router-view></router-view>
    </transition>
          </v-flex>
        </v-layout>
      </v-container>
      
         <v-footer
    dark
    height="auto"
  >
    <v-card
      class="flex"
      flat
      tile
    >
      <v-card-title class="grey">
        <strong class="subheading">Get connected with us on social networks!</strong>

        <v-spacer></v-spacer>

        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-3"
          dark
          icon
        >
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-actions class="grey lighten-2 justify-center">
        &copy;2018 — <strong>Vuetify</strong>
      </v-card-actions>
    </v-card>
  </v-footer>
    </v-content>
  </v-app>
  
  
</div>



</template>


<script>
import swal from "sweetalert";

// import store from 'vuex';
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      token: localStorage.getItem('token'),
      menu: [
        { icon: "login", path: "/login", title: "Login" },
        { icon: "register", path: "/register", title: "Register" },
        { icon: "home", path: "/", title: "Home" },
        { icon: "about", path: "/about", title: "About" }
      ],

      loginMenu: [
        // { icon: "logout", title: "Logout", click: this.logOut },
        { icon: "home", path: "/", title: "Home" },
        { icon: "account", path: "/account", title: "account" }
      ],
      icons: [
        "fab fa-facebook",
        "fab fa-twitter",
        "fab fa-google-plus",
        "fab fa-linkedin",
        "fab fa-instagram"
      ],
      dialog: false
    };
  },

  methods: {
    ...mapMutations(["setLoggedIn"]),
    menuItems() {
      return this.menu;
    },
    logOut() {
      swal(`Bye2 see you soon ${localStorage.username} !`);

      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("id");

      this.token = undefined;
      this.$store.commit(`setLoggedIn`, false);
    }
  },
  computed: {
    ...mapState(["loggedIn"]),
    loggedIn() {
      return this.$store.state.loggedIn;
    }
  },

  created() {
    if (localStorage.token) {
      this.token = localStorage.getItem("token");
    }
  },
  watch: {
    // let self= this
    login: function() {
      this.loggedIn;
    }
  }
};
</script>


<style>
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";

body {
  /* background: rgb(233, 233, 233); */
  font-family: Arial, Helvetica, sans-serif;
}

/* #app {
  background: #fff;
  width: 50%;
  padding: 30px;
  border-radius: 10px;
  margin: 50px auto 0 auto;
  height: calc(60% - 50px);
} */

.page {
  /* position: fixed; */
  /* width: inherit; */
}
</style>

