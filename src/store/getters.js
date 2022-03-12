export const getters = {
	levelsAmount: ({ levels }) => levels,
	shaftsAmount: ({ shafts }) => shafts,
	buttonSystem: ({ buttonSystem }) => buttonSystem,
	shaftSystem: ({ shaftSystem }) => shaftSystem,
	levelSize: ({ levels }) => {
		const areaHeight = window.innerHeight - 16
		return areaHeight / levels
		// добавить мин и макс размеры левлу
	},
	areaBackground: (state,{ levelSize }) => {
		const firstColor = "#FFDDD6"
		const secondColor = "#DBDBDB"
		return 'repeating-linear-gradient(' + firstColor + ', '+ firstColor + ' ' + levelSize +'px, '+ secondColor + ' ' + levelSize +'px, '+ secondColor +' ' + levelSize * 2 + 'px)'
	},
	maxLevel: ({ buttonSystem }) => Math.max(
		...buttonSystem.map(({ level }) => level)),
	// calledButton: ({ buttonSystem }) => level => level,
}	