package cds.gen.sap.capire.products;

import com.sap.cds.CdsData;
import com.sap.cds.Struct;
import com.sap.cds.ql.CdsName;
import java.lang.Integer;
import java.lang.String;
import java.util.HashMap;
import java.util.Map;
import javax.annotation.processing.Generated;

@CdsName("sap.capire.products.Colours")
@Generated(
    value = "cds-maven-plugin",
    date = "2023-11-28T11:06:52.044359734Z",
    comments = "com.sap.cds:cds-maven-plugin:2.4.0 / com.sap.cds:cds4j-api:2.4.0"
)
public interface Colours extends CdsData {
  String ID = "Id";

  String COLOURS = "colours";

  String COLOUR = "colour";

  String COLOUR_ID = "colour_Id";

  String CARS = "cars";

  String CARS_ID = "cars_Id";

  @CdsName(ID)
  Integer getId();

  @CdsName(ID)
  void setId(Integer id);

  String getColours();

  void setColours(String colours);

  ModelVarient getColour();

  void setColour(Map<String, ?> colour);

  @CdsName(COLOUR_ID)
  Integer getColourId();

  @CdsName(COLOUR_ID)
  void setColourId(Integer colourId);

  Car getCars();

  void setCars(Map<String, ?> cars);

  @CdsName(CARS_ID)
  Integer getCarsId();

  @CdsName(CARS_ID)
  void setCarsId(Integer carsId);

  Colours_ ref();

  static Colours create() {
    return Struct.create(Colours.class);
  }

  static Colours create(Integer id) {
    Map<String, Object> keys = new HashMap<>();
    keys.put(ID, id);
    return Struct.access(keys).as(Colours.class);
  }
}
