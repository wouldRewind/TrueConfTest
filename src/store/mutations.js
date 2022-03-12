export const mutations = {
	initShaftSystem(state){
		state.shaftSystem = Array(state.shafts)
		.fill()
		.map((_,index) => ({
			currentLevel: 1,
			isMoving: false,
			movingTo: null,
			gap: null,
			direction: null,
			number: index + 1
		}))
	},
	initButtonSystem(state){
		state.buttonSystem = Array(state.levels)
		.fill()
		.map((_,index) => ({
			level: index + 1,
			called: false
		}))
		.reverse()
	},
	registerShaftCall({ shaftSystem },{ number, currentLevel, gap,movingTo }){
		const freeShaftIndex = shaftSystem
		.findIndex((shaft) => shaft.number === number)
		shaftSystem[freeShaftIndex] = {
			number,
			currentLevel,
			gap,
			movingTo,
			direction: movingTo - currentLevel > 0 ? "up": "down",
			isMoving: true
		}
	},
	registerButtonCall({ buttonSystem },{ gap, movingTo }){
			const calledButtonIndex = buttonSystem
			.findIndex(({ level }) => level === movingTo)
			if(!buttonSystem[calledButtonIndex].called)
				buttonSystem[calledButtonIndex].called = true
	},

}