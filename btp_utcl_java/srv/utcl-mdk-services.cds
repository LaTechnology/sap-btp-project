using { btp_utcl_java.srv.UTCLCustomerService } from './utcl-customer-service';
using { btp_utcl_java.srv.UTCLDeliveryService } from './utcl-delivery-service';
using { btp_utcl_java.srv.UTCLOrderService } from './utcl-order-service';
using { btp_utcl_java.srv.UTCLProductService } from './utcl-product-service';

service mdkServices {

     entity  customer as projection on UTCLCustomerService.customer;
    entity CustomerType as projection on UTCLCustomerService.CustomerType;
    entity address as projection on UTCLCustomerService.address;
    function getCustomerType(id:String) returns String;

    entity deliveryinstruction as projection on UTCLDeliveryService.deliveryinstruction;
    entity specialInstruction as projection on UTCLDeliveryService.specialInstruction;
    entity deliveryPeriod as projection on UTCLDeliveryService.deliveryPeriod;
    entity endUserDetails as projection on UTCLDeliveryService.endUserDetails;
    entity enduserofmaterial as projection on UTCLDeliveryService.enduserofmaterial;
    function getSpecialInstruction(id:String) returns String;
    function getEndUserofMaterial(id:String) returns String;

    entity order as projection on UTCLOrderService.order;
    entity OrderItem as projection on UTCLOrderService.OrderItem;
    entity payment as projection on UTCLOrderService.payment;

    entity productdetails as projection on UTCLProductService.productdetails;
    function getDeliveryPeriod(id:String) returns String;
    function calculateNumberOfBag(quantity:Double) returns Integer;

}



