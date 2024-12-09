using{managed} from '@sap/cds/common';
// using{com.ladera.hms.Patients as pat} from '../db/Patient';
namespace com.ladera.hms;

entity Addresses{
    key addressID   :   String;
    doornumber      :   String;
    streetName      :   String;
    city            :   Association to one Title;
    // district        :   String;
    state           :   String;
    pincode         :   String @mandatory;
    // patient         :   Association to pat
};

entity Title{
    name:String;
    KEY code:Integer;
}