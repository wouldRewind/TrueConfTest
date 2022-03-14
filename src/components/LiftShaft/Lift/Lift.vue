<template>
	<div ref="liftRef" :style="{
		height: levelSize,
		transform: liftTranslate,
		transition: liftTransition
		}" class="lift">
		<LiftIndicator :movingTo="13"/>
	</div>	
</template>

<script>
import LiftIndicator from "./LiftIndicator.vue"
import { useStore } from 'vuex'
import { onMounted, ref, watch } from '@vue/runtime-core'
export default {
	setup({ number }){ 
		const {dispatch,getters: { levelSize, getLift,watchLiftMoving}} = useStore()
		let lift; //

		const liftRef = ref(null)
		onMounted(() => {
			liftRef.value.addEventListener('transitionend',e => {
				dispatch("unregisterCall",lift)
			})
		})

		const liftTranslate = ref(`transform: translateY(0%);`) // dynamic
		const liftTransition = ref(``) // dynamic
		watch(() => watchLiftMoving(number), // когда лифт начинает/ заканчивает движение
		liftInMoving => {
			lift = getLift(number)
			// продумать логику
			if(liftInMoving){ //
				const prevTranslate = liftTranslate.value.match(/\-?\d+/)[0] || 0
				const {gap, movingTo, currentLevel} = lift
				const newTranslateValue = +prevTranslate + (currentLevel - movingTo) * 100
				liftTransition.value = `transform ${gap}s linear` 
				liftTranslate.value = `translateY(${newTranslateValue}%)`
			}
			
		})

		return { 
			levelSize: levelSize + 'px',
			liftTranslate,
			liftTransition,
			liftRef
			}
	},
	components: {
		LiftIndicator
	},
	props: ['number']
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
	}
</style>