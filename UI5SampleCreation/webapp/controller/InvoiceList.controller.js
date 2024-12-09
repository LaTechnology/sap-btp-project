sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], (Controller, JSONModel,formatter,Filter,FilterOperator) => {
	"use strict";

	return Controller.extend("ui5.walkthrough.controller.InvoiceList", {
        formatter: formatter,
		onInit() {
			const oViewModel = new JSONModel({
				currency1: "$",
                currency2: "Rs"
			});
			this.getView().setModel(oViewModel, "view");
		},

		onFilterInvoices1(oEvent) {
			// build filter array
			const aFilter = [];
			const sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
			}

			// filter binding
			const oList = this.byId("invoiceList");
			const oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},

        onFilterInvoices2(oEvent){
            const filt=[];
            const sQuery=oEvent.getParameter("query");
            if(sQuery){
                filt.push(new Filter("Quantity",FilterOperator.GT,sQuery));
            }

            ///filter Binding
            const oList=this.byId("invoiceList");
            const oBinding=oList.getBinding("items")
            oBinding.filter(filt);
        },
		
		onPress() {
			const oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("detail");
		}
	});
});