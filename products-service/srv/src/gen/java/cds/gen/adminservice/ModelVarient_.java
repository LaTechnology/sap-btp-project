package cds.gen.adminservice;

import com.sap.cds.ql.CdsName;
import com.sap.cds.ql.ElementRef;
import com.sap.cds.ql.StructuredType;
import com.sap.cds.ql.cqn.CqnPredicate;
import java.lang.Integer;
import java.lang.String;
import java.util.function.Function;
import javax.annotation.processing.Generated;

@CdsName("AdminService.ModelVarient")
@Generated(
    value = "cds-maven-plugin",
    date = "2023-11-28T11:06:52.044359734Z",
    comments = "com.sap.cds:cds-maven-plugin:2.4.0 / com.sap.cds:cds4j-api:2.4.0"
)
public interface ModelVarient_ extends StructuredType<ModelVarient_> {
  String CDS_NAME = "AdminService.ModelVarient";

  ElementRef<Integer> Id();

  ElementRef<String> modelName();

  Colours_ colour();

  Colours_ colour(Function<Colours_, CqnPredicate> filter);

  Prices_ price();

  Prices_ price(Function<Prices_, CqnPredicate> filter);

  Engine_ engineType();

  Engine_ engineType(Function<Engine_, CqnPredicate> filter);

  Tyre_ noOfTyre();

  Tyre_ noOfTyre(Function<Tyre_, CqnPredicate> filter);

  Car_ models();

  Car_ models(Function<Car_, CqnPredicate> filter);

  ElementRef<Integer> models_Id();

  Seat_ seatCapacity();

  Seat_ seatCapacity(Function<Seat_, CqnPredicate> filter);
}
