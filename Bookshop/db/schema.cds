using { User, cuid, managed, sap.common.CodeList } from '@sap/cds/common';
namespace sap.capire.Incidents;
/**
 * Incidents created by Customers.
*/

//one to one unidirectional
entity Book {
 key Id:Integer;
 Name:String;
 bookReview: Association to Review; 
}
entity Review {
  key Id:Integer;
  rev: String;
}

//one to one bidirectional
entity Book1 {
 key Id:Integer;
 Name:String;
 bookReview: Association to Review1; 
}
entity Review1 {
  key Id:Integer;
  rev: String;
  reviewbook: Association to Book1;
}

// one to many
entity Person{
  key Id: Integer;
  Name: String;
  address: String;
  PerCart:Association to many cart;
}

entity cart{
  key Id: Integer;
  Product_Name: String;
  Product_Id: String;
  // carPerson: Association to Person;
}

//many to many

entity Projects {
  key Id: Integer;
  members : Composition of many Members on members.project = $self;
  projectName:String;
}
entity Users { 
  key Id: Integer;
  projects : Composition of many Members on projects.user = $self;
  userName:String;
}
entity Members { // link table
  key project : Association to Projects;
  key user : Association to Users;
}
