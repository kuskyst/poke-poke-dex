<template>
  <div>
    <loading class="mt-20p" v-show="!loaded" />
    <div v-show="loaded" :class="anim" class="mt-20">
      <div class="flex j-center">
        <div class="w-40 tx-left c-white">
          <router-link
            class="fs-18 f-bold circle bk-graypink"
            :class="[pokemon.id <= 1 ? 'hidden' : ''] "
            @click.native="setAnim('fadeRightOut')"
            :to="'/' + (pokemon.id - 1)">
            ＜
          </router-link>
        </div>
        <div class="w-40 tx-right c-white">
            <router-link
              class="fs-18 f-bold circle bk-graypink"
              @click.native="setAnim('fadeLeftOut')"
              :to="'/' + (pokemon.id + 1)">
              ＞
            </router-link>
          </div>
      </div>
      <div :class="{ 'flex j-center': !sp }">
        <div :class="[{ 'w-40 mr-2': !sp }, { 'flex j-center': sp }]">
          <table class="mt-20 info-table" :class="[{ 'w-100': !sp }, { 'w-80': sp }]">
            <tr class="info-tr">
              <th :class="'bk-' + pokemon.type1" class="info-th ">No.</th>
              <td class="info-td tx-center w-50">{{ pokemon.id }}</td>
            </tr>
            <tr class="info-tr">
              <th :class="'bk-' + pokemon.type1" class="info-th">Name</th>
              <td class="info-td tx-center">{{ pokemon.name }} <br>( {{ pokemon.jaName }} )</td>
            </tr>
            <tr class="info-tr">
              <th :class="'bk-' + pokemon.type1" class="info-th">Class</th>
              <td class="info-td tx-center">{{ pokemon.class }} <br>( {{ pokemon.jaClass }} )</td>
            </tr>
            <tr class="info-tr">
              <td class="info-td tx-center">
                <loading v-show="!imgVisible" :type="2" />
                <img class="fadeIn" width="160px" height="160px" v-show="imgVisible" @load="loadImgComplete" :src="pokemon.img" @click="turnImgBack">
              </td>
              <td class="info-td tx-center">
                <loading v-show="!shinyImgVisible" :type="2" />
                <img class="fadeIn" width="160px" height="160px" v-show="shinyImgVisible" @load="loadShinyImgComplete" :src="pokemon.shinyImg" @click="turnShinyImgBack">
              </td>
            </tr>
            <tr class="info-tr">
              <th :class="'bk-' + pokemon.type1" class="info-th">Type</th>
              <td class="info-td tx-center">
                <span :class="'c-' + pokemon.type1">{{ pokemon.type1 }}</span>
                <span v-if="pokemon.type2"> / <span :class="'c-' + pokemon.type2">{{ pokemon.type2 }}</span></span></td>
            </tr>
            <tr class="info-tr">
              <th :class="'bk-' + pokemon.type1" class="info-th">Height</th>
              <td class="info-td tx-center">{{ pokemon.height | filterHeight }}</td>
            </tr>
            <tr class="info-tr">
              <th :class="'bk-' + pokemon.type1" class="info-th">Weight</th>
              <td class="info-td tx-center">{{ pokemon.weight | filterWeight }}</td>
            </tr>
          </table>
        </div>
        <div :class="[{ 'w-40 ': !sp }, { 'flex j-center': sp }]">
          <table class="mt-20 info-table" :class="[{ 'w-100': !sp }, { 'w-80': sp }]">
            <tr class="info-tr w-100">
              <th :class="'bk-' + pokemon.type1" class="info-th">Status</th>
              <td class="info-td c-gray w-70"></td>
            </tr>
            <tr class="info-tr">
              <td colspan="2" class="info-td">
                <div>
                    <bar-chart v-if="loaded" :height="205" :inputData="pokemon.stats" />
                </div>
              </td>
            </tr>
            <tr class="info-tr">
              <th :class="'bk-' + pokemon.type1" class="info-th">Average</th>
              <td class="info-td tx-center w-70">{{ Math.floor(pokemon.stats.reduce((a, b) => a + b, 0) / pokemon.stats.length) }}</td>
            </tr>
            <tr class="info-tr">
              <th :class="'bk-' + pokemon.type1" class="info-th">Sum</th>
              <td class="info-td tx-center w-70">{{ pokemon.stats.reduce((a, b) => a + b, 0) }}</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="flex j-center mt-20 mb-20">
        <div class="w-80">
          <table class="info-table w-100">
            <tr class="info-tr">
              <th :class="'bk-' + pokemon.type1" class="info-th">Flavor-Text</th>
              <td class="info-td pl-30">
                <span :key="key" v-for="(value, key) in language">
                  <input :id="key" type="radio" class="tab-btn-radio" v-model="selectLang" :value="value" />
                  <label :for="key" class="tab-btn-label mrl-18">{{ key }}</label>
                </span>
              </td>
            </tr>
            <transition-group tag="tbody">
              <tr class="info-tr" :key="index + 0" v-for="(value, index) in pokemon.flavorTexts">
                <th
                  v-show="value.lang === selectLang"
                  :class="'bk-' + value.ver"
                  class="info-th">
                  {{ value.ver }}
                </th>
                <td
                  v-show="value.lang === selectLang"
                  class="info-td pl-30 fs-12 w-80 f-italic">
                  {{ value.text }}
                </td>
              </tr>
            </transition-group>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/services/Axios'
import BarChart from '@/components/BarChart'
import Loading from '@/components/Loading'

