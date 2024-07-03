package customer.books.handler;

import com.sap.cds.reflect.*;
import com.sap.cds.services.EventContext;
import com.sap.cds.services.handler.annotations.On;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BookService {

    private static final Logger logger = LoggerFactory.getLogger(BookService.class);

    @Autowired
    private CdsModel model;

    @On(event = "READ", service = "books.srv.MyService")
    public void readBooksVerify(EventContext context) {
        System.out.println("hi123");
        logger.info("Handling READ event for Books entity.");

        // Add more logging for debugging
        logger.debug("Inside readBooksVerify method.");

        // Obtain the CDS model from the context (alternatively, use the injected model)
        CdsModel model = context.getModel();

        // Get the 'Books' entity
        CdsEntity books = model.getEntity("my.bookshop.Books");

        // Inspect the 'title' element
        CdsElement title = books.getElement("title");

        boolean key = title.isKey();      // false
        CdsType type = title.getType();   // CdsSimpleType

        if (type.isSimple()) {   // true
            CdsSimpleType simple = type.as(CdsSimpleType.class);

            String typeName = simple.getQualifiedName();  // "cds.String"
            CdsBaseType baseType = simple.getType();      // CdsBaseType.STRING
            Class<?> javaType = simple.getJavaType();     // String.class
            Boolean localized = simple.get("localized");  // true
            Integer length = simple.get("length");        // 111

            // Print the details
            logger.info("Element: title");
            logger.info("  Is Key: {}", key);
            logger.info("  Type Name: {}", typeName);
            logger.info("  Base Type: {}", baseType);
            logger.info("  Java Type: {}", javaType.getName());
            logger.info("  Localized: {}", localized);
            logger.info("  Length: {}", length);
        }
    }
}
