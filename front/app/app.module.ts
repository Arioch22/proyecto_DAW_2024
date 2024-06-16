import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TradingInfoComponent } from './components/trading-info/trading-info.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InvoicesComponent } from './components/clients/invoices/invoices.component';
import { OrderComponent } from './components/clients/order/order.component';
import { DeliveryComponent } from './components/clients/delivery/delivery.component';
import { CoreModule } from './core/core.module';
import { DeliveryFormCreateComponent } from './components/clients/delivery/delivery-form-create/delivery-form-create.component';
import { CreateTradingComponent } from './components/user/trading/form/create-trading/create-trading.component';
import { CreateSupplierComponent } from './components/user/supplier/form/create-supplier/create-supplier.component';
import { NewCustomerComponent } from './components/new-customer/new-customer.component';
import { WarehouseComponent } from './components/user/warehouse/warehouse.component';
import { ListComponent } from './components/form/list/list.component';
import { ProductComponent } from './components/form/product/product.component';
import { ProductsComponent } from './components/list/products/products.component';
import { ProveedoresComponent } from './components/list/proveedores/proveedores.component';
import { EditProductsComponent } from './components/edit/edit-products/edit-products.component';
import { EditSupplierComponent } from './components/edit/edit-supplier/edit-supplier.component';
import { CustomersComponent } from './components/list/customers/customers.component';
import { EditCustomerComponent } from './components/edit/edit-customer/edit-customer.component';
import { NewOrderComponent } from './components/createDocumentsCustomer/new-order/new-order.component';
import { NewInvoiceComponent } from './components/createDocumentsCustomer/new-invoice/new-invoice.component';
import { NewDeliveryComponent } from './components/createDocumentsCustomer/new-delivery/new-delivery.component';
import { CreateDocumentSuppliersComponent } from './components/warehouse/suppliers/create-document-suppliers/create-document-suppliers.component';
import { ListDocumentSuppliersComponent } from './components/warehouse/suppliers/list-document-suppliers/list-document-suppliers.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    PageNotFoundComponent,
    TradingInfoComponent,
    NavbarComponent,
    InvoicesComponent,
    OrderComponent,
    DeliveryComponent,
    DeliveryFormCreateComponent,
    CreateTradingComponent,
    CreateSupplierComponent,
    NewCustomerComponent,
    WarehouseComponent,
    ListComponent,
    ProductComponent,
    ProductsComponent,
    ProveedoresComponent,
    EditProductsComponent,
    EditSupplierComponent,
    CustomersComponent,
    EditCustomerComponent,
    NewOrderComponent,
    NewInvoiceComponent,
    NewDeliveryComponent,
    CreateDocumentSuppliersComponent,
    ListDocumentSuppliersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CoreModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
