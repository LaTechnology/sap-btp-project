using{managed} from '@sap/cds/common';
using{com.ladera.hms.Doctors as doc} from '../db/Doctor';

namespace com.ladera.hms;

entity Specialists{
    KEY specialistID:   String;
    specialistIn    :   String;
    experience      :   String;
    doctor          :   Association to doc;
}