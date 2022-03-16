<template>
	<LiftArea/>
</template>

<script>
import { useStore } from 'vuex'
import { resetState } from './components/ButtomSystem/functions'
import LiftArea from "./components/LiftArea/LiftArea.vue"

export default {
  name: 'App',
  setup(){
	  const store = useStore()
	  const replacer = (key,value) => key == "value" ? undefined: value;
	  window.addEventListener("beforeunload",function(e){
		if(localStorage){
			// const isMovingShaft = store.state.shaftSystem.some(({ isMoving }) => isMoving)
				localStorage.clear()
				const localStorageState = JSON.stringify(resetState(store.state),replacer)
				localStorage.setItem("state",localStorageState)
		}
	  })
  },
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
