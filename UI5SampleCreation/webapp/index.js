sap.ui.define([

    "sap/m/Text",
    "sap/ui/core/mvc/XMLView",
    "sap/ui/core/ComponentContainer"
    
],function(Text,XMLView,ComponentContainer){
    "use strict";
    // alert("Alert ah iruda");

    // new Text({
    //     text:"Anti-Girls followers!"
    // }).placeAt("content");

    // XMLView.create({
    //     viewName: "ui5.walkthrough.view.App"
    // }).then(function (oview){
    //     oview.placeAt("content");
    // })

    new ComponentContainer({
        name:"ui5.walkthrough",
        settings:{
            id:"componentwalking"
        },
        async:true,

    }).placeAt("content")
    // return Controller.extend("sap.ui5.walkthrough.Controller.App",{
    //     onShowMe : function(){
    //         alert("Smile like a star")
    //     }
    // });
    
});