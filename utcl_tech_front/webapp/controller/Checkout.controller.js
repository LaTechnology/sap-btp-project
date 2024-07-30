sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/odata/v4/ODataModel"
],
function (Controller,Fragment,Filter, FilterOperator,JSONModel,ODataModelV4) {
    "use strict";

    return Controller.extend("utcltechfront.controller.Checkout", {
        onInit: function () {

            var oViewModel = new JSONModel({
                selectedDealers: [],
                selectedRetailers: []
            });
            this.getView().setModel(oViewModel, "viewModel");


                var oModelV4 = new sap.ui.model.odata.v4.ODataModel({
                    serviceUrl: "/odata/v4/UTCLCustomer/"
                });
                this.getView().setModel(oModelV4, "UTCLCustomer");
        
                console.log("ODataV4Model:", oModelV4);

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

        // onSelectionChange: function (oEvent) {
        //     var oTable = oEvent.getSource();
        //     var aSelectedItems = oTable.getSelectedItems();
        //     var aSelectedDealers = [];
        //     var aSelectedRetailers = [];
        
        //     aSelectedItems.forEach(function (oItem) {
        //         var oBindingContext = oItem.getBindingContext("UTCLCustomer");
        
             
        //             var oData = oBindingContext.getObject();
        //             console.log("Selected Item Data:", oData);
                   
        //             if (oData.dealerID ) {
        //                 aSelectedDealers.push(oData);
        //             } else if (oData.retailerId) {
        //                 aSelectedRetailers.push(oData);
        //             }   



                
        //     });
        //     var oViewModel = this.getView().getModel("viewModel");
        //     oViewModel.setProperty("/selectedDealers", aSelectedDealers);
        //     oViewModel.setProperty("/selectedRetailers", aSelectedRetailers);
        // }
        
        onSave: function () {
            var oView = this.getView();
            var oDealerTable = Fragment.byId(oView.getId() + "--customerFragment", "dealerTable");
            var oRetailerTable = Fragment.byId(oView.getId() + "--customerFragment", "retailerTable");
            var aSelectedDealers = [];
            var aSelectedRetailers = [];
            var oViewModel = oView.getModel("viewModel");

            console.log(oViewModel);

            var aDealerSelectedItems = oDealerTable.getSelectedItems();
            aDealerSelectedItems.forEach(function (oItem) {
                var oBindingContext = oItem.getBindingContext("UTCLCustomer");
                console.log(oBindingContext);
                if (oBindingContext) {
                    var oData = oBindingContext.getObject();

                    console.log(oData);

                    var selectedDealer = aSelectedDealers.push(oData);

                    console.log(selectedDealer);
                }
            });

            var aRetailerSelectedItems = oRetailerTable.getSelectedItems();
            aRetailerSelectedItems.forEach(function (oItem) {
                var oBindingContext = oItem.getBindingContext("UTCLCustomer");
             
                if (oBindingContext) {
                    var oData = oBindingContext.getObject();

                    console.log(oData);
                    var selectedRetailer = aSelectedRetailers.push(oData);
                    console.log(selectedRetailer);
                }

                
            });

            // Update the view model
            oViewModel.setProperty("/selectedDealers", aSelectedDealers);
            oViewModel.setProperty("/selectedRetailers", aSelectedRetailers);

            // Close the dialog
            this.onClose();
        },

        // onSelectionChange: function (oEvent) {
        //     var oTable = oEvent.getSource();
        //     var aSelectedItems = oTable.getSelectedItems();
        
        //     if (!aSelectedItems) {
        //         console.error("No selected items");
        //         return;
        //     }
        
        //     aSelectedItems.forEach(function (oItem) {
        //         var oBindingContext = oItem.getBindingContext("UTCLCustomer");
        
        //         if (oBindingContext) {
        //             var oData = oBindingContext.getObject();
        //             console.log("Selected Item Data:", oData);
        //         }
        //     });
        // },

        // onSelectionChange: function (oEvent) {
        //     var oTable = oEvent.getSource();
        //     var aSelectedItems = oTable.getSelectedItems();
        
        //     if (!aSelectedItems) {
        //         console.error("No selected items");
        //         return;
        //     }
        
        //     aSelectedItems.forEach(function (oItem) {
        //         var oBindingContext = oItem.getBindingContext("UTCLCustomer");

        //         console.log(oBindingContext);
        
        //         if (oBindingContext) {

        //             var sPath = oBindingContext.getPath();
        //             var oModel = oBindingContext.getModel();
        //             console.log(sPath);
        //             console.log(oModel);
        //             var oData = oBindingContext.getObject();
        //             console.log("Selected Item Data:", oData);

        //             console.log(Array.isArray(oData.toAddress));
        //             // Check if toAddress is an array and log its contents
        //             if (Array.isArray(oData.toAddress)) {
        //                 console.log("toAddress:", oData.toAddress);
        //             } else {
        //                 console.error("toAddress is not an array:", oData.toAddress);
        //             }
        //         }
        //     });
        // },
        
        onSelectionChange: function (oEvent) {
            var oTable = oEvent.getSource();
            var aSelectedItems = oTable.getSelectedItems();
            
            if (!aSelectedItems || aSelectedItems.length === 0) {
                console.error("No selected items");
                return;
            }
            
            aSelectedItems.forEach(function (oItem) {
                var oBindingContext = oItem.getBindingContext("UTCLCustomer");
                
                if (oBindingContext) {
                    var sPath = oBindingContext.getPath();
                    var oModel = oBindingContext.getModel();
        
                    // Print the selected item data
                    console.log("Selected Item Data:", oBindingContext.getObject());
        
                    // Construct the $expand query
                    var sExpandPath = sPath + "?$expand=toAddress,toRetailer"; // Adjust the associations as needed
        
                    // Fetch expanded data using OData V4
                    oModel.read(sExpandPath, {
                        success: function (oData) {
                            console.log("Expanded Data:", oData);
        
                            // Check if toAddress is an array and log its contents
                            if (Array.isArray(oData.toAddress)) {
                                console.log("toAddress:", oData.toAddress);
                            } else {
                                console.error("toAddress is not an array:", oData.toAddress);
                            }
        
                            // Check if toRetailer is an array and log its contents
                            if (Array.isArray(oData.toRetailer)) {
                                console.log("toRetailer:", oData.toRetailer);
                            } else {
                                console.error("toRetailer is not an array:", oData.toRetailer);
                            }
                        },
                        error: function (oError) {
                            console.error("Error fetching expanded data:", oError);
                        }
                    });
                }
            });
        }
,        

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

        onNextPage: function () {
            var oView = this.getView();
            var oIconTabBar = oView.byId("iconTabBar");
        
            if (oIconTabBar) {
                oIconTabBar.setSelectedKey("shippingAddress");
        
                var oViewModel = oView.getModel("viewModel");
                var aSelectedDealers = oViewModel.getProperty("/selectedDealers");
                var aSelectedRetailers = oViewModel.getProperty("/selectedRetailers");
        
                var oShippingAddressContainer = oView.byId("shippingAddressContainer");
                oShippingAddressContainer.destroyItems(); 
        
                function addCustomerForms(aCustomers, customerType) {
                    if (aCustomers && aCustomers.length > 0) {
                        aCustomers.forEach(function (oCustomer) {
                            // Assuming address details are available in oCustomer
                            var oForm = new sap.ui.layout.form.Form({
                                editable: false, // Make form non-editable
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
                                        ariaLabelledBy: "ShippingTitle",
                                        title: customerType + " Shipping Address",
                                        formElements: [
                                            new sap.ui.layout.form.FormElement({
                                                label: "Name",
                                                fields: [
                                                    new sap.m.Input({
                                                        value: oCustomer.firstName + " " + oCustomer.lastName,
                                                        enabled: false
                                                    })
                                                ]
                                            }),
                                            new sap.ui.layout.form.FormElement({
                                                label: "Address Line 1",
                                                fields: [
                                                    new sap.m.Input({
                                                        value: oCustomer.addressLine1 || "",
                                                        enabled: false
                                                    })
                                                ]
                                            }),
                                            new sap.ui.layout.form.FormElement({
                                                label: "Address Line 2",
                                                fields: [
                                                    new sap.m.Input({
                                                        value: oCustomer.addressLine2 || "",
                                                        enabled: false
                                                    })
                                                ]
                                            }),
                                            new sap.ui.layout.form.FormElement({
                                                label: "Address Line 3",
                                                fields: [
                                                    new sap.m.Input({
                                                        value: oCustomer.addressLine3 || "",
                                                        enabled: false
                                                    })
                                                ]
                                            }),
                                            new sap.ui.layout.form.FormElement({
                                                label: "Address Line 4",
                                                fields: [
                                                    new sap.m.Input({
                                                        value: oCustomer.addressLine4 || "",
                                                        enabled: false
                                                    })
                                                ]
                                            }),
                                            new sap.ui.layout.form.FormElement({
                                                label: "ZIP Code/Pincode",
                                                fields: [
                                                    new sap.m.Input({
                                                        value: oCustomer.pincode || "",
                                                        enabled: false
                                                    }),
                                                    new sap.m.Button({
                                                        text: "Validate",
                                                        type: "Emphasized"
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            });
        
                            oShippingAddressContainer.addItem(oForm);
                        });
                    } else {
                        console.error("No selected " + customerType.toLowerCase() + "s found.");
                    }
                }
        
                addCustomerForms(aSelectedDealers, "Dealer");
                addCustomerForms(aSelectedRetailers, "Retailer");
        
            } else {
                console.error("IconTabBar not found.");
            }
        }
        
        
    });
});
                 

