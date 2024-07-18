using { com.utcl.db as db} from '../db/utcl-data-model';



service UTCLCustomerService {
    entity  customer as projection on db.UTCLCustomer;
    entity CustomerType as projection on db.UTCLCustomerType;
    entity address as projection on db.UTCLCustomer;
    function getCustomerType(id:String) returns String;
    
}