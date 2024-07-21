//transactional data

using {custom.managed} from './common';

using {
com.utcl.schema.ordermanagement.UTCLCustomer,
com.utcl.schema.ordermanagement.UTCLProduct,
com.utcl.schema.ordermanagement.UTCLAddress,
com.utcl.schema.ordermanagement.UTCLSpecialInstruction,
com.utcl.schema.ordermanagement.UTCLDeliveryPeriod,

} from './master-data';

namespace com.utcl.schema.ordermanagement;

entity UTCLOrder : managed { 

    key id : UUID;
    orderDate : Date;
    status : String;
    to_customer : Association to UTCLCustomer;
    to_orderItems: Association to many UTCLOrderItem on to_orderItems.to_order =$self;
    to_payment: Association to UTCLPayment;
    to_shippingAddress: Association to many UTCLAddress on to_shippingAddress.to_order = $self;   

}

entity UTCLOrderItem : managed {

    key id : UUID;
    entryNumber : String ;
    productName : String  @cds.localized;
    quantity : Decimal(5, 2) @mandatory;
    to_order : Association to UTCLOrder;
    to_product : Association to UTCLProduct;

}

entity UTCLPayment : managed {

    key id : UUID;
    paymentMethod : String @assert.range;
    paymentDate : Date;
    amount : Decimal(10,2);
    to_order : Association to UTCLOrder;
    
}

entity UTCLDeliveryInstruction : managed {

    key id : UUID;
    description : String(70);
    truckNumerator : String(20);
    driverName : String(30);
    driverMobileNumber : String(15);
    endUserMobileNumber : String(15);
    endUserContactPerson : String(30);
    to_specialInstructions : Association to UTCLSpecialInstruction;
    
}



