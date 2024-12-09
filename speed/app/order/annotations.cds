using MyService as service from '../../srv/ProcessorService';

annotate service.Order with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'id',
            Value : id,
        },
        {
            $Type : 'UI.DataField',
            Label : 'orderCode',
            Value : orderCode,
        },
        {
            $Type : 'UI.DataField',
            Label : 'customer_id',
            Value : customer_id,
        },
        {
            $Type : 'UI.DataField',
            Label : 'totalPrice',
            Value : totalPrice,
        },
        {
            $Type : 'UI.DataField',
            Label : 'deliveryAddress_id',
            Value : deliveryAddress_id,
        },
    ]
);
annotate service.Order with {
    customer @Common.ValueList : {
        $Type : 'Common.ValueListType',
        CollectionPath : 'Customer',
        Parameters : [
            {
                $Type : 'Common.ValueListParameterInOut',
                LocalDataProperty : customer_id,
                ValueListProperty : 'id',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'customerId',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'firstName',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'lastName',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'dateOfBirth',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'title_id',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'name',
            },
        ],
    }
};
annotate service.Order with {
    deliveryAddress @Common.ValueList : {
        $Type : 'Common.ValueListType',
        CollectionPath : 'Address',
        Parameters : [
            {
                $Type : 'Common.ValueListParameterInOut',
                LocalDataProperty : deliveryAddress_id,
                ValueListProperty : 'id',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'addressLine1',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'addressLine2',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'addressLine3',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'addressLine4',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'city_id',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'state_id',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'pincode',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'country_code',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'customer_id',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'addressType_id',
            },
        ],
    }
};
annotate service.Order with {
    billingAddress @Common.ValueList : {
        $Type : 'Common.ValueListType',
        CollectionPath : 'Address',
        Parameters : [
            {
                $Type : 'Common.ValueListParameterInOut',
                LocalDataProperty : billingAddress_id,
                ValueListProperty : 'id',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'addressLine1',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'addressLine2',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'addressLine3',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'addressLine4',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'city_id',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'state_id',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'pincode',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'country_code',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'customer_id',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'addressType_id',
            },
        ],
    }
};
annotate service.Order with {
    deliveryContact @Common.ValueList : {
        $Type : 'Common.ValueListType',
        CollectionPath : 'ContactDetails',
        Parameters : [
            {
                $Type : 'Common.ValueListParameterInOut',
                LocalDataProperty : deliveryContact_id,
                ValueListProperty : 'id',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'phoneNumber',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'emailId',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'contactType',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'customer_id',
            },
        ],
    }
};
annotate service.Order with @(
    UI.FieldGroup #GeneratedGroup1 : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'id',
                Value : id,
            },
            {
                $Type : 'UI.DataField',
                Label : 'orderCode',
                Value : orderCode,
            },
            {
                $Type : 'UI.DataField',
                Label : 'customer_id',
                Value : customer_id,
            },
            {
                $Type : 'UI.DataField',
                Label : 'totalPrice',
                Value : totalPrice,
            },
            {
                $Type : 'UI.DataField',
                Label : 'deliveryAddress_id',
                Value : deliveryAddress_id,
            },
            {
                $Type : 'UI.DataField',
                Label : 'billingAddress_id',
                Value : billingAddress_id,
            },
            {
                $Type : 'UI.DataField',
                Label : 'deliveryContact_id',
                Value : deliveryContact_id,
            },
            {
                $Type : 'UI.DataField',
                Label : 'paymentMode',
                Value : paymentMode,
            },
            {
                $Type : 'UI.DataField',
                Label : 'shippingMethod_id',
                Value : shippingMethod_id,
            },
            {
                $Type : 'UI.DataField',
                Label : 'message',
                Value : message,
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
