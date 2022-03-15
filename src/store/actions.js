export const actions = {
	initSystem({ commit }){
		commit("initShaftSystem")
		commit("initButtonSystem")
	},
	registerCall({ commit }, shaftToGo){
		if(shaftToGo.gap !== 0){
			commit("registerButtonCall",shaftToGo)
			commit("registerShaftCall",shaftToGo)
		}
	},
	unregisterCall({ commit }, shaftToGo){
		commit("unregisterButtonCall",shaftToGo)
		commit("unregisterShaftCall",shaftToGo)
	},
	setPendingStatusToLift({ commit },shaftToGo){
		commit("setPendingStatusToLift",shaftToGo)
	},
	addToQueue({ commit }, level){
		commit("addToQueue",level)
	},
	removeFromQueue({ commit }){
		commit("removeFromQueue")
	}
} 