import Vue from 'vue'
import Router from 'vue-router'
import PokemonList from '@/pages/List'
import PokemonDetail from '@/pages/Detail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: PokemonList,
      props: route => ({limit: route.params.limit, offset: route.params.offset}),
    },
    {
      path: '/:id',
      component: PokemonDetail
    },
  ],
  scrollBehavior(to, from, savePosition) {
    if (savePosition) {
      return savePosition;
    }
    return { behavior: 'smooth', x: 0, y: 0 };
  }
})