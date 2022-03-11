<template>
	<div class="wrap">
		<div :class="['arrow', direction]">
		</div>
	</div>	
</template>

<script>
export default {
	setup(){
	},
	props: ['direction']	
}
</script>

<style lang="scss" scoped>
	.wrap{
		width: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.arrow{
		$arrowHeight: 60%;
		width: 1px;
		height: $arrowHeight;
		background: white;
		position: relative;
		&::before{
			transform: rotate(45deg);
		}
		&::after{
			transform: rotate(-45deg);
		}
		&::before,&::after{
			content: "";
			display: block;
			position: absolute;
			background: inherit;
			width: inherit;
			height: $arrowHeight / 2;
		}
		&.up{
			&::before,&::after{
				transform-origin: top;
				top: 0;
			}	
		}
		&.down{
			&::before,&::after{
				transform-origin: bottom;
				bottom: 0;
			}
		}
	}
</style>