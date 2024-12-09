using{managed} from '@sap/cds/common';
using{com.ladera.hms.Patients as pat} from '../db/Patient';
using{com.ladera.hms.Doctors as doc} from '../db/Doctor';
namespace com.ladera.hms;

entity Appointments{
    key appointmentID   :   String;
    appointmentDateTime :   DateTime;
    patient             :   Association to pat;
    doctor              :   Association to doc;
}