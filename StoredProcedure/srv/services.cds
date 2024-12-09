using {app.shoes as shoe} from '../db/schema';

service Sales_Service {
   entity Shoes as projection on shoe.Shoes;

   function sleep() returns String;

   entity Lancers as projection on shoe.Lancer;
}