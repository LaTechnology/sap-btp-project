package cds.gen.adminservice;

import com.sap.cds.ql.CdsName;
import com.sap.cds.ql.ElementRef;
import com.sap.cds.ql.StructuredType;
import com.sap.cds.ql.cqn.CqnPredicate;
import java.lang.Integer;
import java.lang.String;
import java.util.function.Function;
import javax.annotation.processing.Generated;

@CdsName("AdminService.Seat")
@Generated(
    value = "cds-maven-plugin",
    date = "2023-11-28T11:06:52.044359734Z",
    comments = "com.sap.cds:cds-maven-plugin:2.4.0 / com.sap.cds:cds4j-api:2.4.0"
)
public interface Seat_ extends StructuredType<Seat_> {
  String CDS_NAME = "AdminService.Seat";

  ElementRef<Integer> Id();

  ElementRef<String> capacity();

  ElementRef<String> seatBrand();

  ModelVarient_ carSeat();

  ModelVarient_ carSeat(Function<ModelVarient_, CqnPredicate> filter);

  ElementRef<Integer> carSeat_Id();
}
