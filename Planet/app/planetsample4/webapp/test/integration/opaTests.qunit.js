sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'ns/planetsample4/test/integration/FirstJourney',
		'ns/planetsample4/test/integration/pages/SolarSystemList',
		'ns/planetsample4/test/integration/pages/SolarSystemObjectPage',
		'ns/planetsample4/test/integration/pages/PlanetObjectPage'
    ],
    function(JourneyRunner, opaJourney, SolarSystemList, SolarSystemObjectPage, PlanetObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('ns/planetsample4') + '/index.html'
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