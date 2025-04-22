package cds.gen.sap.capire.products;

import com.sap.cds.ql.CdsName;
import com.sap.cds.ql.ElementRef;
import com.sap.cds.ql.StructuredType;
import com.sap.cds.ql.cqn.CqnPredicate;
import java.lang.Integer;
import java.lang.String;
import java.util.function.Function;
import javax.annotation.processing.Generated;

@CdsName("sap.capire.products.Colours")
@Generated(
    value = "cds-maven-plugin",
    date = "2023-11-28T11:06:52.044359734Z",
    comments = "com.sap.cds:cds-maven-plugin:2.4.0 / com.sap.cds:cds4j-api:2.4.0"
)
public interface Colours_ extends StructuredType<Colours_> {
  String CDS_NAME = "sap.capire.products.Colours";

  ElementRef<Integer> Id();

  ElementRef<String> colours();

  ModelVarient_ colour();

  ModelVarient_ colour(Function<ModelVarient_, CqnPredicate> filter);

  ElementRef<Integer> colour_Id();

  Car_ cars();

  Car_ cars(Function<Car_, CqnPredicate> filter);

  ElementRef<Integer> cars_Id();
}
