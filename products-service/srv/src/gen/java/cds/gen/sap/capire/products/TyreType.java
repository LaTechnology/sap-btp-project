package cds.gen.sap.capire.products;

import com.sap.cds.CdsData;
import com.sap.cds.Struct;
import com.sap.cds.ql.CdsName;
import java.lang.Integer;
import java.lang.String;
import java.util.HashMap;
import java.util.Map;
import javax.annotation.processing.Generated;

@CdsName("sap.capire.products.TyreType")
@Generated(
    value = "cds-maven-plugin",
    date = "2023-11-28T11:06:52.044359734Z",
    comments = "com.sap.cds:cds-maven-plugin:2.4.0 / com.sap.cds:cds4j-api:2.4.0"
)
public interface TyreType extends CdsData {
  String ID = "Id";

  String TYRE_TYPE = "tyreType";

  @CdsName(ID)
  Integer getId();

  @CdsName(ID)
  void setId(Integer id);

  String getTyreType();

  void setTyreType(String tyreType);

  TyreType_ ref();

  static TyreType create() {
    return Struct.create(TyreType.class);
  }

  static TyreType create(Integer id) {
    Map<String, Object> keys = new HashMap<>();
    keys.put(ID, id);
    return Struct.access(keys).as(TyreType.class);
  }
}
