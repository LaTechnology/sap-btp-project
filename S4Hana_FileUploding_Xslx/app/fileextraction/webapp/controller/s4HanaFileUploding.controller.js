sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast) {
        "use strict";

        return Controller.extend("fileextraction.controller.s4HanaFileUploding", {
            onInit: function () {
                // Initialization logic if needed
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

                if (!fileName.endsWith(".xlsx")) {
                    MessageToast.show("Only XLSX files are allowed.");
                    return;
                }

                var reader = new FileReader();

                reader.onload = (e) => {
                    var dataUrl = e.target.result;
                    var base64Content = dataUrl.split(",")[1]; // Get only base64 part

                    console.log("📄 Base64 Encoded XLSX File:\n", base64Content);

                    // Call backend CAP action
                    fetch("/v2/odata/v4/csvextraction/uploadProductsXLSX", {
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
                            const result = data?.d?.uploadProductsXLSX;
                            const message = result?.message || "No message returned";

                            // Optional: extract number of inserted records
                            const match = message.match(/Inserted (\d+) records?/i);
                            const inserted = match ? match[1] : "0";

                            MessageToast.show(`${message} (${inserted} inserted)`);
                            console.log("✅ uploadProductsXLSX Result:", result);
                        })
                        .catch(error => {
                            console.error("❌ uploadProductsXLSX Error:", error);
                            MessageToast.show("Error uploading file");
                        });
                };

                reader.onerror = () => {
                    MessageToast.show("Failed to read file.");
                };

                reader.readAsDataURL(file); // XLSX => base64
            }
        });
    });
