import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import VeeValidate from "vee-validate";
import wysiwyg from "vue-wysiwyg";
// import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.use(wysiwyg, {});
Vue.use(VeeValidate);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
