using{com.ladera.hms as pharm} from '../db/Pharmacy';

service PharmacyService{
    entity Pharmacy as projection on pharm.Pharmacy;
}