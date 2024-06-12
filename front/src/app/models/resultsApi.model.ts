export interface DataDeliveryOrder {
    id: number;
    deliveryNumber: string;
    customerId: number;
    tradingId: number;
    nameCustomer: string;
    nameTrading: string;
    statusId: number;
    totalBruto: number;
    totalNeto: number;
    totalIva: number;
    totalIrpf: number;
    dateOrder: string;
}

export interface DataOrders {
  id: number;
  orderNumber: string;
  customerId: number;
  tradingId: string;
  nameCustomer: string;
  nameTrading: string;
  statusId: number | null;
  totalBruto: number;
  totalNeto: number;
  totalIva: number;
  totalIrpf: number | null;
  dateOrder: string;
}

export interface DataInvoices {
  id: number;
  invoiceNumber: string;
  customerId: number;
  tradingId: number;
  nameCustomer: string;
  nameTrading: string;
  statusId: number;
  totalBruto: number;
  totalNeto: number;
  totalIva: number;
  totalIrpf?: number;
  dateOrder: string;
  paidDated?: string;
}

export interface DataOrdersCreate {
  orderNumber?: string;
  invoiceNumber?: string;
  deliveryNumber?: string;
  customerId: number;
  tradingId: number;
  nameCustomer: string;
  nameTrading: string;
  statusId: number | null;
  totalBruto: number;
  totalNeto: number;
  totalIva: number;
  totalIrpf: number | null;
  dateOrder: string;
  paidDated?: string;
}

export interface DataOrdersSupplierCreate{
  id?: number,
  orderNumber   : string,
  supplierId    : number,
  warehouseId   : number,
  nameSupplier  : string,
  nameWarehouse : string,
  statusId      : number,
  totalBruto    : number
  totalNeto     : number,
  totalIva      : number,
  totalIrpf     ?: number | null,
  dateOrder     : string,
  paidDated     ?: string | null
}

export interface DataOrdersSupplier{
  id: number,
  orderNumber   : string,
  supplierId    : number,
  warehouseId   : number,
  nameSupplier  : string,
  nameWarehouse : string,
  statusId      : number,
  totalBruto    : number
  totalNeto     : number,
  totalIva      : number,
  totalIrpf     ?: number | null,
  dateOrder     : string,
  paidDated     ?: string | null
}

export interface DataOrdersSupplierGet{
  id?: number,
  order_number   : string,
  supplier_id    : number,
  warehouse_id   : number,
  name_supplier  : string,
  name_warehouse : string,
  status_id      : number,
  total_bruto    : number
  total_neto     : number,
  total_iva      : number,
  total_irpf     ?: number | null,
  date_order     : string,
  paid_dated     ?: string | null
}

export interface DataInvoiceOrder {
  id: number;
  invoiceNumber: string;
  customerId: number;
  tradingId: number;
  nameCustomer: string;
  nameTrading: string;
  statusId: number;
  totalBruto: number;
  totalNeto: number;
  totalIva: number;
  totalIrpf: number;
  dateOrder: string;
  paidDated: string;
}

export interface DataDeliveryCreate {
  deliveryNumber: string;
  invoiceNumber?: string;
  customerId: number;
  tradingId: number;
  nameCustomer: string;
  nameTrading: string;
  statusId: number | null;
  totalBruto: number;
  totalNeto: number;
  totalIva: number;
  totalIrpf: number | null;
  dateOrder: string;
  paidDated?: string;
}

export interface DataProducts {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  stock_min: number;
}

export interface DataSuppliers {
  id: number;
  name: string;
  type: string;
  cifnif: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
  email: string;
}

export interface DataCustomers {
  id: number;
  name: string;
  type: string;
  cifnif: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
  email: string;
}

export interface DataIva {
  id: number;
  name: string;
  percentage: number;
}

export interface DataStatus{
  id: number;
  name: string;
  description: string;
}

export interface resultsDelivery {
    data: DataDeliveryOrder[];
    message: string;
    status: string;
    code: number;
}

export interface resultsOrders {
  data: DataOrders[];
  message: string;
  status: string;
  code: number;
}

export interface resultsInvoice {
  data: DataInvoiceOrder[];
  message: string;
  status: string;
  code: number;
}

export interface resultProducts {
  data: DataProducts[];
  message: string;
  status: string;
  code: number;
}

export interface resultSuppliers {
  data: DataSuppliers[];
  message: string;
  status: string;
  code: number;
}

export interface resultOrderSupplier {
  data: DataOrdersSupplierCreate[];
  message: string;
  status: string;
  code: number;
}

export interface resultOrderSuppliers {
  data: DataOrdersSupplier[];
  message: string;
  status: string;
  code: number;
}

export interface resultCustomers {
  data: DataCustomers[];
  message: string;
  status: string;
  code: number;
}

export interface resultIva {
  data: DataIva[];
  message: string;
  status: string;
  code: number;
}

export interface resultStatus {
  data: DataStatus[];
  message: string;
  status: string;
  code: number;
}

export interface trading{
  id: number;
  user_id: number;
  name: string;
  dni: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
  email: string;
}

export interface resultsTrading {
  data: trading[];
  message: string;
  status: string;
  code: number;
}

export interface resultsWarehouse {
  data: trading[];
  message: string;
  status: string;
  code: number;
}

export interface resultOrderSupplierGet {
  data: DataOrdersSupplierGet[];
  message: string;
  status: string;
  code: number;
}
