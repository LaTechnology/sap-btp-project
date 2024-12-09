using{managed} from '@sap/cds/common';
using{com.ladera.hms.Records as rec} from '../db/Record';
using{com.ladera.hms.Addresses as add} from '../db/Address';
using{com.ladera.hms.Doctors as doc} from '../db/Doctor';
using{com.ladera.hms.Payment as pay} from '../db/Payment';
using{com.ladera.hms.Pharmacy as pharm} from '../db/Pharmacy';
// using{com.ladera.hms.Appointments as appoint} from '../db/Appointment';

namespace com.ladera.hms;

entity Patients:managed{
    key patientID       :   String;
    patientFirstName    :   String @mandatory;
    patientLastName     :   String;
    patientGender       :   String @assert.range enum{
        Male='M';
        Female='F';
        Other='O';
    };
    patientDateOfBirth  :   Date;
    patientAge          :   Integer;
    patientPhoneNumber  :   String;
    patientEmail        :   String;
    aadharNumber        :   String @assert.unique;
    patientRecord       :   Association to rec;
    patientAddress      :   Association to many add on patientAddress.addressID=patientID;
    doctor              :   Association to doc;
    payment             :   Association to pay;
    pharmacy            :   Association to one pharm;
    // patientAppointment  :   Association to appoint;
}
