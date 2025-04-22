package cds.gen.sap.capire.products;

import com.sap.cds.CdsData;
import com.sap.cds.Struct;
import com.sap.cds.ql.CdsName;
import java.lang.String;
import javax.annotation.processing.Generated;

@CdsName("sap.capire.products.Products.texts")
@Generated(
    value = "cds-maven-plugin",
    date = "2023-11-28T11:00:55.627603400Z",
    comments = "com.sap.cds:cds-maven-plugin:2.4.0 / com.sap.cds:cds4j-api:2.4.0"
)
public interface ProductsTexts extends CdsData {
  String LOCALE = "locale";

  String ID = "ID";

  String TITLE = "title";

  String DESCR = "descr";

  /**
   * Type for a language code
   */
  String getLocale();

  /**
   * Type for a language code
   */
  void setLocale(String locale);

  @CdsName(ID)
  String getId();

  @CdsName(ID)
  void setId(String id);

  String getTitle();

  void setTitle(String title);

  String getDescr();

  void setDescr(String descr);

  ProductsTexts_ ref();

  static ProductsTexts create() {
    return Struct.create(ProductsTexts.class);
  }
}
