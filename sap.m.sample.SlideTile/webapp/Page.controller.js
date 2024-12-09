sap.ui.define(['sap/ui/core/mvc/Controller', 'sap/m/MessageToast'],
	function(Controller, MessageToast) {
	"use strict";

	var PageController = Controller.extend("sap.m.sample.SlideTile.Page", {
		pressOnTileOne : function(evt) {
			window['sap-ushell-config'] = {
                defaultRenderer: 'fiori2',
                applications: {
                    "samples-app1": {
                        title: 'Simple_Flowers',
                        description: 'Flowers',
                        additionalInformation: 'SAPUI5.Component=sap.m.sample.SlideTile',
                        applicationType: 'URL',
                        url: "./webapp",
                        navigationMode: 'embedded'
                    }
            }
		},
		window['sap-ushell-config'] = {
			defaultRenderer: 'fiori2',
			applications: {
				"samples-app1": {
					title: 'Customer',
					description: 'Incidents',
					additionalInformation: 'SAPUI5.Component=sampleproject1',
					applicationType: 'URL',
					url: "sap-btp-project\SampleProject\app\sampleproject1\webapp",
					navigationMode: 'embedded'
				}
		}
	}
			MessageToast.show("The generic tile one pressed.");
		},
		pressOnTileTwo : function(evt) {
			MessageToast.show("The generic tile two pressed.");
		}
	});

	return PageController;
});