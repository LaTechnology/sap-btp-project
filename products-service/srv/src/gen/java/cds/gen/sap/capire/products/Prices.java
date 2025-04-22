package cds.gen.sap.capire.products;

import com.sap.cds.CdsData;
import com.sap.cds.Struct;
import com.sap.cds.ql.CdsName;
import java.lang.Integer;
import java.lang.String;
import java.util.HashMap;
import java.util.Map;
import javax.annotation.processing.Generated;

@CdsName("sap.capire.products.Prices")
@Generated(
    value = "cds-maven-plugin",
    date = "2023-11-28T11:06:52.044359734Z",
    comments = "com.sap.cds:cds-maven-plugin:2.4.0 / com.sap.cds:cds4j-api:2.4.0"
)
public interface Prices extends CdsData {
  String ID = "Id";

  String PRICE = "price";

  String PRICE_ID = "price_Id";

  String PRICE_RANGE = "priceRange";

  @CdsName(ID)
  Integer getId();

  @CdsName(ID)
  void setId(Integer id);

  ModelVarient getPrice();

  void setPrice(Map<String, ?> price);

  @CdsName(PRICE_ID)
  Integer getPriceId();

  @CdsName(PRICE_ID)
  void setPriceId(Integer priceId);

  String getPriceRange();

  void setPriceRange(String priceRange);

  Prices_ ref();

  static Prices create() {
    return Struct.create(Prices.class);
  }

  static Prices create(Integer id) {
    Map<String, Object> keys = new HashMap<>();
    keys.put(ID, id);
    return Struct.access(keys).as(Prices.class);
  }
}
