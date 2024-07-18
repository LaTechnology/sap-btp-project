package com.utcl.btp_utcl.handlers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.sap.cds.Result;
import com.sap.cds.ql.Select;
import com.sap.cds.ql.cqn.CqnSelect;
import com.sap.cds.services.cds.CqnService;
import com.sap.cds.services.handler.EventHandler;
import com.sap.cds.services.handler.annotations.Before;
import com.sap.cds.services.handler.annotations.On;
import com.sap.cds.services.handler.annotations.ServiceName;
import com.sap.cds.services.persistence.PersistenceService;

import cds.gen.com.utcl.db.UTCLDeliveryPeriod_;
import cds.gen.com.utcl.db.UTCLEndUserOfMaterial_;
import cds.gen.com.utcl.db.UTCLSpecialInstruction_;
import cds.gen.utcldeliveryservice.DeliveryPeriod;
import cds.gen.utcldeliveryservice.Enduserofmaterial;
import cds.gen.utcldeliveryservice.Enduserofmaterial_;
import cds.gen.utcldeliveryservice.GetEndUserofMaterialContext;
import cds.gen.utcldeliveryservice.GetSpecialInstructionContext;
import cds.gen.utcldeliveryservice.SpecialInstruction;
import cds.gen.utcldeliveryservice.SpecialInstruction_;
import cds.gen.utcldeliveryservice.UTCLDeliveryService_;

@Component
@ServiceName(UTCLDeliveryService_.CDS_NAME)
public class UtclDeliveryServiceHandler implements EventHandler {

    @Autowired
    private PersistenceService persistenceService;

    private Logger log = LoggerFactory.getLogger(UtclDeliveryServiceHandler.class);

    @On(event = GetSpecialInstructionContext.CDS_NAME)
    public void getSpecialInstruction(GetSpecialInstructionContext context) {
        String id = context.getId();
        log.info("Id from request " + id);
        CqnSelect query = Select.from(SpecialInstruction_.CDS_NAME).columns("instruction")
                .where(b -> b.get("id").eq(id));
        Result result = persistenceService.run(query);
        log.info("Resulted Query " + result);
        String json = result.toJson();
        context.setResult(json);
        context.setCompleted();
    }

    @Before(event = CqnService.EVENT_CREATE, entity = "UTCLDeliveryService.specialInstruction")
    public void checkInstructionAlreadyOrNot(SpecialInstruction specialInstruction) {
        String receivedInstruction = specialInstruction.getInstruction();
        log.info("Received Instruction " + receivedInstruction);
        CqnSelect query = Select.from(UTCLSpecialInstruction_.CDS_NAME)
                .where(b -> b.get("instruction").eq(receivedInstruction));
        Result result = persistenceService.run(query);
        System.out.println(result);
        if (result.first().isPresent()) {
            log.info("specialInstruction is already present: {}", receivedInstruction);
            throw new IllegalArgumentException("specialInstruction already exists");
        } else {
            specialInstruction.setInstruction(receivedInstruction);

        }
    }

    @On(event = GetEndUserofMaterialContext.CDS_NAME)
    public void getEndUserofMaterial(GetEndUserofMaterialContext context) {
        String id = context.getId();
        log.info("Id from request " + id);
        CqnSelect query = Select.from(Enduserofmaterial_.CDS_NAME)
                .where(b -> b.get("id").eq(id));
        Result result = persistenceService.run(query);
        String resultedData = result.toJson();
        context.setResult(resultedData);
    }

    @Before(event = CqnService.EVENT_CREATE, entity = "UTCLDeliveryService.enduserofmaterial")
    public void checkEndUserOfMaterialPresentOrNot(Enduserofmaterial enduserofmaterial) {
        String receivedEndUserMaterial = enduserofmaterial.getEndUserMaterial();
        log.info(receivedEndUserMaterial);
        CqnSelect query = Select.from(UTCLEndUserOfMaterial_.CDS_NAME)
                .where(b -> b.get("endUserMaterial").eq(receivedEndUserMaterial));
        Result result = persistenceService.run(query);
        System.out.println(result);
        if (result.first().isPresent()) {
            log.info("End Material Type is already present: {}", receivedEndUserMaterial);
            throw new IllegalArgumentException("End Material already exists");
        } else {
            enduserofmaterial.setEndUserMaterial(receivedEndUserMaterial);
        }
    }

    @Before(event = CqnService.EVENT_CREATE, entity = "UTCLDeliveryService.deliveryPeriod")
    public void checkDeliveryPeriodPresentOrNot(DeliveryPeriod deliveryPeriod) {
        String receivedDeliveryPeriod = deliveryPeriod.getPeriod();
        log.info("abc" + receivedDeliveryPeriod);
        CqnSelect query = Select.from(UTCLDeliveryPeriod_.CDS_NAME)
                .where(b -> b.get("period").eq(receivedDeliveryPeriod));
        Result result = persistenceService.run(query);
        System.out.println(result);
        if (result.first().isPresent()) {
            log.info("Delivery Type is already present: {}", receivedDeliveryPeriod);
            throw new IllegalArgumentException("Deliver Type already exists");
        } else {
            deliveryPeriod.setPeriod(receivedDeliveryPeriod);
        }

    }
}
