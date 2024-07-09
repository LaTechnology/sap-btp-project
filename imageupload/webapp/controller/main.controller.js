sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("imageupload.controller.main", {
        onInit: function () {
           
        },

        onFileChange: function(e) {
            var oFileUploader = e.getSource(); 
            var oImage = this.byId("upload-image"); 

            
            var oDomRef = oFileUploader.getFocusDomRef();
            var file = oDomRef.files[0];

            if (file) {
                var sUrl = URL.createObjectURL(file); 
                oImage.setSrc(sUrl); 
            }
        }
    });
});
