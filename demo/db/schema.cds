namespace db;

using { db.MasterData } from './master-data';


entity Employee  {
    key EmployeeIdKey: Integer;
        employeeId : String;
    employeeName : String;

    employeeassociation : Association to MasterData on employeeassociation.Id = EmployeeIdKey;
    
}

