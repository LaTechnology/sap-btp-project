
using {LaptopProject.db as my} from '../db/schema';

service OurService{
    entity Laptop as projection on my.Laptop;
}