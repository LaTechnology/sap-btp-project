sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
], function(Controller,MessageToast) {
    'use strict';
    return Controller.extend("carmanagement.controller.App",{
        onShowHello:function(){
            alert("hey world");
            MessageToast.show("Hello vasanth");
        },
        onOpenDialog() {
            // create dialog lazily
            this.pDialog ??= this.loadFragment({
                name: "carmanagement.view.HelloDialog"
            });
            this.pDialog.then((oDialog) => oDialog.open());
        },
		onCloseDialog() {
			// note: We don't need to chain to the pDialog promise, since this event handler
			// is only called from within the loaded dialog itself.
			this.byId("helloDialog").close();
		} 
    });
});