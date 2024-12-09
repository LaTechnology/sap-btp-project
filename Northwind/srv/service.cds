using {Northwind as external} from './external/NorthWind.csn';
using {Northwind.db as my} from '../db/schema';

service CatalogService {


    
    entity ProductsLocal as projection on my.ProductsLocal;

    @readonly
    // @cds.persistence.exists
    entity Products as projection on external.Products {
        key ID, Name, Description, ReleaseDate, DiscontinuedDate, Rating, Price,ProductDetail,Supplier,Categories
    };

    @readonly
    entity Persons as projection on external.Persons {
        key ID, Name,PersonDetail
    };
    @readonly
    entity PersonDetail as projection on external.PersonDetails {
        key PersonID,Age,Gender,Phone,Address,Photo
    };

    @readonly
    entity Supplier as projection on external.Suppliers {
        key ID,Name,Address,Location,Concurrency,Products
    };

    @readonly
    entity ProductDetail as projection on external.ProductDetails {
        key ProductID,Details,Product
    };

    @readonly
    entity Category as projection on external.Categories {
        key ID,Name,Products
    };

    @readonly
    entity Employee as projection on external.Employee {
        key EmployeeID,HireDate,Salary
    };






}
annotate CatalogService.Products  with @cds.persistence:{table,skip:false};
annotate CatalogService.ProductsLocal  with @cds.persistence:{table,skip:false};
