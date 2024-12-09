sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'ns/child1/test/integration/FirstJourney',
		'ns/child1/test/integration/pages/ChildList',
		'ns/child1/test/integration/pages/ChildObjectPage'
    ],
    function(JourneyRunner, opaJourney, ChildList, ChildObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('ns/child1') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheChildList: ChildList,
					onTheChildObjectPage: ChildObjectPage
                }
            },
            opaJourney.run
        );
    }
);