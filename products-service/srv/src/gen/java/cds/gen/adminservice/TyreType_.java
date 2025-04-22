package cds.gen.adminservice;

import com.sap.cds.ql.CdsName;
import com.sap.cds.ql.ElementRef;
import com.sap.cds.ql.StructuredType;
import java.lang.Integer;
import java.lang.String;
import javax.annotation.processing.Generated;

@CdsName("AdminService.TyreType")
@Generated(
    value = "cds-maven-plugin",
    date = "2023-11-28T11:06:52.044359734Z",
    comments = "com.sap.cds:cds-maven-plugin:2.4.0 / com.sap.cds:cds4j-api:2.4.0"
)
public interface TyreType_ extends StructuredType<TyreType_> {
  String CDS_NAME = "AdminService.TyreType";

  ElementRef<Integer> Id();

  ElementRef<String> tyreType();
}
