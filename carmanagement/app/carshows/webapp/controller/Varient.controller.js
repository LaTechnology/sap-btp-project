sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
    "sap/f/library"
], (Controller,Filter, FilterOperator,fioriLibrary) => {
	"use strict";

	return Controller.extend("ns.carshows.controller.Varient", {
		onInit() {
      // var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
      // oRouter.getRoute("detail").attachMatched(this.onObjectMatched, this); //Attach Router Pattern
          },
        onObjectMatched(oEvent) {
          // var oArgs,oView;
          // oArgs=oEvent.getParameter("arguments");
          // oView=this.getView();
          // oView.bindElement({
          //   path:"/Car("+oArgs.invoicePath+")"
            // parameters: {
            //     expand: "modelVarient"
            //  }
            // event:{
            //   dataRequster:function(){oView.setBusy(true)},
            //   dataReceived:function(){oView.setBusy(false)},
            // }
          // });
        },
        oNavButton:function(oEvent){
          var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
          oRouter.navTo("RoutecarShows");
        },
        onFilterCar(oEvent) {
            // build filter array
            const aFilter = [];
            const sQuery = oEvent.getParameter("query");
            if (sQuery) {
                aFilter.push(new Filter("modelName", FilterOperator.Contains, sQuery));
            }
            // filter binding
            const oList = this.byId("_IDGenTable1");
            const oBinding = oList.getBinding("items");
            oBinding.filter(aFilter);
        },
		onListItemPress: function (oEvent) {
			var oFCL = this.oView.getParent().getParent();
			oFCL.setLayout(fioriLibrary.LayoutType.TwoColumnsMidExpanded);
      var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
      var SelectedItem=oEvent.getSource().getBindingContext().getProperty("Id");
      console.log(SelectedItem);
      oRouter.navTo("modeldetail", { modelpath: SelectedItem });
		}          
	});
});