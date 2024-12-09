using app.Sales as sales from '../db/schema';

service Sales_Service {
   entity SalesHeaders as projection on sales.SalesHeader;
   entity SalesItems as projection on sales.SalesItem;
}