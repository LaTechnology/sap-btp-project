using {selling.pets.animals as pet} from '../db/schema';

service ProcessorService{
    entity PetShop as projection on pet.PetShops;

    entity Animal as projection on pet.Animals;
}

extend projection ProcessorService.Animal with{
    breed || ' breeds are very nice dogs' as description: String
}