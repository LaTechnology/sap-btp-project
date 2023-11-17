sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'speedord.order',
            componentId: 'OrderList',
            contextPath: '/Order'
        },
        CustomPageDefinitions
    );
});