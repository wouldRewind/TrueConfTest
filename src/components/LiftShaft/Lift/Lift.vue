<template>
	<div
    ref="liftRef"
    :style="{
		height: levelSize,
    	transform: liftTranslate,
    	transition: liftTransition,
    }"
    class="lift">
    	<LiftIndicator v-show="indicatorIsVisible" :lift="lift" />
	</div>
</template>

<script>
import LiftIndicator from "./LiftIndicator.vue";
import { useStore } from "vuex";
import { computed, onMounted, reactive, ref, watch } from "@vue/runtime-core";
import { findFreeClosestShaft } from "@/components/ButtomSystem/functions";
export default {
	setup({ number }) {
    const {
    	dispatch,
    	getters: {
        	levelSize,
        	shaftSystem,
        	maxLevel,
        	getLift,
        	watchLiftMoving,
        	levelsQueue,
    }} = useStore();
    const lift = reactive(getLift(number)); //
    const indicatorIsVisible = computed(
    	() => lift.value && lift.value.direction
    );
    const liftRef = ref(null);

    const liftTranslate = ref(`translateY(-${lift.currentLevel - 1}00%)`); // dynamic

    const liftTransition = ref(``); // dynamic
    const moveLift = (liftInMoving = "queue") => {
    	lift.value = getLift(number);
    	if (liftInMoving) {
        //
        	const prevTranslate = liftTranslate.value.match(/\-?\d+/)[0] || 0;
        	const { gap, movingTo, currentLevel } = lift.value;
        	const newTranslateValue =
            +prevTranslate + (currentLevel - movingTo) * 100;
        	liftTransition.value = `transform ${gap}s linear`;
        	liftTranslate.value = `translateY(${newTranslateValue}%)`;
    	}
    };
    onMounted(() => {
    	liftRef.value.addEventListener("transitionend", (e) => {
        	liftRef.value.classList.add("wait");
        	dispatch("setPendingStatusToLift", lift.value);
        	// вешаю анимацию
    	});
    	liftRef.value.addEventListener("animationend", (e) => {
        	liftRef.value.classList.remove("wait");
        	dispatch("unregisterCall", lift.value);
        	lift.value = getLift(number); // получаю новое состояние лифта после unregistation

        	if (levelsQueue.length) {
          	// если очередь не пуста
        		const freeClosestShaft = findFreeClosestShaft(
            		shaftSystem,
            		levelsQueue[0],
            		maxLevel
    			);
    			lift.value = freeClosestShaft;
    			dispatch("registerCall", lift.value);
    			moveLift();
        		dispatch("removeFromQueue");
        }
    	});
    });
    watch(
      () => watchLiftMoving(number), // когда лифт начинает/ заканчивает движение
    	(liftInMoving) => {
        	moveLift(liftInMoving);
    	}
    );
    return {
    	levelSize: levelSize + "px",
    	liftTranslate,
    	liftTransition,
    	liftRef,
    	lift,
    	indicatorIsVisible,
    };
	},
	components: {
    LiftIndicator,
},
	props: ["number"],
};
</script>

<style lang="scss" scoped>
@keyframes blink {
	0% {
    	opacity: 1;
	}
	50% {
    	opacity: 0.2;
	}
	100% {
		opacity: 1;
	}
}
@import "../../../scss/_var";
.lift {
	position: relative;
	box-sizing: content-box;
	width: 100%;
	background: $liftColor;
}
.wait {
	animation-timing-function: linear;
	animation-iteration-count: 3;
	animation-duration: 1s;
	animation-name: blink;
}
</style>