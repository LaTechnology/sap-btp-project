using { com.utcl.db as db } from '../db/utcl-data-model';

namespace btp_utcl_java.srv;



service UTCLDeliveryService {
    entity deliveryinstruction as projection on db.UTCLDeliveryInstruction;
    entity specialInstruction as projection on db.UTCLSpecialInstruction;
    entity deliveryPeriod as projection on db.UTCLDeliveryPeriod;
    entity endUserDetails as projection on db.UTCLEndUserDetails
    entity enduserofmaterial as projection on db.UTCLEndUserOfMaterial;
    function getSpecialInstruction(id:String) returns String;
    function getEndUserofMaterial(id:String) returns String;
}
