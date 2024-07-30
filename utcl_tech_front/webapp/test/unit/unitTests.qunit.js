/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"utcl_tech_front/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
