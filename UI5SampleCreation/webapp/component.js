sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel"
],function(UIComponent,JSONModel,ResourceModel){
    // "use strict";

    return UIComponent.extend("ui5.walkthrough.Component",{
        metadata:{
            // rootView:{
            //     "viewName" : "ui5.walkthrough.view.App",
            //     "type":"XML",
            //     "async":true,
            //     "id":"app"  
                
            // }
            interfaces: ["sap.ui.core.IAsyncContentCreation"],
            manifest:"json"
        },
        init : function(){
            //call the init function of parent
            UIComponent.prototype.init.apply(this,arguments)

            //set data models here instead of in controller
            var oData={
                recipient:{
                    name:"Nitishraj R"
                }
            }
            var oModel=new JSONModel(oData)
            this.setModel(oModel);

            //set i18n model here instead of in controller
            // var i18nModel=new ResourceModel({
            //     bundleName:"ui5.walkthrough.i18n.i18n",
            //     supportedLocales:[""],
            //     fallbackLocale:""
            // })
            // this.setModel(i18nModel,"i18n")

            // create the views based on the url/hash
			this.getRouter().initialize();
        }
    })
})