<script setup lang="ts">
import { type RouteRecordRaw } from 'vue-router'
import { ref } from 'vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import MenuHamburger from '@/components/svg/MenuHamburger.vue'

defineProps<{
  links: RouteRecordRaw[]
}>()

const active = ref(false)
const closeMenu = () => (active.value = false)
const toggleMenu = () => (active.value = !active.value)
</script>

<template>
  <nav>
    <router-link
      to="/"
      class="logo"
      @click="closeMenu"
    >
      &#9925; WX Reports
    </router-link>
    <ul
      class="nav-links"
      :class="{ active }"
    >
      <li
        v-for="link in links"
        :key="link.path"
      >
        <router-link
          :to="link.path"
          @click="closeMenu"
        >
          {{ link.meta?.title }}
        </router-link>
      </li>
    </ul>
    <theme-toggle class="theme-toggle" />
    <menu-hamburger
      class="menu-toggle"
      size="24"
      :is-open="active"
      @click="toggleMenu"
    />
  </nav>
</template>

<style scoped lang="scss">
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--nav-height);
  background-color: var(--color-background-soft);
  padding: 0 10px;

  a {
    text-decoration: none;
    color: var(--color-text);

    &:hover {
      color: var(--color-text-hover);
    }

    &.router-link-exact-active:not(.logo) {
      color: var(--color-text-hover);
    }
  }

  .logo {
    font-size: 1.5rem;
    font-weight: bold;

    &:hover {
      cursor: pointer;
      color: var(--color-text-hover);
    }
  }

  .nav-links {
    display: flex;
    justify-content: space-around;
    width: 30%;

    li {
      list-style: none;
    }
  }

  .menu-toggle {
    display: none;
  }
}

@media (max-width: 950px) {
  nav {
    .nav-links {
      width: 50%;
    }
  }
}

@media (max-width: 768px) {
  nav {
    .nav-links {
      position: absolute;
      top: var(--nav-height);
      left: 0px;
      height: calc(100vh - var(--nav-height));
      background-color: var(--color-background-soft);
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      width: 100%;
      transform: translateX(100%);
      transition: transform 0.3s ease-in;

      li {
        transition: opacity 0.3s ease-in;
        opacity: 0;
        font-size: 2rem;
      }

      &.active {
        transform: translateX(0%);

        li {
          opacity: 1;
        }
      }
    }

    .theme-toggle {
      display: none;
    }

    .menu-toggle {
      display: block;
    }
  }
}
</style>
