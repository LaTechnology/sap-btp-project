using {sap.capire.carmanagement as task} from '../db/schema';
service CarManagementService{
    entity Car as projection on task.Car;
    entity ModelVarient as projection on task.ModelVarient;
    entity Colours as projection on task.Colours;
    entity Prices as projection on task.Prices;
    entity Seat as projection on task.Seat;
    entity Tyre as projection on task.Tyre;
    entity Engine as projection on task.Engine;
    entity Passanger as projection on task.Passanger;
    entity TyreType as projection on task.TyreType;
}

// annotate CarManagementService.Car with @odata.draft.enabled;
// annotate CarManagementService.Car with @(requires: 'support');