sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(Controller) {
      "use strict";

      return Controller.extend("ns.carshows.controller.TilePage", {
        onInit: function() {
        },
        onNavToFlow:function(){
            var oRouter=this.getOwnerComponent().getRouter();
            console.log("haoi");
            oRouter.navTo("RoutecarShows");
        },
        onNavToHelp:function(){
          this.pDialog ??= this.loadFragment({
            name: "ns.carshows.view.HelpFragement",
          });
          this.pDialog.then((oDialog) => oDialog.open());
        },
        onClose:function(){
          this.byId("AddcarDialog").close();
        }
      });
    }
  );
  