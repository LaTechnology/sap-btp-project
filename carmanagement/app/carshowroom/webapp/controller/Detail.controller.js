sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("ns.carshowroom.controller.Detail", {
		onInit() {
			var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("detail").attachMatched(this.onObjectMatched, this); //Attach Router Pattern
			  },

		onObjectMatched(oEvent) {
			var oArgs,oView;
			oArgs=oEvent.getParameter("arguments");
			oView=this.getView();
			oView.bindElement({
			  path:"/Car("+oArgs.invoicePath+")"
			});
		  },
		onEditToggleButtonPress: function() {
			var oObjectPage = this.getView().byId("ObjectPageLayout"),
				bCurrentShowFooterState = oObjectPage.getShowFooter();
			oObjectPage.setShowFooter(!bCurrentShowFooterState);
		}
	});
});