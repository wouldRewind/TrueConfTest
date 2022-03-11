export const getters = {
	levelsAmount: ({ levels }) => levels,
	shaftsAmount: ({ shafts }) => shafts,
	buttonSystem: ({ levels }) => Array(levels)
								.fill()
								.map((_,index) => ({
									level: index + 1,
									called: false
								}))
								.reverse(),
	shaftSystem: ({ shafts }) => Array(shafts)
								.fill()
								.map(() => ({
									currentLevel: 1,
									isMoving: false,
									movingTo: null,
									levelsQueue: []	
								})),
	levelSize: ({ levels }) => {
		const areaHeight = window.innerHeight - 16
		return areaHeight / levels
	},
	areaBackground: (state,{ levelSize }) => {
		const firstColor = "#FFDDD6"
		const secondColor = "#DBDBDB"
		return 'repeating-linear-gradient(' + firstColor + ', '+ firstColor + ' ' + levelSize +'px, '+ secondColor + ' ' + levelSize +'px, '+ secondColor +' ' + levelSize * 2 + 'px)'
	}

}	