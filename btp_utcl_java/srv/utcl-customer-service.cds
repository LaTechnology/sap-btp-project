using { com.utcl.db as db} from '../db/utcl-data-model';

namespace btp_utcl_java.srv;



service UTCLCustomerService {
    entity  customer as projection on db.UTCLCustomer;
    entity CustomerType as projection on db.UTCLCustomerType;
    entity address as projection on db.UTCLAddress;
    function getCustomerType(id:String) returns String;
    
}