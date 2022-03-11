<template>
	<div class="indicator">
		<LiftArrow :direction="'up'"/>
		<div class="indicator-to">
			{{ movingTo }}
		</div>
	</div>
</template>

<script>
import LiftArrow from "./LiftArrow.vue"
export default {
	setup(){

	},
	props: ['movingTo'],
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
		&-to{
			color: $textIndicatorColor;
			font-family: serif;
			font-size: .7rem;
			width: 50%;
			display: flex;
			align-items: center;
			justify-content: start;
		}
	}
</style>