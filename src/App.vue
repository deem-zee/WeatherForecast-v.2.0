<template>
  <div id="app">
    <weather-page v-bind:header='title'></weather-page>
  </div>
</template>

<script>
import WeatherPage from './components/WeatherPage.vue'

export default {
  name: 'App',
  data() {
    return {
      title: 'Weather Forecaster V2.0.0',
    }
  },
  components: {
    'weather-page': WeatherPage,
  },
}
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
  margin: auto 0;
  display: flex;
  justify-content: center;
}
</style>
