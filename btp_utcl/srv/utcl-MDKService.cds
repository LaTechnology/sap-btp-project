using { com.utcl.srv.UTCLCustomerService } from './utcl-customer-service';
using { com.utcl.srv.UTCLDeliveryService } from './utcl-delivery-service';
using { com.utcl.srv.UTCLOrderService } from './utcl-order-service';
using { com.utcl.srv.UTCLProductService } from './utcl-product-service';

service MDkServices {

    @cds.redirection.target
    entity Customer as projection on UTCLCustomerService.customer
    entity CustomerAddress as projection on UTCLCustomerService.address;
    entity CustomerType as projection on UTCLCustomerService.CustomerType;

        function getCustomerType(id: String) returns String;

    
    

    // Delivery Service
    entity DeliveryInstruction as projection on UTCLDeliveryService.deliveryinstruction;
    entity SpecialInstruction as projection on UTCLDeliveryService.specialInstruction;
        function getSpecialInstruction(id: String) returns String;
    

    entity DeliveryPeriod as projection on UTCLDeliveryService.deliveryPeriod;
    entity EndUserDetails as projection on UTCLDeliveryService.endUserDetails;
    entity EndUserOfMaterial as projection on UTCLDeliveryService.enduserofmaterial;
        function getEndUserofMaterial(id: String) returns String;
    
    
    

    // Order Service
    entity Order as projection on UTCLOrderService.order;
    entity OrderItem as projection on UTCLOrderService.OrderItem;
    entity Payment as projection on UTCLOrderService.payment;

    // Product Service
    entity ProductDetails as projection on UTCLProductService.productdetails;

    function getDeliveryPeriod(id: String) returns String;

    function calculateNumberOfBags(quantity: Double) returns Integer;

}