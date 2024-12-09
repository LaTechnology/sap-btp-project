using processor as service from '../../srv/Processor-service';
using from '../../db/schema';

annotate service.Parent with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : father,
            Label : 'Father',
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>Mother}',
            Value : mother,
        },
        {
            $Type : 'UI.DataFieldForAnnotation',
            Target : '@Communication.Contact#contact',
            Label : '{i18n>Phonenumber}',
        },
        {
            $Type : 'UI.DataField',
            Value : relation_relation,
            Label : 'RelationShip',
            Criticality : relation.ricon,
            CriticalityRepresentation : #WithIcon,
        },
        {
            $Type : 'UI.DataField',
            Value : relation.descr,
            Criticality : relation.ricon,
            CriticalityRepresentation : #WithIcon,
        },
    ]
);
annotate service.Parent with @(
    UI.FieldGroup #GeneratedGroup1 : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : father,
                Label : 'Father',
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>Mother}',
                Value : mother,
            },
            {
                $Type : 'UI.DataField',
                Value : relation_relation,
                Label : 'RelationShip',
                Criticality : relation.ricon,
                CriticalityRepresentation : #WithIcon,
            },
            {
                $Type : 'UI.DataFieldForAnnotation',
                Target : '@UI.ConnectedFields#connected',
                Label : 'Descriptionno1',
            },
            {
                $Type : 'UI.DataField',
                Value : ID,
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
        {
            $Type : 'UI.CollectionFacet',
            Label : 'Details of Parents & Child',
            ID : 'DetailsofParentsChild',
            Facets : [
                {
                    $Type : 'UI.CollectionFacet',
                    Label : 'Details',
                    ID : 'Details',
                    Facets : [
                        {
                            $Type : 'UI.ReferenceFacet',
                            Label : 'parent11',
                            ID : 'parent11',
                            Target : '@UI.FieldGroup#parent11',
                        },
                        {
                            $Type : 'UI.ReferenceFacet',
                            Label : 'Child11',
                            ID : 'Child11',
                            Target : '@UI.FieldGroup#Child11',
                        },],
                },
                {
                    $Type : 'UI.ReferenceFacet',
                    Label : 'ChildSection',
                    ID : 'ChildSection',
                    Target : 'child/@UI.LineItem#ChildSection',
                },],
        },
    ]
);
annotate service.Parent with @(
    UI.SelectionFields : [
        phonenumber,
        ID,
    ]
);
annotate service.Parent with {
    phonenumber @Common.Label : '{i18n>phonenumber}'
};
annotate service.Parent with {
    ID @Common.Label : '{i18n>Id}'
};
annotate service.Parent with {
    phonenumber @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'Parent',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : phonenumber,
                    ValueListProperty : 'phonenumber',
                },
            ],
            Label : 'phonenumber',
        PresentationVariantQualifier : 'vh_Parent_phonenumber',
        },
        Common.ValueListWithFixedValues : true,
        Common.Text : {
            $value : father,
            ![@UI.TextArrangement] : #TextLast,
        }
)};
annotate service.Parent with {
    ID @Common.Text : {
            $value : father,
            ![@UI.TextArrangement] : #TextLast,
        }
};
annotate service.Parent with {
    father @UI.MultiLineText : false
};
annotate service.Parent with {
    father @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'Parent',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : father,
                    ValueListProperty : 'father',
                },
            ],
            Label : 'father',
        },
        Common.ValueListWithFixedValues : true
)};
annotate service.Parent with @(
    UI.PresentationVariant #vh_Parent_mother : {
        $Type : 'UI.PresentationVariantType',
        SortOrder : [
            {
                $Type : 'Common.SortOrderType',
                Property : mother,
                Descending : false,
            },
        ],
    }
);
annotate service.Parent with {
    parentdp @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'Parent',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : parentdp,
                    ValueListProperty : 'parentdp',
                },
            ],
            Label : 'parentdpno1',
        },
        Common.ValueListWithFixedValues : true
)};
annotate service.Parent with @(
    UI.PresentationVariant #vh_Parent_phonenumber : {
        $Type : 'UI.PresentationVariantType',
        SortOrder : [
            {
                $Type : 'Common.SortOrderType',
                Property : phonenumber,
                Descending : false,
            },
        ],
    }
);
annotate service.Parent with @(
    Communication.Contact #contact : {
        $Type : 'Communication.ContactType',
        fn : phonenumber,
        title : createdBy,
        photo : parentdp,
        tel : [
            {
                $Type : 'Communication.PhoneNumberType',
                type : #cell,
                uri : phonenumber,
            },
        ],
    }
);
annotate service.Parent with @(
    UI.HeaderInfo : {
        TypeName : '{i18n>FamilyCrispy}',
        TypeNamePlural : 'Family Collection',
        Title : {
            $Type : 'UI.DataField',
            Value : father,
        },
        Description : {
            $Type : 'UI.DataField',
            Value : ID,
        },
        ImageUrl : parentdp,
        TypeImageUrl : 'sap-icon://add-product',
    }
);
annotate service.Parent with @(
    UI.FieldGroup #parent11 : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataFieldForAnnotation',
                Target : '@Communication.Contact#contact1',
                Label : '{i18n>Phonenumber}',
            },],
    }
);
annotate service.Parent with @(
    Communication.Contact #contact1 : {
        $Type : 'Communication.ContactType',
        fn : phonenumber,
        title : father,
        photo : parentdp,
        tel : [
            {
                $Type : 'Communication.PhoneNumberType',
                type : #cell,
                uri : phonenumber,
            },
        ],
    }
);
annotate service.Parent with @(
    UI.FieldGroup #Child11 : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : child.name,
            },{
                $Type : 'UI.DataField',
                Value : child.age,
                Label : 'age',
            },{
                $Type : 'UI.DataField',
                Value : child.occupation,
                Label : 'occupation',
            },{
                $Type : 'UI.DataField',
                Value : child.Genders_gender,
                Label : 'Genders_gender',
            },
            {
                $Type : 'UI.DataField',
                Value : ID,
            },],
    }
);
annotate service.Parent with @(
    UI.ConnectedFields #connected : {
        $Type : 'UI.ConnectedFieldsType',
        Template : '{relation_descr} -{relation_relation}',
        Data : {
            $Type : 'Core.Dictionary',
            relation_descr : {
                $Type : 'UI.DataField',
                Value : relation.descr,
                Criticality : relation.ricon,
                CriticalityRepresentation : #WithIcon,
            },
            relation_relation : {
                $Type : 'UI.DataField',
                Value : relation.relation,
            },
        },
    }
);
annotate service.Child with {
    Genders @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'Genders',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : Genders_gender,
                    ValueListProperty : 'gender',
                },
            ],
            Label : 'gender',
        },
        Common.ValueListWithFixedValues : true
)};
annotate service.Parent with {
    mother @UI.MultiLineText : true
};
annotate service.Parent with {
    ID @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'Child',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : ID,
                    ValueListProperty : 'ID',
                },
            ],
            Label : 'ID',
        },
        Common.ValueListWithFixedValues : true
)};
annotate service.Parent with {
    relation @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'Relations',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : relation_relation,
                    ValueListProperty : 'relation',
                },
            ],
            Label : 'relation',
        },
        Common.ValueListWithFixedValues : true
)};
annotate service.Child with @(
    UI.LineItem #ChildSection : [
        {
            $Type : 'UI.DataField',
            Value : ID,
            Label : 'ID',
        },{
            $Type : 'UI.DataField',
            Value : name,
        },{
            $Type : 'UI.DataField',
            Value : age,
            Label : 'age',
        },{
            $Type : 'UI.DataField',
            Value : occupation,
            Label : 'occupation',
        },{
            $Type : 'UI.DataField',
            Value : Genders_gender,
            Label : 'Genders_gender',
        },{
            $Type : 'UI.DataField',
            Value : parent_ID,
            Label : 'parent_ID',
        },]
);

annotate service.Child with {
    name @UI.MultiLineText : true
};
annotate service.Child with {
    occupation @UI.MultiLineText : true
};
