using{com.ladera.hms as spl} from '../db/Specialist';

Service SpecialistService{
    entity Specialist as projection on spl.Specialists;
}