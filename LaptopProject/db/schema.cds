using {managed} from '@sap/cds/common'; 
namespace LaptopProject.db;

entity Laptop   :  managed{
    ID  :   Integer;
    Name:   String;
    Descr:  String;
    IsActive: Boolean default 1;

}

