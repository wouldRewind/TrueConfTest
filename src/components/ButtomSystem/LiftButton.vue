<template>
	<div class="btn-wrap">
		<div :class="[btn,btnIsCalled ? 'btn_active' : '' ]" 
		@click="handleButtonCall" class="btn" type="button">
			<div class="btn__circle"></div>
			<span class="level">{{ level }}</span>
		</div>
		</div>	
</template>

<script>
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { findFreeShaft } from "./functions"
import { computed, onMounted, onUpdated, watch } from '@vue/runtime-core'
export default {
	setup({ level }){
		const {dispatch, getters: {watchButtonState, getCallButton, shaftSystem, maxLevel }} = useStore()
		let btn;
		const btnIsCalled = ref(false)
		onMounted(() => btn = getCallButton(level))
		watch(() => watchButtonState(level),
		(cur,prev) => {
			btnIsCalled.value = !btnIsCalled.value
		})
		const handleButtonCall = () => {
			const freeShaft = findFreeShaft(shaftSystem,level,maxLevel)
			// console.log(btnIsCalled.value)
			// если есть хотя одна свободная шахта и кнопка не была вызвана, вызов регается
			if(!freeShaft.allBusy && !btnIsCalled.value)
				dispatch("registerCall",freeShaft)	
		}
		return {
			btnIsCalled,
			handleButtonCall
		}
	},
	props: ['level']
}
</script>

<style lang="scss" scoped>
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
		&__circle{
			border-radius: 100%;
			height: calc(100% / 2.5);
			width: calc(100% / 2.5);
			background: $normalButtonColor;
		}
		&_active{
			border: 1px solid $activeButtonColor;
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