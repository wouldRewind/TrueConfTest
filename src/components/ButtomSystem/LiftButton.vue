<template>
	<div class="btn-wrap">
		<div :class="[btn,activeButton ? 'btn_active' : '' ]" 
		@click="changeActiveButton" class="btn" type="button">
			<div class="btn__circle"></div>
			<span class="level">{{ level }}</span>
		</div>
		</div>	
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
	setup(){
		const activeButton = ref(false)
		const changeActiveButton = () => activeButton.value = !activeButton.value
		return {
			activeButton,
			changeActiveButton
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
		// padding-top: 5px;
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
		// &::after{
		// 		content: "";
		// 		position: absolute;
		// 		width: calc(100% / 1.8);
		// 		height: calc(100% / 1.8);
		// 		border-radius: 50%;
		// 		border: 1px solid $normalButtonColor;
		// 	}
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