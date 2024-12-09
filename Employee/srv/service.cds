using{Employee.db as em} from '../db/schema';

service ProcessorService{

entity Emp as projection on em.Employee;

entity Depart as projection on em.Department;
}