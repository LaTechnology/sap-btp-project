sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/Input", "sap/m/MessageToast",
    "sap/ui/richtexteditor/RichTextEditor", "sap/m/MessageBox", "sap/m/Dialog", "sap/m/Button",
    "sap/ui/richtexteditor/library", "sap/ui/model/json/JSONModel", 'sap/base/util/uid'],

  function (Controller, Input, MessageToast, RichTextEditor, MessageBox, Dialog, Button, JSONModel, library, uid) {
    "use strict";

    function debounce(func, delay) {
      let timer;
      return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(context, args);
        }, delay);
      };
    }



    var parentId;
    var mergeDatas;
    var templateid;

    var mainsectionArray = [];

    var subsectionArray = [];

    var nextsteptext;

    var sectiontitle;

    var testdata = [];

    var imageUploadArrayForMainSections = [];

    var imageUploadArrayForSubSections = [];

    function generateMainSectionId() {
      return Math.floor(Math.random() * 1000000) + 1;
    }

    var createdMainSectionIds = [];

    var mainsectionsaveddata;

    return Controller.extend("ns.propose.controller.ProposalForm", {

      _sectionTitle: 1,
      _mainSectionId: 1000,
      _SubSectionId: 1,
      _mainSections: [], // Array to store Main Section data
      _subsection: 1,
      _subSections: [],
      _imagecount: 0,
      _inputString: "",
      _subSectionCounter: 2000,
      _sectionCounters: {},
      _table: 1,
      _tableitem: 1,
      textitem: 1,
      _uploadedImages: [],

      onInit: function () {

        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.getRoute("ProposalCreation").attachMatched(this.onObjectMatched, this);

        this._tableitem = 1;
        this._sectionTitle = 1;
        this._mainSectionId = 1000;
        this._mainSections = [1];
        this._subSections = [1];
        this._subsection1 = 1;
        this._subsection = [1];
        this._SubSectionId = 1;
        this._imagecount = 0;
        this._subSectionCounter = 2000;
        this._sectionCounters = {};
        this._setInitialSectionTitle();
        this._table = 1;
        this.textitem = 1;
        this._uploadedImages;

      },

      onObjectMatched(oEvent) {

        var oArgs, oView;

        oArgs = oEvent.getParameter("arguments");
        oView = this.getView();

        templateid = oArgs.templatedataid;

        console.log(templateid);

        // debugger;

      },


      _setInitialSectionTitle: function () {


        sectiontitle = true;



        var that = this;
        // Generate a unique ID for the new Input field
        var wizard = this.getView().byId("wizard");
        var currentStep = wizard.getProgressStep(); // -1 or 0
        var allSteps = wizard.getSteps();
        var currentStepIndex = allSteps.indexOf(currentStep); // Adding 1 since steps are usually 1-indexed
        var inputId = 'Section-Input-' + this._sectionTitle++;
        this._titleSubInputCounter = 0;
        this._titleSubInputCounter++;

        that._InitialSectionTitle = true;

        if (currentStepIndex === -1) {
          currentStepIndex++;
        }

        // Store the generated ID in the controller property
        this._SubSectionId = inputId;

        console.log("Current Step Index: " + currentStepIndex);
        console.log("Generated Input ID: " + inputId);

        var container = new sap.m.VBox();

        // Create a Label for bold text
        var boldLabel = new sap.m.Label({
          text: inputId,
          design: 'Bold',
        });

        // Create a new Input field with the generated ID
        var inputField = new sap.m.Input({
          id: inputId,
          placeholder: 'Enter your title...',
          width: '80%',
        });

        // Add the Label and Input field to the VBox
        container.addItem(boldLabel);
        container.addItem(inputField);

        // Create a new ColumnListItem with the VBox
        var row = new sap.m.ColumnListItem({
          cells: [container],
        });

        // Get the table and add the new row
        var idFrame = that.getView().byId('idFrame' + currentStepIndex);

        console.log(idFrame);

        if (idFrame) {
          idFrame.addItem(row);

          // Make the Input field visible
          inputField.setVisible(true);

          // Add the input ID to the array for later reference
          this._mainSections.push(inputId);

          console.log("Section added successfully.");
        } else {
          console.error("idFrame not found for step " + currentStepIndex);
        }
      },

      // onAddRowTextArea: function (isMainSection) {
      //   var that = this;
      //   var wizard = that.getView().byId("wizard");
      //   var currentStep = wizard.getProgressStep();
      //   var currentStepIndex = wizard.getSteps().indexOf(currentStep);
      //   var textItemId = "Text-" + that.textitem++;

      //   console.log(textItemId);

      //   // Check if idFrame exists in the view
      //   var idFrame = that.getView().byId("idFrame" + currentStepIndex);

      //   console.log(idFrame);

      //   if (idFrame) {
      //     var richTextEditor = new sap.ui.richtexteditor.RichTextEditor({
      //       id: textItemId,
      //       width: "100%",
      //       editorType: sap.ui.richtexteditor.EditorType.bIsTinyMCE5,
      //       showGroupFont: true,
      //       showGroupLink: true,
      //       showGroupInsert: true,
      //       showGroupClipboard: true,
      //       showGroupUndo: true,
      //       showGroupTextAlign: true,
      //       showGroupFontStyle: true,
      //     }).addStyleClass("myRichTextEditor");

      //     var row = new sap.m.ColumnListItem({
      //       cells: [richTextEditor],
      //     });

      //     idFrame.addItem(row);

      //     if (!that._mainSectionTextArray) {
      //       that._mainSectionTextArray = [];
      //     }
      //     else {
      //       that._subSectionTextArray = [];
      //     }

      //     // Attach the event listener for saving base64 content on change
      //     richTextEditor.attachChange(function (oEvent) {
      //       var editorContent = richTextEditor.getValue();
      //       var base64Content = btoa(editorContent);

      //       if (isMainSection) {
      //         // Save main section text as an array
      //         that._mainSectionTextArray.push(base64Content);
      //         console.log(
      //           "Main Section Text Array:",
      //           that._mainSectionTextArray
      //         );
      //       } else {
      //         // Save subsection text as an array
      //         that._subSectionTextArray.push(base64Content);
      //         console.log("Sub Section Text Array:", that._subSectionTextArray);
      //       }
      //     });

      //     console.log("Rich Text Area added successfully");
      //   } else {
      //     console.error("idFrame not found for step " + currentStepIndex);
      //     // Handle the situation when idFrame is not found
      //     // Display an error message or take alternative actions
      //   }
      // },


      onAddRowTextArea: function () {
        var that = this;
        var wizard = that.getView().byId("wizard");
        var currentStep = wizard.getProgressStep();
        var currentStepIndex = wizard.getSteps().indexOf(currentStep);
        var textItemId = "Text-" + that.textitem++;

        console.log(textItemId);

        // Check if idFrame exists in the view
        var idFrame = that.getView().byId("idFrame" + currentStepIndex);

        console.log(idFrame);

        if (idFrame) {
          var richTextEditor = new sap.ui.richtexteditor.RichTextEditor({
            id: textItemId,
            width: "100%",
            editorType: sap.ui.richtexteditor.EditorType.bIsTinyMCE5,
            showGroupFont: true,
            showGroupLink: true,
            showGroupInsert: true,
            showGroupClipboard: true,
            showGroupUndo: true,
            showGroupTextAlign: true,
            showGroupFontStyle: true,
          }).addStyleClass("myRichTextEditor");

          var row = new sap.m.ColumnListItem({
            cells: [richTextEditor],
          });

          idFrame.addItem(row);


          // Attach the event listener for saving base64 content on change
          richTextEditor.attachChange(function (oEvent) {
            var editorContent = richTextEditor.getValue();
            var base64Content = btoa(editorContent);

            if (sectiontitle) {

              // Save main section text as an array
              mainsectionArray.push(base64Content);
              console.log("Main Section Text Array:", mainsectionArray);
              // debugger;

            } else {

              // Save subsection text as an array
              subsectionArray.push(base64Content);
              console.log("Sub Section Text Array:", subsectionArray);
            }

            // debugger;

            // debugger;
          });


          console.log("Rich Text Area added successfully");
        } else {
          console.error("idFrame not found for step " + currentStepIndex);
          // Handle the situation when idFrame is not found
          // Display an error message or take alternative actions
        }
      },










      onSubSection: function () {

        sectiontitle = false;

        var that = this;
        var wizard = that.getView().byId("wizard");
        var currentStep = wizard.getProgressStep();
        var currentStepIndex = wizard.getSteps().indexOf(currentStep);
        var idFrame = that.getView().byId('idFrame' + currentStepIndex);

        // that._addingMainSectionContent = false;


        that._addingImageForSubSection = true;

        that._subSectionTextArea = true;

        that._addingTextArea = true;

        if (currentStepIndex >= 0) {
          console.log("current Step  :" + currentStepIndex);

          // Increment the subsection counter
          if (!this._sectionCounters[currentStepIndex]) {
            this._sectionCounters[currentStepIndex] = 1;
          } else {
            this._sectionCounters[currentStepIndex]++;
          }

          // Generate a unique ID for the new Input field
          var inputId = 'SubSection_' + (currentStepIndex + 1) + '.' + this._sectionCounters[currentStepIndex];

          console.log(inputId);

          var container = new sap.m.VBox();

          // Create a Label for bold text
          var boldLabel = new sap.m.Label({
            text: inputId,
            design: 'Bold',
          });

          // Create a new Input field with the generated ID
          var inputField = new sap.m.Input({
            id: inputId,
            placeholder: 'Enter your title...',
            width: '80%',
          });

          // Check if idFrame exists in the view
          if (idFrame) {
            // Add the Label and Input field to the VBox
            container.addItem(boldLabel);
            container.addItem(inputField);

            // Create a new ColumnListItem with the VBox
            var row = new sap.m.ColumnListItem({
              cells: [container],
            });

            // Get the table and add the new row
            idFrame.addItem(row);

            // Make the Input field visible
            inputField.setVisible(true);

            // Add the input ID to the array for later reference
            this._subSections.push(inputId);
          } else {
            console.error("idFrame not found for SubSection");
          }
        }

        console.log("moving to the next step");

        var subsectionId = inputId;

      },

      onSave: function () {
        var that = this;
        var wizard = that.getView().byId("wizard");

        MessageBox.show("Do you need to save all the provided details?", {
          icon: MessageBox.Icon.QUESTION,
          title: "Complete Steps",
          actions: [MessageBox.Action.YES, MessageBox.Action.NO],
          onClose: function (oAction) {
            if (oAction === MessageBox.Action.YES) {
              console.log("clicked yes");
              that
                .saveMainAndSubSections()
                .then(function (result) {
                  // Handle the result if needed
                  console.log(
                    "Main and Subsections saved successfully:",
                    result
                  );
                  console.log("moving to next step");
                  console.log(result);
                })
                .catch(function (error) {
                  console.error("Error saving data:", error);
                });

              // User clicked "Yes", perform completion logic
            } else {
              console.log("clicked no");
              // User clicked "No", do nothing or handle as needed
            }
          },
        });

        console.log("length of mainsection data is ------ " + mainsectionArray.length);
      },

      saveMainAndSubSections: function () {

        // var userInfo = this.getUserInfo();
        // if (!userInfo) {
        //   console.error("User information not available.");
        //   return;
        // }

        console.log(mainsectionArray);

        var that = this;
        var oModel = this.getView().getModel();
        var createdMainSectionIds = [];
        var createdSubSectionIds = [];
        var valueofi = 1;
        var i = 0;
        var j = 0; // Declare j here
        var y = 0;

        // var htfd = this.getView().getModel().getProperty("/PS_MAIN_SECTION");

        // var templateId = this.getView().byId("projectId").getValue();

        var busyDialog = new sap.m.BusyDialog({
          title: "Please wait",
          text: "Saving data...",
          showCancelButton: false,
        });
        busyDialog.open();

        var timeoutThreshold = 10000;

        var startTime = new Date().getTime();


        // Save main sections
        return Promise.all(
          this._mainSections.map((mainSectionId, index) => {
            var mainSectionInput = sap.ui.getCore().byId(mainSectionId);

            if (mainSectionInput) {

              // var mainSectionText = mainsectionArray.filter(function (element,i)

              //   {

              //   if (i%2==0 && i%2==1) {
              //     testdata.push(element);
              //     return true;


              //   } else {
              //     return false;
              //   }


              // });



              // debugger;

              console.log(testdata);

              console.log("Length of main section array : " + testdata.length);



              // var ImageTextArea=[];
              // var imageArea = imageuploadarray.filter(function(element,i){


              //   if (i%2==0){

              //     ImageTextArea.push(element);
              //     return true;

              //   } else {
              //     return false;
              //   }

              // });

              var promises = [];
              valueofi++;

              for (i; i < imageUploadArrayForMainSections.length || i < mainsectionArray.length; i++) {
                var mainSectionData = {
                  // id: this._mainSectionId++,
                  id: generateMainSectionId(),
                  title: mainSectionInput.getValue(),
                  section_image: imageUploadArrayForMainSections[i] || null,
                  description: mainsectionArray[i] || null,
                  PS_DETAILS_id: templateid,
                  // createdBy: userInfo.userId,
                  createdAt: new Date(),
                  // modifiedBy: userInfo.userId,
                  modifiedAt: new Date(),
                };

                console.log(mainSectionData);

                // debugger;

                var promise = new Promise(function (resolve, reject) {
                  oModel.create("/PS_MAIN_SECTION", mainSectionData, {
                    method: "POST",
                    success: function (data, response) {
                      MessageToast.show("Main Section Added Successfully");
                      createdMainSectionIds.push(mainSectionData.id);

                      console.log(createdMainSectionIds);
                      // Store mainSectionData in session storage
                      var decodedtext = atob(mainSectionData.description);
                      // var decodedimage = atob(mainSectionData.imagearea);

                      var sourceJson = {
                        key1: mainSectionData.id,
                        key2: mainSectionData.section_image,
                        //key2: decodedimage,
                        key3: decodedtext,
                        key4: mainSectionData.title,
                      };

                      var elapsedTime = new Date().getTime() - startTime;
                      if (elapsedTime > timeoutThreshold) {
                        MessageToast.show("Saving is taking longer than usual. Please wait.");
                      }

                      var imgData = sourceJson.key2;

                      console.log("decoded data", sourceJson);

                      console.log("image data", imgData);

                      sessionStorage.setItem(
                        "mainSectionData",
                        JSON.stringify(sourceJson)
                      );


                      resolve();
                      mergeDatas = mainSectionData;
                      // mainDatas = mainSectionData;
                      console.log("main datas", mergeDatas);
                    },
                    error: function (error) {
                      reject(error);
                    },
                  });
                });
                //preview button enable link
                // this.getView().byId("_IDGenButtn2").setVisible(true);



                console.log("main section data", mainSectionData);

                promises.push(promise);
                break;
              }

              i++;
              return Promise.all(promises);
            }

            // debugger;
          })
        )
          .then(function () {




            // Save subsections
            return Promise.all(
              that._subSections.map((subSectionId, index) => {
                var subSectionInput = sap.ui.getCore().byId(subSectionId);

                var mainSectionInput = createdMainSectionIds;

                console.log(mainSectionInput);
                // debugger;

                if (subSectionInput && mainSectionInput) {
                  // var testdatasub = [];
                  // var subSectionText = subsectionArray.filter(
                  //   function (element, i) {
                  //     if (i) {
                  //       testdatasub.push(element);
                  //       return true;
                  //     } else {
                  //       return false;
                  //     }
                  //   }
                  // );

                  //             var ImageTextAreaSub=[];
                  // var imageArea = imageuploadarray.filter(function(element,i){


                  //   if (i%2==1){

                  //     ImageTextAreaSub.push(element);
                  //     return true;

                  //   } else {
                  //     return false;
                  //   }

                  // });


                  var promises = [];

                  for (y = y; y < mainSectionInput.length; y++) {
                    for (j; j < subsectionArray.length || j < imageUploadArrayForSubSections.length; y++) {
                      var subSectionData = {
                        // id: that._subSectionCounter++,
                        id: generateMainSectionId(),
                        sub_title: subSectionInput.getValue(),
                        PS_MAIN_SECTION_id: mainSectionInput[y], // Corrected usage
                        sub_description: subsectionArray[y] || null,
                        sub_section_image: imageUploadArrayForSubSections[j],
                        createdBy: null,
                        createdAt: null,
                        modifiedBy: null,
                        modifiedAt: null,
                      };

                      // debugger;

                      var promise = new Promise(function (resolve, reject) {
                        oModel.create("/PS_SUB_SECTION", subSectionData, {
                          method: "POST",
                          success: function (data, response) {
                            MessageToast.show(
                              "Main and Subsection Added Successfully in DB "
                            );
                            createdSubSectionIds.push(subSectionData.id);


                            resolve();
                          },
                          error: function (error) {
                            reject(error);
                          },
                        });
                      });
                      //  subDatas=subSectionData;
                      console.log("subsection data", subSectionData);
                      var decodedtext = atob(subSectionData.sub_description);
                      var subTitle = subSectionData.sub_title;


                      var sourceSubJson = {
                        id: subSectionData.id,
                        key2: subSectionData.sub_section_image,
                        //key2: decodedimage,
                        decodedtextkey3: decodedtext,
                        subSectiontitle: subTitle,
                      };
                      var imagedataforsub = sourceSubJson.key2

                      console.log("sub image data", imagedataforsub);



                      console.log("sub data:", sourceSubJson);
                      sessionStorage.setItem(
                        "subSectionData",
                        JSON.stringify(sourceSubJson)
                      );

                      // console.log("data",datas);
                      promises.push(promise);
                      promises.push(promise);
                      break;
                    }

                    j++; // Increment j for next iteration
                    y++;
                    mainSectionInput++;
                    return Promise.all(promises);
                  }
                }

                //  console.log("ex main datas", mainDatas);
              })
            );
          })
          .then(function () {



            busyDialog.close();

            that.getView().byId("_IDGenButtn2").setVisible(true);

            // that.getView().byId("onPreview").setEnabled(true);

            return {
              createdMainSectionIds: createdMainSectionIds,
              createdSubSectionIds: createdSubSectionIds,
            };
          })
          .catch(function (error) {
            busyDialog.close();
            console.error("Error saving data:", error);
          });
      },


      addSectionLabel: function (stepTitle, wizard) {

        // Extract the step number from the title
        var stepNumber = parseInt(stepTitle.replace("Step ", ""));

        var inputId = 'Section_' + (stepNumber < 10 ? '0' : '') + stepNumber;

        console.log(inputId);

        var container = new sap.m.VBox();

        // Create a Label for bold text
        var boldLabel = new sap.m.Label({
          text: "Section: " + inputId,
          design: 'Bold',
        });

        // Create a new Input field with the generated ID
        var inputField = new sap.m.Input({
          id: inputId,
          placeholder: 'Enter your title...',
          width: '80%',
        });

        // Add the Label and Input field to the VBox
        container.addItem(boldLabel);
        container.addItem(inputField);

        // Create a new ColumnListItem with the VBox
        var row = new sap.m.ColumnListItem({
          cells: [container],
        });

        // Get the table and add the new row
        var tableId = 'idFrame' + stepNumber;
        var idFrame = wizard.byId(tableId);

        if (idFrame) {
          idFrame.addItem(row);

          // Make the Input field visible
          inputField.setVisible(true);

          // Add the input ID to the array for later reference
          this._mainSections.push(inputId);
        }
      },


      onStepChanged: function (oEvent) {
        var wizard = oEvent.getSource();
        var currentStep = wizard.getProgressStep();
        if (currentStep >= 11) {
          console.error("Error: Current step exceeds the limit of 10");

        } else {
          // Call your function for initializing section title
          this._setInitialSectionTitle();
        }
      },

      onContinue: function () {
        // Handle "Next" button press logic here
        this.onNext();
      },

      onNext: function () {

        nextsteptext = true;
        // Handle navigation to the next step logic here
        var wizard = this.getView().byId("wizard");
        console.log("Moving to Next Step");
        wizard.nextStep();
      },

      onComplete: function () {

        MessageBox.show("Do you need to complete the steps?", {
          icon: MessageBox.Icon.QUESTION,
          title: "Complete Steps",
          actions: [MessageBox.Action.YES, MessageBox.Action.NO],
          onClose: function (oAction) {
            if (oAction === MessageBox.Action.YES) {
              console.log("clicked yes");
            } else {
              console.log("clicked no");
              // User clicked "No", do nothing or handle as needed
            }
          }
        });
      },

      onUploadComplete: function (oEvent) {

        var response = oEvent.getParameter("response");
        MessageBox.success("File upload complete. Response: " + response);
      },

      onTypeMissmatch: function (oEvent) {
        MessageBox.error("Selected file type does not match the allowed file types");
      },

      onFileSizeExceed: function (oEvent) {
        MessageBox.error("File size exceeds the maximum allowed size");
      },

      onAddImage: function () {
        var that = this;
        var wizard = that.getView().byId("wizard");
        var currentStep = wizard.getProgressStep();
        var currentStepIndex = wizard.getSteps().indexOf(currentStep);
        var idFrame = that.getView().byId('idFrame' + currentStepIndex);
        var inputId = 'Image' + this._imagecount++;

        // var imageuploadarray =[];

        console.log(inputId);
        var container = new sap.m.VBox();

        // Create a Label for bold text
        var boldLabel = new sap.m.Label({
          text: inputId,
          design: 'Bold',
        });
        // Create a new FileUploader with the generated ID
        var fileUploader = new sap.ui.unified.FileUploader({
          id: inputId,
          placeholder: 'Upload Image',
          width: '80%',
          fileType: "png,jpg,jpeg",
          change: that.onChangeDP.bind(that),
          uploadComplete: that.onUploadComplete.bind(that),
          typeMissmatch: that.onTypeMissmatch.bind(that),
          fileSizeExceed: that.onFileSizeExceed.bind(that)
        });

        // Check if idFrame exists in the view
        var idFrame = that.getView().byId('idFrame' + currentStepIndex);
        if (idFrame) {
          // Add the Label and Input field to the VBox
          container.addItem(boldLabel);
          container.addItem(fileUploader);

          // Create a new ColumnListItem with the VBox
          var row = new sap.m.ColumnListItem({
            cells: [container],
          });

          // Get the table and add the new row
          idFrame.addItem(row);

          // Make the Input field visible
          fileUploader.setVisible(true);


          // Store the uploaded images in an array
          fileUploader.attachChange(function (oEvent) {
            var file = oEvent.getParameter("files")[0];
            var reader = new FileReader();
            reader.onload = function (e) {
              var imageData = e.target.result;
              // Add the image data to your array
              // that._uploadedImages.push(imageData);

              // imageuploadarray.push(imageData);
              // console.log("Uploaded images:", imageuploadarray);
            };
            reader.readAsDataURL(file);
          });
        } else {
          console.error("idFrame not found for SubSection");
        }
      },

      onChangeDP: function (oEvent) {
        var that = this;
        var image = new Image();
        var file = oEvent.getParameter("files")[0];
        var reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = function () {
          var data = reader.result;

          var inputString = data;
          console.log(inputString);

          var wordsToRemove = ["data:image/png;base64,", "data:text/plain;base64,", "data:image/jpeg;base64,",
            "data:audio/mpeg;base64,", "data:application/vnd.ms-excel;base64,", "data:video/mp4;base64,"];
          var replacement = "";
          var regexPattern = new RegExp(wordsToRemove.join('|'), 'gi');
          var resultString = inputString.replace(regexPattern, replacement);

          if (resultString && sectiontitle) {

            imageUploadArrayForMainSections.push(resultString);
            console.log("Image Array for MainSection ", imageUploadArrayForMainSections);
            console.log("Number of images stored in Main:", imageUploadArrayForMainSections.length);

          } else if (resultString && !sectiontitle) {

            imageUploadArrayForSubSections.push(resultString);
            console.log("Image Array for SubSection ", imageUploadArrayForSubSections);
            console.log("Number of images stored in Sub:", imageUploadArrayForSubSections.length);
          }

          //         if (sectiontitle ) {

          //           // Save main section text as an array
          //           imageUploadArrayForMainSections.push(resultString);
          //           console.log("Main Section Image's:", mainsectionArray);
          // // debugger;

          //       } else {

          //           // Save subsection text as an array
          //           imageUploadArrayForSubSections.push(resultString);
          //           console.log("Sub Section Image's:", subsectionArray);
          //       }

          // var base64Data = inputString;
          //         that.byId("imagePreview").setSrc(base64Data);

          image.onload = function () {
            if (this.width + this.height === 0) {
              that.imagePreview = "";
              sap.m.MessageBox.error("Invalid Image!");
            }
          }
        };
        reader.onerror = function (error) {
          // Error handling
        };
      },










      onAddTable: function (bIsTinyMCE5) {
        var that = this;
        var wizard = that.getView().byId("wizard");
        var currentStep = wizard.getProgressStep();
        var currentStepIndex = wizard.getSteps().indexOf(currentStep);
        var textItemId = "Table-" + that.tableitem++;

        // Check if idFrame exists in the view
        var idFrame = that.getView().byId('idFrame' + currentStepIndex);
        if (idFrame) {
          var richTextEditor = new sap.ui.richtexteditor.RichTextEditor({
            id: textItemId,
            width: "100%",
            editorType: sap.ui.richtexteditor.EditorType.bIsTinyMCE5,

            showGroupFont: true,
            showGroupLink: true,
            showGroupInsert: false,
            showGroupClipboard: false,
            showGroupUndo: true,
            showGroupStructure: false,
            showGroupTextAlign: true,
            showGroupFontStyle: true,

            ready: function () {
              bIsTinyMCE5 ?
                this.addButtonGroup("table") // show only the table group
                :
                this.addButtonGroup("table");
            },
            change: function (oEvent) {
              var editorContent = richTextEditor.getValue();
              var base64Content = btoa(editorContent);

              if (bIsTinyMCE5) {
                // Save main section text as an array
                if (!that._mainSectionTableArray) {
                  that._mainSectionTableArray = [];
                }
                that._mainSectionTableArray.push(base64Content);
                console.log("Main Section Table Array:", that._mainSectionTableArray);
              }
            }
          });
          var row = new sap.m.ColumnListItem({
            cells: [richTextEditor],
          });

          idFrame.addItem(row);
          console.log("Table Area added successfully");
        } else {
          console.error("idFrame not found for step " + currentStepIndex);
        }
      },

      onPreview: function () {
        //  var mergeDatas = [id, textarea];
        console.log("Preview Button");
        this.getOwnerComponent().getRouter().navTo("PreviewForm", {
          previewId: templateid,
        });
      },

      backtoHome: function () {
        var that = this;
        MessageBox.show("Are you sure you want to go back to the home screen? If yes, all data will be lost.", {
          icon: MessageBox.Icon.ERROR,
          title: "Confirmation",
          actions: [MessageBox.Action.YES, MessageBox.Action.CANCEL],
          emphasizedAction: sap.m.MessageBox.Action.CANCEL,
          onClose: function (action) {
            if (action === MessageBox.Action.YES) {
              // User confirmed, navigate back to home screen
              that.navigateBackToHome();
              MessageToast.show("Moving back to Home ... \n Please Wait");


            }
          }
        });
      },

      navigateBackToHome: function () {

        this.getOwnerComponent().getRouter().navTo("Home");




      }



    });
  }
);
