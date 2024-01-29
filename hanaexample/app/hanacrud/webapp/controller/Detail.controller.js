sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("ns.hanacrud.controller.Detail", {
        onInit() {

             var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
             oRouter.getRoute("detail").attachMatched(this.onObjectMatched, this);
         },
         onObjectMatched(oEvent) {
            
             var oArgs,oView;
             oArgs=oEvent.getParameter("arguments");
             oView=this.getView();
             oView.bindElement({
            
                  path:"/customer('"+oArgs.customerdetail+"')",
                 
                //  event:{
                //      dataRequester:function(){oView.setBusy(true)},
                //      dataReceived:function(){oView.setBusy(false)},
                //  },
             });
            }

      });
    }
  );
  