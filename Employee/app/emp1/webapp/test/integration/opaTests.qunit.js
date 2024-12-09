sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'emp1/test/integration/FirstJourney',
		'emp1/test/integration/pages/EmpList',
		'emp1/test/integration/pages/EmpObjectPage'
    ],
    function(JourneyRunner, opaJourney, EmpList, EmpObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('emp1') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheEmpList: EmpList,
					onTheEmpObjectPage: EmpObjectPage
                }
            },
            opaJourney.run
        );
    }
);