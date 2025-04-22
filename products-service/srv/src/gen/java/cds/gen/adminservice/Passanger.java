package cds.gen.adminservice;

import com.sap.cds.CdsData;
import com.sap.cds.Struct;
import com.sap.cds.ql.CdsName;
import java.lang.Integer;
import java.lang.String;
import java.util.HashMap;
import java.util.Map;
import javax.annotation.processing.Generated;

@CdsName("AdminService.Passanger")
@Generated(
    value = "cds-maven-plugin",
    date = "2023-11-28T11:06:52.044359734Z",
    comments = "com.sap.cds:cds-maven-plugin:2.4.0 / com.sap.cds:cds4j-api:2.4.0"
)
public interface Passanger extends CdsData {
  String ID = "Id";

  String NO_OF_PPL = "noOfPpl";

  String GENDER = "gender";

  String CAR_PASSANGER = "carPassanger";

  String CAR_PASSANGER_ID = "carPassanger_Id";

  @CdsName(ID)
  Integer getId();

  @CdsName(ID)
  void setId(Integer id);

  String getNoOfPpl();

  void setNoOfPpl(String noOfPpl);

  String getGender();

  void setGender(String gender);

  Car getCarPassanger();

  void setCarPassanger(Map<String, ?> carPassanger);

  @CdsName(CAR_PASSANGER_ID)
  Integer getCarPassangerId();

  @CdsName(CAR_PASSANGER_ID)
  void setCarPassangerId(Integer carPassangerId);

  Passanger_ ref();

  static Passanger create() {
    return Struct.create(Passanger.class);
  }

  static Passanger create(Integer id) {
    Map<String, Object> keys = new HashMap<>();
    keys.put(ID, id);
    return Struct.access(keys).as(Passanger.class);
  }
}
