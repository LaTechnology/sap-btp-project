using { com.utcl.db as db} from '../db/utcl-data-model';

namespace com.utcl.srv;

@path:'utcl/checkout'
service UTCLOrderService {
    entity order as projection on db.UTCLOrder;
    entity OrderItem as projection on db.UTCLOrderItem;
    entity payment as projection on db.UTCLPayment;
}
