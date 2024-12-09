sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'petmodule2/test/integration/FirstJourney',
		'petmodule2/test/integration/pages/PetShopList',
		'petmodule2/test/integration/pages/PetShopObjectPage',
		'petmodule2/test/integration/pages/AnimalObjectPage'
    ],
    function(JourneyRunner, opaJourney, PetShopList, PetShopObjectPage, AnimalObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('petmodule2') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThePetShopList: PetShopList,
					onThePetShopObjectPage: PetShopObjectPage,
					onTheAnimalObjectPage: AnimalObjectPage
                }
            },
            opaJourney.run
        );
    }
);