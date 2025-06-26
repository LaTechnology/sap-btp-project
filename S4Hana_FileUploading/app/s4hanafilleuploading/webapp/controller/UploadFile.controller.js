sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,MessageToast) {
        "use strict";

        return Controller.extend("s4hanafilleuploading.controller.UploadFile", {
            onInit: function () {

            },
            handleUploadPress: function () {
    var oFileUploader = this.byId("fileUploader");

    var oFileInput = oFileUploader.getDomRef("fu");
    if (!oFileInput || !oFileInput.files || oFileInput.files.length === 0) {
        MessageToast.show("Please select a file.");
        return;
    }

    var file = oFileInput.files[0];
    var fileName = file.name.toLowerCase();

    if (!fileName.endsWith(".csv") && !fileName.endsWith(".xlsx")) {
        MessageToast.show("Only CSV or XLSX files are allowed.");
        return;
    }

    var reader = new FileReader();

    reader.onload = (e) => {
        var dataUrl = e.target.result; // e.g., data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,...
        var base64Content = dataUrl.split(",")[1]; // Remove prefix

        console.log("📄 Base64 Encoded File:\n", base64Content);

        // Upload to CAP
        fetch("/odata/v4/csvextraction/uploadProducts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                file: base64Content
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("✅ uploadProducts Result:", data);
            MessageToast.show(`${data.message} (${data.inserted} inserted)`);
        })
        .catch(error => {
            console.error("❌ uploadProducts Error:", error);
            MessageToast.show("Error uploading file");
        });
    };

    reader.onerror = () => {
        MessageToast.show("Failed to read file.");
    };

    // Read based on type
    if (fileName.endsWith(".csv")) {
        reader.readAsDataURL(file); // CSV => base64 (data:text/csv;base64,...)
    } else {
        reader.readAsDataURL(file); // XLSX => base64 (data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,...)
    }
}

        });
    });
