sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], (Controller,MessageToast) => {
    "use strict";
    return Controller.extend("bpa.controller.BpaFrontEnd", {
        onInit: function () {
          },
          onSubmitPress:function () {
            const oModel = this.getView().getModel(); 
            var formatDate = function(dateObj) {
                if (!dateObj) return "";
                const year = dateObj.getFullYear();
                const month = String(dateObj.getMonth() + 1).padStart(2, '0');
                const day = String(dateObj.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
              };
            var oEntry = {
             reason : this.byId("reasonInput").getValue(),
         from: formatDate(this.byId("fromDate").getDateValue()), 
  _to: formatDate(this.byId("toDate").getDateValue())
            }
          console.log("payload",oEntry);
            oModel.create("/pushData",oEntry,{
                method:"POST",
                success:function(){
                    sap.m.MessageToast.show("Triggered the process");
                }        
              })
          }
        });
});