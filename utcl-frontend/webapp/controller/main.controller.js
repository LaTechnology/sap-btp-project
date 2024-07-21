// sap.ui.define([
//     "sap/ui/core/mvc/Controller",
//     "sap/ui/model/json/JSONModel",
//     "sap/m/MessageToast"
// ], function (Controller, JSONModel, MessageToast) {
//     "use strict";

//     return Controller.extend("utclfrontend.controller.main", {
//         onInit: function () {
//             var oModel = new JSONModel();
//             this.getView().setModel(oModel);
//         },

//         loadPincodeData: function () {
//             var oInput = this.getView().byId("pincodeValue");
//             var pin = oInput.getValue();
//             var oModel = this.getView().getModel();
//             var sUrl = "https://api.postalpincode.in/pincode/" + pin;

//             $.ajax({
//                 url: sUrl,
//                 method: "GET",
//                 success: function (data) {
//                     if (data[0].Status === "Success") {
//                         var oPincodeData = data[0].PostOffice.map(function (postOffice) {
//                             return {
//                                 Pincode: postOffice.Pincode
//                             };
//                         });
//                         oModel.setProperty("/pincodes", oPincodeData);
                        
//                         var circleValue = data[0].PostOffice[0].Circle;
//                         var districtValue = data[0].PostOffice[0].District;
//                         var addressLine3Value = districtValue + ", " + circleValue;
//                         this.getView().byId("addressLine3").setValue(addressLine3Value);

//                         var countryValue = data[0].PostOffice[0].Country;
//                         this.getView().byId("addressLine4").setValue(countryValue);

//                         MessageToast.show("Pincode data fetched successfully.");
//                     } else {
//                         console.error("Failed to fetch pincode data");
//                         MessageToast.show("Enter a valid Pincode.");
//                     }
//                 }.bind(this),
//                 error: function (error) {
//                     console.error("Failed to fetch pincode data", error);
//                     MessageToast.show("Failed to fetch pincode data.");
//                 }
//             });
//         }
//     });
// });


sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast"
], function (Controller, JSONModel, Fragment, MessageToast) {
    "use strict";

    return Controller.extend("utclfrontend.controller.main", {
        onInit: function () {
            var oModel = new JSONModel();
            this.getView().setModel(oModel);
            this.onLoadWizardSteps();
        },

        onLoadWizardSteps: function () {
            var oWizard = this.getView().byId("utclWizards");

            Fragment.load({
                id: this.getView().getId(),
                name: "utclfrontend.view.CustomerSelection",
                controller: this
            }).then(function (oFragment) {
                oWizard.addStep(oFragment);
            });

            Fragment.load({
                id: this.getView().getId(),
                name: "utclfrontend.view.CustomerDetails",
                controller: this
            }).then(function (oFragment) {
                oWizard.addStep(oFragment);
            });
        },

        loadPincodeData: function () {
            var oInput = this.getView().byId("pincodeValue");
            var pin = oInput.getValue();
            var oModel = this.getView().getModel();
            var sUrl = "https://api.postalpincode.in/pincode/" + pin;

            $.ajax({
                url: sUrl,
                method: "GET",
                success: function (data) {
                    if (data[0].Status === "Success") {
                        var oPincodeData = data[0].PostOffice.map(function (postOffice) {
                            return {
                                Pincode: postOffice.Pincode
                            };
                        });
                        oModel.setProperty("/pincodes", oPincodeData);

                        var circleValue = data[0].PostOffice[0].Circle;
                        var districtValue = data[0].PostOffice[0].District;
                        var addressLine3Value = districtValue + ", " + circleValue;
                        this.getView().byId("addressLine3").setValue(addressLine3Value);

                        var countryValue = data[0].PostOffice[0].Country;
                        this.getView().byId("addressLine4").setValue(countryValue);

                        MessageToast.show("Pincode data fetched successfully.");
                    } else {
                        console.error("Failed to fetch pincode data");
                        MessageToast.show("Enter a valid Pincode.");
                    }
                }.bind(this),
                error: function (error) {
                    console.error("Failed to fetch pincode data", error);
                    MessageToast.show("Failed to fetch pincode data.");
                }.bind(this)
            });
        }
    });
});
