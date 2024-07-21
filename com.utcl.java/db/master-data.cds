namespace com.utcl.schema.ordermanagement;

using {custom.managed} from './common';

using {com.utcl.schema.ordermanagement.UTCLOrderItem,
com.utcl.schema.ordermanagement.UTCLOrder} from './schema';


@cds.autoexpose
aspect MasterData {};

entity UTCLCustomer : MasterData {

    key id           : UUID;
        customerId   : String     @mandatory;
        firstName    : String(30) @cds.localized;
        lastName     : String(30) @cds.localized;
        email        : String(20);
        mobileNumber : String     @assert.range: [8,13];
        to_customerType : Association to UTCLCustomerType;
        to_address : Association to many UTCLAddress on to_address.to_customer = $self;

};

entity UTCLCustomerType : MasterData {

        key id           : UUID;
        customerTypeId : Integer;
        customerType : String(20);

};

entity UTCLAddress : MasterData, managed {

    key id           : UUID;
        addressLine1 : String @mandatory;
        addressLine2 : String;
        addressLine3 : String;
        addressLine4 : String;
        pincode      : String;
        city         : String;
        state        : String;
        country      : String;
        mobileNumber : String;
        to_customer  : Association to UTCLCustomer;
        to_order : Association to UTCLOrder;

};

entity UTCLProduct : MasterData, managed {

    key id : UUID;
    productCode : String @mandatory;    
    productName : String ;
    productImage : String @ui.image;
    numberOfBags : String;
    quantity : Double;
    description : String(500);
    price : Double;
    rating : Double;
    deliveryDate : Date;
    to_deliveryPeriod : Date;
    to_orderItems : Association to many UTCLOrderItem on to_orderItems.to_product =$self;


}

entity UTCLSpecialInstruction {

    key id : UUID;
    specialInstruction : String(100);
    
}

entity UTCLDeliveryPeriod  {

    key id : UUID;
    deliveryPeriod : String;

}
