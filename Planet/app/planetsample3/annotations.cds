using processor as service from '../../srv/Processor-service1';

annotate service.SolarSystem with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'star',
            Value : star,
        },
        {
            $Type : 'UI.DataField',
            Label : 'mass',
            Value : mass,
        },
    ]
);
annotate service.SolarSystem with @(
    UI.FieldGroup #GeneratedGroup1 : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'star',
                Value : star,
            },
            {
                $Type : 'UI.DataField',
                Label : 'mass',
                Value : mass,
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
annotate service.SolarSystem with @(
    UI.SelectionFields : [
        mass,
        star,
    ]
);
annotate service.SolarSystem with {
    mass @Common.Label : 'mass'
};
annotate service.SolarSystem with {
    star @Common.Label : 'star'
};
annotate service.SolarSystem with {
    mass @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'SolarSystem',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : mass,
                    ValueListProperty : 'mass',
                },
            ],
            Label : 'MASS',
            PresentationVariantQualifier : 'vh_SolarSystem_mass',
        },
        Common.ValueListWithFixedValues : true
)};
annotate service.SolarSystem with @(
    UI.PresentationVariant #vh_SolarSystem_mass : {
        $Type : 'UI.PresentationVariantType',
        SortOrder : [
            {
                $Type : 'Common.SortOrderType',
                Property : mass,
                Descending : false,
            },
        ],
    }
);
annotate service.SolarSystem with {
    star @Common.Text : {
            $value : mass,
            ![@UI.TextArrangement] : #TextSeparate,
        }
};
annotate service.SolarSystem with {
    star @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'SolarSystem',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : star,
                    ValueListProperty : 'star',
                },
            ],
            Label : 'STAR',
            PresentationVariantQualifier : 'vh_SolarSystem_star',
        },
        Common.ValueListWithFixedValues : true
)};
annotate service.SolarSystem with @(
    UI.PresentationVariant #vh_SolarSystem_star : {
        $Type : 'UI.PresentationVariantType',
        SortOrder : [
            {
                $Type : 'Common.SortOrderType',
                Property : star,
                Descending : false,
            },
        ],
    }
);
annotate service.SolarSystem with @(
    UI.SelectionPresentationVariant #tableView : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
        Text : 'Table View',
    },
    UI.LineItem #tableView : [
        {
            $Type : 'UI.DataField',
            Value : ID,
            Label : 'ID',
        },{
            $Type : 'UI.DataField',
            Value : mass,
        },{
            $Type : 'UI.DataField',
            Value : star,
        },],
    UI.SelectionPresentationVariant #tableView1 : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
                {
                    $Type : 'UI.SelectOptionType',
                    PropertyName : mass,
                    Ranges : [
                        {
                            Sign : #I,
                            Option : #EQ,
                            Low : 'sun',
                        },
                    ],
                },],
        },
        Text : 'Table View 1',
    }
);
annotate service.SolarSystem with @(
    UI.LineItem #tableView1 : [
    ],
    UI.SelectionPresentationVariant #tableView2 : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView1',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
        Text : 'Table View 2',
    }
);
annotate service.SolarSystem with {
    ID @Common.Text : {
            $value : mass,
            ![@UI.TextArrangement] : #TextFirst,
        }
};
annotate service.SolarSystem with {
    ID @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'SolarSystem',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : ID,
                    ValueListProperty : 'ID',
                },
            ],
            Label : 'table_Id',
            PresentationVariantQualifier : 'vh_SolarSystem_ID',
        },
        Common.ValueListWithFixedValues : true
)};
annotate service.SolarSystem with @(
    UI.PresentationVariant #vh_SolarSystem_ID : {
        $Type : 'UI.PresentationVariantType',
        SortOrder : [
            {
                $Type : 'Common.SortOrderType',
                Property : ID,
                Descending : false,
            },
        ],
    }
);
annotate service.SolarSystem with {
    ID @Common.FieldControl : #Mandatory
};
