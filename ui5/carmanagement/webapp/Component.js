sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel"
 ], (UIComponent, JSONModel, ResourceModel) => {
    "use strict";
 
    return UIComponent.extend("carmanagement.Component", {
      metadata : {
         interfaces: ["sap.ui.core.IAsyncContentCreation"],
         manifest: "json"
      },
 
       init() {
          // call the init function of the parent
          UIComponent.prototype.init.apply(this, arguments);
          // set data model
          const oData={
            recipient:{
            name:"india"
        }
          };
          const oModel = new JSONModel(oData);
          this.setModel(oModel);

          			// create the views based on the url/hash
			this.getRouter().initialize();
 
          // set i18n model
          const i18nModel = new ResourceModel({
             bundleName: "carmanagement.i18n.i18n"
          });
          this.setModel(i18nModel, "i18n");
       }
    });
 });
 