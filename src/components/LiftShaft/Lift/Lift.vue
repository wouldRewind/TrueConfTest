<template>
	<div ref="liftRef" :style="{
		height: levelSize,
		transform: liftTranslate,
		transition: liftTransition
		}" class="lift">
		<!-- LIFTINDICATOR SHOULD SHOW CORRECT VALUE -->
		<LiftIndicator v-show="indicatorIsVisible" :lift="lift"/>
	</div>	
</template>

<script>
import LiftIndicator from "./LiftIndicator.vue"
import { useStore } from 'vuex'
import { computed, onMounted, reactive, ref, watch } from '@vue/runtime-core'
export default {
	setup({ number }){ 
		const {dispatch,getters: { levelSize, getLift,watchLiftMoving}} = useStore()
		const lift = reactive({}); //
		const indicatorIsVisible = computed(() => lift.value && lift.value.direction)
		const liftRef = ref(null)
		onMounted(() => {
			liftRef.value.addEventListener('transitionend',e => {
				liftRef.value.classList.add('wait')
				dispatch("setPendingStatusToLift",lift.value)
				// вешаю анимацию
			})
			liftRef.value.addEventListener('animationend',e => {
				liftRef.value.classList.remove('wait')
				dispatch("unregisterCall",lift.value)
			})
		})
		const liftTranslate = ref(`transform: translateY(0%);`) // dynamic
		const liftTransition = ref(``) // dynamic
		watch(() => watchLiftMoving(number), // когда лифт начинает/ заканчивает движение
		liftInMoving => {
			lift.value = getLift(number)
			if(liftInMoving){ //
				const prevTranslate = liftTranslate.value.match(/\-?\d+/)[0] || 0
				const {gap, movingTo, currentLevel} = lift.value
				const newTranslateValue = +prevTranslate + (currentLevel - movingTo) * 100
				liftTransition.value = `transform ${gap}s linear` 
				liftTranslate.value = `translateY(${newTranslateValue}%)`
			}
			
		})
		return { 
			levelSize: levelSize + 'px',
			liftTranslate,
			liftTransition,
			liftRef,
			lift,
			indicatorIsVisible
			}
	},
	components: {
		LiftIndicator
	},
	props: ['number']
}
</script>

<style lang="scss" scoped>
	@keyframes blink {
		0%{
			opacity: 1;
		}
		50%{
			opacity: 0.2;
		}
		100%{
			opacity: 1;
		}
	}
	@import "../../../scss/_var";
	.lift{
		box-sizing: content-box;
		transition: $transition;
		width: 100%;
		background: $liftColor;
		position: relative;
	}
	.wait{
		animation-timing-function: linear;
		animation-iteration-count: 3;
		animation-duration: 1s;
		animation-name: blink;
	}
</style>