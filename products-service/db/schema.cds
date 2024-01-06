// namespace sap.capire.products;

// using { Currency, cuid, managed, sap.common.CodeList } from '@sap/cds/common';

// entity Products : cuid, managed {
//     title    : localized String(111);
//     descr    : localized String(1111);
//     stock    : Integer;
//     price    : Decimal(9,2);
//     currency : Currency;
//     category : Association to Categories;
// }

// entity Categories : CodeList {
//     key ID   : Integer;
//     parent   : Association to Categories;
//     children : Composition of many Categories on children.parent = $self;
// }


namespace com.ladera.carshowroom;

entity Car {
 
  key ID           : Integer;
  tyres            : Composition of many Tyres on tyres.car=$self;
  passengerDetails : Association to many Passenger on passengerDetails.car=$self;
  colour           : Association to many Colour on colour.car=$self;
  modelVarient     : Association to many ModelVarient on modelVarient.car=$self;
  carName          : String;
  carModel         : String; 
  engineType       : String;
  modelYear        : String;
  seatsDetails     : Composition of SeatsDetails;
  tubeDetails      : Composition of TubeDetails;
  engineDetails    : Composition of EngineDetails;
  currencyDetails  : Association to CurrencyDetails;
  
}

entity Tyres  {
    key ID    : Integer;
    tyreBrand : String;
    tyreType  : String;
    car       : Association to Car
  
  
}

entity  SeatsDetails {
   
    key ID      : Integer;
    noOfSeats   : String;
   
}

entity Passenger {

  key ID        : Integer;
  gender        : String;
  passengerList : String;
  car           : Association to Car
}

entity TubeDetails  {
    
    key ID    : Integer;
    tubeBrand : String;

}

entity EngineDetails  {
  
    key ID       : Integer;
    engineCC     : String;
    OilCapacity  : String;
    car          : Association to Car;

}


entity ModelVarient {

  key ID            : Integer;
  carModel          : String;
  carVarient        : String;
  car               : Association to Car;

}


entity Colour {

  key ID             : Integer;
  carColourVarient   : String;
  car                : Association to Car

}

entity CurrencyDetails {

  key ID       : Integer;
  currencyType : String;
  price        : String;

}
