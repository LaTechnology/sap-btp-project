sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'salesdetails/test/integration/FirstJourney',
		'salesdetails/test/integration/pages/SalesHeadersList',
		'salesdetails/test/integration/pages/SalesHeadersObjectPage',
		'salesdetails/test/integration/pages/SalesItemsObjectPage'
    ],
    function(JourneyRunner, opaJourney, SalesHeadersList, SalesHeadersObjectPage, SalesItemsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('salesdetails') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheSalesHeadersList: SalesHeadersList,
					onTheSalesHeadersObjectPage: SalesHeadersObjectPage,
					onTheSalesItemsObjectPage: SalesItemsObjectPage
                }
            },
            opaJourney.run
        );
    }
);