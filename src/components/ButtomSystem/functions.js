//find free and closest shaft to that level
export const findFreeClosestShaft = (shaftSystem,levelToMove,maxLevel) => shaftSystem
		.reduce((currentShaft,{ isMoving, currentLevel, number }) => 
		!isMoving && Math.abs(levelToMove - currentLevel) < currentShaft.gap ? {
			currentLevel,
			number,
			movingTo: levelToMove,
			gap: Math.abs(levelToMove - currentLevel),
			direction: levelToMove - currentLevel < 0 ? 'down': 'up'
		}: currentShaft,
		{
			allBusy: true, // if all shaft will be busy
			gap: maxLevel // difference between levels - initially takes maximum value(i.e. maxLevel)
		})
		export const resetState = state => ({
			...state,
			buttonSystem: state.buttonSystem.map(({ level }) => ({
				level,
				called: false
			})),
			shaftSystem: state.shaftSystem.map(shaft => ({
				...shaft,
				direction: null,
				gap: null,
				isMoving: false,
				movingTo: null,
				pending: false
			})),
			levelsQueue: []
		})