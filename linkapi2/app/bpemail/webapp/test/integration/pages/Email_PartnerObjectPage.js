sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'api.bpemail',
            componentId: 'Email_PartnerObjectPage',
            contextPath: '/Email_Partner'
        },
        CustomPageDefinitions
    );
});