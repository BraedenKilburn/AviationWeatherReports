<script setup lang="ts">
import { GithubLogo } from '@/components/svg';
import ThemeToggle from '@/components/ThemeToggle.vue'
</script>

<template>
  <footer>
    <a
      href="https://github.com/BraedenKilburn/AviationWeatherReports"
      target="_blank"
    >
      <github-logo
        class="github"
        size="24"
      />
      <p>Created by Braeden Kilburn</p>
    </a>
    <theme-toggle class="theme-toggle" />
  </footer>
</template>

<style scoped lang="scss">
footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: var(--footer-height);
  background-color: var(--color-background-mute);

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    transition: all 0.3s ease-in;

    .github {
      fill: var(--color-text);
      transition: all 0.3s ease-in;
    }

    &:hover {
      cursor: pointer;

      .github {
        fill: var(--color-text-hover);
      }
    }
  }

  p {
    margin-left: 10px;
    font-size: 1.25rem;
  }
}

@media (min-width: 769px) {
  footer {
    justify-content: space-between;
    padding: 0 10px;

    .theme-toggle {
      display: none;
    }
  }
}
</style>
