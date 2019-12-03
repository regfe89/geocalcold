<template>
  <div id="parameters">
    <div>Малая полуось (полярный радиус): {{ b }} м</div>
    <div>Большая полуось (экваториальный радиус): {{ a }} м</div>
    <div>e<sup>2</sup>: {{ e_sq }} м</div>
    <div>
      <span>B: </span>
      <span><input id ='B' type = 'number' v-model="B_deg"/></span>°
      <span><input id ='B' type = 'number' v-model="B_min"/></span>'
      <span><input id ='B' type = 'number' v-model="B_sec"/></span>''
      
    </div>
    <div>B в градусах: {{ b_total_deg }}</div>
    <div>cos B: {{ Math.cos(b_total_deg*Math.PI/180) }}</div>
    <!-- angle * (180 / Math.PI); -->
  </div>
</template>

<script>
export default {
  beforeMount: function() {
    this.e_sq = (Math.pow(this.a, 2) - Math.pow(this.b, 2))/Math.pow(this.a, 2)
  
  },
  beforeUpdate: function() {
    this.b_total_deg = parseFloat(this.B_deg) + parseFloat(this.B_min/60) + parseFloat(this.B_sec/3600)
  },
  data: function() {
    return {
      a: 6378245,
      b: 6356863,
      e_sq: '',
      B_deg: '',
      B_min: '',
      B_sec: '',
      b_total_deg: ''
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#parameters {
  text-align: left;
}
#B {
  margin-right: 5px;
  max-width: 45px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
