using { sap.capire as my } from '../db/schema';
service AdminService {
  entity Books as projection on my.Books;
  entity Authors as projection on my.Authors;
  entity WithoutPrime as projection on my.WithoutPrime;
}