using {cuid,managed} from '@sap/cds/common';
namespace Employee.db;


entity Employee: cuid,managed{
name: String;
age: Integer;
designation : String;
departmentnumber: Association to Department;
}

entity Department : cuid{
    departmentnumber: String;
    location : String;
    departmentcode: String;

}