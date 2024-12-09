using{com.ladera.hms as rec} from '../db/Record';

service RecordService{
    entity Record as projection on rec.Records;
}