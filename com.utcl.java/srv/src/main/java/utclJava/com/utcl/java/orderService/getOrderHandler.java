// package utclJava.com.utcl.java.orderService;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Component;

// import com.sap.cds.Result;
// import com.sap.cds.ql.Select;
// import com.sap.cds.ql.cqn.CqnSelect;
// import com.sap.cds.reflect.CdsService;
// import com.sap.cds.services.handler.EventHandler;
// import com.sap.cds.services.handler.annotations.On;
// import com.sap.cds.services.handler.annotations.ServiceName;
// import com.sap.cds.services.persistence.PersistenceService;

// import cds.gen.utclorderservice.UTCLOrderService_;
// import cds.gen.com.utcl.schema.ordermanagement.UTCLOrder_;
// import cds.gen.utclorderservice.GetTotalOrderContext;
// import cds.gen.utclorderservice.Order_;


// @Component
// @ServiceName(UTCLOrderService_.CDS_NAME)
// public class getOrderHandler implements EventHandler{

//     @Autowired
//     private final PersistenceService db;

//     public getOrderHandler(PersistenceService db) {
//         this.db = db;
//     }

// @On(event = GetTotalOrderContext.CDS_NAME){
// public void getTotalOrder(GetTotalOrderContext context){

//     String status = context.getStatus();

//     // Result result = db.run(Select.from("Order").where(o -> o.))

//     CqnSelect select = Select.from(Order_.class).where(o -> o.status().eq(status));

//     Result result = db.run(select);

//     long totalCount = result.rowCount();

//     context.setResult(String.valueOf(totalCount));



// }
// }
// }


package utclJava.com.utcl.java.orderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.sap.cds.Result;
import com.sap.cds.ql.Select;
import com.sap.cds.ql.cqn.CqnSelect;
import com.sap.cds.services.handler.EventHandler;
import com.sap.cds.services.handler.annotations.On;
import com.sap.cds.services.handler.annotations.ServiceName;
import com.sap.cds.services.persistence.PersistenceService;

import cds.gen.utclorderservice.UTCLOrderService_;
import cds.gen.utclorderservice.GetTotalOrderContext;
import cds.gen.utclorderservice.Order_;

@Component
@ServiceName(UTCLOrderService_.CDS_NAME)
public class getOrderHandler implements EventHandler {

    @Autowired
    private final PersistenceService db;

    public getOrderHandler(PersistenceService db) {
        this.db = db;
    }


    @On(event = GetTotalOrderContext.CDS_NAME)
    public void getTotalOrder(GetTotalOrderContext context) {

        String status = context.getStatus();


        System.out.println("abc "+status);

       
        CqnSelect select = Select.from(Order_.class).where(o -> o.status().eq(status));

        
        Result result = db.run(select);

        
        long totalCount = result.rowCount();

        
        context.setResult(String.valueOf(totalCount));
    }
}
