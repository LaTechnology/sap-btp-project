using { com.utcl.db as db} from '../db/utcl-data-model';


namespace btp_utcl_java.srv;


service UTCLProductService {
    entity productdetails as projection on db.UTCLProduct;
    function getDeliveryPeriod(id:String) returns String;
    function calculateNumberOfBag(quantity:Double) returns Integer;
}
