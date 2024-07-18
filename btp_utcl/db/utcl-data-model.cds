using { managed } from '@sap/cds/common';

namespace com.utcl.db;


entity UTCLCustomer : managed {
    key id: UUID @(Core.Computed: true);
    userId: String;
    firstName: String(20) @mandatory;
    lastName: String(20);
    email: String(20);
    mobileNumber: String(20) @mandatory;
    toCustomerType: Association to UTCLCustomerType;
    toAddress: Association to many UTCLAddress on toAddress.toCustomer = $self;
    toOrders: Association to many UTCLOrder on toOrders.toCustomer = $self;
}

entity UTCLCustomerType {
    key id: UUID;
    customerType: String(20);
}

entity UTCLAddress : managed {
    key id: UUID;
    addressLine1: String @mandatory;
    addressLine2: String;
    addressLine3: String;
    addressLine4: String;
    pincode: String;
    mobileNumber: String;
    toCustomer: Association to UTCLCustomer;
}

entity UTCLProduct : managed {
    key id: UUID;
    code: String @mandatory;
    name: String;
    numberOfBags: Integer;
    quantity: Double;
    description: String;
    requestedDate: Date;
    price: Double;
    toDeliveryPeriod: Association to UTCLDeliveryPeriod;
}

entity UTCLOrder : managed {
    key id: UUID;
    orderDate: Date;
    toCustomer: Association to UTCLCustomer;
    toOrderItems: Association to many UTCLOrderItem on toOrderItems.toOrder = $self;
    toPayment: Association to UTCLPayment;
    toShippingAddress: Association to UTCLAddress;
}

entity UTCLOrderItem : managed {
    key id: UUID;
    entryNumber: String;
    quantity: Integer;
    price: Decimal(10, 2);
    toOrder: Association to UTCLOrder;
}

entity UTCLPayment : managed {
    key id: UUID;
    paymentMethod: String;
    payment: Date;
    amount: Decimal(10, 2);
    toOrder: Association to UTCLOrder;
}

entity UTCLDeliveryInstruction {
    key id: UUID;
    description: String;
    truckNumber: String;
    driverName: String;
    driverMobileNumber: String;
    toSpecialinstruction:Association to UTCLSpecialInstruction;
    toEndUserToMaterial: Association to UTCLEndUserOfMaterial;
}

entity UTCLSpecialInstruction {
    key id: UUID;
    instruction: String;
}

entity UTCLDeliveryPeriod {
    key id: UUID;
    period: String;
}

entity UTCLEndUserDetails : managed {
    key id: UUID;
    description: String;
    mobileNumber: String @mandatory;
    contactPersonName: String;
    toEndUserToMaterial:Association to UTCLEndUserOfMaterial;
}

entity UTCLEndUserOfMaterial {
    key id:UUID;
    endUserMaterial:String;
}
