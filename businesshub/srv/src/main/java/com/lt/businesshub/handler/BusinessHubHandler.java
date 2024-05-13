package com.lt.businesshub.handler;


import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.sap.cds.services.handler.annotations.ServiceName;
import com.sap.cds.services.handler.annotations.On;
import com.sap.cds.services.cds.CdsReadEventContext;
import com.sap.cds.services.cds.CqnService;
import com.sap.cds.services.handler.EventHandler;
import com.sap.cds.Result;
import com.sap.cds.ql.cqn.CqnSelect;
import com.sap.cds.services.cds.RemoteService; 
import cds.gen.api_busuiness_partner.ApiBusinessPartner_;
@Component
@ServiceName("business_partner_api_service")
public class BusinessHubHandler implements EventHandler {

    @Autowired
    @Qualifier(ApiBusinessPartner_.CDS_NAME)
    RemoteService remoteService;
    

    @On(event = { CqnService.EVENT_READ }, entity = ABusinessPartnerRole_.CDS_NAME )
    public void getBusinessPartnerRoles(CdsReadEventContext context) {

        CqnSelect selectQuery = context.getCqn();
        Result result = remoteService.run(selectQuery);
        context.setResult(result);
    }
   
}
