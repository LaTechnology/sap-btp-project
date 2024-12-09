sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'petmodule2',
            componentId: 'AnimalObjectPage',
            contextPath: '/PetShop/animal'
        },
        CustomPageDefinitions
    );
});