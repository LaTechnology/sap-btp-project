sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/ui/model/json/JSONModel"
], function (Controller, MessageToast,JSONModel) {
  "use strict";

  return Controller.extend("ns.fileuploadback.controller.FileUploadView", {
    onInit: function () {
      this._base64String = null;
      this._fullData = [];
      this._offset = 0;
      this._limit = 10;
 
      const oModel = new JSONModel({ customer: [] });
      this.getView().setModel(oModel);
    },

    onChangeDP: function (oEvent) {
      const file = oEvent.getParameter("files")[0];
      if (!file) {
        MessageToast.show("No file selected.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const rawBase64 = e.target.result;

        // ✅ Strip MIME prefix like data:application/xxx;base64,...
        const cleanBase64 = rawBase64.replace(/^data:.*;base64,/, "");

        this._base64String = cleanBase64;
        MessageToast.show("File loaded successfully.");
      };

      reader.readAsDataURL(file); // Triggers Base64 encoding
    },

    onUpload: function () {
      if (!this._base64String) {
        MessageToast.show("Please select a file first.");
        return;
      }


      // Call CAPM backend
      fetch("/odata/v4/my/uploadBase64", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          input: this._base64String,
          extension: this._uploadedExtension
        })
      })
       .then(res => res.json())
        .then(data => {
          if (data.error) {
            MessageToast.show("Upload failed: " + data.error.message);
          } else {
            MessageToast.show(data.message || "Upload successful.");
            this._fetchCustomerData(); // 🟢 Fetch data after successful upload
          }
        })
        .catch(err => {
          console.error(err);
          MessageToast.show("Error during upload.");
        });
    },

     _fetchCustomerData: function () {
      fetch("/odata/v4/my/customer")
        .then(res => res.json())
        .then(data => {
          this._fullData = data.value || [];
          this._offset = 0;
          this.getView().getModel().setProperty("/customer", []);
          this._loadNextBatch();
        })
        .catch(err => {
          console.error("Failed to fetch customer data:", err);
          MessageToast.show("Unable to load data from backend.");
        });
    },
 
    _loadNextBatch: function () {
      const nextBatch = this._fullData.slice(this._offset, this._offset + this._limit);
      const oModel = this.getView().getModel();
      const currentData = oModel.getProperty("/customer") || [];
      const updatedData = currentData.concat(nextBatch);
      oModel.setProperty("/customer", updatedData);
      this._offset += this._limit;
 
      if (this._offset >= this._fullData.length) {
        this.byId("loadMoreButton").setEnabled(false);
      } else {
        this.byId("loadMoreButton").setEnabled(true);
      }
    },
 
    onLoadMore: function () {
      this._loadNextBatch();
    },

    // Optional: Size/type handlers
    onFilenameLengthExceed: function () {
      MessageToast.show("File name is too long.");
    },

    on2MBFileSizeExceed: function () {
      MessageToast.show("File size exceeds the 1MB limit.");
    },

    onTypeMissmatch: function () {
      MessageToast.show("Invalid file type. Only .xlsx or .csv allowed.");
    },

    onUploadDPComplete: function () {
      // Optional: used if you're doing native FileUploader uploads (not needed here)
    }
  });
});
