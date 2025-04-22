package cds.gen.adminservice;

import com.sap.cds.CdsData;
import com.sap.cds.Struct;
import com.sap.cds.ql.CdsName;
import java.lang.Integer;
import java.lang.String;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.processing.Generated;

@CdsName("AdminService.ModelVarient")
@Generated(
    value = "cds-maven-plugin",
    date = "2023-11-28T11:06:52.044359734Z",
    comments = "com.sap.cds:cds-maven-plugin:2.4.0 / com.sap.cds:cds4j-api:2.4.0"
)
public interface ModelVarient extends CdsData {
  String ID = "Id";

  String MODEL_NAME = "modelName";

  String COLOUR = "colour";

  String PRICE = "price";

  String ENGINE_TYPE = "engineType";

  String NO_OF_TYRE = "noOfTyre";

  String MODELS = "models";

  String MODELS_ID = "models_Id";

  String SEAT_CAPACITY = "seatCapacity";

  @CdsName(ID)
  Integer getId();

  @CdsName(ID)
  void setId(Integer id);

  String getModelName();

  void setModelName(String modelName);

  Colours getColour();

  void setColour(Map<String, ?> colour);

  Prices getPrice();

  void setPrice(Map<String, ?> price);

  List<Engine> getEngineType();

  void setEngineType(List<? extends Map<String, ?>> engineType);

  List<Tyre> getNoOfTyre();

  void setNoOfTyre(List<? extends Map<String, ?>> noOfTyre);

  Car getModels();

  void setModels(Map<String, ?> models);

  @CdsName(MODELS_ID)
  Integer getModelsId();

  @CdsName(MODELS_ID)
  void setModelsId(Integer modelsId);

  List<Seat> getSeatCapacity();

  void setSeatCapacity(List<? extends Map<String, ?>> seatCapacity);

  ModelVarient_ ref();

  static ModelVarient create() {
    return Struct.create(ModelVarient.class);
  }

  static ModelVarient create(Integer id) {
    Map<String, Object> keys = new HashMap<>();
    keys.put(ID, id);
    return Struct.access(keys).as(ModelVarient.class);
  }
}
