sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        sampleDpChange: function(oEvent) {
            
            MessageToast.show("Custom handler invoked.");
        },
        backButton: function() {
            window.location.href="http://localhost:4004/product/webapp/index.html";
            MessageToast.show("Custom handler invoked.");
        }
    };
});
