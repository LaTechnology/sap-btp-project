using CarManagementService as service from '../../srv/carmanagement-service';

annotate service.Car with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Id',
            Value : Id,
        },
        {
            $Type : 'UI.DataField',
            Label : 'carName',
            Value : carName,
        },
        {
            $Type : 'UI.DataField',
            Label : 'manufactureDate',
            Value : manufactureDate,
        },
    ]
);
annotate service.Car with @(
    UI.FieldGroup #GeneratedGroup1 : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Id',
                Value : Id,
            },
            {
                $Type : 'UI.DataField',
                Label : 'carName',
                Value : carName,
            },
            {
                $Type : 'UI.DataField',
                Label : 'manufactureDate',
                Value : manufactureDate,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'Car Details',
            Target : '@UI.FieldGroup#GeneratedGroup1',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Model Details',
            ID : 'ModelDetails',
            Target : 'modelVarient/@UI.LineItem#ModelDetails',
        },
    ]
);
annotate service.ModelVarient with @(
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Model Details',
            ID : 'ModelDetails',
            Target : '@UI.FieldGroup#ModelDetails',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'colors',
            ID : 'colors',
            Target : '@UI.FieldGroup#colors',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Engine type',
            ID : 'Enginetype',
            Target : '@UI.FieldGroup#Enginetype',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'prices',
            ID : 'prices',
            Target : '@UI.FieldGroup#prices',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Tyres',
            ID : 'Numberoftyres',
            Target : '@UI.FieldGroup#Numberoftyres',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Seat capacity',
            ID : 'Seatcapacity',
            Target : '@UI.FieldGroup#Seatcapacity',
        },
    ],
    UI.FieldGroup #car : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : Id,
                Label : 'Id',
            },{
                $Type : 'UI.DataField',
                Value : modelName,
                Label : 'modelName',
            },{
                $Type : 'UI.DataField',
                Value : models_Id,
                Label : 'models_Id',
                ![@UI.Hidden],
            },],
    }
);
annotate service.ModelVarient with {
    models @Common.Text : {
            $value : modelName,
            ![@UI.TextArrangement] : #TextFirst,
        }
};
annotate service.ModelVarient with @(
    UI.FieldGroup #ModelDetails : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : modelName,
                Label : 'modelName',
            },],
    }
);
annotate service.ModelVarient with @(
    UI.LineItem #ModelDetails : [
        {
            $Type : 'UI.DataField',
            Value : Id,
            Label : 'Id',
        },{
            $Type : 'UI.DataField',
            Value : modelName,
            Label : 'modelName',
        },]
);
annotate service.ModelVarient with @(
    UI.HeaderInfo : {
        TypeImageUrl : '',
        TypeName : '',
        TypeNamePlural : '',
        Title : {
            $Type : 'UI.DataField',
            Value : colour.cars.carName,
        },
        Description : {
            $Type : 'UI.DataField',
            Value : 'Tough looking in any angle',
        },
    }
);
annotate service.Car with @(
    UI.HeaderInfo : {
        TypeImageUrl : '',
        TypeName : '',
        TypeNamePlural : '',
        Title : {
            $Type : 'UI.DataField',
            Value : carName,
        },
        Description : {
            $Type : 'UI.DataField',
            Value : 'Tough looking in any angle',
        },
        ImageUrl : carimage,
    }
);
annotate service.ModelVarient with @(
    UI.FieldGroup #colors : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : colour.Id,
                Label : 'Id',
            },{
                $Type : 'UI.DataField',
                Value : colour.colours,
                Label : 'colours',
            },],
    }
);
annotate service.ModelVarient with @(
    UI.FieldGroup #Enginetype : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : engineType.Id,
                Label : 'Id',
            },
            {
                $Type : 'UI.DataField',
                Value : engineType.modelNumber,
                Label : 'modelNumber',
            },
            {
                $Type : 'UI.DataField',
                Value : engineType.engineType,
                Label : 'engineType',
            },],
    }
);
annotate service.ModelVarient with @(
    UI.FieldGroup #prices : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : price.Id,
                Label : 'Id',
            },{
                $Type : 'UI.DataField',
                Value : price.priceRange,
                Label : 'priceRange',
            },],
    }
);
annotate service.ModelVarient with @(
    UI.FieldGroup #Numberoftyres : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : noOfTyre.Id,
                Label : 'Id',
            },{
                $Type : 'UI.DataField',
                Value : noOfTyre.tyreBrand,
                Label : 'tyreBrand',
            },
            {
                $Type : 'UI.DataField',
                Value : noOfTyre.type.tyreType,
                Label : 'tyreType',
            },],
    }
);
annotate service.ModelVarient with @(
    UI.FieldGroup #Seatcapacity : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : seatCapacity.Id,
                Label : 'Id',
            },
            {
                $Type : 'UI.DataField',
                Value : seatCapacity.seatBrand,
                Label : 'seatBrand',
            },{
                $Type : 'UI.DataField',
                Value : seatCapacity.capacity,
                Label : 'capacity',
            },],
    }
);
annotate service.Car with @(
    UI.FieldGroup #Modeldetails : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : modelVarient.Id,
                Label : 'Id',
            },{
                $Type : 'UI.DataField',
                Value : modelVarient.models_Id,
                Label : 'models_Id',
            },{
                $Type : 'UI.DataField',
                Value : modelVarient.modelName,
                Label : 'modelName',
            },],
    }
);
annotate service.ModelVarient with @(
    UI.DataPoint #models_Id : {
        Value : models_Id,
        Visualization : #Rating,
        TargetValue : 5,
    },
    UI.DataPoint #Id : {
        Value : Id,
        Visualization : #Rating,
        TargetValue : 5,
    }
);
annotate service.ModelVarient with @(
    UI.FieldGroup #Tyre : {
        $Type : 'UI.FieldGroupType',
        Data : [
        ],
    }
);
annotate service.Car with @(
    UI.DataPoint #Id : {
        Value : Id,
        Visualization : #Rating,
        TargetValue : 5,
    }
);