export default {
  components: {
    BarChart,
    Loading
  },
  data() {
    return {
      sp: false,
      anim: 'fadeIn',
      loaded: false,
      imgVisible: false,
      shinyImgVisible: false,
      pokemon: {
        id: '',
        name: '',
        jaName: '',
        class: '',
        jaClass: '',
        type1: '',
        type2: '',
        height: 0,
        weight: 0,
        img: '',
        front: '',
        back: '',
        shinyImg: '',
        shinyFront: '',
        shinyBack: '',
        stats: [],
        flavorTexts: [],
      },
      selectLang: 'en',
      language: {
        'English' : 'en' ,
        'Japanese' : 'ja',
        'Japanese-Kana' : 'ja-Hrkt' ,
        'Korean' : 'ko' ,
        'Chinese' : 'zh-Hant'
      }
    }
  },
  created() {
    this.render();
    window.addEventListener("resize", this.redrawResponsive);
  },
  destroyed() {
    this.loaded = this.imgVisible = this.shinyImgVisible = false;
    this.pokemon.stats = [];
    this.pokemon.flavorTexts = [];
  },
  beforeUnmount() { window.removeEventListener("resize", this.redrawResponsive); },
  mounted () { this.redrawResponsive(); },
  watch: {
    $route () {
      this.render();
    }
  },
  methods: {
    sleep: time => new Promise(resolve => setTimeout(resolve, time)),
    setAnim(anim) { this.anim = anim; },
    async render() {
      if (this.loaded) {
        await this.sleep(400);
        this.pokemon.stats = [];
        this.pokemon.flavorTexts = [];
      }
      this.loaded = this.imgVisible = this.shinyImgVisible = false;
      this.pokemon.id = this.$route.params['id'];
      const outline = await api.get('pokemon/' + this.$route.params['id']);
      this.pokemon.id = outline.data.id;
      this.pokemon.front = outline.data.sprites.front_default;
      this.pokemon.back = outline.data.sprites.back_default;
      this.pokemon.img = this.pokemon.front;
      this.pokemon.name = outline.data.name;
      this.pokemon.type1 = outline.data.types[0].type.name;
      this.pokemon.type2 = outline.data.types.length > 1 ? outline.data.types[1].type.name : '';
      this.pokemon.height = outline.data.height;
      this.pokemon.weight = outline.data.weight;
      this.pokemon.shinyFront = outline.data.sprites.front_shiny;
      this.pokemon.shinyBack = outline.data.sprites.back_shiny;
      this.pokemon.shinyImg = this.pokemon.shinyFront;
      outline.data.stats.forEach(v => this.pokemon.stats.push(v.base_stat));
      const detail = await api.get(outline.data.species.url);
      this.pokemon.jaName = detail.data.names.filter(v => v.language.name == this.language['Japanese-Kana'])[0].name;
      this.pokemon.class = detail.data.genera.filter(v => v.language.name == this.language['English'])[0].genus;
      this.pokemon.jaClass = detail.data.genera.filter(v => v.language.name == this.language['Japanese-Kana'])[0].genus;
      detail.data.flavor_text_entries.forEach(v => {
        if (Object.values(this.language).includes(v.language.name)) {
          let falv = {};
          falv.lang = v.language.name;
          falv.ver = v.version.name;
          falv.text = v.flavor_text;
          this.pokemon.flavorTexts.push(falv);
        }
      });

      this.anim =
        (this.anim == 'fadeLeftOut') ? 'fadeRightIn' :
          (this.anim == 'fadeRightOut') ? 'fadeLeftIn' : 'fadeIn';
      this.loaded = true;
    },
    redrawResponsive() {
      this.sp = window.innerWidth < 1000;
    },
    turnImgBack() {
      this.pokemon.img =
        this.pokemon.img === this.pokemon.front && this.pokemon.back !== null ?
            this.pokemon.back : this.pokemon.front;
    },
    turnShinyImgBack() {
      this.pokemon.shinyImg =
        this.pokemon.shinyImg === this.pokemon.shinyFront && this.pokemon.shinyBack !== null ?
            this.pokemon.shinyBack : this.pokemon.shinyFront;
    },
    loadImgComplete() { this.imgVisible = true; },
    loadShinyImgComplete() { this.shinyImgVisible = true; },
  },
  filters: {
    filterWeight(v) { return v / 10 + ' kg'; },
    filterHeight(v) { return v / 10 + ' m'; }
  }
}
</script>
<style>
.info-table { border-collapse: collapse; font-size: 16px; }
.info-tr { border-bottom: solid 2px white; }
.info-tr:last-child { border-bottom: none; }
.info-th {
  position: relative;
  text-align: center;
  color: white;
  text-align: center;
  padding-top: 16.5px;
  padding-bottom: 16.5px;
}
.info-th:after {
  display: block;
  content: "";
  width: 0px;
  height: 0px;
  position: absolute;
  top:calc(50% - 10px);
  right:-10px;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
}
.info-td {
  text-align: left;
  background-color: #eee;
  padding-top: 16.5px;
  padding-bottom: 16.5px;
}
.tab-btn-radio { display: none; }
.tab-btn-label { cursor: pointer; }
.tab-btn-radio:checked + .tab-btn-label { color: #f3b7b2; font-weight: bold; }

.circle {
  padding: 10px 14px;
  border-radius: 50%;
  display: inline-block;
}
.v-move {
  transition: all 1.0s ease;
}
</style>