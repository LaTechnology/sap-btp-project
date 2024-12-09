using{com.ladera.hms as doc} from '../db/Doctor';

service DoctorService{
    entity Doctor as projection on doc.Doctors;
}