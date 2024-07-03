using { my.bookshop as db } from '../db/schema';

namespace books.srv;


service MyService {

    entity Books as projection on db.Books;

}


