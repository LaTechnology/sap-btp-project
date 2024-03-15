sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/routing/History"

], function (Controller,MessageToast,History) {
    "use strict";

    return Controller.extend("ns.propose.controller.ClientUpdateForm", {
        onInit: function () {
            var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("clientUpdateForm").attachMatched(this.onObjectMatched, this); //Attach Router Pattern      
        },
        onObjectMatched(oEvent) {
            var oArgs,oView;
            oArgs=oEvent.getParameter("arguments");
            oView=this.getView();
            console.log(oArgs.SelectedItem);
            oView.bindElement({
              path:"/ProposalCustomer("+oArgs.SelectedItem+")"
          });
  
          },

          onNextClientDetails: function () {
            // Move to the "Contact Detail" tab in the IconTabBar
            this.getView().byId("iconTabBar").setSelectedKey("contactTab");
        },
        onNextContact1Details: function () {
            
            this.getView().byId("iconTabBar").setSelectedKey("contactTab1");
        },
        onNextContact2Details: function () {
            
            this.getView().byId("iconTabBar").setSelectedKey("contactTab2");
        },
        onbackClientDetails:function(){
            this.getView().byId("iconTabBar").setSelectedKey("contactTab3");
        },
        onbackClient1Details:function(){
            this.getView().byId("iconTabBar").setSelectedKey("contactTab");

        },
        onbackClient2Details:function(){
           this.getView().byId("iconTabBar").setSelectedKey("contactTab1");

        },

        onUpdate : function(){
            var oModel = this.getView().getModel();
            var that = this;
            var sID=this.getView().byId("id").getValue()
                console.log(oModel);
                var oEntry = {
                   
                   id: this.getView().byId("id").getValue(),
                   name: this.getView().byId("name").getValue(),
                  // logo: this.getView().byId("logo").getValue()
                  website:this.getView().byId("website").getValue()
                };
                console.log(oEntry);
                oModel.update("/ProposalCustomer("+sID+")",oEntry,{
                    method: "UPDATE",
                    success: function () {
                        MessageToast.show("Added Successfully");
                        var proposalClientId = this.getView().byId("id").getValue();
                        console.log(proposalClientId);
                        var oEntrydetails = {
                          id: this.getView().byId("ID").getValue(),
                          addressLine1: this.getView().byId("addressLine1").getValue(),
                          addressLine2: this.getView().byId("addressLine2").getValue(),
                          addressLine3: this.getView().byId("addressLine3").getValue(),
                          city: this.getView().byId("city").getValue(),
                          pincode: this.getView().byId("pincode").getValue(),
                          state: this.getView().byId("state").getValue(),
                          country: this.getView().byId("country").getValue(),
                          contact_person_1_mobileNumber: this.getView().byId("contact_person_1_mobileNumber").getValue(),
                          contact_person_1_telephoneNumber: this.getView().byId("contact_person_1_telephoneNumber").getValue(),
                          contact_person_1_emailId: this.getView().byId("contact_person_1_emailId").getValue(),
                          contact_person_2_mobileNumber: this.getView().byId("contact_person_2_mobileNumber").getValue(),
                          contact_person_2_telephoneNumber: this.getView().byId("contact_person_2_telephoneNumber").getValue(),
                          contact_person_2_emailId: this.getView().byId("contact_person_2_emailId").getValue(),
                          PS_CUSTOMER_ORG_id: proposalClientId
                        };
                        console.log(oEntrydetails);
                oModel.update("/ProposalCustomerContact",oEntrydetails,{
                    method: "UPDATE",
                    success: function () {
                        MessageToast.show(" contact Added Successfully");
                    }
                    });
                }.bind(this)
                });


        },
        onView:function(){
            var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
            var id=this.getView().byId("id").getValue();
            console.log(id);
            oRouter.navTo("clientView",{
                clientId: id
            });
        },
        goHome:function(){
            var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("Routepropose");
        },
        updateToEdit:function(){
			const oHistory = History.getInstance();
			const sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				const oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("clientViewEdit", {}, true);
			}
        }
     
    });
});
