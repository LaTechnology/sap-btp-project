namespace app.Sales;
// type string_4 : String(4);
 
entity SalesHeader {
 key ID : String(10);
     DocCategory : String(4);
     DocType : String(4);
     SalesOrg : String(4);
     SItem : Association to many SalesItem on SItem.SalesDoc = $self;
}
 
entity SalesItem {
 key SalesDoc : Association to SalesHeader;
 key SalesItem : String(4);
     Material : String(10);
     MatType : String(4);
}