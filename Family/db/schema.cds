using {cuid,managed,sap.common.CodeList} from '@sap/cds/common';
namespace Family.db;


entity Parents: cuid,managed{
    father  :   String;
    mother  :   String;
    parentdp:   String;
    phonenumber:    String;
    relation:   Association to Relations;
    child   :   Association to many Childs on child.parent=$self;
}

entity Childs: cuid{
    name    :   String;
    age     :   Int16;
    occupation: String;
    childdp :   String;
    Genders :   Association to Genders;
    parent  :   Association to one Parents;
    grandchild: Composition of many {key bond:Association to GrandChilds;};
}

entity GrandChilds:cuid{
    // key ID  :   Integer;
    name    :   String;
    age     :   Int16;
    granddp :   String;
    gender  :   Association to Genders;
    hobby   :   Association to Hobbies;
    child  :   Association to many Childs.grandchild on child.bond=$self;
}

entity Relations:CodeList{
    key relation:   String @assert.range enum{
        love_marriage='L';
        arranged_marriage='A';
        love_come_arranged_marriage='LA';
    };
    ricon   :   Integer;
}

entity Genders:CodeList{
    key gender  :   String @assert.range enum{
        male='M';
        female='F';
        other='O';
    };
    gicon   :   Integer;
}

entity Hobbies:CodeList{
    key hobby   :   String enum{
        football='F';
        photograpy='P';
        jogging='J';
        swimming='S';
        chating='C';
    };
    hicon    :   Integer;
}