sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("ns.calculator.controller.main", {
        onInit: function () {
            this._result = "";
        },
        
        buttoncalculator: function (oEvent) {
            var sValue = oEvent.getSource().getText();
            var oInput = this.byId("input");
            
            if (sValue === "=") {
                try {
                    this._result = eval(this._result);
                } catch (e) {
                    this._result = "Error";
                }
            } else if (sValue === "C") {
                this._result = ""; // Clear the input
            } else {
                this._result += sValue;
            }
            
            oInput.setValue(this._result); // Update the input field
        }
    });
});
