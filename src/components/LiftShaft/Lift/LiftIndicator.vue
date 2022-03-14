<template>
	<div class="indicator">
		<!-- LIFTARROW SHOULD SHOW CORRECT DIRECTION -->
		<LiftArrow :lift="lift"/>
		<div class="indicator-to">
			{{ movingTo }}
		</div>
	</div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import LiftArrow from "./LiftArrow.vue"
export default {
	setup({ lift }){
		const movingTo = computed(() => lift.value && lift.value.movingTo)
		return {
			movingTo,
		}
	},
	props: ['lift'],
	components: {
		LiftArrow
	}
}
</script>

<style lang="scss" scoped>
	@import "../../../scss/_var";
	.indicator{
		$indicatorHeight: 40%;
		$indicatorWidth: 70%;
		position: absolute;
		left: calc(50% - ($indicatorWidth / 2));
		top: calc(50% - ($indicatorHeight));
		background: $levelIndicatorColor;
		height: $indicatorHeight;
		width: $indicatorWidth;
		display: flex;
		// display: none;
	}
	.indicator-to{
			color: white;
			font-family: serif;
			font-size: .7rem;
			width: 50%;
			display: flex;
			align-items: center;
			justify-content: start;
		}
</style>