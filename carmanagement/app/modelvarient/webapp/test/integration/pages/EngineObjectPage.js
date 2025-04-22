sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'model.modelvarient',
            componentId: 'EngineObjectPage',
            contextPath: '/ModelVarient/engineType'
        },
        CustomPageDefinitions
    );
});