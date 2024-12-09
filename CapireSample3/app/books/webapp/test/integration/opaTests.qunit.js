sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'ns/books/test/integration/FirstJourney',
		'ns/books/test/integration/pages/ListOfBooksList',
		'ns/books/test/integration/pages/ListOfBooksObjectPage'
    ],
    function(JourneyRunner, opaJourney, ListOfBooksList, ListOfBooksObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('ns/books') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheListOfBooksList: ListOfBooksList,
					onTheListOfBooksObjectPage: ListOfBooksObjectPage
                }
            },
            opaJourney.run
        );
    }
);