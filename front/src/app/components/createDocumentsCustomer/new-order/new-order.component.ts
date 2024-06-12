import { Component, OnInit } from '@angular/core';
import { DataCustomers, DataOrders, DataOrdersCreate } from '../../../models/resultsApi.model';
import { CustomersService } from '../../../services/customers.service';
import { ProductService } from '../../../services/product.service';
import { AuthService } from '../../../services/auth.service';
import { DeliveryService } from '../../../services/client/delivery.service';
import { OrderService } from '../../../services/order.service';
import { IvaService } from '../../../services/iva.service';
import { resultIva, DataIva } from '../../../models/resultsApi.model';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { DataProducts } from '../../../models/resultsApi.model';
import { ResponseApiLoginService } from '../../../services/response-api-login.service';
import { StatusService } from '../../../services/status.service';
import { DataStatus, resultStatus } from '../../../models/resultsApi.model';
import { TradingService } from '../../../services/trading.service';
import { Router, RouterLink } from '@angular/router';
import { Data } from '@angular/router';
import { InvoiceService } from '../../../services/invoice.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { maxDateValidator } from '../../../services/validations/custom-validations.service';
import { DeleteService } from '../../../services/delete.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrl: './new-order.component.scss',
})
export class NewOrderComponent implements OnInit {
  customers: DataCustomers[] = [];
  products: DataProducts[] = [];
  statuses: DataStatus[] = [];
  selectedCustomer: DataCustomers | null = null;
  paidDate: string = '';
  userId: number = 0;
  tradingId: number = 1;
  tradingName: string = '';
  productLines: any[] = [];
  ivaTypes: DataIva[] = [];
  totalBruto: number = 0;
  totalIva: number = 0;
  totalNeto: number = 0;
  selectStatusID: number | null = null;
  currentRoute: string = '';
  service: string = '';
  formGroup: FormGroup;
  today: string = '';
  i: number = 0;

