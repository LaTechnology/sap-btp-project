namespace db;

@cds.autoexpose
aspect Master{}

entity MasterData : Master {

    key Id : Integer;
    masterId : String;
    masterName : String;
    
    
}

