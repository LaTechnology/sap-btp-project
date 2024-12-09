using { HanaSample3.db as trainer } from '../db/schema';

service MyService {

    entity Trainers as projection on trainer.Trainer;

}