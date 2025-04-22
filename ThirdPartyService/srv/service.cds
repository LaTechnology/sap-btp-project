using { s4.samples as db } from './external';

service MyService {

entity Supplier as projection on db.Supplier;
    

}