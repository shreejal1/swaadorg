export type Unit = 'kg' | 'g' | 'pcs' | 'l' | 'ml';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  image: string;
  unit: Unit;
  stock: number;
}

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  unit: Unit;
  price: number;
}

export type OrderStatus = 'pending_payment' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  transactionCode?: string;
  paymentScreenshotUrl?: string;
}