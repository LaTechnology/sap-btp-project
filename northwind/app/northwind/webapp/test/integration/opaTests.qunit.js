sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'northwind/northwind/test/integration/FirstJourney',
		'northwind/northwind/test/integration/pages/ProductsList',
		'northwind/northwind/test/integration/pages/ProductsObjectPage'
    ],
    function(JourneyRunner, opaJourney, ProductsList, ProductsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('northwind/northwind') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheProductsList: ProductsList,
					onTheProductsObjectPage: ProductsObjectPage
                }
            },
            opaJourney.run
        );
    }
);