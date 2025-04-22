using { User, cuid, managed, sap.common.CodeList } from '@sap/cds/common';
namespace sap.capire.incidents;
/**
 * Incidents created by Customers.
*/
entity Employee {
 key Id:Integer;
 firstName:String;
 lastName:String;
 empAddresses: Association to Addresses;
}
entity Addresses {
  key Id:Integer;
  add1: String;
}

