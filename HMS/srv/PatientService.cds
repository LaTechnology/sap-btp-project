using{com.ladera.hms as pat} from '../db/Patient';

service PatientService{
    entity Patient as projection on pat.Patients;
}