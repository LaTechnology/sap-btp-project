sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'api.bpemail',
            componentId: 'Email_PartnerList',
            contextPath: '/Email_Partner'
        },
        CustomPageDefinitions
    );
});