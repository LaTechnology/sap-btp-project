sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/Image","sap/ui/model/json/JSONModel"],
  function (Controller,JSONModel) {
    "use strict";
    var idToPreview;

    var description;
    var section_image;
    var title;
    var oJSON;

    return Controller.extend("ns.propose.controller.PreviewForm", {


      onInit: function () {
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter
          .getRoute("PreviewForm")
          .attachMatched(this.onObjectMatched, this);
          var oModel = new sap.ui.model.json.JSONModel();

      },
      onObjectMatched(oEvent) {
        var oArgs, oView;
        oArgs = oEvent.getParameter("arguments");
        oView = this.getView();
        
        idToPreview = oArgs.previewId;

        console.log(idToPreview);


        oView.bindElement({
          path: "/PS_DETAILS(" + idToPreview + ")",
        });

        this.associated();

      },

      associated: function () {

        var oModel = this.getOwnerComponent().getModel();

        console.log(oModel);
        // debugger;

        oModel.read("/PS_DETAILS(" + idToPreview + ")", {
          urlParameters: {
            "$expand": "PS_MAIN_SECTION"
        },

      

          method: "GET",
          success: function (response) {
          //  debugger;
            console.log(response);
            console.log("Title for Main Section "+response.PS_MAIN_SECTION.results[0].title);
            console.log("ID for Main Section "+response.PS_MAIN_SECTION.results[0].id);
            console.log("Description for Main Section "+response.PS_MAIN_SECTION.results[0].description);


            var descriptiondata = atob(response.PS_MAIN_SECTION.results[0].description);

            console.log(descriptiondata);

           

            

            

            var mainSectionData = {
              id : response.PS_MAIN_SECTION.results[0].id,
              title : response.PS_MAIN_SECTION.results[0].title || null,
              description:descriptiondata || null,
              section_image :response.PS_MAIN_SECTION.results[0].section_image ,

            }

            console.log("title data",mainSectionData.title);
            console.log(mainSectionData);

            // debugger;

            var imgData = mainSectionData.section_image;

            console.log(imgData);

            var imageUrl = "data:image/jpeg;base64," + imgData;

            console.log("Image Data : " + imageUrl);
 
            // Set the image source in the Image control
            var oImage = this.getView().byId("imagePreview");
            oImage.setSrc(imageUrl);


            var description = descriptiondata;

            
 
            console.log("img", imgData);

            var oModel = new sap.ui.model.json.JSONModel();
 
            oModel.setData(mainSectionData);
            this.getView().setModel(oJSON, "dataFromDB");
            // oJSON1.setData(subData);
            // this.getView().setModel(oJSON, "ven1");
 
          }.bind(this),
          error: function (error) {
            console.error("Error fetching image data:", error);
          },
        });


      }
    },


    );
    
  }
);
