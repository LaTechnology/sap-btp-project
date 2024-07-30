using {utclCustomer.db as my} from '../db/master-data';

service UTCLCustomer {

    entity Dealer as projection on my.Dealer actions{
        action sample();
    }
    entity Retailer as projection on my.Retailer;
    entity Address as projection on my.Address;

    function getdealerandretaler(id : String) returns array of Dealer;
    
}
