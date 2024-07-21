    using {  com.utcl.schema.ordermanagement as my } from '../db/schema';

    service UTCLOrderService {

        entity Order as projection on my.UTCLOrder;

        function getTotalOrder(status: String) returns String;

        function getOrderListByStatus(status : String) returns array of Order;

    }
