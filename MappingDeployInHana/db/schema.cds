namespace MappingDeployInHana.db;

entity Mobile{
    key id: Integer;
    brand   :   String;
    specification: Association to one SpecificationDetails; //unidirection 1 to 1
    processor   :   Association to one Processors; //bidirection 1 to 1
    price   :   Decimal(10,2);
    sim :   Association to many SimCards on sim.mob=$self; //bidirection 1 to many
    camera  :   Association to many Cameras on camera.id=camera_Id; //unidirection 1 to many
    camera_Id:  Integer;
    person1  :   Composition of many { key bond  :   Association to one Persons};
    person2     :   Association to many Persons on person2.mobile2=$self;
    person3     :   Association to many Mob_Person on person3.mob=$self;
    
}

entity Mob_Person{
    key mob :   Association to Mobile;
    key per :   Association to Persons;
}

entity Persons{
    key id: Integer;
    name    :   String;
    age :   Integer;
    mobile1  :   Association to many Mobile.person1 on mobile1.bond=$self;
    mobile2 :   Association to many Mobile;
    mobile3 :   Association to many Mob_Person on mobile3.per=$self;
    
}

entity SpecificationDetails{

    key id  :   Integer;
    color   :   String;
    size    :   String;
}

entity Processors{
    key id  :   Integer;
    generation  :   String;
    mob :   Association to Mobile;
}
entity SimCards{
    key id  :   String;
    simNumber   :   Integer;
    brand   :   String;
    mob :   Association to Mobile;
}

entity Cameras{
    key id  :   Integer;
    pixel   :   String;
}