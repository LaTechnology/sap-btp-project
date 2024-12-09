namespace app.shoes;
type string_4 : String(4);
 
entity Shoes {
 key ID : String(10);
     category : string_4;
     type : string_4;
     SItem : Association to many Lancer on SItem.shoes = $self;
}
 
entity Lancer {
 key shoes : Association to Shoes;
 key lItem : string_4;
     material : String(10);
     type : string_4;
}