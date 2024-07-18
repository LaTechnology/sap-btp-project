/*global QUnit*/

sap.ui.define([
	"ultra_tech/controller/Checkout.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Checkout Controller");

	QUnit.test("I should test the Checkout controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
