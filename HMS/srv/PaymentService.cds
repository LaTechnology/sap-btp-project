using{com.ladera.hms as pay} from '../db/Payment';

service PaymentService{
    entity Payment as projection on pay.Payment;
}