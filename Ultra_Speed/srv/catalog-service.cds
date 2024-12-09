using {NorthWind as external} from './external/NorthWind.csn';

service CatalogService {

    // @readonly
    entity Products as projection on external.Products {
        key ID, Name, Description, ReleaseDate, DiscontinuedDate, Rating, Price
    };

    // entity Persons as projection on external.Persons{
    //     key ID,Name,PersonDetail
    // }

}

// annotate CatalogService.Products with @odata.draft.enabled;