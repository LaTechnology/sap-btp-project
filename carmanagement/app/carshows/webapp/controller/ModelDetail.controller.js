sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
    "sap/f/library"
], (Controller,Filter, FilterOperator,fioriLibrary) => {
	"use strict";

	return Controller.extend("ns.carshows.controller.Varient", {
		onInit() {
            var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("modeldetail").attachMatched(this.onObjectMatched, this); //Attach Router Pattern
          },
          onObjectMatched(oEvent) {
            var oArgs,oView;
            oArgs=oEvent.getParameter("arguments");
            oView=this.getView();
            oView.bindElement({
              path:"/ModelVarient("+oArgs.modelpath+")"
              // parameters: {
              //     expand: "colour"
              //  }
            });
          },
          onOpenDialog() {
            // create dialog lazily
            this.pDialog ??= this.loadFragment({
              name: "ns.carshows.view.TubeFragement",
            });
            this.pDialog.then((oDialog) => oDialog.open());
          },
          onCloseDialog: function () {
            this.byId("TubeDialog").close();
          }
        


              
	});
});