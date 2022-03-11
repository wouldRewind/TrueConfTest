<template>
	<div :style="{height: levelSize}" class="lift"></div>	
</template>

<script>
import { useStore } from 'vuex'
export default {
	setup(){
		const {getters: { levelSize }} = useStore()
		return { 
		levelSize: levelSize + 'px' }
	},
}
</script>

<style lang="scss" scoped>
	@import "../../../scss/_var";
	.lift{
		box-sizing: content-box;
		transition: $transition;
		width: 100%;
		background: $liftColor;
	}
</style>