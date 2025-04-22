using {com.ladera.omspg as oms } from '../db/schema';

service OmspgService {
    entity Customer @(restrict:[
        {
            grant:['READ'],
            to:['Customer']
        },
        {
            grant:['*'],
            to:['Admin']
        }
    ]) as projection on oms.Customer;
    annotate Customer with @odata.draft.enabled;
}