sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'ns.oms5',
            componentId: 'CustomerObjectPage',
            contextPath: '/Customer'
        },
        CustomPageDefinitions
    );
});