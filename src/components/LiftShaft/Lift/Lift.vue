<template>
	<div :style="{height: levelSize}" class="lift">
		<LiftIndicator :movingTo="13"/>
	</div>	
</template>

<script>
import LiftIndicator from "./LiftIndicator.vue"
import { useStore } from 'vuex'
export default {
	setup(){
		const {getters: { levelSize }} = useStore()
		return { 
			levelSize: levelSize + 'px' 
			}
	},
	components: {
		LiftIndicator
	}
}
</script>

<style lang="scss" scoped>
	@import "../../../scss/_var";
	.lift{
		box-sizing: content-box;
		transition: $transition;
		width: 100%;
		background: $liftColor;
		position: relative;
		transform: translateY();
	}
</style>