using{com.ladera.hms as add} from '../db/Address';

service AddressService{
    entity Address as projection on add.Addresses;
}