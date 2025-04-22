package cds.gen.adminservice;

import com.sap.cds.ql.CdsName;
import com.sap.cds.ql.ElementRef;
import com.sap.cds.ql.StructuredType;
import com.sap.cds.ql.cqn.CqnPredicate;
import java.lang.Integer;
import java.lang.String;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.function.Function;
import javax.annotation.processing.Generated;

/**
 * Aspect to capture changes by user and name
 *
 * See https://cap.cloud.sap/docs/cds/common#aspect-managed
 */
@CdsName("AdminService.Products")
@Generated(
    value = "cds-maven-plugin",
    date = "2023-11-28T11:00:55.627603400Z",
    comments = "com.sap.cds:cds-maven-plugin:2.4.0 / com.sap.cds:cds4j-api:2.4.0"
)
public interface Products_ extends StructuredType<Products_> {
  String CDS_NAME = "AdminService.Products";

  ElementRef<String> ID();

  ElementRef<Instant> createdAt();

  ElementRef<String> createdBy();

  ElementRef<Instant> modifiedAt();

  ElementRef<String> modifiedBy();

  ElementRef<String> title();

  ElementRef<String> descr();

  ElementRef<Integer> stock();

  ElementRef<BigDecimal> price();

  Currencies_ currency();

  Currencies_ currency(Function<Currencies_, CqnPredicate> filter);

  ElementRef<String> currency_code();

  Categories_ category();

  Categories_ category(Function<Categories_, CqnPredicate> filter);

  ElementRef<Integer> category_ID();

  ProductsTexts_ texts();

  ProductsTexts_ texts(Function<ProductsTexts_, CqnPredicate> filter);

  ProductsTexts_ localized();

  ProductsTexts_ localized(Function<ProductsTexts_, CqnPredicate> filter);
}
