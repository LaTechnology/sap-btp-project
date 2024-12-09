using { sap.capire as my } from '../db/schema';

service AdminService {

  
  entity Authors as projection on my.Authors;

   /**  
    entity Books as projection on my.Books;
    entity Genre as projection on my.Genre;
    */
}