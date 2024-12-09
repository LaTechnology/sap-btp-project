using{managed} from '@sap/cds/common';
using{com.ladera.hms.Patients as pat} from '../db/Patient';
namespace com.ladera.hms;

entity Records:managed{
    key recordID    :   String;
    admittedDate    :   DateTime;
    dischargedDate  :   DateTime;
    treatment       :   String;
    patient         :   Association to one pat;
}