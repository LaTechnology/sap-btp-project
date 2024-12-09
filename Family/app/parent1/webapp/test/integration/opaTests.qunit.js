sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'ns/parent1/test/integration/FirstJourney',
		'ns/parent1/test/integration/pages/ParentList',
		'ns/parent1/test/integration/pages/ParentObjectPage'
    ],
    function(JourneyRunner, opaJourney, ParentList, ParentObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('ns/parent1') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheParentList: ParentList,
					onTheParentObjectPage: ParentObjectPage
                }
            },
            opaJourney.run
        );
    }
);