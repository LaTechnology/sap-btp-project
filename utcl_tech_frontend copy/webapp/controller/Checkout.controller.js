sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
], function (Controller, JSONModel, Fragment) {
    "use strict";

    return Controller.extend("utcltechfrontend.controller.Checkout", {
        onInit: function () {
            this._oDialog = null;

            var oSelectedProductsModel = new JSONModel({
                SelectedProducts: []
            });
            this.getView().setModel(oSelectedProductsModel, "selectedProducts");

            // View model to store selected customers
            var oViewModel = new JSONModel({
                selectedCustomers: []
            });
            this.getView().setModel(oViewModel, "viewModel");
        },

        onSelectionChange: function (oEvent) {
            var oSelectedItem = oEvent.getParameter("listItem");
            var oContext = oSelectedItem ? oSelectedItem.getBindingContext("odataModel") : null;

            if (oContext) {
                var sPath = oContext.getPath();
                var bSelected = oSelectedItem.getSelected();
                var oModel = this.getView().getModel("odataModel");
                var oCustomer = oModel.getProperty(sPath);

                if (oCustomer) {
                    var oSelectedProductsModel = this.getView().getModel("selectedProducts");
                    var aSelectedProducts = oSelectedProductsModel.getProperty("/SelectedProducts") || [];
                    oCustomer.selected = bSelected;

                    var index = aSelectedProducts.findIndex(function (customer) {
                        return customer.id === oCustomer.id;
                    });

                    if (bSelected && index === -1) {
                        aSelectedProducts.push(oCustomer);
                    } else if (!bSelected && index !== -1) {
                        aSelectedProducts.splice(index, 1);
                    }

                    oSelectedProductsModel.setProperty("/SelectedProducts", aSelectedProducts);

                    console.log("Selected Customer:", oCustomer);
                } else {
                    console.error("Customer not found for path:", sPath);
                }
            } else {
                console.error("No context available for the selected item.");
            }
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

        onSave: function () {
            var oSelectedProductsModel = this.getView().getModel("selectedProducts");
            var aSelectedProducts = oSelectedProductsModel.getProperty("/SelectedProducts");

            var oViewModel = this.getView().getModel("viewModel");
            oViewModel.setProperty("/selectedCustomers", aSelectedProducts);

            this._oDialog.close();
        },

        onClose: function () {
            if (this._oDialog) {
                this._oDialog.close();
            }
        },

        onNextPage: function () {
            var oView = this.getView();
            var oIconTabBar = oView.byId("iconTabBar");
        
            if (oIconTabBar) {
                // Set the selected key to switch to the "Shipping Address" tab
                oIconTabBar.setSelectedKey("shippingAddress");
        
                // Find the VBox directly in the view
                var oCustomerToggleContainer = oView.byId("customerToggleContainer");
        
                if (oCustomerToggleContainer) {
                    // Clear existing items
                    oCustomerToggleContainer.removeAllItems();
        
                    // Retrieve selected customers from the model
                    var oViewModel = this.getView().getModel("viewModel");
                    var aSelectedCustomers = oViewModel.getProperty("/selectedCustomers");
        
                    if (aSelectedCustomers && aSelectedCustomers.length > 0) {
                        // Add a ToggleButton for each selected customer
                        aSelectedCustomers.forEach(function (oCustomer) {
                            var oToggleButton = new sap.m.ToggleButton({
                                text: oCustomer.firstName + " " + oCustomer.lastName,
                                pressed: oCustomer.selected // Set the initial state based on selection
                            });
                            oCustomerToggleContainer.addItem(oToggleButton);
                        });
                    }
                } else {
                    console.error("VBox 'customerToggleContainer' not found.");
                }
            } else {
                console.error("IconTabBar not found.");
            }
        }
        
        
    });
});
