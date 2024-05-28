namespace demo1.srv;

using {demo1.db as db} from '../db/schema';


service CountryAPI {

    entity CountryAPI_Java as projection on db.Countries;

}