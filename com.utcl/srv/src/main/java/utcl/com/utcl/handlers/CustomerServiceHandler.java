package utcl.com.utcl.handlers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.sap.cds.services.EventContext;
import com.sap.cds.services.cds.CqnService;
import com.sap.cds.services.handler.EventHandler;
import com.sap.cds.services.handler.annotations.Before;
import com.sap.cds.services.handler.annotations.On;
import com.sap.cds.services.handler.annotations.ServiceName;
import com.sap.cds.services.persistence.PersistenceService;

import cds.gen.com.utcl.db.Customer_;
import cds.gen.myservice.Customer;
import cds.gen.myservice.GetCustomerByIdContext;
import cds.gen.myservice.MyService_;

@Component
@ServiceName(MyService_.CDS_NAME)
public class CustomerServiceHandler implements EventHandler {

    // private static final Logger logger = LoggerFactory.getLogger()

    private final PersistenceService db;


    @On(event = GetCustomerByIdContext.CDS_NAME)
    public void getCustomerById(GetCustomerByIdContext context){
        String id = context.getId();
        System.out.println("abc "+id);


        // context.setCompleted();
    }

   
}
