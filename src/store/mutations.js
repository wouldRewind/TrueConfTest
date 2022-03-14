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
			.findIndex(({ level }) => level === movingTo) // find btn which was called
				if(!buttonSystem[calledButtonIndex].called) // если кнопка уже вызвана, повторная регистрация не происходит
			buttonSystem[calledButtonIndex].called = true
	},
	unregisterButtonCall({ buttonSystem }, { movingTo }){
		const calledButtonIndex = buttonSystem
		.findIndex(({ level }) => level === movingTo) // find btn which get lift arrived
		buttonSystem[calledButtonIndex].called = false
	},
	unregisterShaftCall({ shaftSystem },{ number, currentLevel, gap,movingTo }){
		const shaftUnregisterIndex = shaftSystem
		.findIndex((shaft) => shaft.number === number)
		shaftSystem[shaftUnregisterIndex] = {
			number,
			currentLevel: movingTo,
			gap: null,
			movingTo: null,
			direction: null,
			isMoving: null
		}
	}

}