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

<style  scope>
#app {

}
</style>
