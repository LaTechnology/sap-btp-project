using { com.utcl.db as db} from '../db/utcl-data-model';

namespace com.utcl.srv;

service UTCLProductService {
    entity productdetails as projection on db.UTCLProduct;
    function getDeliveryPeriod(id:String) returns String;
    action calculateNumberOfBags(quantity:Double) returns Integer;
}
