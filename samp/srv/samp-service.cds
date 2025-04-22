using { samp.db as my } from '../db/schema';

service MyService {

    entity samp as projection on my.samp;

}