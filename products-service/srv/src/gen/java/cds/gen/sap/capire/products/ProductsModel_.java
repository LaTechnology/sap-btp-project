package cds.gen.sap.capire.products;

import com.sap.cds.ql.CdsName;
import java.lang.Class;
import java.lang.String;
import javax.annotation.processing.Generated;

@Generated(
    value = "cds-maven-plugin",
    date = "2023-11-28T11:00:55.627603400Z",
    comments = "com.sap.cds:cds-maven-plugin:2.4.0 / com.sap.cds:cds4j-api:2.4.0"
)
@CdsName("sap.capire.products")
public interface ProductsModel_ {
  String CDS_NAME = "sap.capire.products";

  Class<ProductsTexts_> PRODUCTS_TEXTS = ProductsTexts_.class;

  Class<Products_> PRODUCTS = Products_.class;

  Class<CategoriesTexts_> CATEGORIES_TEXTS = CategoriesTexts_.class;

  Class<Categories_> CATEGORIES = Categories_.class;
}
