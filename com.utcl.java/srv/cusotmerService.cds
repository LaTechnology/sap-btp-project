    using {  com.utcl.schema.ordermanagement as my } from '../db/schema';

    service UTCLCustomerService {

        entity Customer as projection on my.UTCLCustomer;

        entity CustomerAddress as projection on my.UTCLAddress;

        entity CustomerType as projection on my.UTCLCustomerType;

        function getCustomerType(customerTypeId: Integer) returns array of CustomerType;
        
    }
 