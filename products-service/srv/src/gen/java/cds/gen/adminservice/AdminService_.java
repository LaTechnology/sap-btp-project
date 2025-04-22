package cds.gen.adminservice;

import com.sap.cds.ql.CdsName;
import java.lang.Class;
import java.lang.String;
import javax.annotation.processing.Generated;

@Generated(
    value = "cds-maven-plugin",
    date = "2023-11-28T11:06:52.044359734Z",
    comments = "com.sap.cds:cds-maven-plugin:2.4.0 / com.sap.cds:cds4j-api:2.4.0"
)
@CdsName("AdminService")
public interface AdminService_ {
  String CDS_NAME = "AdminService";

  Class<Seat_> SEAT = Seat_.class;

  Class<TyreType_> TYRE_TYPE = TyreType_.class;

  Class<Prices_> PRICES = Prices_.class;

  Class<Colours_> COLOURS = Colours_.class;

  Class<Passanger_> PASSANGER = Passanger_.class;

  Class<Car_> CAR = Car_.class;

  Class<Tyre_> TYRE = Tyre_.class;

  Class<ModelVarient_> MODEL_VARIENT = ModelVarient_.class;

  Class<Engine_> ENGINE = Engine_.class;
}
