sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'sampleproject1',
            componentId: 'ConversationsObjectPage',
            contextPath: '/Incidents/conversations'
        },
        CustomPageDefinitions
    );
});