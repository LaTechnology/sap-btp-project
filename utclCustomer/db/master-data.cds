namespace utclCustomer.db;


entity Customer  {
    key id : UUID;
    firstName : String(20);
    lastName : String(20);
    email : String;
    mobileNumber : String;
}

entity Dealer : Customer {
    key id : UUID;
    dealerID : String;
    toRetailer : Association to many Retailer on toRetailer.toDealer = $self;
    toAddress : Association to many Address on toAddress.toDealer = $self;
}

entity Retailer : Customer {
    key id : UUID;
    retailerId : String;
    toDealer : Association to Dealer;   
    toAddress : Association to many Address on toAddress.toRetailer = $self; 
}

entity Address {
    key id : UUID;
    addressLine1 : String(20);
    addressLine2 : String(20);
    addressLine3 : String(20);
    addressLine4 : String(20);
    pincode : String(10);
    city : String(20);
    state : String(20);
    country : String(20);
    mobileNumber : String(20);
    toDealer : Association to Dealer;
    toRetailer : Association to Retailer;
}

