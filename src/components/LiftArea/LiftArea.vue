<template>
	<div :key="areaBackground" class="wrapper">
		<div :style="{background: areaBackground}" class="area">
			<div class="area-shafts">
				<LiftShaft 
				v-for="(shaft,index) in shaftSystem" 
				:key="index"
				:number="shaft.number"/>
			</div>
			<ButtonSystem/>
		</div>
	</div>
</template>

<script>
import ButtonSystem from "../ButtomSystem/ButtonSystem.vue"
import LiftButton from "../ButtomSystem/LiftButton.vue"
import LiftShaft from "../LiftShaft/LiftShaft.vue"
import { useStore } from 'vuex'
export default {
	setup(){
		const { dispatch, getters} = useStore();
		if(localStorage && localStorage.state){
			const localStorageState = JSON.parse(localStorage.state)
			dispatch("insertLocalStorageState",localStorageState)
		}
		else dispatch("initSystem")
		return {
			areaBackground: getters.areaBackground,
			shaftSystem: getters.shaftSystem
		}
	},	
	methods: {
		reRender(){
			this.$forceUpdate()
		}
	},
	components: {
		ButtonSystem,
		LiftButton,
		LiftShaft
	}
}
</script>


<style lang="scss">
	@import "../../scss/_var";
	.wrapper{
		height: 100vh;
		padding: .5rem ;
		display: flex;
	}
	.area{
		width: 100%;
		display: flex;
		&-shafts{
			box-sizing: content-box;
			height: 100%;
			display: flex;
		}
	}
</style>