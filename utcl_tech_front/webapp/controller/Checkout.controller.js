sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/odata/v2/ODataModel"
], function (Controller, Fragment, JSONModel, ODataModelV2) {
    "use strict";

    return Controller.extend("utcltechfront.controller.Checkout", {
        onInit: function () {
            var oViewModel = new JSONModel({
                selectedDealers: [],
                selectedRetailers: []
            });
            this.getView().setModel(oViewModel, "viewModel");

            var utclCustomer = new ODataModelV2({
                serviceUrl: "/odata/v2/UTCLCustomer/"
            });

            utclCustomer.read("/Dealer", {
                urlParameters: {
                    "$expand": "toAddress"
                },
                success: function(oData) {
                    var oDealerModel = new JSONModel(oData);
                    this.getView().setModel(oDealerModel, "DealerModel");
                }.bind(this),
                error: function(oError) {
                    console.error("Failed to read data:", oError);
                }
            });

            utclCustomer.read("/Retailer", {
                urlParameters: {
                    "$expand": "toAddress"
                },
                success: function(oData) {
                    var oRetailerModel = new JSONModel(oData);
                    this.getView().setModel(oRetailerModel, "RetailerModel");
                }.bind(this),
                error: function(oError) {
                    console.error("Failed to read data:", oError);
                }
            });
        },

        onOpenDialog: function () {
            var oView = this.getView();

            if (!this._oDialog) {
                Fragment.load({
                    id: oView.getId() + "--customerFragment",
                    name: "utcltechfront.view.CustomerV4",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    this._oDialog = oDialog;
                    this._oDialog.open();
                    this.updateFragmentSelections();
                }.bind(this));
            } else {
                this._oDialog.open();
            }
        },

        onClose: function () {
            if (this._oDialog) {
                this._oDialog.close();
            }
        },

        onSelectionChange: function (oEvent) {
            var oTable = oEvent.getSource();
            var aSelectedItems = oTable.getSelectedItems();

            if (!aSelectedItems) {
                console.error("No selected items");
                return;
            }

            aSelectedItems.forEach(function (oItem) {
                var oBindingContext = oItem.getBindingContext("UTCLCustomer");

                if (oBindingContext) {
                    var oData = oBindingContext.getObject();
                    console.log("Selected Item Data:", oData);
                }
            });
        },

        onSave: function () {
            var oView = this.getView();
            var oViewModel = oView.getModel("viewModel");

            var oDealerTable = Fragment.byId(oView.getId() + "--customerFragment", "dealerTable");
            var oRetailerTable = Fragment.byId(oView.getId() + "--customerFragment", "retailerTable");

            var aSelectedDealers = [];
            var aSelectedRetailers = [];

            oDealerTable.getSelectedItems().forEach(function (oItem) {
                var oBindingContext = oItem.getBindingContext("DealerModel");
                if (oBindingContext) {
                    aSelectedDealers.push(oBindingContext.getObject());
                }
            });

            oRetailerTable.getSelectedItems().forEach(function (oItem) {
                var oBindingContext = oItem.getBindingContext("RetailerModel");
                if (oBindingContext) {
                    aSelectedRetailers.push(oBindingContext.getObject());
                }
            });

            oViewModel.setProperty("/selectedDealers", aSelectedDealers);
            oViewModel.setProperty("/selectedRetailers", aSelectedRetailers);

            this.onClose();
        },

        onRemoveDealer: function (oEvent) {
            var oButton = oEvent.getSource();
            var oTable = this.byId("selectedDealerTable");
            var oItem = oButton.getParent(); // Get the parent ColumnListItem

            // Get the model and data
            var oModel = this.getView().getModel("viewModel");
            var aDealers = oModel.getProperty("/selectedDealers");

            // Find the index of the item to be removed
            var iIndex = aDealers.indexOf(oItem.getBindingContext("viewModel").getObject());

            // Remove the item from the array
            if (iIndex !== -1) {
                aDealers.splice(iIndex, 1);
                oModel.setProperty("/selectedDealers", aDealers);

                // Update the fragment
                this.updateFragmentSelections();
            }
        },

        onRemoveRetailer: function (oEvent) {
            var oButton = oEvent.getSource();
            var oTable = this.byId("selectedRetailerTable");
            var oItem = oButton.getParent(); // Get the parent ColumnListItem

            // Get the model and data
            var oModel = this.getView().getModel("viewModel");
            var aRetailers = oModel.getProperty("/selectedRetailers");

            // Find the index of the item to be removed
            var iIndex = aRetailers.indexOf(oItem.getBindingContext("viewModel").getObject());

            // Remove the item from the array
            if (iIndex !== -1) {
                aRetailers.splice(iIndex, 1);
                oModel.setProperty("/selectedRetailers", aRetailers);

                // Update the fragment
                this.updateFragmentSelections();
            }
        },

        updateFragmentSelections: function () {  
            var oView = this.getView();
            var oDialog = sap.ui.core.Fragment.byId(oView.getId() + "--customerFragment", "customerDialog");

            if (oDialog) {
                var oDealerTable = sap.ui.core.Fragment.byId(oView.getId() + "--customerFragment", "dealerTable");
                var oRetailerTable = sap.ui.core.Fragment.byId(oView.getId() + "--customerFragment", "retailerTable");

                if (oDealerTable) {
                    oDealerTable.removeSelections(true);
                    var aDealers = oView.getModel("viewModel").getProperty("/selectedDealers");
                    console.log("Dealers to be selected:", aDealers);
                    aDealers.forEach(function (oDealer) {
                        var aItems = oDealerTable.getItems();
                        aItems.forEach(function (oItem) {
                            var oData = oItem.getBindingContext("UTCLCustomer").getObject();
                            console.log("Dealer Item Data:", oData);
                            if (oData && oData.dealerID === oDealer.dealerID) {
                                oDealerTable.setSelectedItem(oItem, true);
                                console.log("Dealer selected:", oData);
                            }
                        });
                    });
                }

                if (oRetailerTable) {
                    oRetailerTable.removeSelections(true);
                    var aRetailers = oView.getModel("viewModel").getProperty("/selectedRetailers");
                    console.log("Retailers to be selected:", aRetailers);
                    aRetailers.forEach(function (oRetailer) {
                        var aItems = oRetailerTable.getItems();
                        aItems.forEach(function (oItem) {
                            var oData = oItem.getBindingContext("UTCLCustomer").getObject();
                            console.log("Retailer Item Data:", oData);
                            if (oData && oData.retailerID === oRetailer.retailerID) {
                                oRetailerTable.setSelectedItem(oItem, true);
                                console.log("Retailer selected:", oData);
                            }
                        });
                    });
                }
            }
        },

        validateExternalAPI: function (oEvent) {
            console.log("validation pressed");
            
            var oButton = oEvent.getSource();
            var oFormElement = oButton.getParent();

            console.log(oButton);
            console.log(oFormElement);

            var oPincodeInput = oFormElement.getFields()[0];
            var sPincode = oPincodeInput.getValue();

            var sUrl = this.getOwnerComponent().getManifestEntry("/sap.app/dataSources/pincodeValidationAPI/uri") + "?pincode=" + sPincode;

            console.log(oPincodeInput);
            console.log(sPincode);

            console.log(sUrl);

            if (sUrl) {
                console.log("pincode validated");
                
                // Make the AJAX call to the URL
                jQuery.ajax({
                    url: sUrl,
                    method: "GET",
                    success: function (data) {
                        console.log("Validation successful", data);
                        // Process the result here
                        sap.m.MessageToast.show("Pincode validation successful!");
                    },
                    error: function (error) {
                        console.error("Validation failed", error);
                      
                        sap.m.MessageToast.show("Pincode validation failed!");
                    }
                });
            }

        },
        
        onNextPage: function () {
            var oView = this.getView();
            var oIconTabBar = oView.byId("iconTabBar");
        
            if (oIconTabBar) {
                oIconTabBar.setSelectedKey("shippingAddress");
        
                var oViewModel = oView.getModel("viewModel");
                var aSelectedDealers = oViewModel.getProperty("/selectedDealers");
                var aSelectedRetailers = oViewModel.getProperty("/selectedRetailers");
        
                console.log("Selected Dealers:", aSelectedDealers);
                console.log("Selected Retailers:", aSelectedRetailers);
        
                var oShippingAddressContainer = oView.byId("shippingAddressContainer");
                oShippingAddressContainer.destroyItems();
        
                var that = this; // Store the controller context
        
                function addCustomerForms(aCustomers, customerType) {
                    if (aCustomers && aCustomers.length > 0) {
                        aCustomers.forEach(function (oCustomer) {
                            console.log("Customer Data:", oCustomer);
        
                            console.log("Customer ID:", oCustomer.dealerID);
                            console.log("Dealer Name:", oCustomer.firstName);
                            console.log("Retailer Name:", oCustomer.lastName);
        
                            var oAddress = oCustomer.toAddress && oCustomer.toAddress.results && oCustomer.toAddress.results[0];
                            var oForm = new sap.ui.layout.form.Form({
                                editable: false,
                                ariaLabelledBy: "headerAddress",
                                layout: new sap.ui.layout.form.ResponsiveGridLayout({
                                    labelSpanXL: 4,
                                    labelSpanL: 3,
                                    labelSpanM: 4,
                                    labelSpanS: 12,
                                    adjustLabelSpan: false,
                                    emptySpanXL: 0,
                                    emptySpanL: 4,
                                    emptySpanM: 0,
                                    emptySpanS: 0,
                                    columnsXL: 2,
                                    columnsL: 1,
                                    columnsM: 1,
                                    singleContainerFullSize: false
                                }),
                                formContainers: [
                                    new sap.ui.layout.form.FormContainer({
                                        title: customerType + " Details",
                                        formElements: [
                                            new sap.ui.layout.form.FormElement({
                                                label: "Name",
                                                fields: [
                                                    new sap.m.Input({
                                                        value: customerType === "Dealer"
                                                            ? (oCustomer.firstName || "") + " " + (oCustomer.lastName || "") // Concatenate first name and last name
                                                            : (oCustomer.firstName || "") + " " + (oCustomer.lastName || ""), // Adjust for retailer if necessary
                                                        editable: false
                                                    })
                                                ]
                                            }),
                                            new sap.ui.layout.form.FormElement({
                                                label: "Address",
                                                fields: [
                                                    new sap.m.Input({
                                                        value: oAddress ? oAddress.addressLine1 : "",
                                                    }),
                                                    new sap.m.Input({
                                                        value: oAddress ? oAddress.addressLine2 : "NA"
                                                    })
                                                ]
                                            }),
                                            new sap.ui.layout.form.FormElement({
                                                label: "City",
                                                fields: [
                                                    new sap.m.Input({
                                                        value: oAddress ? oAddress.city : "",
                                                    })
                                                ]
                                            }),
                                            new sap.ui.layout.form.FormElement({
                                                label: "State",
                                                fields: [
                                                    new sap.m.Input({
                                                        value: oAddress ? oAddress.state : "",
                                                    })
                                                ]
                                            }),
                                            new sap.ui.layout.form.FormElement({
                                                label: "Country",
                                                fields: [
                                                    new sap.m.Input({
                                                        value: oAddress ? oAddress.country : "",
                                                    })
                                                ]
                                            }),
                                            new sap.ui.layout.form.FormElement({
                                                label: "Pincode",
                                                fields: [
                                                    new sap.m.Input({
                                                        value: oAddress ? oAddress.pincode : "",
                                                    }),
                                                    new sap.m.Button({
                                                        text: "Validate",
                                                        press: that.validateExternalAPI.bind(that) // Use 'that' to refer to the controller context
                                                    })
                                                ]
                                            }),
                                            new sap.ui.layout.form.FormElement({
                                                label: "Phone",
                                                fields: [
                                                    new sap.m.Input({
                                                        value: oCustomer.mobileNumber,
                                                    })
                                                ]
                                            }),
                                            new sap.ui.layout.form.FormElement({
                                                label: "Email",
                                                fields: [
                                                    new sap.m.Input({
                                                        value: oCustomer.email,
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            });
        
                            oShippingAddressContainer.addItem(oForm);
                        });
                    }
                }
        
                addCustomerForms(aSelectedDealers, "Dealer");
                addCustomerForms(aSelectedRetailers, "Retailer");
            }
        }
        
        
    });
});
