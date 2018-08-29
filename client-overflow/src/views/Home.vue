<template>
  <div class="home page">
   <Jumbo></Jumbo>
    <span class="subheading"> Popular Questions :</span>
    <br>
    <br>
<mainTile></mainTile>
    <router-view></router-view>

  </div>
</template>

<script>
// @ is an alias to /src
import Jumbo from "../components/Jumbo";

import MainTile from "../components/MainTile";

export default {
  name: "home",
  components: {
    MainTile,
    Jumbo
  }
};
</script>
