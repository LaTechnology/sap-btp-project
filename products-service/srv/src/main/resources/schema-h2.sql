
DROP VIEW IF EXISTS AdminService_TyreType;
DROP VIEW IF EXISTS AdminService_Passanger;
DROP VIEW IF EXISTS AdminService_Engine;
DROP VIEW IF EXISTS AdminService_Tyre;
DROP VIEW IF EXISTS AdminService_Seat;
DROP VIEW IF EXISTS AdminService_Prices;
DROP VIEW IF EXISTS AdminService_Colours;
DROP VIEW IF EXISTS AdminService_ModelVarient;
DROP VIEW IF EXISTS AdminService_Car;
DROP TABLE IF EXISTS sap_capire_products_Passanger;
DROP TABLE IF EXISTS sap_capire_products_TyreType;
DROP TABLE IF EXISTS sap_capire_products_Tyre;
DROP TABLE IF EXISTS sap_capire_products_Seat;
DROP TABLE IF EXISTS sap_capire_products_Engine;
DROP TABLE IF EXISTS sap_capire_products_Prices;
DROP TABLE IF EXISTS sap_capire_products_Colours;
DROP TABLE IF EXISTS sap_capire_products_ModelVarient;
DROP TABLE IF EXISTS sap_capire_products_Car;

CREATE TABLE sap_capire_products_Car (
  Id INTEGER NOT NULL,
  carName NVARCHAR(255),
  manufactureDate NVARCHAR(255),
  PRIMARY KEY(Id)
); 

CREATE TABLE sap_capire_products_ModelVarient (
  Id INTEGER NOT NULL,
  modelName NVARCHAR(255),
  models_Id INTEGER,
  PRIMARY KEY(Id)
); 

CREATE TABLE sap_capire_products_Colours (
  Id INTEGER NOT NULL,
  colours NVARCHAR(255),
  colour_Id INTEGER,
  cars_Id INTEGER,
  PRIMARY KEY(Id)
); 

CREATE TABLE sap_capire_products_Prices (
  Id INTEGER NOT NULL,
  price_Id INTEGER,
  priceRange NVARCHAR(255),
  PRIMARY KEY(Id)
); 

CREATE TABLE sap_capire_products_Engine (
  Id INTEGER NOT NULL,
  modelNumber NVARCHAR(255),
  engineType NVARCHAR(255),
  engines_Id INTEGER,
  PRIMARY KEY(Id)
); 

CREATE TABLE sap_capire_products_Seat (
  Id INTEGER NOT NULL,
  capacity NVARCHAR(255),
  seatBrand NVARCHAR(255),
  carSeat_Id INTEGER,
  PRIMARY KEY(Id)
); 

CREATE TABLE sap_capire_products_Tyre (
  Id INTEGER NOT NULL,
  tyreBrand NVARCHAR(255),
  carTyre_Id INTEGER,
  type_Id INTEGER,
  PRIMARY KEY(Id)
); 

CREATE TABLE sap_capire_products_TyreType (
  Id INTEGER NOT NULL,
  tyreType NVARCHAR(255),
  PRIMARY KEY(Id)
); 

CREATE TABLE sap_capire_products_Passanger (
  Id INTEGER NOT NULL,
  noOfPpl NVARCHAR(255),
  gender NVARCHAR(255),
  carPassanger_Id INTEGER,
  PRIMARY KEY(Id)
); 

CREATE VIEW AdminService_Car AS SELECT
  Car_0.Id,
  Car_0.carName,
  Car_0.manufactureDate
FROM sap_capire_products_Car AS Car_0; 

CREATE VIEW AdminService_ModelVarient AS SELECT
  ModelVarient_0.Id,
  ModelVarient_0.modelName,
  ModelVarient_0.models_Id
FROM sap_capire_products_ModelVarient AS ModelVarient_0; 

CREATE VIEW AdminService_Colours AS SELECT
  Colours_0.Id,
  Colours_0.colours,
  Colours_0.colour_Id,
  Colours_0.cars_Id
FROM sap_capire_products_Colours AS Colours_0; 

CREATE VIEW AdminService_Prices AS SELECT
  Prices_0.Id,
  Prices_0.price_Id,
  Prices_0.priceRange
FROM sap_capire_products_Prices AS Prices_0; 

CREATE VIEW AdminService_Seat AS SELECT
  Seat_0.Id,
  Seat_0.capacity,
  Seat_0.seatBrand,
  Seat_0.carSeat_Id
FROM sap_capire_products_Seat AS Seat_0; 

CREATE VIEW AdminService_Tyre AS SELECT
  Tyre_0.Id,
  Tyre_0.tyreBrand,
  Tyre_0.carTyre_Id,
  Tyre_0.type_Id
FROM sap_capire_products_Tyre AS Tyre_0; 

CREATE VIEW AdminService_Engine AS SELECT
  Engine_0.Id,
  Engine_0.modelNumber,
  Engine_0.engineType,
  Engine_0.engines_Id
FROM sap_capire_products_Engine AS Engine_0; 

CREATE VIEW AdminService_Passanger AS SELECT
  Passanger_0.Id,
  Passanger_0.noOfPpl,
  Passanger_0.gender,
  Passanger_0.carPassanger_Id
FROM sap_capire_products_Passanger AS Passanger_0; 

CREATE VIEW AdminService_TyreType AS SELECT
  TyreType_0.Id,
  TyreType_0.tyreType
FROM sap_capire_products_TyreType AS TyreType_0; 

