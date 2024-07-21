using {  com.utcl.db as db} from '../db/data-model';
service MyService{

    entity customer as projection on db.customer;
    function getCustomerById(id:String) returns String;

}