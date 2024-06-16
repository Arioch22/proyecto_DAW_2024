import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { DeliveryService } from '../../../services/client/delivery.service';
import {
  DataDeliveryOrder,
  DataOrders,
  DataInvoices,
  DataStatus
} from '../../../models/resultsApi.model';
import { RolIdService } from '../../../services/rol-id.service';
import { Router } from '@angular/router';
import { DeleteService } from '../../../services/delete.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ResponseApiLoginService } from '../../../services/response-api-login.service';
import { TradingService } from '../../../services/trading.service';
import { InvoiceService } from '../../../services/invoice.service';
import { ProductService } from '../../../services/product.service';
import { forkJoin, switchMap } from 'rxjs';
import { OrderService } from '../../../services/order.service';
import { StatusService } from '../../../services/status.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  deliveries: DataDeliveryOrder[] = [];
  orders: DataOrders[] = [];
  invoices: DataInvoices[] = [];
  delivery: DataDeliveryOrder[] = [];
  order: DataOrders[] = [];
  route: string = '';
  idUser: number = 0;
  idTrading: any;
  rolUser: string = '';
  tradingId: number = 0;
  statuses: DataStatus[] = [];

  constructor(
    private deliveryService: DeliveryService,
    private router: Router,
    private deleteService: DeleteService,
    private responseApi: ResponseApiLoginService,
    private rolId: RolIdService,
    private tradingService: TradingService,
    private invoiceService: InvoiceService,
    private productService: ProductService,
    private orderService: OrderService,
    private statusService: StatusService
  ) {}

  ngOnInit(): void {

    this.statusService.getStatus().subscribe(
      (status) => {
        this.statuses = status.data;
      },
      (error) => console.error('Error fetching status:', error)
    );

    this.route = this.router.url;
    switch (this.route) {
      case '/delivery':
        this.idUser = this.responseApi.getApiResponse().id;
        this.rolUser = this.rolId.getRolID();

        if (this.rolUser === '1') {
          this.deliveryService.getDeliveries().subscribe(
            (data) => (this.deliveries = data.data),
            (error) => console.error('Error fetching deliveries: ', error)
          );
        } else if (this.rolUser === '3') {
          this.idUser = this.responseApi.getApiResponse().id;
          this.tradingService.getTrading(this.idUser).subscribe((data) => {
            this.tradingId = data.data[0].id;
            this.deliveryService
              .getDeliveryByTradingID(this.tradingId.toString())
              .subscribe(
                (data) => (this.deliveries = data.data),
                (error) => console.error('Error fetching deliveries: ', error)
              );
          });
        }
        break;
      case '/order':
        this.rolUser = this.rolId.getRolID();
        if (this.rolUser === '1') {
          this.deliveryService.getOrders().subscribe(
            (data) => (this.orders = data.data),
            (error) => console.error('Error fetching orders:', error)
          );
        } else if (this.rolUser === '3') {
          this.idUser = this.responseApi.getApiResponse().id;
          this.tradingService.getTrading(this.idUser).subscribe((data) => {
            this.tradingId = data.data[0].id;
            this.deliveryService
              .getOrdersByTradingId(this.tradingId.toString())
              .subscribe(
                (data) => (this.orders = data.data),
                (error) => console.error('Error fetching orders:', error)
              );
          });
        }
        break;

      case '/invoices':
        this.rolUser = this.rolId.getRolID();

        if (this.rolUser === '1') {
          this.deliveryService.getInvoices().subscribe(
            (data) => (this.invoices = data.data),
            (error) => console.error('Error fetching invoices:', error)
          );
        } else if (this.rolUser === '3') {
          this.idUser = this.responseApi.getApiResponse().id;
          this.tradingService.getTrading(this.idUser).subscribe(
            (data) => {
                this.deliveryService
                  .getInvoicesByTradingId(data.data[0].id)
                  .subscribe(
                    (data) => (this.invoices = data.data),
                    (error) => console.error('Error fetching invoices:', error)
                  );
            },
            (error) => console.error('Error fetching invoices:', error)
          );
        }
        break;
    }
  }

  getStatusName(statusId: number): string {
    const status = this.statuses.find(s => s.id === statusId);
    return status ? status.name : 'Desconocido';
  }

  public deleteOrder(id: number): void {
    Swal.fire({
      title: '¿Estás seguro de borrar el registro?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        confirmButton: 'order-1',
        denyButton: 'order-2',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.getOrdersLines(id).subscribe(
          (data) => {
            const orderLines = data.data;
            if (!Array.isArray(orderLines)) {
              console.error('orderLines is not an array:', orderLines);
              return;
            }

            const groupedLines: any = orderLines.reduce((acc, line: any) => {
              if (!acc[line.productId]) {
                acc[line.productId] = 0;
              }
              acc[line.productId] += parseFloat(line.quantity);
              return acc;
            }, {});

            const updateStockObservables = Object.keys(groupedLines).map(
              (productId) => {
                return this.productService
                  .getProductsById(parseInt(productId, 10))
                  .pipe(
                    switchMap((product: any) => {
                      const updatedStock =
                        parseFloat(product.data.stock) +
                        parseFloat(groupedLines[productId]);
                      return this.productService.updateProductStock(
                        parseInt(productId, 10),
                        updatedStock
                      );
                    })
                  );
              }
            );

            forkJoin(updateStockObservables).subscribe(
              () => {
                this.deleteService.deleteOrders(id).subscribe(
                  () => {
                    Swal.mixin({
                      toast: true,
                      position: 'center',
                      showConfirmButton: false,
                      timer: 1500,
                      timerProgressBar: true,
                      didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer);
                        toast.addEventListener('mouseleave', Swal.resumeTimer);
                      },
                    }).fire({
                      icon: 'success',
                      title: `El pedido con id ${id} ha sido eliminado.`,
                    });
                    this.orders = this.orders.filter(
                      (invoice) => invoice.id !== id
                    );
                  },
                  (error) => console.error('Error deleting invoice:', error)
                );
              },
              (error) => console.error('Error updating product stock:', error)
            );
          },
          (error) => console.error('Error fetching invoice lines:', error)
        );
      } else if (result.isDenied) {
        Swal.mixin({
          toast: true,
          position: 'center',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        }).fire({
          icon: 'info',
          title: `El pedido con id ${id} no se ha eliminado.`,
        });
      }
    });
  }

  public deleteDelivery(id: number): void {
    Swal.fire({
      title: '¿Estás seguro de borrar el registro?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        confirmButton: 'order-1',
        denyButton: 'order-2',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.deliveryService.getDeliveryLines(id).subscribe(
          (data) => {
            const deliveryLines = data.data;
            if (!Array.isArray(deliveryLines)) {
              return;
            }

            const groupedLines: any = deliveryLines.reduce((acc, line: any) => {
              if (!acc[line.product_id]) {
                acc[line.product_id] = 0;
              }
              acc[line.product_id] += parseFloat(line.quantity);
              return acc;
            }, {});

            const updateStockObservables = Object.keys(groupedLines).map(
              (product_id) => {
                return this.productService
                  .getProductsById(parseInt(product_id, 10))
                  .pipe(
                    switchMap((product: any) => {
                      const updatedStock =
                        parseFloat(product.data.stock) +
                        parseFloat(groupedLines[product_id]);
                      return this.productService.updateProductStock(
                        parseInt(product_id, 10),
                        updatedStock
                      );
                    })
                  );
              }
            );

            forkJoin(updateStockObservables).subscribe(
              () => {
                this.deleteService.deleteDelivery(id).subscribe(
                  () => {
                    Swal.mixin({
                      toast: true,
                      position: 'center',
                      showConfirmButton: false,
                      timer: 1500,
                      timerProgressBar: true,
                      didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer);
                        toast.addEventListener('mouseleave', Swal.resumeTimer);
                      },
                    }).fire({
                      icon: 'success',
                      title: `El albarán con id ${id} ha sido eliminado.`,
                    });
                    this.deliveries = this.deliveries.filter(
                      (invoice) => invoice.id !== id
                    );
                  },
                  (error) => console.error('Error deleting delivery:', error)
                );
              },
              (error) => console.error('Error updating product stock:', error)
            );
          },
          (error) => console.error('Error fetching delivery lines:', error)
        );
      } else if (result.isDenied) {
        Swal.mixin({
          toast: true,
          position: 'center',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        }).fire({
          icon: 'info',
          title: `El albarán con id ${id} no se ha eliminado.`,
        });
      }
    });
  }

  public deleteInvoice(id: number): void {
    Swal.fire({
      title: '¿Estás seguro de borrar el registro?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        confirmButton: 'order-1',
        denyButton: 'order-2',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.invoiceService.getInvoicesLines(id).subscribe(
          (data) => {
            const invoiceLines = data.data;
            if (!Array.isArray(invoiceLines)) {
              console.error('invoiceLines no es un array', invoiceLines);
              return;
            }

            const groupedLines: any = invoiceLines.reduce((acc, line: any) => {
              if (!acc[line.productId]) {
                acc[line.productId] = 0;
              }
              acc[line.productId] += parseFloat(line.quantity);
              return acc;
            }, {});

            // Primero, obtener información del producto y restaurar el stock
            const updateStockObservables = Object.keys(groupedLines).map(
              (productId) => {
                return this.productService
                  .getProductsById(parseInt(productId, 10))
                  .pipe(
                    switchMap((product: any) => {
                      const updatedStock =
                        parseFloat(product.data.stock) +
                        parseFloat(groupedLines[productId]);
                      return this.productService.updateProductStock(
                        parseInt(productId, 10),
                        updatedStock
                      );
                    })
                  );
              }
            );

            // Ejecutar todas las actualizaciones de stock
            forkJoin(updateStockObservables).subscribe(
              () => {
                // Después de actualizar el stock, eliminar la factura y sus líneas
                this.deleteService.deleteInvoices(id).subscribe(
                  () => {
                    Swal.mixin({
                      toast: true,
                      position: 'center',
                      showConfirmButton: false,
                      timer: 1500,
                      timerProgressBar: true,
                      didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer);
                        toast.addEventListener('mouseleave', Swal.resumeTimer);
                      },
                    }).fire({
                      icon: 'success',
                      title: `La factura con id ${id} ha sido eliminada.`,
                    });
                    this.invoices = this.invoices.filter(
                      (invoice) => invoice.id !== id
                    );
                  },
                  (error) =>
                    console.error('Error eliminando la factura:', error)
                );
              },
              (error) =>
                console.error(
                  'Error actualizando el stock de los productos:',
                  error
                )
            );
          },
          (error) =>
            console.error('Error obteniendo las líneas de la factura:', error)
        );
      } else if (result.isDenied) {
        Swal.mixin({
          toast: true,
          position: 'center',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        }).fire({
          icon: 'info',
          title: `La factura con id ${id} no se ha eliminado.`,
        });
      }
    });
  }
}
