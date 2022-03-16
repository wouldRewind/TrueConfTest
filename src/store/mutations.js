export const mutations = {
	initShaftSystem(state) {
		state.shaftSystem = Array(state.shafts)
			.fill()
			.map((_, index) => ({
				currentLevel: 1,
				isMoving: false,
				movingTo: null,
				pending: false,
				gap: null,
				direction: null,
				number: index + 1,
			}))
	},
	insertLocalStorageState(state,localStorageState){
		Object.assign(state,localStorageState)
	},
	setPendingStatusToLift({ shaftSystem }, shaftToGo) {
		const pendingLiftIndex = shaftSystem.findIndex(({ number }) => number === shaftToGo.number)
		shaftSystem[pendingLiftIndex] = {
			...shaftSystem[pendingLiftIndex],
			pending: true,
			currentLevel: shaftToGo.movingTo,
		}
	},
	initButtonSystem(state) {
		state.buttonSystem = Array(state.levels)
			.fill()
			.map((_, index) => ({
				level: index + 1,
				called: false,
			}))
			.reverse()
	},
	registerShaftCall({ shaftSystem }, { number, currentLevel, gap, movingTo }) {
		const freeShaftIndex = shaftSystem
			.findIndex((shaft) => shaft.number === number)
		shaftSystem[freeShaftIndex] = {
			number,
			currentLevel,
			gap,
			movingTo,
			direction: movingTo - currentLevel > 0 ? "up" : "down",
			isMoving: true,
			pending: false
		}
	},
	registerButtonCall({ buttonSystem }, { movingTo, number }) {
		const calledButtonIndex = buttonSystem
			.findIndex(({ level }) => level === movingTo) // find btn which was called
		if (!buttonSystem[calledButtonIndex].called) // если кнопка уже вызвана, повторная регистрация не происходит
			buttonSystem[calledButtonIndex].called = true
		// buttonSystem[calledButtonIndex].processingLiftNumber = number
	},
	unregisterButtonCall({ buttonSystem }, { movingTo }) {
		const calledButtonIndex = buttonSystem
			.findIndex(({ level }) => level === movingTo) // find btn which get lift arrived
		buttonSystem[calledButtonIndex].called = false
		// buttonSystem[calledButtonIndex].processingLiftNumber = null
	},
	unregisterShaftCall({ shaftSystem }, { number, movingTo }) {
		const shaftUnregisterIndex = shaftSystem
			.findIndex((shaft) => shaft.number === number)
		shaftSystem[shaftUnregisterIndex] = {
			number,
			currentLevel: movingTo,
			gap: null,
			movingTo: null,
			direction: null,
			isMoving: false,
			pending: false
		}
	},
	addToQueue({ levelsQueue }, level) {
		if (!levelsQueue.includes(level))
			levelsQueue.push(level)
	},
	removeFromQueue({ levelsQueue }) {
		levelsQueue.shift()
	}

}