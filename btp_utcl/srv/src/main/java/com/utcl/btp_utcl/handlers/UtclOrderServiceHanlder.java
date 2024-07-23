package com.utcl.btp_utcl.handlers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.sap.cds.services.handler.EventHandler;
import com.sap.cds.services.handler.annotations.ServiceName;
import com.sap.cds.services.persistence.PersistenceService;

import cds.gen.com.utcl.srv.utclorderservice.UTCLOrderService_;
import cds.gen.mdkservices.MDkServices_;

@Component
@ServiceName({UTCLOrderService_.CDS_NAME,MDkServices_.CDS_NAME})
public class UtclOrderServiceHanlder implements EventHandler {

    @Autowired
    private PersistenceService persistenceService;

    private Logger log = LoggerFactory.getLogger(UtclOrderServiceHanlder.class);

}
