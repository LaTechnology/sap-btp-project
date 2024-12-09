sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'ns/planetsample3/test/integration/FirstJourney',
		'ns/planetsample3/test/integration/pages/SolarSystemList',
		'ns/planetsample3/test/integration/pages/SolarSystemObjectPage',
		'ns/planetsample3/test/integration/pages/PlanetObjectPage'
    ],
    function(JourneyRunner, opaJourney, SolarSystemList, SolarSystemObjectPage, PlanetObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('ns/planetsample3') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheSolarSystemList: SolarSystemList,
					onTheSolarSystemObjectPage: SolarSystemObjectPage,
					onThePlanetObjectPage: PlanetObjectPage
                }
            },
            opaJourney.run
        );
    }
);