interface Shipment {
  id: string;
  order_number: string;
  package_number: string;
  shipment_number: string;
  market: string;
  package_weight: number;
  carrier: string;
  tracking_number: string;
  tracking_url: string;
  status: 'shipped' | 'pending' | 'delivered' | string;
  created_at: string; // ISO 8601 timestamp
  updated_at: string; // ISO 8601 timestamp
}

interface ShopwareShipments {
  id: string;
  createdAt: string;
  trackingCode: string;
  orderState: string;
  shippingMethod: string;
  trackingLink: string;
  shippingDateEarliest: string;
  shippingDateLatest: string;
  associatedOrderNumber: string;
}

interface Product {
  id: string;
  manufacturerNumber: string;
  ean: string;
  sales: number;
  productNumber: string;
  availableStock: number;
  name: string;
  manufacturer: {
    name: ?string;
  };
}
