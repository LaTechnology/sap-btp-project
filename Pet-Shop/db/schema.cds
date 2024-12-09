using {cuid,managed} from '@sap/cds/common';
namespace selling.pets.animals;

entity PetShops: cuid, managed{
    owner: String;
    address: String;
    animal: Association to many Animals on animal.petshop=$self;
    // pet_Id: String;
}

entity Animals:cuid{
    breed: String;
    age: Integer;
    color: String;
    petshop: Association to PetShops;
}

