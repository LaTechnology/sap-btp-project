sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'ns.businesspartner',
            componentId: 'bpdatacontrolObjectPage',
            contextPath: '/BusinessPartner/to_BPDataController'
        },
        CustomPageDefinitions
    );
});