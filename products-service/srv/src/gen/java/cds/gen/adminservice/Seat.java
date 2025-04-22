package cds.gen.adminservice;

import com.sap.cds.CdsData;
import com.sap.cds.Struct;
import com.sap.cds.ql.CdsName;
import java.lang.Integer;
import java.lang.String;
import java.util.HashMap;
import java.util.Map;
import javax.annotation.processing.Generated;

@CdsName("AdminService.Seat")
@Generated(
    value = "cds-maven-plugin",
    date = "2023-11-28T11:06:52.044359734Z",
    comments = "com.sap.cds:cds-maven-plugin:2.4.0 / com.sap.cds:cds4j-api:2.4.0"
)
public interface Seat extends CdsData {
  String ID = "Id";

  String CAPACITY = "capacity";

  String SEAT_BRAND = "seatBrand";

  String CAR_SEAT = "carSeat";

  String CAR_SEAT_ID = "carSeat_Id";

  @CdsName(ID)
  Integer getId();

  @CdsName(ID)
  void setId(Integer id);

  String getCapacity();

  void setCapacity(String capacity);

  String getSeatBrand();

  void setSeatBrand(String seatBrand);

  ModelVarient getCarSeat();

  void setCarSeat(Map<String, ?> carSeat);

  @CdsName(CAR_SEAT_ID)
  Integer getCarSeatId();

  @CdsName(CAR_SEAT_ID)
  void setCarSeatId(Integer carSeatId);

  Seat_ ref();

  static Seat create() {
    return Struct.create(Seat.class);
  }

  static Seat create(Integer id) {
    Map<String, Object> keys = new HashMap<>();
    keys.put(ID, id);
    return Struct.access(keys).as(Seat.class);
  }
}
