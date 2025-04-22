package cds.gen.sap.capire.products;

import com.sap.cds.CdsData;
import com.sap.cds.Struct;
import com.sap.cds.ql.CdsName;
import java.lang.Integer;
import java.lang.String;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.processing.Generated;

@CdsName("sap.capire.products.Car")
@Generated(
    value = "cds-maven-plugin",
    date = "2023-11-28T11:06:52.044359734Z",
    comments = "com.sap.cds:cds-maven-plugin:2.4.0 / com.sap.cds:cds4j-api:2.4.0"
)
public interface Car extends CdsData {
  String ID = "Id";

  String CAR_NAME = "carName";

  String MANUFACTURE_DATE = "manufactureDate";

  String NO_OF_PASSANGER = "noOfPassanger";

  String MODEL_VARIENT = "modelVarient";

  @CdsName(ID)
  Integer getId();

  @CdsName(ID)
  void setId(Integer id);

  String getCarName();

  void setCarName(String carName);

  String getManufactureDate();

  void setManufactureDate(String manufactureDate);

  List<Passanger> getNoOfPassanger();

  void setNoOfPassanger(List<? extends Map<String, ?>> noOfPassanger);

  List<ModelVarient> getModelVarient();

  void setModelVarient(List<? extends Map<String, ?>> modelVarient);

  Car_ ref();

  static Car create() {
    return Struct.create(Car.class);
  }

  static Car create(Integer id) {
    Map<String, Object> keys = new HashMap<>();
    keys.put(ID, id);
    return Struct.access(keys).as(Car.class);
  }
}
