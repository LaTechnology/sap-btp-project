sap.ui.define([
    "./formatter",
    "sap/ui/core/Fragment",
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/library"
],
function (Formatter, Fragment, Controller, JSONModel, library) {
    "use strict";

    return Controller.extend("ultratech.controller.Checkout", {
        onInit: function () {
            var oData = {
                customerSelection: {},
                shippingAddress: {
                    addressLine1: "",
                    addressLine2: "",
                    addressLine3: "",
                    pinCode: "",
                    mobileNumber: "",
                    state: ""
                },
                productDetails: {
                    productCode: "",
                    description: "",
                    qty: "",
                    noOfBags: "",
                    dealerQty: "",
                    deliveryPeriod: "",
                    requestedDate: ""
                },
                deliveryInstructions: {
                    specialInstruction: "",
                    specialInstructionDescription: "",
                    truckNumber: "",
                    driverName: "",
                    driverMobileNumber: "",
                    endUserOfMaterial: "",
                    endUserContactPerson: "",
                    endUserMobileNumber: ""
                },
                isPlaceOrderEnabled: true
            };

            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel, "formData");

            // Add model data change event listener
            this.getView().getModel("formData").attachPropertyChange(this.onDataChange.bind(this));
        },

        onNextPress: function() {
            var oIconTabBar = this.byId("idIconTabBar");
            var aItems = oIconTabBar.getItems();
            var sSelectedKey = oIconTabBar.getSelectedKey();
            var iSelectedIndex = aItems.findIndex(function(item) {
                return item.getKey() === sSelectedKey;
            });

            if (iSelectedIndex < aItems.length - 1) {
                var nextItem = aItems[iSelectedIndex + 1];
                oIconTabBar.setSelectedKey(nextItem.getKey());
            }
        },

        onDataChange: function() {
            var oData = this.getView().getModel("formData").getData();
            var isPlaceOrderEnabled = this.isFormComplete(oData);
            this.getView().getModel("formData").setProperty("/isPlaceOrderEnabled", isPlaceOrderEnabled);
        },

        isFormComplete: function(formData) {
            return formData.shippingAddress.addressLine1 &&
                   formData.shippingAddress.pinCode &&
                   formData.productDetails.productCode &&
                   formData.productDetails.qty &&
                   formData.productDetails.deliveryPeriod &&
                   formData.productDetails.requestedDate &&
                   formData.deliveryInstructions.specialInstruction;
        },

        onPlaceOrder: function() {
            // Implement your place order logic here
            sap.m.MessageToast.show("Order placed successfully!");
        },

        formatter: Formatter,

        handleTableSelectDialogPress: function () {
            if (!this.pDialog) {
                this.pDialog = this.loadFragment({
                    name: "ultratech.view.Dialog",
                });
            }
            this.pDialog.then((oDialog) => oDialog.open());
        },

        handleResponsivePopoverPress: function (oEvent) {
            var oButton = oEvent.getSource(),
                oView = this.getView();

            if (!this._pPopover) {
                this._pPopover = Fragment.load({
                    id: oView.getId(),
                    name: "ultratech.view.ProductPopover",
                    controller: this
                }).then(function(oPopover) {
                    oView.addDependent(oPopover);
                    oPopover.bindElement("/ProductCollection/0");
                    return oPopover;
                });
            }
            this._pPopover.then(function(oPopover) {
                oPopover.openBy(oButton);
            });
        },

        handleCloseButton: function () {
            this.byId("myPopover").close();
        }
    });
});
