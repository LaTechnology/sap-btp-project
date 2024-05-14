/*global QUnit*/

sap.ui.define([
	"supplier/controller/supplierForm.controller"
], function (Controller) {
	"use strict";

	QUnit.module("supplierForm Controller");

	QUnit.test("I should test the supplierForm controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
