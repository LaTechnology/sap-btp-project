sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Filter, FilterOperator) {
        "use strict";

        return Controller.extend("ns.carshows.controller.Create", {
            onInit: function () {
                // this.onRead();
            },

            onSave:function(){
                var payload ={
                    Id:this.getView().byId("_IDGenLabel1").getValue(),
                    carName:this.getView().byId("_IDGenLabel2").getValue(),
                    manufactureDate:this.getView().byId("_IDGenLabel3").getValue()
                };
                console.log("hai");
                var oModel=this.getView().getModel();
                oModel.Create("/Car",payload,{
                    method:"POST",
                    success:function(response){
                        MessageBox.show("New car is added",MessageBox.Icon.SUCCESS,"car is added..!");

                    },
                    error:function(error){
                        MessageBox.show("some error is occured",MessageBox.Icon.ERROR,"oops error..!");
                    }
                });
            },

            oNavButton:function(oEvent){
                var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("RoutecarShows");
              }
        });
    });
