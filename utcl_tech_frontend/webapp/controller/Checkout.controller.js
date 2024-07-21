sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
],
function (Controller,Fragment) {
    "use strict";

    return Controller.extend("utcltechfrontend.controller.Checkout", {
        onInit: function () {

            this._oDialog = null;


        },

        onOpenDialog: function () {
            var oView = this.getView();

            if (!this._oDialog) {
                Fragment.load({
                    id: oView.getId() + "--customerFragment",
                    name: "utcltechfrontend.view.Customer",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    this._oDialog = oDialog;
                    this._oDialog.open();
                }.bind(this));
            } else {
                this._oDialog.open();
            }
        },

        onClose: function(){

            if (this._oDialog) {
                this._oDialog.close();
            }
        },


            onSelectionChange: function (oEvent) {
                var oTable = oEvent.getSource();
                var aSelectedItems = oTable.getSelectedItems();
                var aSelectedContexts = oTable.getSelectedContexts();
    
                // Log the selected items to the console
                aSelectedItems.forEach(function (oItem) {
                    var oContext = oItem.getBindingContext("odataModel");
                    var sFirstName = oContext.getProperty("firstName");
                    var sLastName = oContext.getProperty("lastName");
                    var sEmail = oContext.getProperty("email");
                    var sMobileNumber = oContext.getProperty("mobileNumber");
                    var sCustomerType = oContext.getProperty("toCustomerType/customerType");
    
                    console.log("Selected Item: ", {
                        firstName: sFirstName,
                        lastName: sLastName,
                        email: sEmail,
                        mobileNumber: sMobileNumber,
                        customerType: sCustomerType
                    });
                });
            
        },
onSave: function () {
    var oView = this.getView();
    var oSelectedCustomerTable = oView.byId("selectedCustomerTable");
    var oModel = oView.getModel("viewModel");

    // Clear existing selected customers
    oModel.setProperty("/selectedCustomers", []);

    // Get the selected items from both tables
    var aSelectedRetailers = this._oDialog.byId("customerFragment").getSelectedItems();
    var aSelectedDealers = this._oDialog.byId("customerFragment1").getSelectedItems();

    // Combine the selected items
    var aSelectedCustomers = aSelectedRetailers.concat(aSelectedDealers);

    // Add the selected customers to the view model
    aSelectedCustomers.forEach(function (oItem) {
        var oContext = oItem.getBindingContext("odataModel");
        var oCustomer = {
            firstName: oContext.getProperty("firstName"),
            lastName: oContext.getProperty("lastName"),
            email: oContext.getProperty("email"),
            mobileNumber: oContext.getProperty("mobileNumber"),
            customerType: oContext.getProperty("toCustomerType/customerType")
        };
        oModel.getProperty("/selectedCustomers").push(oCustomer);
    });

    // Close the dialog
    this.onClose();
}
    });
});
