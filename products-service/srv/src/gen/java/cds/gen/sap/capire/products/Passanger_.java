package cds.gen.sap.capire.products;

import com.sap.cds.ql.CdsName;
import com.sap.cds.ql.ElementRef;
import com.sap.cds.ql.StructuredType;
import com.sap.cds.ql.cqn.CqnPredicate;
import java.lang.Integer;
import java.lang.String;
import java.util.function.Function;
import javax.annotation.processing.Generated;

@CdsName("sap.capire.products.Passanger")
@Generated(
    value = "cds-maven-plugin",
    date = "2023-11-28T11:06:52.044359734Z",
    comments = "com.sap.cds:cds-maven-plugin:2.4.0 / com.sap.cds:cds4j-api:2.4.0"
)
public interface Passanger_ extends StructuredType<Passanger_> {
  String CDS_NAME = "sap.capire.products.Passanger";

  ElementRef<Integer> Id();

  ElementRef<String> noOfPpl();

  ElementRef<String> gender();

  Car_ carPassanger();

  Car_ carPassanger(Function<Car_, CqnPredicate> filter);

  ElementRef<Integer> carPassanger_Id();
}
