using {SouthWind as external} from './external/SouthWind.csn';

service MyNewService {

    // @readonly
    @cds.persistence.exists
    entity Snails as projection on external.Snail {
        key id,name,age
    };

}