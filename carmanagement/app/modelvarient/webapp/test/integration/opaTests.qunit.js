sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'model/modelvarient/test/integration/FirstJourney',
		'model/modelvarient/test/integration/pages/ModelVarientList',
		'model/modelvarient/test/integration/pages/ModelVarientObjectPage',
		'model/modelvarient/test/integration/pages/EngineObjectPage'
    ],
    function(JourneyRunner, opaJourney, ModelVarientList, ModelVarientObjectPage, EngineObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('model/modelvarient') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheModelVarientList: ModelVarientList,
					onTheModelVarientObjectPage: ModelVarientObjectPage,
					onTheEngineObjectPage: EngineObjectPage
                }
            },
            opaJourney.run
        );
    }
);