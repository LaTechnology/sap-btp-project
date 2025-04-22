package cds.gen.adminservice;

import com.sap.cds.ql.CdsName;
import com.sap.cds.ql.ElementRef;
import com.sap.cds.ql.StructuredType;
import com.sap.cds.ql.cqn.CqnPredicate;
import java.lang.Integer;
import java.lang.String;
import java.util.function.Function;
import javax.annotation.processing.Generated;

@CdsName("AdminService.Engine")
@Generated(
    value = "cds-maven-plugin",
    date = "2023-11-28T11:06:52.044359734Z",
    comments = "com.sap.cds:cds-maven-plugin:2.4.0 / com.sap.cds:cds4j-api:2.4.0"
)
public interface Engine_ extends StructuredType<Engine_> {
  String CDS_NAME = "AdminService.Engine";

  ElementRef<Integer> Id();

  ElementRef<String> modelNumber();

  ElementRef<String> engineType();

  ModelVarient_ engines();

  ModelVarient_ engines(Function<ModelVarient_, CqnPredicate> filter);

  ElementRef<Integer> engines_Id();
}
