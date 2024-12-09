using {User} from '@sap/cds/common';
using{CapireSample2.db as cap} from '../db/schema';



service CatalogService2{
    entity Books as projection on cap.Boooks;
    entity Author as projection on cap.Author;
    action submitOrder ( book: UUID, quantity: Integer );
//   event OrderedBook: { book: UUID; quantity: Integer; buyer: User }
}