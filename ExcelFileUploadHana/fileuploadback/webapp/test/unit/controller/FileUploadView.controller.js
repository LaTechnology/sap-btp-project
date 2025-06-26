/*global QUnit*/

sap.ui.define([
	"ns/fileuploadback/controller/FileUploadView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("FileUploadView Controller");

	QUnit.test("I should test the FileUploadView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
