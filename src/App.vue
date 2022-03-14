<template>
	<LiftArea/>
</template>

<script>
import LiftArea from "./components/LiftArea/LiftArea.vue"

export default {
  name: 'App',
  components: {
	  LiftArea
  }
}
</script>

<style lang="scss">
*{
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	text-decoration: none;
	list-style-type: none;
}
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>
