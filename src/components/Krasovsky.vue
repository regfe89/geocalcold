<template>
  <div id="parameters">
    <div>Малая полуось (полярный радиус): {{ a }} м</div>
    <div>Большая полуось (экваториальный радиус): {{ b }} м</div>
    <div>Малая полуось (полярный радиус): {{ a }} м</div>

    <!-- <input v-model="msg" placeholder="a" /> -->
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      a: 6356863,
      b: 6378245
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#parameters {
  text-align: left;
}
</style>
