using { Currency, managed } from '@sap/cds/common';
namespace sap.capire;


entity Products2{
  key ID  :Integer;
  Name  :String;
  Description : String;
  ReleaseDate : Time;
  DiscontinuedDate  : DateTime;
  Rating  : Integer;
  Price : Double;
  // Categories  : ;
  // Supplier  : ;
  // ProductDetail : ;
}

entity WithoutPrime: managed{
  // key ID:Integer;
  name :  String;
  age : Integer;
}