  constructor(
    private customersService: CustomersService,
    private ordersService: OrderService,
    private productsService: ProductService,
    private ivaService: IvaService,
    private responseApi: ResponseApiLoginService,
    private statusService: StatusService,
    private tradingService: TradingService,
    private router: Router,
    private invoiceService: InvoiceService,
    private deliveryService: DeliveryService,
    private fb: FormBuilder,
    private deleteService: DeleteService
  ) {
    this.today = new Date().toISOString().split('T')[0];

    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      documentDate: [this.today, [Validators.required, maxDateValidator(this.today)]],
      paidDate: ['', [maxDateValidator(this.today)]],
      orderNumberForm: ['', Validators.required],
      statusForm: ['', Validators.required],
      nameAgent: ['', Validators.required],
    });

  }

  ngOnInit() {

    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });

    this.customersService.getCustomers().subscribe(
      (customers) => {
        this.customers = customers.data;
        this.showCustomerSelectionModal();
      },
      (error) => console.error('Error fetching customers:', error)
    );

    this.productsService.getProducts().subscribe(
      (products) => {
        this.products = products.data;
        // this.productId = products.data[0].id;
      },
      (error) => console.error('Error fetching products:', error)
    );

    this.ivaService.getIva().subscribe(
      (data) => {
        this.ivaTypes = data.data;
      },
      (error) => console.error('Error fetching IVA types:', error)
    );

    this.statusService.getStatus().subscribe(
      (status) => {
        this.statuses = status.data;
      },
      (error) => console.error('Error fetching status:', error)
    );

    const today = new Date().toISOString().split('T')[0];
    this.formGroup.get('orderDate')?.setValue(today);
    this.today = today;
  }


  showCustomerSelectionModal() {
    Swal.fire({
      title: 'Seleccione un cliente',
      input: 'select',
      inputOptions: this.customers.reduce((acc: any, customer) => {
        acc[customer.id] = customer.name;
        return acc;
      }, {}),
      inputPlaceholder: 'Seleccione un cliente',
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value) {
            resolve(null);
          } else {
            resolve('Debe seleccionar un cliente');
          }
        });
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const customerId = result.value;
        console.log('Esto es customerId:', customerId);
        this.selectedCustomer =
          this.customers.find(
            (customer) => customer.id === parseInt(customerId, 10)
          ) || null;
        this.userId = this.responseApi.getApiResponse().id;
        this.tradingService.getTrading(this.userId).subscribe((data) => {
          this.tradingId = data.data[0].id;
        });
        this.tradingName = this.responseApi.getApiResponse().name;
      } else {
        // Redirigir de vuelta si no se selecciona un cliente
        window.history.back();
      }
    });
  }

  openProductSelectionModal() {
    Swal.fire({
      title: 'Seleccione un producto',
      input: 'select',
      inputOptions: this.products.reduce((acc: any, product) => {
        acc[product.id] = product.name;
        return acc;
      }, {}),
      inputPlaceholder: 'Seleccione un producto',
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value) {
            resolve(null);
          } else {
            resolve('Debe seleccionar un producto');
          }
        });
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const productId = result.value;
        const selectedProduct = this.products.find(
          (product) => product.id === parseInt(productId, 10)
        );
        if (selectedProduct) {
          const existingLine = this.productLines.find(
            (line) => line.name === selectedProduct.name
          );
          if (existingLine) {
            // Calcular el stock actualizado basado en las líneas existentes
            const totalQuantity = this.productLines
              .filter((line) => line.name === selectedProduct.name)
              .reduce((sum, line) => sum + line.quantity, 0);

            const stockRemaining = selectedProduct.stock - totalQuantity;

            // Añadir la nueva línea con el stock actualizado
            this.productLines.push({
              id: selectedProduct.id,
              name: selectedProduct.name,
              description: selectedProduct.description,
              stock: stockRemaining,
              price: selectedProduct.price,
              quantity: 0,
              iva: 0,
              calculatedIva: 0,
              totalBruto: selectedProduct.price,
              totalNeto: 0,
            });
          } else {
            this.productLines.push({
              id: selectedProduct.id,
              name: selectedProduct.name,
              description: selectedProduct.description,
              stock: selectedProduct.stock,
              price: selectedProduct.price,
              quantity: 0,
              iva: 0,
              calculatedIva: 0,
              totalBruto: selectedProduct.price,
              totalNeto: 0,
            });
          }
          this.updateStock();
          this.calculateTotals();
        }
      }
    });
  }

  removeProductLine(index: number) {
    this.productLines.splice(index, 1);
    this.updateStock();
    this.calculateTotals();
  }

  updateTotals(index: number) {
    const productLine = this.productLines[index];
    const quantity = +productLine.quantity;
    const price = +productLine.price;

    productLine.totalBruto = quantity * price;

    const ivaString =
      this.ivaTypes.find((iva) => iva.id === productLine.iva * 1)?.percentage ||
      0;

    productLine.calculatedIva = (productLine.totalBruto * ivaString) / 100;

    productLine.totalNeto =
      productLine.totalBruto + (productLine.totalBruto * ivaString) / 100;

    this.calculateTotals();
  }

  calculateTotals() {
    this.totalBruto = this.productLines.reduce(
      (sum, line) => sum + line.totalBruto * 1,
      0
    );

    this.totalIva = this.productLines.reduce((sum, line) => {
      return sum + line.calculatedIva * 1;
    }, 0);

    this.totalNeto = this.productLines.reduce(
      (sum, line) => sum + line.totalNeto,
      0
    );

    this.totalBruto = parseFloat(this.totalBruto.toFixed(2));
    this.totalIva = parseFloat(this.totalIva.toFixed(2));
    this.totalNeto = parseFloat(this.totalNeto.toFixed(2));
  }

  validateIva(productLines: any[]): boolean {
    return !productLines.some(line => !line.iva || line.iva.trim() === '');
}

  comprobarDocument() {
    const productLine = this.productLines;

    if (this.formGroup.valid && this.validateIva(productLine)) {

      this.createDocument();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Por favor, rellene todos los campos o ponga una fecha correcta.',
          });
        }
  }

  createDocument() {
    if (!this.selectedCustomer) {
      alert('Por favor, seleccione un cliente.');
      return;
    }
    const selectId = this.selectStatusID
      ? parseInt(this.selectStatusID.toString())
      : 0;

    // this.currentRoute = this.router.url;

    const orderData: DataOrdersCreate = {
      customerId: this.selectedCustomer.id,
      tradingId: this.tradingId,
      nameCustomer: this.selectedCustomer.name,
      nameTrading: this.tradingName,
      statusId: this.formGroup.value.statusForm,
      totalBruto: this.totalBruto,
      totalNeto: this.totalNeto,
      totalIva: this.totalIva,
      totalIrpf: null,
      dateOrder: this.formGroup.value.documentDate,
    };

    switch (this.currentRoute) {
      case '/newOrder':
      orderData.orderNumber = this.formGroup.value.orderNumberForm;
      this.createOrder(orderData);
        break;
      case '/newDelivery':
        orderData.deliveryNumber = this.formGroup.value.orderNumberForm;
        this.createDelivery(orderData);
        break;
      case '/newInvoice':
        orderData.invoiceNumber = this.formGroup.value.orderNumberForm;
        orderData.paidDated = this.paidDate;
        this.createInvoice(orderData);
        break;
    }
  }

    createOrder(orderData: DataOrdersCreate) {
      this.ordersService.createOrder(orderData).subscribe(
        (response) => {
          const tipo = 'pedido';
          this.handleOrderOrInvoiceResponse(response, tipo);
        },
        (error) => {
          console.log('Pedido creado con éxito:', orderData);
          console.error('Error creando el pedido:', error);
          alert('Hubo un error al crear el pedido');
        }
      );
    }

    createInvoice(orderData: DataOrdersCreate) {
      this.invoiceService.createInvoice(orderData).subscribe(
        (response) => {
          const tipo = 'factura';
          this.handleOrderOrInvoiceResponse(response, tipo);
        },
        (error) => {
          console.log('Factura creada con éxito:', orderData);
          console.error('Error creando la factura:', error);
          alert('Hubo un error al crear la factura');
        }
      );
    }

    createDelivery(orderData: DataOrdersCreate) {
      this.deliveryService.createDelivery(orderData).subscribe(
        (response) => {
          const tipo = 'albaran';
          this.handleOrderOrInvoiceResponse(response, tipo);
        },
        (error) => {
          console.log('Factura creada con éxito:', orderData);
          console.error('Error creando la factura:', error);
          alert('Hubo un error al crear la factura');
        }
      );
    }

    handleOrderOrInvoiceResponse(response: any, tipo: string) {
        const orderId = response.data;

        if (tipo === 'pedido') {
          const orderId = response.data;
          const orderLinesData = this.productLines.map( (line) => (
            {
              customer_order_id: orderId.id,
              product_id: line.id,
              description_product: line.description,
              quantity: line.quantity,
              price_unity: line.price,
              total_neto: line.totalNeto,
              tipo_iva: line.iva,
              iva: line.calculatedIva,
              tipo_irpf: null,
              irpf: null,
              total: line.totalNeto,
            }
          )
        );

        this.ordersService.createOrderRows(orderLinesData).subscribe(
          () => {
            alert('Pedido y líneas del pedido creados con éxito');
            this.updateProductStocks();
            this.router.navigateByUrl('/order');

          },
          (error) => {
            console.error('Error creando las líneas del pedido:', error);
            this.deleteService.deleteOrders(orderId.id).subscribe(
              () => console.log('Pedido eliminado con éxito'),
              (error) => console.error('Error eliminando el pedido:', error)
            );
            alert('Hubo un error al crear las líneas del pedido');
          }
        );
      }else if (tipo === 'factura') {

        const orderId = response.data;
          const orderLinesData = this.productLines.map( (line) => (
            {
              customer_invoice_id: orderId.id,
              product_id: line.id,
              description_product: line.description,
              quantity: line.quantity,
              price_unity: line.price,
              total_neto: line.totalNeto,
              tipo_iva: line.iva,
              iva: line.calculatedIva,
              tipo_irpf: null,
              irpf: null,
              total: line.totalNeto,
            }
          )
        );
        console.log('Esto es orderLinesData:', orderLinesData);

        this.invoiceService.createInvoiceRows(orderLinesData).subscribe(
          () => {
            alert('Pedido y líneas del pedido creados con éxito');
            this.updateProductStocks();
            this.router.navigateByUrl('/invoices');
          },
          (error) => {
            console.error('Error creando las líneas del pedido:', error);
            this.deleteService.deleteInvoices(orderId.id).subscribe(
              () => console.log('Factura eliminada con éxito'),
              (error) => console.error('Error eliminando la factura:', error)
            );
            alert('Hubo un error al crear las líneas del pedido');
          }
        );

      }else if(tipo === 'albaran'){
        const orderId = response.data;
          const orderLinesData = this.productLines.map( (line) => (
            {
              customer_delivery_note_id: orderId.id,
              product_id: line.id,
              description_product: line.description,
              quantity: line.quantity,
              price_unity: line.price,
              total_neto: line.totalNeto,
              tipo_iva: line.iva,
              iva: line.calculatedIva,
              tipo_irpf: null,
              irpf: null,
              total: line.totalNeto,
            }
          )
        );

        this.deliveryService.createDeliveryRows(orderLinesData).subscribe(
          () => {
            alert('Pedido y líneas del pedido creados con éxito');
            this.updateProductStocks();
            this.router.navigateByUrl('/delivery');
          },
          (error) => {
            console.error('Error creando las líneas del pedido:', error);
            this.deleteService.deleteDelivery(orderId.id).subscribe(
              () => console.log('Albarán eliminado con éxito'),
              (error) => console.error('Error eliminando el albarán:', error)
            );
            alert('Hubo un error al crear las líneas del pedido');
          }
        );
      }

      }


  updateStock() {
    this.productLines.forEach((line, index) => {
      const selectedProduct = this.products.find(
        (product) => product.name === line.name
      );

      if (selectedProduct) {
        const totalQuantity = this.productLines
          .filter((pl) => pl.name === line.name)
          .reduce((sum, pl) => sum + pl.quantity, 0);

        line.stock = selectedProduct.stock - totalQuantity;

        // Asegurarse que el stock no sea negativo
        if (line.stock < 0) {
          alert('La cantidad total supera el stock disponible');
          line.quantity = (line.quantity*1) + (line.stock*1); // revertimos la cantidad ingresada
          line.stock = 0;
        }
      }
    });
  }

  updateProductStocks() {
    const productStockUpdates = new Map<number, number>();

    // Calculamos la cantidad total de cada producto en las líneas del pedido
    this.productLines.forEach(line => {
      console.log('Esto es line:', line);
      const currentStock = productStockUpdates.get(line.name) || 0;
      productStockUpdates.set(line.name, currentStock + line.quantity);
    });

    console.log('Esto es productStockUpdates:', productStockUpdates);

    // Actualizamos el stock en la base de datos
    productStockUpdates.forEach((quantity, productName) => {
      const product = this.products.find(p => p.name === String(productName));
      console.log('Esto es product:', product);
      if (product) {
        const updatedStock = product.stock - quantity;
        this.productsService.updateProductStock(product.id, updatedStock).subscribe(
          response => {
            console.log(`Stock actualizado para el producto ${productName}: ${updatedStock}`);
          },
          error => {
            console.error(`Error actualizando el stock para el producto ${productName}:`, error);
          }
        );
      }
    });
  }


  updateProductStock() {

    const productStocks: { [key: number]: number } = {};

    this.productLines.forEach((line) => {
      const productId = line.product_id;
      if (!productStocks[productId]) {
        productStocks[productId] = line.stock;
      } else {
        productStocks[productId] = Math.min(
          productStocks[productId],
          line.stock
        );
      }
    });

    Object.keys(productStocks).forEach((productId) => {
      console.log('Stocks a actualizar:', productStocks);
      const finalStock = productStocks[parseInt(productId)];
      this.productsService
        .updateProductStock(parseInt(productId), finalStock)
        .subscribe(
          (response) => console.log('Stock actualizado con éxito', response),
          (error) => console.error('Error actualizando el stock:', error)
        );
    });
  }
}

