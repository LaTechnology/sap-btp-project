using {slidetile.sample as tile} from '../db/schema';

service MyService {

    entity Products as projection on tile.Product;

}