sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
    "sap/m/MessageBox",
    "sap/m/MessageToast"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Filter, FilterOperator,Fragment,MessageBox,MessageToast) {
        "use strict";
        return Controller.extend("ns.carshows.controller.carShows", {
            onInit: function () {
                // this.onRead();
            },
            onFilterCar(oEvent) {
                // build filter array
                const aFilter = [];
                const sQuery = oEvent.getParameter("query");
                if (sQuery) {
                    aFilter.push(new Filter("carName", FilterOperator.Contains, sQuery));
                }
    
                // filter binding
                const oList = this.byId("_IDGenTable1");
                const oBinding = oList.getBinding("items");
                oBinding.filter(aFilter);
            },
        //     onRead:function(){
        //     var oModel=this.getOwnerComponent().getModel();
        //     var oJSONModel=new sap.ui.model.json.JSONModel();
        //     var oBusyDialog= new sap.m.BusyDialog({
        //         title:"Loading data",
        //         text:"please wait......."
        //     });
        //     oBusyDialog.open();
        //     oModel.read("/Car",{
        //         success:function(response){
        //             oBusyDialog.close();
        //             oJSONModel.setData(response.results);
        //             this.getView().setModel(oJSONModel,"ca");
        //         }.bind(this),
        //         error:function(error){
        //             oBusyDialog.close();
        //         }
        //     })
        // },
            onPress(oEvent) {
                // var oItem = oEvent.getSource(); //Get the Selected Item
                // var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
               
                var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
                var SelectedItem=oEvent.getSource().getBindingContext().getProperty("Id");
                oRouter.navTo("detail", { invoicePath: SelectedItem });
                },

                // for create
                onAdd:function(){
                    this.getOwnerComponent().getRouter().navTo("createView");
                },
                  //create
                  onSave:function(){
                    console.log("hai");
                    var payload ={
                        Id:this.getView().byId("_IDLabel1").getValue(),
                        carName:this.getView().byId("_IDLabel2").getValue(),
                        manufactureDate:this.getView().byId("_IDLabel3").getValue()
                    };
                    console.log("hai");
                    var oModel=this.getView().getModel();
                    oModel.create("/Car",payload,{
                        method:"POST",
                        success:function(response){
                            MessageBox.show("New car is added",MessageBox.Icon.SUCCESS,"car is added..!");
                            this.clearForm();
                        },
                        error:function(error){
                            MessageBox.show("some error is occured",MessageBox.Icon.ERROR,"oops error..!");
                            this.clearForm();
                        }
                    });
                },
                 //pop up open
                 onOpenDialog() {
                    console.log("hai")
                    // create dialog lazily
                    this.pDialog ??= this.loadFragment({
                      name: "ns.carshows.view.AddFragement",
                    });
                    this.pDialog.then((oDialog) => oDialog.open());
                  },
                  onOpenUpdateDialog(oEvent) {
                    console.log("hai update")
                    this.carId=oEvent.getSource().getBindingContext().getProperty("Id");
                    console.log(this.carId);
                    // create dialog lazily
                    this.pDialog ??= this.loadFragment({
                      name: "ns.carshows.view.UpdateFragement",
                    });
                    this.pDialog.then((oDialog) => oDialog.open());
                  },
                   //pop up close
                   onCloseDialog: function () {
                    console.log("hai");
                    this.byId("AddcarDialog").close();
                    window.location.reload();
                    this.clearForm();
                  },
                    //pop up close
                    onCloseUpdateDialog: function () {
                        console.log("hai");
                        this.byId("UpdatecarDialog").close();
                        window.location.reload();
                        this.clearForm();
                      },
                  //clearing the form
                  clearForm:function(){
                    this.getView().byId("_IDLabel1").setValue(""),
                    this.getView().byId("_IDLabel2").setValue(""),
                    this.getView().byId("_IDLabel3").setValue("")
                  },
                  //edit
                  onUpdate:function(){
                    // this.onOpenDialog()
                    // var carId=oEvent.getSource().getBindingContext().getProperty("Id");
                    console.log(this.carId);
                    // var carN=oEvent.getSource().getBindingContext().getProperty("carName");
                    // var carM=oEvent.getSource().getBindingContext().getProperty("manufactureDate");
                    // console.log(carId);
                    // console.log(carN);
                    // console.log(carM);
                    var payload ={
                        // Id:this.getView().byId("_IDLabel1").getValue(),
                        carName:this.getView().byId("_IDLabel2").getValue(),
                        manufactureDate:this.getView().byId("_IDLabel3").getValue()
                    };
                    // this.getView().getModel().byId("_IDLabel1").setData(this.carId);
                    console.log("hai");
                    var oModel=this.getView().getModel();
                    oModel.update("/Car("+this.carId+")",payload,{
                        method:"UPDATE",
                        success:function(response){
                            MessageToast.show("car is successfully updated");
                            this.clearForm();
                        },
                        error:function(error){
                            MessageToast.show("some error is occured");
                            this.clearForm();
                        }
                    });
                },
                  //deleting
                  onDelete:function(oEvent){
                    console.log("hai");
                    var carId=oEvent.getSource().getBindingContext().getProperty("Id");
                    console.log(carId);
                    var oModel=this.getView().getModel();
                    oModel.remove("/Car("+carId+")",{
                        method:"delete",
                        success:function(response){
                            MessageToast.show("car is successfully deleted");
                        }.bind(this),
                        error:function(error){
                            MessageToast.show("some error is occured");

                        }
                    });
                  },
                  onChange:function(oEvent){
                    var carLanguage=oEvent.getParameter("selectedItem").getKey();
                    sap.ui.getCore().getConfiguration().setLanguage(carLanguage);
                  }
        });
    });
