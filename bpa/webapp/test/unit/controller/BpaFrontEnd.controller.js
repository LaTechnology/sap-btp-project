/*global QUnit*/

sap.ui.define([
	"bpa/controller/BpaFrontEnd.controller"
], function (Controller) {
	"use strict";

	QUnit.module("BpaFrontEnd Controller");

	QUnit.test("I should test the BpaFrontEnd controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
