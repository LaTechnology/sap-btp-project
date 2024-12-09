using{living.place as alien} from '../db/schema';

service processor{
    entity SolarSystem as projection on alien.SolarSystems;

    entity Planet as projection on alien.Planets;
}