<template>
  <div>
    <div id="p-list" class="fadeIn mt-20">
      <div :key="pokemon.name" v-for="(pokemon, index) in pokemons">
        <pokemon-column :index="index" :name="pokemon.name" :url="pokemon.url" />
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/js/Axios'
import PokemonColumn from '@/components/Column'

export default {
  props:{
    limit: { type: Number, default: 151 },
    offset: { type: Number, default: 0 },
  },
  components: { PokemonColumn },
  watch: {
    $route () {
      this.render();
    }
  },
  data() {
    return {
      pokemons: []
    }
  },
  created() {
    this.render();
  },
  methods: {
    render() {
      this.limit = this.$route.query.limit ? this.$route.query.limit : 151;
      this.offset = this.$route.query.offset ? this.$route.query.offset : 0;

      api.get('pokemon?limit=' + this.limit + '&offset=' + this.offset).then((response) => {
        this.pokemons = response.data.results;
      });
    }
  },
}
</script>

<style>
#p-list {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
</style>