import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { isGuestGuard, isUserAuthenticatedGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TradingInfoComponent } from './components/trading-info/trading-info.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DeliveryComponent } from './components/clients//delivery/delivery.component';
import { DeliveryFormCreateComponent } from './components/clients/delivery/delivery-form-create/delivery-form-create.component';
import { CreateTradingComponent } from './components/user/trading/form/create-trading/create-trading.component';
import { CreateSupplierComponent } from './components/user/supplier/form/create-supplier/create-supplier.component';
import { existUserGuardWarehouse, existUserGuardWarehouseCreate, exisUserGuardTradingCreate } from './guards/exist-user.guard';
import { existUserGuardTrading } from './guards/exist-user.guard';
import { controlUserGuardWarehouse } from './guards/exist-user.guard';
import { controlUserGuardTrading } from './guards/exist-user.guard';
import { NewCustomerComponent } from './components/new-customer/new-customer.component';
import { WarehouseComponent } from './components/user/warehouse/warehouse.component';
import { InvoicesComponent } from './components/clients/invoices/invoices.component';
import { OrderComponent } from './components/clients/order/order.component';
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

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [isGuestGuard]},
  { path: 'signup', component: SignupComponent, canActivate: [roleGuard,isUserAuthenticatedGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [isUserAuthenticatedGuard, existUserGuardWarehouse, existUserGuardTrading]},
  { path: 'trading', component: TradingInfoComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'navbar', component: NavbarComponent},


  //Zona de Agentes
  { path: 'delivery', component: DeliveryComponent, canActivate: [controlUserGuardTrading]},
  { path: 'invoices', component: InvoicesComponent, canActivate: [controlUserGuardTrading]},
  { path: 'order', component: OrderComponent, canActivate: [controlUserGuardTrading]},
  { path: 'newOrder', component: NewOrderComponent, canActivate: [controlUserGuardTrading]},
  { path: 'newInvoice', component: NewInvoiceComponent, canActivate: [controlUserGuardTrading]},
  { path: 'newDelivery', component: NewDeliveryComponent, canActivate: [controlUserGuardTrading]},
  { path: 'listCustomers', component: CustomersComponent, canActivate: [controlUserGuardTrading]},
  { path: 'newCustomer', component: NewCustomerComponent,  canActivate: [controlUserGuardTrading]},
  { path: 'editCustomer/:id', component: EditCustomerComponent, canActivate: [controlUserGuardTrading]},

  //Zona de alta de usuarios de almacén y trading
  { path: 'CreateTradingComponent', component: CreateTradingComponent, canActivate: [exisUserGuardTradingCreate]},//Usuario Agente
  { path: 'CreateWarehouse', component: WarehouseComponent, canActivate: [existUserGuardWarehouseCreate]},//usuario almacén


  //Zona de Almacenes
  { path: 'listOrderSupplier', component: ListDocumentSuppliersComponent, canActivate: [controlUserGuardWarehouse]},
  { path: 'newDocumentSupplier', component: CreateDocumentSuppliersComponent, canActivate: [controlUserGuardWarehouse]},

  { path: 'CreateSupplierComponent', component: CreateSupplierComponent, canActivate: [controlUserGuardWarehouse] },

  { path: 'CreateProduct', component: ProductComponent, canActivate: [controlUserGuardWarehouse]},
  { path: 'listProducts', component: ProductsComponent, canActivate: [controlUserGuardWarehouse]},
  { path: 'editProduct/:id', component: EditProductsComponent, canActivate: [controlUserGuardWarehouse]},
  { path: 'editSupplier/:id', component: EditSupplierComponent, canActivate: [controlUserGuardWarehouse]},
  { path: 'listSuppliers', component: ProveedoresComponent, canActivate: [controlUserGuardWarehouse]},

  //Zona de errores
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
