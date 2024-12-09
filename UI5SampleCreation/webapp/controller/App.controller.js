sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel"
],function (Controller,MessageToast,JSONModel,ResourceModel){
    // "use strict";
    return Controller.extend("ui5.walkthrough.App",{

        // onInit : function(){
        //     var oData={
        //         recipient:{
        //             name: "Nitishraj"
        //         }
        //     };
        //     var oModel=new JSONModel(oData);
        //     this.getView().setModel(oModel);

        //     var i18nModel=new ResourceModel({
        //         bundleName  :   "ui5.walkthrough.i18n.i18n",
        //         supportedLocales :   [""],
        //         fallbackLocale  :   ""
        //     })
        //     //i18n is alias name for i18nModel
        //     this.getView().setModel(i18nModel,"i18n")
        // },

        // onShowMe : function(){
        //     //reading message from i18n.properties file
            
   
        //     var oBundle=this.getView().getModel("i18n").getResourceBundle();
        //     var sRecipient=this.getView().getModel().getProperty("/recipient/name");
        //     var sMsg=oBundle.getText("showMessage",[sRecipient]);
        //     alert("We will make it")
        //     // MessageToast.show("Toasted");
        //     MessageToast.show(sMsg);
        // }
    })
})