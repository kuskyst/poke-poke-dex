
<template>
  <header class="header bk-graypink">
    <router-link class="header__title" to="/">
      <img height="40px" src="@/assets/img/logo.png"/>
    </router-link>
    <button
      v-show="buttonShow"
      class="menu-button"
      :class="{ open: menuOpen }"
      @click="menuOpen = !menuOpen">
      <span class="menu-button__bar menu-button__bar--top"></span>
      <span class="menu-button__bar menu-button__bar--center"></span>
      <span class="menu-button__bar menu-button__bar--bottom"></span>
    </button>
    <transition name="fade">
      <nav v-show="menuOpen" class="nav" :class="{ 'sp-menu': buttonShow }">
        <ul class="nav__list mr-56">
          <li class="nav__item">
            <router-link :to="{ path: '/', query: { limit: 151, offset: 0} }" class="nav__link">赤緑</router-link>
          </li>
          <li class="nav__item">
            <router-link :to="{ path: '/', query: { limit: 100, offset: 151} }" class="nav__link">金銀</router-link>
          </li>
          <li class="nav__item">
            <router-link :to="{ path: '/', query: { limit: 135, offset: 251} }" class="nav__link">RS</router-link>
          </li>
          <li class="nav__item">
            <router-link :to="{ path: '/', query: { limit: 107, offset: 386} }" class="nav__link">DP</router-link>
          </li>
          <li class="nav__item">
            <router-link :to="{ path: '/', query: { limit: 156, offset: 493} }" class="nav__link">BW</router-link>
          </li>
          <li class="nav__item">
            <router-link :to="{ path: '/', query: { limit: 72, offset: 649} }" class="nav__link">XY</router-link>
          </li>
          <li class="nav__item">
            <router-link :to="{ path: '/', query: { limit: 88, offset: 721} }" class="nav__link">SM</router-link>
          </li>
          <li class="nav__item">
            <router-link :to="{ path: '/', query: { limit: 89, offset: 809} }" class="nav__link">剣盾</router-link>
          </li>
        </ul>
      </nav>
    </transition>
  </header>
</template>

<script>
export default {
  data() {
    return {
      menuOpen: "",
      buttonShow: ""
    };
  },
  methods: {
    redrawResponsive() {
      this.menuOpen = window.innerWidth >= 768;
      this.buttonShow = window.innerWidth < 768;
    }
  },
  created() { window.addEventListener("resize", this.redrawResponsive); },
  beforeUnmount() { window.removeEventListener("resize", this.redrawResponsive); },
  mounted: function () { this.redrawResponsive(); }
};
</script>

<style lang="scss">
.header {
  height: 60px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
  color: #fff;
  &__title {
    margin: 0;
    padding: 0.5rem;
  }
}

.menu-button {
  appearance: none;
  position: fixed;
  top: calc((3.8rem - 44px) / 2);
  right: 15px;
  display: inline-block;
  width: 50px;
  height: 44px;
  background: none;
  border: none;
  z-index: 10;
  cursor: pointer;
  &__bar {
    position: absolute;
    top: 0;
    left: 10%;
    display: inline-block;
    width: 80%;
    height: 4px;
    border-radius: 4px;
    background: #e7e3e8;
    transition: all 0.4s;
    &--top {
      top: 6px;
    }
    &--center {
      top: 20px;
    }
    &--bottom {
      top: 36px;
    }
  }
  &.open & {
    &__bar {
      &--top {
        top: 20px;
        transform: rotate(-45deg);
      }
      &--center {
        left: 50%;
        opacity: 0;
        transform: rotate(135deg);
      }
      &--bottom {
        top: 20px;
        transform: rotate(45deg);
      }
    }
  }
}

.nav {
  &__list {
    height: 100%;
    display: flex;
    gap: 1rem;
    vertical-align: middle;
    list-style: none;
    text-transform: uppercase;
  }
  &__item:hover {
    background-color: #d56d8b;
  }
  &__link {
    padding: 15px;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    font-size: 20px;
    font-weight: bold;
    text-decoration: none;
    cursor: pointer;
  }
  &.sp-menu {
    position: fixed;
    top: 0;
    right: 0;
    padding: 50px;
    z-index: 9;
    width: calc(100% - 100px);
    height: calc(100vh - 100px);
    background: #d56d8b;
    opacity: 0.5;
  }
  &.sp-menu & {
    &__list {
      display: flex;
      flex-direction: column;
      & > * + * {
        margin-top: 1rem;
      }
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: transform 0.5s ease;
}
.fade-leave-to {
  transform: translateX(100%);
  transition: transform 0.5s ease;
}
.fade-enter {
  transform: translateX(100%);
  transition: transform 0.5s ease;
}
</style>