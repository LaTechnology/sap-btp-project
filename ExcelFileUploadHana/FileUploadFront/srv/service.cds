using { demo.db as db } from '../db/schema';

service MyService {

    entity customer as projection on db.customer;
    action uploadBase64(input:String) returns String;

}