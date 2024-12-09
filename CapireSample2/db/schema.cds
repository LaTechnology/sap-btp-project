using {CatalogService2.Books as book} from '../srv/processor';
namespace CapireSample2.db;

entity Author{
    name :String;
    key ID  :Integer;
    age :   Integer;
    book:   Association to Boooks;
}

entity Boooks{
    key ID:Integer;
    title2:String;
    descr2:String;
    author: Association to many Author on author.ID=author_ID;
    author_ID:Integer;
}

