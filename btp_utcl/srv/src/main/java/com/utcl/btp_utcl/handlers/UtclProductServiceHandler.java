package com.utcl.btp_utcl.handlers;

import java.util.Collection;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.sap.cds.Result;
import com.sap.cds.ql.Select;
import com.sap.cds.ql.Upsert;
import com.sap.cds.ql.cqn.CqnSelect;
import com.sap.cds.ql.cqn.CqnUpsert;
import com.sap.cds.services.handler.EventHandler;
import com.sap.cds.services.handler.annotations.On;
import com.sap.cds.services.handler.annotations.ServiceName;
import com.sap.cds.services.persistence.PersistenceService;

import cds.gen.com.utcl.db.UTCLProduct_;
import cds.gen.utcldeliveryservice.DeliveryPeriod_;
import cds.gen.utclproductservice.CalculateNumberOfBagsContext;
import cds.gen.utclproductservice.GetDeliveryPeriodContext;
import cds.gen.utclproductservice.UTCLProductService_;

@Component
@ServiceName(UTCLProductService_.CDS_NAME)
public class UtclProductServiceHandler implements EventHandler {

    @Autowired
    private PersistenceService persistenceService;

    @Autowired
    private RestTemplate restTemplate;

    private Logger log = LoggerFactory.getLogger(UtclProductServiceHandler.class);

    @On(event = GetDeliveryPeriodContext.CDS_NAME)
    public void getDeliveryPeriod(GetDeliveryPeriodContext context) {
        String id = context.getId();
        log.info("Id from request " + id);
        CqnSelect query = Select.from(DeliveryPeriod_.CDS_NAME).columns("period")
                .where(b -> b.get("id").eq(id));
        Result result = persistenceService.run(query);
        log.info("Resulted Query " + result);
        String json = result.toJson();
        context.setResult(json);
        context.setCompleted();
    }

    @On(event = CalculateNumberOfBagsContext.CDS_NAME)
    public void calculateNumberOfBags(CalculateNumberOfBagsContext context) {
        Double quantity = context.getQuantity();
        log.info("Received Quantity " + quantity);
        Double calculation = quantity * 20;
        int result = calculation.intValue();
        log.info("No of Bags : " + result);
        context.setResult(result);
    }

    public void getProductDetails() {
        String url = "";//api from ecc system
        ResponseEntity<Collection> response = restTemplate.getForEntity(url, Collection.class);
        if (response.getStatusCode().is2xxSuccessful()) {
            log.info("data fetched succesfully");
            Collection data = response.getBody();
            CqnUpsert upsert = Upsert.into(UTCLProduct_.CDS_NAME).entries(data);
            Result result = persistenceService.run(upsert);
            log.info("Data Fetched and inserted sucessfully");
        } else {
            throw new RuntimeException("Failed to fetch data: " + response.getStatusCode());
        }
    }

}
