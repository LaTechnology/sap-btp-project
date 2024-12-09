using {com.ladera.utcl.speed as speed} from '../db/schema';

service MyService {

    entity Customer as projection on speed.Customer;

    entity Order as projection on speed.Order;

    entity Product as projection on speed.Product;

    entity Warehouse as projection on speed.Warehouse;

    entity StockLevel as projection on speed.StockLevel;

}
extend projection MyService.Customer with {
    firstName || ' ' || lastName as name:String
};

// annotate MyService with @(requires: 'support');
