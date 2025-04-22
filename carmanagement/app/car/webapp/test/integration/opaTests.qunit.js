sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'ns/car/test/integration/FirstJourney',
		'ns/car/test/integration/pages/CarList',
		'ns/car/test/integration/pages/CarObjectPage',
		'ns/car/test/integration/pages/ModelVarientObjectPage'
    ],
    function(JourneyRunner, opaJourney, CarList, CarObjectPage, ModelVarientObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('ns/car') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheCarList: CarList,
					onTheCarObjectPage: CarObjectPage,
					onTheModelVarientObjectPage: ModelVarientObjectPage
                }
            },
            opaJourney.run
        );
    }
);