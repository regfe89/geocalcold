<template>
  <div>
    <div id="nav">
      <!-- <img id = 'logo' alt="earth" src="@/assets/earth.png"> -->
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |-->
      <button
        class="pure-material-button-contained"
        @click="set_krasovsky"
      >Референц-эллипсоид Красовского</button>
      <button class="pure-material-button-contained" @click="set_wgs">WGS 84</button>
    </div>
    <div id="parameters">
      <div class="ellips_name">{{ name }}</div>
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
        <td>ro</td>
        <td>{{ ro }}</td>
      </tr>
      <p>Вычисление длины дуги параллели земного эллипсоида</p>
      
      <tr>
        <td>B в градусах</td>
        <td>{{ b_total_deg }}</td>
      </tr>
      <tr>
        <td>l в секундах</td>
        <td>{{ l_total_sec }}</td>
      </tr>
      <tr>
        <td>cos B</td>
        <td>{{ cos_b }}</td>
      </tr>
      <tr>
        <td>sin B</td>
        <td>{{ sin_b }}</td>
      </tr>
      <tr>
        <td>N</td>
        <td>{{ N }}</td>
      </tr>
      <tr>
        <td>r</td>
        <td>{{ r }}</td>
      </tr>
      <tr>
        <td>
          S
          <sub>П</sub>
        </td>
        <td>{{ +s_parallel }} м</td>
      </tr>
      <div id="B_div">
        <span>B:</span>
        <span>
          <input id="B" type="number" v-model="b_deg" placeholder="градусы" />
        </span>°
        <span>
          <input id="B" type="number" v-model="b_min" placeholder="минуты" />
        </span>'
        <span>
          <input id="B" type="number" v-model="b_sec" placeholder="секунды" />
        </span>''
      </div>
      <div id="B_div">
        <span>l:</span>
        <span>
          <input id="B" type="number" v-model="l_deg" placeholder="градусы" />
        </span>°
        <span>
          <input id="B" type="number" v-model="l_min" placeholder="минуты" />
        </span>'
        <span>
          <input id="B" type="number" v-model="l_sec" placeholder="секунды" />
        </span>''
      </div>
      <p>Вычисление длины дуги меридиана земного эллипсоида</p>
      <tr>
        <td>
          B
          <sub>1</sub>
          в градусах
        </td>
        <td>{{ b1_total_deg }}</td>
      </tr>
      <tr>
        <td>
          B
          <sub>2</sub>
          в градусах
        </td>
        <td>{{ b2_total_deg }}</td>
      </tr>
      <tr>
        <td>
          B
          <sub>ср</sub>
          в градусах
        </td>
        <td>{{ b_average }}</td>
      </tr>
      <tr>
        <td>l в секундах</td>
        <td>{{ l_total_sec }}</td>
      </tr>
      <tr>
        <td>cos B</td>
        <td>{{ cos_b }}</td>
      </tr>
      <tr>
        <td>sin B</td>
        <td>{{ sin_b }}</td>
      </tr>
      <tr>
        <td>N</td>
        <td>{{ N }}</td>
      </tr>
      <tr>
        <td>r</td>
        <td>{{ r }}</td>
      </tr>
      <tr>
        <td>
          S
          <sub>П</sub>
        </td>
        <td>{{ Math.abs(s_meridian) }} м</td>
      </tr>
      <div id="B_div">
        <span>
          B
          <sub>1</sub>
          :
        </span>
        <span>
          <input id="B" type="number" v-model="b1_deg" placeholder="градусы" />
        </span>°
        <span>
          <input id="B" type="number" v-model="b1_min" placeholder="минуты" />
        </span>'
        <span>
          <input id="B" type="number" v-model="b1_sec" placeholder="секунды" />
        </span>''
      </div>
      <div id="B_div">
        <span>
          B
          <sub>2</sub>
          :
        </span>
        <span>
          <input id="B" type="number" v-model="b2_deg" placeholder="градусы" />
        </span>°
        <span>
          <input id="B" type="number" v-model="b2_min" placeholder="минуты" />
        </span>'
        <span>
          <input id="B" type="number" v-model="b2_sec" placeholder="секунды" />
        </span>''
      </div>
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
    this.b_total_deg = +this.b_deg + this.b_min / 60 + this.b_sec / 3600;
    this.b1_total_deg = +this.b1_deg + this.b1_min / 60 + this.b1_sec / 3600;
    this.b2_total_deg = +this.b2_deg + this.b2_min / 60 + this.b2_sec / 3600;
    this.l_total_sec = +this.l_sec + this.l_deg * 3600 + this.l_min * 60;
    this.cos_b = Math.cos((this.b_total_deg * Math.PI) / 180);
    this.sin_b = Math.sin((this.b_total_deg * Math.PI) / 180);
    this.sin_b1 = Math.sin((this.b1_total_deg * Math.PI) / 180);
    this.sin_b2 = Math.sin((this.b2_total_deg * Math.PI) / 180);
    this.sin_b_average = Math.sin((this.b_average * Math.PI) / 180);
    this.N =
      ((1 - 0.25 * this.e_sq * Math.pow(this.sin_b, 2)) /
        (1 - 0.75 * this.e_sq * Math.pow(this.sin_b, 2))) *
      this.a;
    this.r = this.N * this.cos_b;
    this.s_parallel = (this.l_total_sec / this.ro) * this.r;
    this.b_average = (this.b1_total_deg + this.b2_total_deg) / 2;
    this.m1 =
      (this.a *
        (1 - this.e_sq) *
        (1 + 0.25 * this.e_sq * Math.pow(this.sin_b1, 2))) /
      (1 - 0.25 * this.e_sq * Math.pow(this.sin_b1, 2));
    this.m2 =
      (this.a *
        (1 - this.e_sq) *
        (1 + 0.25 * this.e_sq * Math.pow(this.sin_b2, 2))) /
      (1 - 0.25 * this.e_sq * Math.pow(this.sin_b2, 2));
    this.m_average =
      (+this.a *
        (1 - this.e_sq) *
        (1 + 0.25 * this.e_sq * Math.pow(this.sin_b_average, 2))) /
      (1 - 0.25 * this.e_sq * Math.pow(this.sin_b_average, 2));
    this.s_meridian =
      ((this.b2_total_deg - this.b1_total_deg) / (6 * this.ro)) *
      (this.m1 + this.m2 + 4 * this.m_average);
  },
  // computed: {
  //   execute: function() {
  //     window.console.log("computed");
  //     window.console.log(this.a);
      

  //     return 'ee'
  //   }
  // },
  data: function() {
    return {
      a: 6378245,
      b: 6356863,
      e_sq: null,
      b_deg: null,
      b_min: null,
      b_sec: null,
      b1_deg: null,
      b1_min: null,
      b1_sec: null,
      b2_deg: null,
      b2_min: null,
      b2_sec: null,
      b_total_deg: null,
      b1_total_deg: null,
      b2_total_deg: null,
      cos_b: null,
      sin_b: null,
      N: null,
      r: null,
      l_deg: null,
      l_min: null,
      l_sec: null,
      l_total_sec: null,
      ro: 206264.8062471,
      name: "Референц-эллипсоид Красовского",
      s_parallel: null,
      s_meridian: null,
      b_average: null,
      b1: null,
      b2: null,
      m1: null,
      m2: null,
      m_average: null
    };
  },
  methods: {
    set_krasovsky() {
      this.a = 6378245;
      this.b = 6356863;
      this.name = "Референц-эллипсоид Красовского";
      this.e_sq =
        (Math.pow(this.a, 2) - Math.pow(this.b, 2)) / Math.pow(this.a, 2);
    },
    set_wgs() {
      this.a = 6378137;
      this.b = 6356752.3142;
      this.name = "WGS 84";
      this.e_sq =
        (Math.pow(this.a, 2) - Math.pow(this.b, 2)) / Math.pow(this.a, 2);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#parameters {
  text-align: left;
  margin-top: 7px;
}
.ellips_name {
  margin-bottom: 8px;
}
#B {
  margin-right: 5px;
  margin-top: 5px;
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
#nav {
  padding: 3px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.pure-material-button-contained {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  border: none;
  border-radius: 4px;
  padding: 0 16px;
  min-width: 64px;
  height: 36px;
  vertical-align: middle;
  text-align: center;
  text-overflow: ellipsis;
  text-transform: uppercase;
  color: rgb(var(--pure-material-onprimary-rgb, 255, 255, 255));
  /* background-color: rgb(var(--pure-material-primary-rgb, 33, 150, 243)); */
  background-color: #0e833f;

  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  font-family: var(
    --pure-material-font,
    "Roboto",
    "Segoe UI",
    BlinkMacSystemFont,
    system-ui,
    -apple-system
  );
  font-size: 14px;
  font-weight: 500;
  line-height: 36px;
  overflow: hidden;
  outline: none;
  cursor: pointer;
  transition: box-shadow 0.2s;
  margin-right: 5px;
  margin-bottom: 3px;
}

.pure-material-button-contained::-moz-focus-inner {
  border: none;
}

/* Overlay */
.pure-material-button-contained::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(var(--pure-material-onprimary-rgb, 255, 255, 255));
  opacity: 0;
  transition: opacity 0.2s;
}

/* Ripple */
.pure-material-button-contained::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  border-radius: 50%;
  padding: 50%;
  width: 32px; /* Safari */
  height: 32px; /* Safari */
  background-color: rgb(var(--pure-material-onprimary-rgb, 255, 255, 255));
  opacity: 0;
  transform: translate(-50%, -50%) scale(1);
  transition: opacity 1s, transform 0.5s;
}

/* Hover, Focus */
.pure-material-button-contained:hover,
.pure-material-button-contained:focus {
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14),
    0 1px 10px 0 rgba(0, 0, 0, 0.12);
}

.pure-material-button-contained:hover::before {
  opacity: 0.08;
}

.pure-material-button-contained:focus::before {
  opacity: 0.24;
}

.pure-material-button-contained:hover:focus::before {
  opacity: 0.3;
}

/* Active */
.pure-material-button-contained:active {
  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
    0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
}

.pure-material-button-contained:active::after {
  opacity: 0.32;
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0s;
}

/* Disabled */
.pure-material-button-contained:disabled {
  color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38);
  background-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.12);
  box-shadow: none;
  cursor: initial;
}

.pure-material-button-contained:disabled::before {
  opacity: 0;
}

.pure-material-button-contained:disabled::after {
  opacity: 0;
}
</style>
