sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast,Controller, ODataModel) {
    'use strict';

    // return {
    //     SubmitMethod: function(oEvent) {
    //         MessageToast.show("Custom handler invoked.");
            
    //             // var oModel = new ODataModel({
    //             //   serviceUrl: "/browse",
    //             //   synchronizationMode: "None",
    //             //   autoExpandSelect: true,
    //             //   groupId: "$auto"
    //             // });
          
    //             // oModel.callFunction("/CatalogService.ListOfBooks/submitOrder", {
    //             //   method: "POST",
    //             //   urlParameters: {},
    //             //   success: function (oData, response) {
    //             //     // Handle success
    //             //     console.log("Submit action success");
    //             //   },
    //             //   error: function (oError) {
    //             //     // Handle error
    //             //     console.error("Submit action error", oError);
    //             //   }
    //             // });
    //     }
    // };
    return Controller.extend("ns.books.Component", {

      onSubmitOrderPress: function () {
        // Get the OData model (replace 'YourModel' with the name of your OData model)
        var oModel = this.getView().getModel("ListofBooks");
  
        // Get the selected book ID and quantity (replace 'yourTable' and 'idInput' with your actual table and input IDs)
        var oTable = this.getView().byId("ID");
        var oSelectedItem = oTable.getSelectedItem();
        var sBookID = oSelectedItem.getBindingContext("ListofBooks").getProperty("id");
        var iQuantity = parseInt(this.getView().byId("ID").getValue(), 10);
  
        // Call the CAP service method
        oModel.callFunction("/submitOrder", {
          method: "POST",
          urlParameters: {
            book: sBookID,
            quantity: iQuantity
          },
          success: function (oData) {
            // Handle success
            MessageBox.success("Order submitted successfully");
          },
          error: function (oError) {
            // Handle error
            MessageBox.error("Error submitting order: " + oError.responseText);
          }
        });
      }
    });
});
