using{managed} from '@sap/cds/common';
using{com.ladera.hms.Patients as pat} from '../db/Patient';
namespace com.ladera.hms;

entity Pharmacy{
    key pharmacyID  :   String;
    prescription    :   String;
    price           :   Double;
    patient         :   Association to pat;

}