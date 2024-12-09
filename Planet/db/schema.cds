using {cuid,managed} from '@sap/cds/common';
namespace living.place;

entity SolarSystems: cuid{
    star : String;
    mass : String;
    width: Integer;
    category:Association to many Planets on category.solar=$self;
}

entity Planets: managed{
    key ID: UUID;
    name: String;
    habitable:String enum{
        YES='Y';
        NO='N';
        MAYBE='M';
    };
    solar: Association to one SolarSystems;
}

