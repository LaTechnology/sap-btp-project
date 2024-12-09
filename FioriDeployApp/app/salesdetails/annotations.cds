using Sales_Service as service from '../../srv/service-processor';

annotate service.SalesHeaders with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'ID',
            Value : ID,
        },
        {
            $Type : 'UI.DataField',
            Label : 'DocCategory',
            Value : DocCategory,
        },
        {
            $Type : 'UI.DataField',
            Label : 'DocType',
            Value : DocType,
        },
        {
            $Type : 'UI.DataField',
            Label : 'SalesOrg',
            Value : SalesOrg,
        },
    ]
);
annotate service.SalesHeaders with @(
    UI.FieldGroup #GeneratedGroup1 : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'ID',
                Value : ID,
            },
            {
                $Type : 'UI.DataField',
                Label : 'DocCategory',
                Value : DocCategory,
            },
            {
                $Type : 'UI.DataField',
                Label : 'DocType',
                Value : DocType,
            },
            {
                $Type : 'UI.DataField',
                Label : 'SalesOrg',
                Value : SalesOrg,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup1',
        },
    ]
);
