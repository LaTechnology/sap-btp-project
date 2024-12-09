using { Currency, managed, sap } from '@sap/cds/common';
namespace sap.capire;

@cds.persistence.skip:'if-unused'
entity Books : managed {
  key ID   : Integer;
  title    : localized String(111)  ;
  descr    : localized String(1111);
  author   : Association to Authors ;
  genre    : Association to Genre;
  stock    : Integer;
  price    : Decimal;
  currency : Currency;
  image    : LargeBinary @Core.MediaType: 'image/png';
}
@cds.persistence.skip:'if-unused'
entity Authors : managed {
  key ID       : Integer;
  name         : String(111);
  dateOfBirth  : Date;
  dateOfDeath  : Date;
  placeOfBirth : String;
  placeOfDeath : String;
  books        : Association to many Books on books.author = $self;
}

/** Hierarchically organized Code List for Genres */
@cds.persistence.skip:'if-unused'
entity Genre : sap.common.CodeList {
  key ID   : Integer;
  parent   : Association to Genre;
  children : Composition of many Genre on children.parent = $self;
}