export const getters = {
	levelsAmount: ({ levels }) => levels,
	shaftsAmount: ({ shafts }) => shafts,
	buttonSystem: ({ buttonSystem }) => buttonSystem,
	getState: (state) => state,
	shaftSystem: ({ shaftSystem }) => shaftSystem,
	levelsQueue: ({ levelsQueue }) => levelsQueue,
	getLift: ({ shaftSystem }) => number => shaftSystem.find(shaft => shaft.number === number),
	getPendingStatus: ({ shaftSystem }) =>  movingTo => {
		const shaft = shaftSystem.find(shaft => shaft.movingTo === movingTo)
		return shaft ? shaft.pending: false
	},
	watchLiftMoving: (state,{ getLift }) => number => getLift(number).isMoving,
	getCallButton: ({ buttonSystem }) => level => buttonSystem.find(btn => btn.level === level),
	watchButtonState: (state, { getCallButton }) => level => getCallButton(level).called,
	levelSize: ({ levels }) => {
		const areaHeight = window.innerHeight - 16
		return areaHeight / levels
		// добавить мин и макс размеры левлу
	},

	areaBackground: (state,{ levelSize }) => {
		const firstColor = "#FFDDD6"
		const secondColor = "#fff"

		return 'repeating-linear-gradient(' + firstColor + ', '+ firstColor + ' ' + levelSize +'px, '+ secondColor + ' ' + levelSize +'px, '+ secondColor +' ' + levelSize * 2 + 'px)'
	},
	maxLevel: ({ buttonSystem }) => Math.max(
		...buttonSystem.map(({ level }) => level)),
}	