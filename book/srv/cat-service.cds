using {com.sap.cap.book as bookshop} from '../db/schema'; 

 

@path : 'browse' 
service CatalogService { 

  entity Books as projection on bookshop.Books; 

} 