sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    const CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'bookreview.book',
            componentId: 'ReviewsObjectPage',
            contextPath: '/Books/reviews'
        },
        CustomPageDefinitions
    );
});