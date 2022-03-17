<template>
	<div class="btn-wrap">
		<div :class="[btn,callButtonIsActive ? 'btn_active' : '' ]" 
		@click="handleButtonCall" class="btn" type="button">
			<div class="btn__circle"></div>
			<div class="btn__circuit"></div>
			<span class="level">{{ level }}</span>
		</div>
		</div>	
</template>

<script>
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { findFreeClosestShaft } from "./functions"
import { computed, watch } from '@vue/runtime-core'
export default {
	setup({ level }){
		const {dispatch, getters: {watchButtonState, shaftSystem, maxLevel,getPendingStatus, levelsQueue }} = useStore()
		const btnIsCalledStatus = ref(false)
		const liftPendingStatus = ref(false)
		const callButtonIsActive = computed(() => (btnIsCalledStatus.value && !liftPendingStatus.value) || levelsQueue.includes(level))
		watch(() => getPendingStatus(level),
		isPending => liftPendingStatus.value = isPending)
		watch(() => watchButtonState(level),
		() => btnIsCalledStatus.value = !Boolean(btnIsCalledStatus.value))
		const handleButtonCall = () => {
			const freeShaft = findFreeClosestShaft(shaftSystem,level,maxLevel)
			// если есть хотя одна свободная шахта и кнопка не была вызвана, вызов регается
			if(!freeShaft.allBusy && !btnIsCalledStatus.value)
				dispatch("registerCall",freeShaft)
			else if(freeShaft.allBusy && !btnIsCalledStatus.value) // все лифты заняты и кнопка НЕ вызвана - добавляю в очередь
				dispatch("addToQueue",level)
		}
		return {
			callButtonIsActive,
			handleButtonCall
		}
	},
	props: ['level']
}
</script>

<style lang="scss" scoped>
	@keyframes activeNormal {
		0%{
			background: rgba(#000,.2);
		}
		100%{
			background: initial;
		}
	}
	@import "../../scss/_var";
	.level{
		$fontSize: 11px;
		display: inline-block;
		font-weight: 600;
		position: absolute;
		right: calc($fontSize * (-2));
		top: calc(50% - ($fontSize / 2));
		font-size: $fontSize;
	}
	.btn-wrap{
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}
	.btn{
		cursor: pointer;
		height: 20px;
		width: 20px;
		border: 1px solid $normalButtonColor;
		background: transparent;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		position: relative;
		transition: $transition;
		&:hover{
			background: lighten($normalButtonColor,50);
		}
		&:active{
			background: lighten($normalButtonColor,45);
		}
		&__circle{
			border-radius: 100%;
			height: calc(100% / 2.5);
			width: calc(100% / 2.5);
			background: $normalButtonColor;

		}
		&_active{
			border: 1px solid $activeButtonColor;
			&:hover{
			background: lighten($activeButtonColor,35);
			}
			&:active{
			background: lighten($activeButtonColor,25);
			}
			&::after{
				border: inherit;
			}
			& > .btn__circle{
				transition: $transition;
				background: darken($activeButtonColor,10);
			}
		}
	}
</style>