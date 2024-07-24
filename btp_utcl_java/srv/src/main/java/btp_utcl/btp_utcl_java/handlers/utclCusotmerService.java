package btp_utcl.btp_utcl_java.handlers;

import java.util.Collection;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.sap.cds.Result;
import com.sap.cds.ql.Select;
import com.sap.cds.ql.Upsert;
import com.sap.cds.ql.cqn.CqnSelect;
import com.sap.cds.ql.cqn.CqnUpsert;
import com.sap.cds.services.cds.CqnService;
import com.sap.cds.services.handler.EventHandler;
import com.sap.cds.services.handler.annotations.Before;
import com.sap.cds.services.handler.annotations.On;
import com.sap.cds.services.handler.annotations.ServiceName;
import com.sap.cds.services.persistence.PersistenceService;

import cds.gen.btp_utcl_java.srv.utclcustomerservice.CustomerType;
import cds.gen.btp_utcl_java.srv.utclcustomerservice.GetCustomerTypeContext;
import cds.gen.btp_utcl_java.srv.utclcustomerservice.UTCLCustomerService_;
import cds.gen.com.utcl.db.UTCLCustomerType_;
import cds.gen.com.utcl.db.UTCLCustomer_;
import cds.gen.mdkservices.MdkServices_;




@Component
@ServiceName({UTCLCustomerService_.CDS_NAME, MdkServices_.CDS_NAME})
public class utclCusotmerService implements EventHandler {

    @Autowired
    private PersistenceService persistenceService;

   
    private final RestTemplate restTemplate;

    @Autowired
    public utclCusotmerService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    
    private Logger log = LoggerFactory.getLogger(utclCusotmerService.class);

    @On(event = GetCustomerTypeContext.CDS_NAME)
    public void getCustomerType(GetCustomerTypeContext context) {
        String id = context.getId();
        log.info("Id from request " + id);
        CqnSelect query = Select.from(UTCLCustomerType_.CDS_NAME).columns("customerType")
                .where(b -> b.get("id").eq(id));

        Result result = persistenceService.run(query);
        log.info("resulted Query " + result);
        String json = result.toJson();
        context.setResult(json);
        context.setCompleted();
    }

    // @On(event = ValidatePincodeContext.CDS_NAME)
    // public void validatePincode(ValidatePincodeContext context) {
    //     String pincode = context.getPincode();
    //     log.info("Received Pincode " + pincode);
    //     String url = "https://api.postalpincode.in/pincode/" + pincode;
    //     System.out.println("Pincode url" + url);
    // }
    
    @Before(event = CqnService.EVENT_CREATE, entity = "UTCLCustomerService.CustomerType")
    public void checkCustomerTypeAlreadyPresentOrNot(CustomerType customerType) {
        String receivedCustomerType = customerType.getCustomerType();
        log.info("Received Customer Type " + receivedCustomerType);
        CqnSelect query = Select.from(UTCLCustomerType_.CDS_NAME)
                .where(b -> b.get("customerType").eq(receivedCustomerType));
        Result result = persistenceService.run(query);
        System.out.println(result);
        if (result.first().isPresent()) {
            log.info("Customer Type is already present: {}", receivedCustomerType);
            throw new IllegalArgumentException("Customer Type already exists");
        } else {
            customerType.setCustomerType(receivedCustomerType);
        }
    }

    public String getCustomerDetails() {
        String url = "";//api from ecc system
        ResponseEntity<Collection> response = restTemplate.getForEntity(url, Collection.class);
        if (response.getStatusCode().is2xxSuccessful()) {
            log.info("data fetched succesfully");
            Collection data = response.getBody();
            CqnUpsert upsert = Upsert.into(UTCLCustomer_.CDS_NAME).entries(data);
            Result result = persistenceService.run(upsert);
            log.info("Data Fetched and inserted sucessfully");

        } else {
            throw new RuntimeException("Failed to fetch data: " + response.getStatusCode());
        }
        return null;
    
}
}
