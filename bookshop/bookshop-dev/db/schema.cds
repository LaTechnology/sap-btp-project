using {managed } from '@sap/cds/common';
namespace bookshop.db;


  entity Books {
    key ID : Integer;
    title  : localized String;
    author : Association to Authors;
    stock  : Integer;
  }

  entity Authors {
    key ID : Integer;
    name   : String;
    books  : Association to many Books on books.author = $self;
  }

  entity Orders : managed {
    key ID  : UUID;
    book    : Association to Books;
    amount  : Integer;
  }


