package utclJava.com.utcl.java.orderService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.sap.cds.ql.Select;
import com.sap.cds.ql.cqn.CqnSelect;
import com.sap.cds.services.handler.EventHandler;
import com.sap.cds.services.handler.annotations.On;
import com.sap.cds.services.handler.annotations.ServiceName;
import com.sap.cds.services.persistence.PersistenceService;

import cds.gen.utclorderservice.GetOrderListByStatusContext;
import cds.gen.utclorderservice.Order;
import cds.gen.utclorderservice.Order_;
import cds.gen.utclorderservice.UTCLOrderService_;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
@ServiceName(UTCLOrderService_.CDS_NAME)
public class getOrderListHandler implements EventHandler {

    private static final Logger logger = LoggerFactory.getLogger(getOrderListHandler.class);

    @Autowired
    private final PersistenceService db;

    public getOrderListHandler(PersistenceService db) {
        this.db = db;
    }

    @On(event = GetOrderListByStatusContext.CDS_NAME)
    public void getOrderListByStatus(GetOrderListByStatusContext context) {
        String status = context.getStatus();
        logger.info("Fetching orders with status: {}", status);



        CqnSelect getlist = Select.from(Order_.class).where(o -> o.status().eq(status));
        List<Order> orders = db.run(getlist).listOf(Order.class);

        logger.info("Retrieved orders: {}", orders);
        context.setResult(orders);
    }
}
