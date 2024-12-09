using processor as service from '../../srv/Processor-service';
using from '../../db/schema';

annotate service.Child with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : ID,
            Label : 'ID',
        },{
            $Type : 'UI.DataField',
            Value : name,
            Label : 'Name',
        },{
            $Type : 'UI.DataField',
            Value : age,
            Label : 'Age',
        },{
            $Type : 'UI.DataField',
            Value : gender,
            Label : 'Gender',
        },{
            $Type : 'UI.DataField',
            Value : occupation,
            Label : 'Occupation',
        },{
            $Type : 'UI.DataField',
            Value : parent_ID,
            Label : 'Parent_ID',
        },]
);
annotate service.Child with @(
    UI.FieldGroup #GeneratedGroup1 : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'name',
                Value : name,
            },
            {
                $Type : 'UI.DataField',
                Label : 'age',
                Value : age,
            },
            {
                $Type : 'UI.DataField',
                Label : 'occupation',
                Value : occupation,
            },
            {
                $Type : 'UI.DataField',
                Label : 'gender',
                Value : gender,
            },
            {
                $Type : 'UI.DataField',
                Value : parent_ID,
                Label : 'parent_ID',
            },
            {
                $Type : 'UI.DataField',
                Value : ID,
                Label : 'ID',
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.CollectionFacet',
            Label : 'Family Group',
            ID : 'FamilyGroup',
            Facets : [
                {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup1',
        },
                {
                    $Type : 'UI.ReferenceFacet',
                    Label : 'Child Family',
                    ID : 'ChildFamily',
                    Target : '@UI.FieldGroup#ChildFamily',
                },],
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'SampleChild1',
            ID : 'SampleChild1',
            Target : '@UI.Identification',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'sampleTable',
            ID : 'sampleTable',
            Target : 'grandchild/@UI.LineItem#sampleTable',
        },
    ]
);
annotate service.Child with @(
    UI.SelectionFields : [
        gender,
        name,
    ]
);
annotate service.Child with {
    gender @Common.Label : 'Gender'
};
annotate service.Child with {
    name @Common.Label : 'Name'
};
annotate service.Parent with {
    father @Common.Label : 'parent/father'
};
annotate service.Parent with {
    relation @Common.Label : 'parent/relation'
};
annotate processor.Child.grandchild with {
    bond @Common.Label : 'grandchild/bond'
};
annotate processor.Child.grandchild with {
    bond @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'GrandChilds',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : bond_ID,
                    ValueListProperty : 'ID',
                },
            ],
            Label : 'bondno1',
        },
        Common.ValueListWithFixedValues : true
)};
annotate service.GrandChilds with {
    ID @Common.Text : {
        $value : name,
        ![@UI.TextArrangement] : #TextLast,
    }
};
annotate service.Child with {
    name @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'Child',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : name,
                    ValueListProperty : 'name',
                },
            ],
            Label : 'Nameno1',
        },
        Common.ValueListWithFixedValues : true)};
annotate service.Child with {
    gender @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'Child',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : gender,
                    ValueListProperty : 'gender',
                },
            ],
            Label : 'Genderno1',
        },
        Common.ValueListWithFixedValues : true
)};
annotate service.Child with @(
    UI.HeaderInfo : {
        TypeName : '{i18n>FamilyOfChild}',
        TypeNamePlural : 'Youngsters',
        Title : {
            $Type : 'UI.DataField',
            Value : name,
        },
        Description : {
            $Type : 'UI.DataField',
            Value : occupation,
        },
        ImageUrl : occupation,
        Initials : name,
        TypeImageUrl : 'sap-icon://account',
    }
);
annotate service.Child with @(
    UI.FieldGroup #ChildFamily : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : name,
            },{
                $Type : 'UI.DataField',
                Value : occupation,
                Label : 'occupation',
            },],
    }
);
annotate service.Child with {
    occupation @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'Child',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : occupation,
                    ValueListProperty : 'name',
                },
            ],
        },
        Common.ValueListWithFixedValues : true
)};
annotate processor.Child.grandchild with @(
    UI.LineItem #Mapped : [
    ]
);
annotate service.Child with @(
    UI.Identification : [
        {
            $Type : 'UI.DataField',
            Value : gender,
        },{
            $Type : 'UI.DataField',
            Value : name,
        },{
            $Type : 'UI.DataField',
            Value : ID,
            Label : 'ID',
        },]
);
annotate processor.Child.grandchild with @(
    UI.LineItem #sampleTable : [
    ]
);
