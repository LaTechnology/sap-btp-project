using CarManagementService as service from '../../srv/carmanagement-service';

annotate service.ModelVarient with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Id',
            Value : Id,
        },
        {
            $Type : 'UI.DataField',
            Label : 'modelName',
            Value : modelName,
        },
        {
            $Type : 'UI.DataField',
            Label : 'models_Id',
            Value : models_Id,
        },
    ]
);
annotate service.ModelVarient with {
    models @Common.ValueList : {
        $Type : 'Common.ValueListType',
        CollectionPath : 'Car',
        Parameters : [
            {
                $Type : 'Common.ValueListParameterInOut',
                LocalDataProperty : models_Id,
                ValueListProperty : 'Id',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'carName',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'manufactureDate',
            },
        ],
    }
};
