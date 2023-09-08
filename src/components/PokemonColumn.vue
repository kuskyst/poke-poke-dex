<template>
  <div :class="{fadeUpIn: visible && imgVisible}">
    <div
      v-show="visible && imgVisible"
      class="icon"
      :class="['bk-' + pokemon.type1, 'fuwafuwa-' + weightType]">
      <router-link :to="'/' + pokemon.id">
        <div class="tx-center">
          <img @load="loadComplete" :src="pokemon.img" width="60%" height="50%">
        </div>
        <p class="c-white fs-18 tx-center f-bold">{{ pokemon.id }}. {{ pokemon.name }}</p>
        <p class="c-white fs-12 tx-center">
          {{ pokemon.type1 }}<span v-if="pokemon.type2"> / {{ pokemon.type2 }}</span>
        </p>
      </router-link>
    </div>
  </div>
</template>

<script>
import api from '@/services/Axios'

export default {
  props: {
    index: Number,
    name: String,
    url: String
  },
  data() {
    return {
      visible: false,
      imgVisible: false,
      weightType: 1,
      pokemon: {
        id: '',
        name: '',
        type1: '',
        type2: '',
        img: ''
      }
    }
  },
  created: async function() {
    window.addEventListener("scroll", this.scrollDisplay);
    window.addEventListener('touchmove', this.scrollDisplay);
    const response = await api.get(this.url);
    this.pokemon.id = response.data.id;
    this.pokemon.img = response.data.sprites.front_default;
    this.pokemon.name = response.data.name;
    this.pokemon.type1 = response.data.types[0].type.name;
    this.pokemon.type2 = response.data.types.length > 1 ? response.data.types[1].type.name : '';
    this.weightType = (response.data.weight >= 1000) ? 3 : (response.data.weight >= 500) ? 2 : 1;
    this.visible = this.index <= 27;
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollDisplay);
    window.removeEventListener('touchmove', this.scrollDisplay);
  },
  methods: {
    scrollDisplay() {
      if (!this.visible) {
        var top = this.$el.getBoundingClientRect().top;
        this.visible = top < window.innerHeight + 20;
      }
    },
    loadComplete: function() { this.imgVisible = true; },
  },
}
</script>

<style>
.icon {
  width: 220px;
  height: 220px;
  border-radius: 50%;
  margin: 20px;
  transition: 1s;
  
}
.fuwafuwa-1:hover { opacity: 0.5; animation: fuwafuwa 0.5s ease 0s infinite normal running none; }
.fuwafuwa-2:hover { opacity: 0.5; animation: fuwafuwa 0.6s ease 0s infinite normal running none; }
.fuwafuwa-3:hover { opacity: 0.5; animation: fuwafuwa 0.7s ease 0s infinite normal running none; }
.v-enter { opacity: 0; transform: translateY(25px); }
.v-enter-active, .v-leave-active { transition: transform opacity 1s; }
.v-enter-to { opacity: 1; transform: translateY(0px); }
.v-leave-to { opacity: 0; transition: opacity 1s; }
</style>

