/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"utcl_tech_frontend/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
