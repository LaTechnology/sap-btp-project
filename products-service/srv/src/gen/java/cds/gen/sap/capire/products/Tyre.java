package cds.gen.sap.capire.products;

import com.sap.cds.CdsData;
import com.sap.cds.Struct;
import com.sap.cds.ql.CdsName;
import java.lang.Integer;
import java.lang.String;
import java.util.HashMap;
import java.util.Map;
import javax.annotation.processing.Generated;

@CdsName("sap.capire.products.Tyre")
@Generated(
    value = "cds-maven-plugin",
    date = "2023-11-28T11:06:52.044359734Z",
    comments = "com.sap.cds:cds-maven-plugin:2.4.0 / com.sap.cds:cds4j-api:2.4.0"
)
public interface Tyre extends CdsData {
  String ID = "Id";

  String TYRE_BRAND = "tyreBrand";

  String CAR_TYRE = "carTyre";

  String CAR_TYRE_ID = "carTyre_Id";

  String TYPE = "type";

  String TYPE_ID = "type_Id";

  @CdsName(ID)
  Integer getId();

  @CdsName(ID)
  void setId(Integer id);

  String getTyreBrand();

  void setTyreBrand(String tyreBrand);

  ModelVarient getCarTyre();

  void setCarTyre(Map<String, ?> carTyre);

  @CdsName(CAR_TYRE_ID)
  Integer getCarTyreId();

  @CdsName(CAR_TYRE_ID)
  void setCarTyreId(Integer carTyreId);

  TyreType getType();

  void setType(Map<String, ?> type);

  @CdsName(TYPE_ID)
  Integer getTypeId();

  @CdsName(TYPE_ID)
  void setTypeId(Integer typeId);

  Tyre_ ref();

  static Tyre create() {
    return Struct.create(Tyre.class);
  }

  static Tyre create(Integer id) {
    Map<String, Object> keys = new HashMap<>();
    keys.put(ID, id);
    return Struct.access(keys).as(Tyre.class);
  }
}
