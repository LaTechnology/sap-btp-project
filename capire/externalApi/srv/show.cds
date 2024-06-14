using { API_BUSINESS_PARTNER } from './external/API_BUSINESS_PARTNER';
using { capire.externalApi.db as db } from '../db/schema';


service Play{

    entity Participants as projection on API_BUSINESS_PARTNER.A_BusinessPartner;
    entity Episodes as projection on db.Episodes;

}

