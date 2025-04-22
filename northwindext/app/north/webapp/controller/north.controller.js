sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("ns.north.controller.north", {
            onInit: function () {

            },
            onPress(oEvent) {
                // var oItem = oEvent.getSource(); //Get the Selected Item
                // var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
                var SelectedItem=oEvent.getSource().getBindingContext().getProperty("Name");
                oRouter.navTo("detail", { invoicePath: SelectedItem });
                }
        });
    });
