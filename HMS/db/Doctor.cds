using{managed} from '@sap/cds/common';
// using{com.ladera.hms.Appointments as appoint} from '../db/Appointment';
using{com.ladera.hms.Specialists as spl} from '../db/Specialist';
using{com.ladera.hms.Addresses as add} from '../db/Address';
using{com.ladera.hms.Patients as pat} from '../db/Patient';

namespace com.ladera.hms;

entity Doctors:managed{
    key doctorID        :   String;
    doctorImage         :   String;
    doctorFirstName     :   String @mandatory;
    doctorLastName      :   String;
    doctorGender        :   String @assert.range enum{
        Male='M';
        Female='F';
        Other='O';
    };
    doctorDateOfBirth   :   Date;
    doctorage           :   String;
    doctorPhoneNumber   :   String;
    doctoremail         :   String;
    doctorAddress       :   Association to many add on doctorAddress.addressID=doctorID;
    // departmentAppointment:  Association to appoint;
    specialist          :   Association to spl;
    patient             :   Association to many pat on patient.doctor=$self;
}