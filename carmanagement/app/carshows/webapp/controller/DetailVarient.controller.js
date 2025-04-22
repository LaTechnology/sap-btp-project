sap.ui.define([
  "sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller"
], (JSONModel, Controller) => {
	"use strict";

	return Controller.extend("ns.carshows.controller.DetailVarient", {
		onInit() {
          },
          oNavButton:function(oEvent){
            var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RoutecarShows");
          }
                        
	});
});