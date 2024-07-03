namespace my.bookshop;

entity Books {
  title  : localized String(111);
  author : Association to Authors;
}

entity Authors {
  key ID : Integer;
}

entity Orders {
  OrderNo  : String @title:'Order Number';
}
