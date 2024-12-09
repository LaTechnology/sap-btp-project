namespace Northwind.db;
 
entity ProductsLocal {
        key ID:Int32;
        Name:String;
        Description:String;
        ReleaseDate:DateTime;
        DiscontinuedDate:DateTime;
        Rating:Int16;
        Price:Double;
       
};
