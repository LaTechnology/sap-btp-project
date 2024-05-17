namespace countrySchema.db;

// using { cuid } from '@sap/cds/common';

entity country  {
    id : UUID;
    key countryName : String;
    countryCode : String;
}
