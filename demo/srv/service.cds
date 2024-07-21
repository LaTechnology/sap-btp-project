using { db as my} from '../db/schema';


service MyService @(path:'/processor'){

    entity Foo as projection on my.Employee;

}