sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'sampleproject1/test/integration/FirstJourney',
		'sampleproject1/test/integration/pages/IncidentsList',
		'sampleproject1/test/integration/pages/IncidentsObjectPage',
		'sampleproject1/test/integration/pages/ConversationsObjectPage'
    ],
    function(JourneyRunner, opaJourney, IncidentsList, IncidentsObjectPage, ConversationsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('sampleproject1') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheIncidentsList: IncidentsList,
					onTheIncidentsObjectPage: IncidentsObjectPage,
					onTheConversationsObjectPage: ConversationsObjectPage
                }
            },
            opaJourney.run
        );
    }
);