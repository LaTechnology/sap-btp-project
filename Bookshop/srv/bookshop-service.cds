using { sap.capire.Incidents as bookShopPack }  from '../db/schema';
service BookShopService {
    // one to one unidirectional
    entity Book as projection on bookShopPack.Book
    entity Review as projection on bookShopPack.Review
    // one to one bidirectional
    entity Book1 as projection on bookShopPack.Book1
    entity Review1 as projection on bookShopPack.Review1
    entity Projects as projection on bookShopPack.Projects
    entity Users as projection on bookShopPack.Users
    entity Members as projection on bookShopPack.Members

}