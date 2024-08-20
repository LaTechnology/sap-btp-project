/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "utcltechfront/model/models",
    "sap/ui/model/odata/v2/ODataModel",
], function (UIComponent, Device, models, ODataModelV2) {
    "use strict";

    return UIComponent.extend("utcltechfront.Component", {
        metadata: {
            manifest: "json"
        },

        /**
         * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
         * @public
         * @override
         */
        init: function () {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // enable routing
            this.getRouter().initialize();

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            // create and set OData V2 model
            var oModelV2 = new ODataModelV2({
                serviceUrl: this.getManifestEntry("/sap.app/dataSources/mainService/uri")
            });
            this.setModel(oModelV2, "mainService");

            console.log("OData V2 Model:", oModelV2);

            // create and set OData V4 model
            // var oModel = new sap.ui.model.odata.v4.ODataModel({
            //     serviceUrl: "/odata/v4/UTCLCustomer/",
            //     synchronizationMode: "None"
            // });
            // this.setModel(oModel, "UTCLCustomer");

            // console.log("OData V4 Model:", oModel);

            var oModelv2 = new ODataModelV2({
                serviceUrl: this.getManifestEntry("/sap.app/dataSources/UTCLCustomer/uri")
            });

            this.setModel(oModelv2, "UTCLCustomerV2");

            console.log("OData V2 Model:", oModelv2);
        }
    });
});
