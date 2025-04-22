sap.ui.define([
	"sap/ui/core/mvc/Controller"
], (Controller) => {
	"use strict";

	return Controller.extend("ns.north.controller.Detail", {
		onInit() {
      var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.getRoute("detail").attachMatched(this.onObjectMatched, this); //Attach Router Pattern
          },
        onObjectMatched(oEvent) {
          var oArgs,oView;
          oArgs=oEvent.getParameter("arguments");
          oView=this.getView();
          oView.bindElement({
            path:"/Products("+oArgs.invoicePath+")",
            event:{
              dataRequster:function(){oView.setBusy(true)},
              dataReceived:function(){oView.setBusy(false)},
            },
          });
        }
            // this.getView().bindElement({
            //   path: "/odata/v4/car-management/" + oEvent.getParameter("arguments").invoicePath,
            //   model: "mainService"
            //   });
              
	});
});