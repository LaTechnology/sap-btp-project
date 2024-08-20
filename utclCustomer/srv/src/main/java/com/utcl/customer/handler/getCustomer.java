package com.utcl.customer.handler;

import java.util.List;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.sap.cds.Result;
import com.sap.cds.ql.Select;
import com.sap.cds.ql.cqn.CqnSelect;
import com.sap.cds.services.handler.EventHandler;
import com.sap.cds.services.handler.annotations.On;
import com.sap.cds.services.handler.annotations.ServiceName;
import com.sap.cds.services.persistence.PersistenceService;

import cds.gen.utclcustomer.Dealer;
import cds.gen.utclcustomer.DealerSampleContext;
import cds.gen.utclcustomer.Dealer_;
import cds.gen.utclcustomer.GetdealerandretalerContext;
import cds.gen.utclcustomer.Retailer_;
import cds.gen.utclcustomer.UTCLCustomer_;


@Component
@ServiceName(UTCLCustomer_.CDS_NAME)
public class getCustomer implements EventHandler{

    @Autowired
    private PersistenceService persistenceService;

    public Logger log = LoggerFactory.getLogger(getCustomer.class);

    @On(event = GetdealerandretalerContext.CDS_NAME)
    public void getDetails(GetdealerandretalerContext context){

        String id = context.getId();

        System.out.println(id); 

        log.info("Cusotmer id : " + id);

        CqnSelect selectDealer = Select.from(Dealer_.class).where(o -> o.dealerID().eq(id));

        CqnSelect demoSelect = Select.from(Dealer_.class)
                .columns(a -> a.id(), a -> a.firstName(),
                        a -> a.lastName(),
                        a -> a.email(),
                        a -> a.mobileNumber(),
                        a -> a.dealerID(),
                        a -> a.toAddress().expand(d -> d.addressLine1(),
                                d -> d.addressLine2(),
                                d -> d.addressLine3(),
                                d -> d.addressLine4(),
                                d -> d.city(),
                                d -> d.country(),
                                d -> d.mobileNumber(),
                                d -> d.pincode(),
                                d -> d.state()),
                        a -> a.toRetailer().expand(b -> b.retailerId(),
                                b -> b.email(),
                                b -> b.firstName(),
                                b -> b.mobileNumber(),
                                b -> b.id(),
                                b -> b.lastName(),
                                b -> b.toDealer_id(),
                                b -> b.toAddress().expand(c -> c.addressLine1(),
                                        c -> c.addressLine2(),
                                        c -> c.addressLine3(),
                                        c -> c.addressLine4(),
                                        c -> c.city(),
                                        c -> c.country(),
                                        c -> c.mobileNumber(),
                                        c -> c.pincode(),
                                        c -> c.state())))
                .where(o -> o.id().eq(id));

        CqnSelect selectRetailer = Select.from(Retailer_.class).where(o -> o.toDealer_id().eq(id));

        // CqnSelect joindandr = select.asJoin().left();

        System.out.println("The Query Executed : " + demoSelect);

        System.out.println("The Query for Dealer : " + selectDealer);

        System.out.println("The Query for Retailer :  " + selectRetailer);

        Result result = persistenceService.run(demoSelect);

        // System.out.println("The resulted query : " + result);

        // List<Dealer> dealers = result.(Dealer.class);

        // context.setResult(dealers);

        

        
    }

    @On(entity = Dealer_.CDS_NAME)
    public void dummy(DealerSampleContext context){

        System.out.println("Hello");

    }
    
}
