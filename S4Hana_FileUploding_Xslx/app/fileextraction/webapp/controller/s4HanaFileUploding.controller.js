sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"

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
                    var base64Content = dataUrl.split(",")[1];
            
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
            
                        const match = message.match(/Inserted (\d+) records?/i);
                        const inserted = match ? match[1] : "0";
            
                        MessageToast.show(`${message} (${inserted} inserted)`);
                        console.log("✅ uploadProductsXLSX Result:", result);
            
                        // 🔄 Refresh the SmartTable
                        var oSmartTable = this.byId("idSmarTable");
                        if (oSmartTable) {
                            oSmartTable.rebindTable();
                        }
                    })
                    .catch(error => {
                        console.error("❌ uploadProductsXLSX Error:", error);
                        MessageToast.show("Error uploading file");
                    });
                };
            
                reader.onerror = () => {
                    MessageToast.show("Failed to read file.");
                };
            
                reader.readAsDataURL(file);
            },
           onFilter: function (oEvent) {
    var sQuery = oEvent.getSource().getValue().toLowerCase();
    var oSmartTable = this.byId("idSmarTable");
    var oTable = oSmartTable.getTable();
    var oBinding = oTable.getBinding("items");

    if (oBinding) {
        var fnCustomFilter = function (oContext) {
            var sRoleName = (oContext.getProperty("s4HanaForSelfServiceUse") || "").toLowerCase();
            var sRoleLevel = (oContext.getProperty("secruityRoleLevel") || "").toLowerCase();
            var sTcode = (oContext.getProperty("tCode") || "").toLowerCase();

            return sRoleName.includes(sQuery) || sRoleLevel.includes(sQuery) || sTcode.includes(sQuery);
        };

        oBinding.filter(new sap.ui.model.Filter({
            test: fnCustomFilter
        }));
    }
},


fragmenthandleUploadPress:function(){
    if (!this.AsignTask) {
        this.AsignTask = sap.ui.xmlfragment("fileextraction.fragment.FileUpload", this);
        this.getView().addDependent(this.AsignTask);
    }
    this.AsignTask.open();
},

  onAsignTaskClose:function(){
    this.AsignTask.close();
  },

            
            
        });
    });
