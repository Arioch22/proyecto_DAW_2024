import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { SuppliersService } from '../../../../services/suppliers.service';
import { RolIdService } from '../../../../services/rol-id.service';
import { DeleteService } from '../../../../services/delete.service';
import { ResponseApiLoginService } from '../../../../services/response-api-login.service';
import { StatusService } from '../../../../services/status.service';
import { forkJoin, switchMap } from 'rxjs';
import { DataOrdersSupplier, DataStatus, resultOrderSupplier } from '../../../../models/resultsApi.model';
import { WarehouseService } from '../../../../services/warehouse.service';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-list-document-suppliers',
  templateUrl: './list-document-suppliers.component.html',
  styleUrl: './list-document-suppliers.component.scss'
})
export class ListDocumentSuppliersComponent implements OnInit {

  orders: DataOrdersSupplier[] = [];
  order: resultOrderSupplier[] = [];
  warehgouseId: number = 0;
  route: string = '';
  idUser: number = 0;
  rolUser: string = '';
  statuses: DataStatus[] = [];

  constructor(
    private suppliersService: SuppliersService,
    private rolIdService: RolIdService,
    private deleteService: DeleteService,
    private responseApiLoginService: ResponseApiLoginService,
    private statusService: StatusService,
    private warehouseService: WarehouseService,
    private productService: ProductService
  ){}




  ngOnInit(): void {

    this.statusService.getStatus().subscribe(
      (status) => {
        this.statuses = status.data;
      },
      (error) => console.error('Error fetching status:', error)
    );

    this.rolUser = this.rolIdService.getRolID();

    switch(this.rolUser){
      case '1':
        this.suppliersService.getOrderSupplier().subscribe(
          (data) => {this.orders = data.data;},
          (error) => console.error('Error fetching orders:', error)
        );
        break;
      case '2':
        this.idUser = this.responseApiLoginService.getApiResponse().id;
        this.warehouseService.getWarehouse(this.idUser).subscribe((data) => {
          this.warehgouseId = data.data[0].id;
          this.suppliersService
            .getOrderSupplierById(this.warehgouseId)
            .subscribe(
              (data) => {this.orders = data.data;},
              (error) => console.error('Error fetching orders:', error)
            );
        });
        break;

    // if(this.rolUser === '1'){

    //   t else if(this.rolUser === '2'){
    // if(this.rolUser === '2'){



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
        this.suppliersService.getOrderSupplierLines(id).subscribe(
          (data) => {
            const orderLines = data.data;
            if (!Array.isArray(orderLines)) {
              console.error('orderLines is not an array:', orderLines);
              return;
            }

            const groupedLines: any = orderLines.reduce((acc: any, line: any) => {
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
                        parseFloat(product.data.stock) -
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
                this.deleteService.deleteOrdersSupplier(id).subscribe(
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

}
