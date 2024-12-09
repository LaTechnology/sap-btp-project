sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        ivinmethod: function(oEvent) {
            MessageToast.show("Custom handler invoked.");
        }
    };
});
