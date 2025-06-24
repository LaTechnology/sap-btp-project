using { S4Hana_FileUploading as new } from '../db/schema';

service CSVExtraction {

entity TcodeMapping as projection on new.TcodeMapping;

entity SecurityRoleMappling as projection on new.SecurityRoleMappling;

action uploadProducts(file: Binary) returns {message: String;
    inserted: Integer;
}
}