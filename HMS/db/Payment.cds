using{managed,sap.common.CodeList} from '@sap/cds/common';
using{com.ladera.hms.Patients as pat} from '../db/Patient';
namespace com.ladera.hms;

entity Payment{
    KEY paymentID   :   String;
    totalAmount     :   String;
    paymentDateTime :   DateTime;
    paymentType     :   Association to PaymentTypes;
    patient         :   Association to one pat;
}

entity PaymentTypes:CodeList{
    key code : String @assert.range enum{
        UPI='UPI';
        cash_on_hand='CASH';
        card='CARD'
    };
    picon   :   Integer;
}