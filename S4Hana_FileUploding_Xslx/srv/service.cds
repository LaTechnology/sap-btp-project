using { S4Hana_FileUploading as db } from '../db/schema';

service CSVExtraction {

entity TcodeMapping as projection on db.TcodeMapping;

entity SecurityRoleMappling as projection on db.SecurityRoleMappling;

action uploadProductsXLSX(file: Binary) returns {message: String;
    inserted: Integer;
}
}