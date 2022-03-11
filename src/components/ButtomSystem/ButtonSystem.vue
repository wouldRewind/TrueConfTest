<template>
	<div class="btn-system">
		<LiftButton v-for="lift in buttonSystem"
		:key="lift.level"
		:level="lift.level"/>
	</div>
</template>

<script>
import { useStore } from 'vuex'
import LiftButton from "./LiftButton.vue"
export default {
	setup(){
		const {getters: { buttonSystem }} = useStore()
		return {
			buttonSystem
		}
	},
	components: {
		LiftButton
	}
}
</script>

<style lang="scss" scoped>
	.btn-system{
		width: 10%;
		display: grid;
		// grid-template-columns: 1fr;
		flex-direction: column;
	}
</style>