namespace CapireSample.db;

entity Author{
    key ID: Integer;
    name:String;
    books:Association to many Books1 on books.ID=booksID;
    booksID:Integer;
}

entity Books1{
    key ID:Integer;
    name:String;
    stock:Integer;

}
