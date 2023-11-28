package com.sap.bookshop.handlers;

import org.springframework.stereotype.Component;

import com.sap.cds.Result;
import com.sap.cds.ql.Insert;
import com.sap.cds.ql.cqn.CqnAnalyzer;
import com.sap.cds.ql.cqn.CqnInsert;
import com.sap.cds.ql.cqn.CqnSelect;
import com.sap.cds.reflect.CdsModel;
import com.sap.cds.services.handler.EventHandler;
import com.sap.cds.services.handler.annotations.On;
import com.sap.cds.services.handler.annotations.ServiceName;
import com.sap.cds.services.persistence.PersistenceService;


import cds.gen.catalogservice.AddReviewContext;
import cds.gen.catalogservice.Books;
import cds.gen.catalogservice.CatalogService_;
import cds.gen.catalogservice.Reviews;
import cds.gen.com.sap.bookshop.Reviews_;

@Component
@ServiceName(CatalogService_.CDS_NAME) // Map the service
public class CatalogServiceHandler implements EventHandler{

    private final PersistenceService db;
    private final CqnAnalyzer analyzer;

    CatalogServiceHandler(PersistenceService db, CdsModel model){
        this.db = db;
        this.analyzer = CqnAnalyzer.create(model);
    }
    
    @On(event = AddReviewContext.CDS_NAME)
    public void addReview(AddReviewContext context){   
        System.out.println("Event handler triggered...");
        CqnSelect select = context.getCqn();
        String bookId = String.valueOf(analyzer.analyze(select).targetKeys().get(Books.ID));
        System.out.println("BookId is: " + bookId);

        Reviews review =  Reviews.create();
        review.setBookId(bookId);
        review.setTitle(context.getTitle());
        review.setRating(context.getRating());
        review.setText(context.getText());

        CqnInsert reviewInsert = Insert.into(Reviews_.CDS_NAME).entry(review);
        System.out.println(reviewInsert);
        Result savedReview = db.run(reviewInsert);
        Reviews newReview = savedReview.single(Reviews.class);

        context.setResult(newReview);
    }
}