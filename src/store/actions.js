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
	}	
} 