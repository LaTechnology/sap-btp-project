sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        sampleDpChange: function(oEvent) {
            MessageToast.show("Custom handler invoked.");
        }
    };
});
