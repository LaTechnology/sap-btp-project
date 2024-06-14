namespace my.namespace;

entity Orders {
  key ID          : UUID;
  status          : String(50);
  // Other order-related fields
}

service OrderService {
  action ApproveOrder(orderId: UUID);
}