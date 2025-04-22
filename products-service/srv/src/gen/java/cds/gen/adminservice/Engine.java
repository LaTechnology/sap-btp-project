package cds.gen.adminservice;

import com.sap.cds.CdsData;
import com.sap.cds.Struct;
import com.sap.cds.ql.CdsName;
import java.lang.Integer;
import java.lang.String;
import java.util.HashMap;
import java.util.Map;
import javax.annotation.processing.Generated;

@CdsName("AdminService.Engine")
@Generated(
    value = "cds-maven-plugin",
    date = "2023-11-28T11:06:52.044359734Z",
    comments = "com.sap.cds:cds-maven-plugin:2.4.0 / com.sap.cds:cds4j-api:2.4.0"
)
public interface Engine extends CdsData {
  String ID = "Id";

  String MODEL_NUMBER = "modelNumber";

  String ENGINE_TYPE = "engineType";

  String ENGINES = "engines";

  String ENGINES_ID = "engines_Id";

  @CdsName(ID)
  Integer getId();

  @CdsName(ID)
  void setId(Integer id);

  String getModelNumber();

  void setModelNumber(String modelNumber);

  String getEngineType();

  void setEngineType(String engineType);

  ModelVarient getEngines();

  void setEngines(Map<String, ?> engines);

  @CdsName(ENGINES_ID)
  Integer getEnginesId();

  @CdsName(ENGINES_ID)
  void setEnginesId(Integer enginesId);

  Engine_ ref();

  static Engine create() {
    return Struct.create(Engine.class);
  }

  static Engine create(Integer id) {
    Map<String, Object> keys = new HashMap<>();
    keys.put(ID, id);
    return Struct.access(keys).as(Engine.class);
  }
}
