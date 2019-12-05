<template>
  <div id="parameters">
    <tr>
      <td>Малая полуось (полярный радиус)</td>
      <td>{{ b }} м</td>
    </tr>
    <tr>
      <td>Большая полуось (экваториальный радиус)</td>
      <td>{{ a }} м</td>
    </tr>
    <tr>
      <td>
        e
        <sup>2</sup>
      </td>
      <td>{{ e_sq }} м</td>
    </tr>

    <tr>
      <td>B в градусах</td>
      <td>{{ b_total_deg }}</td>
    </tr>
    <tr>
      <td>cos B</td>
      <td>{{ Math.cos(b_total_deg*Math.PI/180) }}</td>
    </tr>
    <tr>
      <td>sin B</td>
      <td>{{ Math.sin(b_total_deg*Math.PI/180) }}</td>
    </tr>
    <tr>
      <td>d</td>
      <td>d</td>
    </tr>
    <tr>
      <td>d</td>
      <td>d</td>
    </tr>
    <div id="B_div">
      <span>B: </span>
      <span>
        <input id="B" type="number" v-model="B_deg" />
      </span>°
      <span>
        <input id="B" type="number" v-model="B_min" />
      </span>'
      <span>
        <input id="B" type="number" v-model="B_sec" />
      </span>''
    </div>
  </div>
</template>

<script>
export default {
  beforeMount: function() {
    this.e_sq =
      (Math.pow(this.a, 2) - Math.pow(this.b, 2)) / Math.pow(this.a, 2);
  },
  beforeUpdate: function() {
    this.b_total_deg = +this.B_deg + this.B_min / 60 + this.B_sec / 3600;
  },
  data: function() {
    return {
      a: 6378245,
      b: 6356863,
      e_sq: null,
      B_deg: null,
      B_min: null,
      B_sec: null,
      b_total_deg: null
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#parameters {
  text-align: left;
  margin-top: 7px
}
#B {
  margin-right: 5px;
  max-width: 95px;
}
#B_div {
  margin: 5px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
td {
  border: 1px solid black;
  padding: 5px;
}
</style>
