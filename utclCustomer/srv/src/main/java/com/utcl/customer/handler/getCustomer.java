package com.utcl.customer.handler;

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

import cds.gen.utclcustomer.Dealer_;
import cds.gen.utclcustomer.Dealer;
import cds.gen.utclcustomer.GetdealerandretalerContext;
import cds.gen.utclcustomer.UTCLCustomer_;

import java.util.List;

@Component
@ServiceName(UTCLCustomer_.CDS_NAME)
public class getCustomer implements EventHandler {

    @Autowired
    private PersistenceService persistenceService;

    private static final Logger log = LoggerFactory.getLogger(getCustomer.class);

    @On(event = GetdealerandretalerContext.CDS_NAME)
    public void getDetails(GetdealerandretalerContext context) {

        String id = context.getId();

        System.out.println(id);

        log.info("Customer id to process : " + id);

        CqnSelect demoSelect = Select.from(Dealer_.class)
                .columns(a -> a.id(), a -> a.firstName(), a -> a.lastName(), a -> a.email(), a -> a.mobileNumber(), a -> a.dealerID(),
                        a -> a.toAddress().expand(d -> d.addressLine1(), d -> d.addressLine2(), d -> d.addressLine3(), d -> d.addressLine4(),
                                d -> d.city(), d -> d.country(), d -> d.mobileNumber(), d -> d.pincode(), d -> d.state()),
                        a -> a.toRetailer().expand(b -> b.retailerId(), b -> b.email(), b -> b.firstName(), b -> b.mobileNumber(), b -> b.id(),
                                b -> b.lastName(), b -> b.toDealer_id(),
                                b -> b.toAddress().expand(c -> c.addressLine1(), c -> c.addressLine2(), c -> c.addressLine3(),
                                        c -> c.addressLine4(), c -> c.city(), c -> c.country(),
                                        c -> c.mobileNumber(), c -> c.pincode(), c -> c.state())))
                .where(o -> o.id().eq(id));

        log.info("The Query Executed : " + demoSelect);

        Result result = persistenceService.run(demoSelect);

        log.info("Query Result : " + result);

        List<Dealer> dealers = result.listOf(Dealer.class);

        context.setResult(dealers);
    }
}
