namespace countryService.srv;

using { countrySchema.db as db } from '../db/countrySchema';

service countryService {
    entity country as projection on db.country;
};
