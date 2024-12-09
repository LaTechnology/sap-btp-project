using processor as service from '../../srv/Processor-service1';

annotate service.SolarSystem with @(
    UI.SelectionPresentationVariant #table : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem',
            ],
            SortOrder : [
                {
                    $Type : 'Common.SortOrderType',
                    Property : star,
                    Descending : false,
                },
            ],
            GroupBy : [
                mass,
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
                            Sign : #E,
                            Option : #BT,
                            Low : 'Unknown Sun mass',
                            High : 'Unknown Sun mass',
                        },
                    ],
                },],
        },
    }
);
annotate service.SolarSystem with {
    star @Common.FieldControl : #Mandatory
};
annotate service.SolarSystem with {
    star @Common.FieldControl : #Optional
};
annotate service.SolarSystem with {
    star @Common.FieldControl : #Mandatory
};
