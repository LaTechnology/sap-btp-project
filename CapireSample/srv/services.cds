using {CapireSample.db as cap} from '../db/schema';
// using{User} from '@sap/cds/common';

// @protocol:'none'
// @protocol:'rest'
// @protocol:'odata'
// @path: 'Services2'
// @impl:'srv/services2'
@impl:'srv/lib/services3'
service ServeMe{
    
    entity p_Author as select from cap.Author{
        *,
        books[stock>0] as availablebooks,
        books[1:stock=10] as minbooks
    } excluding{books};
    // entity Book as projection on cap.Books;
    entity Author {key id:Integer}actions{
        action play(k:Integer) returns String;
    };
    action hide(k:Integer) returns String;

   @UI.LineItem: [
  { $Type: 'UI.DataFieldForAction', Action: 'TravelService_Travel', Label: '{i18n>AcceptTravel}' },
  { Value: TravelID, Label: 'ID Nitishraj' },
  { Value: BeginDate, Label: 'Begin' },
  { Value: EndDate, Label: 'End' }
]
    entity TravelService_Travel {
        key TravelID : UUID;
        BeginDate   : DateTime;
        EndDate     : DateTime;
        // other elements...
    };
 
    // @cds.redirection.target:true 
    // entity bookss(Author:Integer) as select from cap.Books1 where ID=:Author;
}
annotate ServeMe.p_Author with @title:'author1'{
        name @title:'Name1';
}

annotate ServeMe.hide with @label:'Hide label' (@label: 'First Parameter1' k)
returns @label: 'Returns a String';

// annotate ServeMe.Author with actions{
//     @label:'Action Label'
//     play(@label:'First Parameter' k) returns @label: 'Returns String';
// }

// annotate ServeMe.TravelService_Travel with @UI.LineItem: [
//   ... up to { Value: TravelID },  // ... up to with comparator object
//   { Value: BeginWeekday, Label: 'Day of week' }, // new entry
//   ... // remaining array entries
// ];

@path: 'Services2'
// @impl:'srv/services2'
@impl:'srv/lib/services3'
service CatalogService {
  entity Books {
    key ID : Integer;
    title  : String;
    descr  : String;
    // author : Association to many cap.Author;
    author : Association to many Author2;
  }
  
//   entity Author as projection on cap.Author;
    entity Author2{
        key ID  :   Integer;
        name    :   String;
        books   :   Association to many Books on books.ID=booksID;
        booksID :   Integer;
    }
  action submitOrder ( book: UUID, quantity: Integer );
  event OrderedBook: { book: UUID; quantity: Integer; };
}