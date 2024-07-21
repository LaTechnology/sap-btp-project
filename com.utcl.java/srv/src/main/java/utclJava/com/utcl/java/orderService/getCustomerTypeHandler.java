package utclJava.com.utcl.java.orderService;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.sap.cds.ql.Select;
import com.sap.cds.ql.cqn.CqnSelect;
import com.sap.cds.services.handler.EventHandler;
import com.sap.cds.services.handler.annotations.On;
import com.sap.cds.services.handler.annotations.ServiceName;
import com.sap.cds.services.persistence.PersistenceService;

import cds.gen.utclcustomerservice.UTCLCustomerService_;
import cds.gen.utclcustomerservice.CustomerType;
import cds.gen.utclcustomerservice.GetCustomerTypeContext;
import cds.gen.utclorderservice.UTCLCustomerType_;


@Component
@ServiceName(UTCLCustomerService_.CDS_NAME)
public class getCustomerTypeHandler implements EventHandler{

    @Autowired
    private PersistenceService db;

    private static final Logger logger = LoggerFactory.getLogger(getCustomerTypeHandler.class);

    public getCustomerTypeHandler(PersistenceService db){

        this.db = db;

    }

    @On(event = GetCustomerTypeContext.CDS_NAME)
    public void getCustomerType(GetCustomerTypeContext context){

        Integer customerTypeId = context.getCustomerTypeId() ;

        logger.info("Fetching Customer Type with status: {}", customerTypeId);
        System.out.println("Fetching Customer Type with status: {}" + customerTypeId);

        CqnSelect select = Select.from(UTCLCustomerType_.class).where(o ->o.customerTypeId().eq(customerTypeId));

        logger.info("Query has been executed to fetch the data for : ",customerTypeId);

        System.out.println("Query has been executed to fetch the data for : "+customerTypeId);

        List<CustomerType> customertype = db.run(select).listOf(CustomerType.class);
        

        if (customertype.isEmpty()) {
            // If no records found, print a statement and set an appropriate result
            System.out.println("No customer type found with ID: " + customerTypeId);
            
            logger.info("No Customer Type has been found for : " + customerTypeId);

        } else {
            // If records are found, set the result
            context.setResult(customertype);

            logger.info("cusotmer found for : " + customerTypeId );
            logger.info("Query executed : "+customertype);

        }

        // context.setResult(customertype);


    }
    
}
