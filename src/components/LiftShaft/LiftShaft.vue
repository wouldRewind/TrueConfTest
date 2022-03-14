<template>
	<div :style="{width: levelSize}" class="shaft">
		<Lift :number="number" />
	</div>
</template>

<script>
import Lift from "./Lift/Lift.vue";
import { useStore } from 'vuex';
export default {
	setup(){
		const {getters: { levelSize }} = useStore()
		return { 
			levelSize : levelSize + 'px' 
			}
	},
	components: {
		Lift
	},
	props: ['number']
}
</script>

<style lang="scss" scoped>
	@import "../../scss/_var";
	.shaft{
		box-sizing: content-box;
		height: 100%;
		border-left: 1px solid $shaftStripColor;
		border-right: 1px solid $shaftStripColor;
		display: flex;
		align-items: flex-end;
		&:not(:last-child){
			margin-right: 1rem;
		}
	}
</style>