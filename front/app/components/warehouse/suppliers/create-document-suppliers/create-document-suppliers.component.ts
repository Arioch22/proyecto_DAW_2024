import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { maxDateValidator } from '../../../../services/validations/custom-validations.service';
import { max } from 'rxjs';
import { Router } from '@angular/router';
import { SuppliersService } from '../../../../services/suppliers.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { DataIva, DataOrdersSupplierCreate, DataProducts, DataStatus, DataSuppliers } from '../../../../models/resultsApi.model';
import { ResponseApiLoginService } from '../../../../services/response-api-login.service';
import { StatusService } from '../../../../services/status.service';
import { ProductService } from '../../../../services/product.service';
import { IvaService } from '../../../../services/iva.service';
import { OrderSupplierService } from '../../../../services/order-supplier.service';
import { WarehouseService } from '../../../../services/warehouse.service';

@Component({
  selector: 'app-create-document-suppliers',
  templateUrl: './create-document-suppliers.component.html',
  styleUrl: './create-document-suppliers.component.scss'
})
export class CreateDocumentSuppliersComponent implements OnInit{
  formGroup: FormGroup;
  today: string;
  currentRoute: string = '';
  supplier: any[] = [];
  suppliersAll: DataSuppliers[] = [];
  selectSupplier: DataSuppliers | null = null;
  statuses: DataStatus[] = [];
  products: DataProducts[] = [];
  i: number = 0;
  supplierId: number = 0;
  supplierName: string = '';
  userId: number = 0;
  paidDated: string = '';
  productLines: any[] = [];
  ivaTypes: DataIva[] = [];
  totalBruto: number = 0;
  totalIva: number = 0;
  totalNeto: number = 0;
  warehouseName: string = '';
  warehouseId: number = 0;
  selectStatusID: number | null = null;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private suppliers: SuppliersService,
    private responseApi: ResponseApiLoginService,
    private statusService: StatusService,
    private productsService: ProductService,
    private ivaService: IvaService,
    private orderSupplierService: OrderSupplierService,
    private warehouseService: WarehouseService
  ) {

    this.today = new Date().toISOString().split('T')[0];

    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      cifnif: ['', Validators.required],
      documentDate: [this.today, [Validators.required, maxDateValidator(this.today)]],
      paidDated: ['', [maxDateValidator(this.today)]],
      orderNumberForm: ['', Validators.required],
      statusForm: ['', Validators.required],

      // nameWarehouse: ['', Validators.required],



    });
  }


  ngOnInit(): void {

    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });

    this.suppliers.getSuppliers().subscribe((suppliers) => {
      this.supplier = suppliers.data;
      this.showSuppliersSelectionModal();
    });

    this.statusService.getStatus().subscribe(
      (status) => {
        this.statuses = status.data;
      },
      (error) => console.error('Error fetching status:', error)
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

    const today = new Date().toISOString().split('T')[0];
    this.formGroup.get('orderDate')?.setValue(today);
    this.today = today;
  }

showSuppliersSelectionModal() {
  Swal.fire({
    title: 'Seleccione un cliente',
    input: 'select',
    inputOptions: this.supplier.reduce((acc: any, supplier) => {
      acc[supplier.id] = supplier.name;
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
      const supplierId = result.value;
      console.log('Esto es supplierId:', supplierId);
      this.selectSupplier =
        this.supplier.find(
          (supplier) => supplier.id === parseInt(supplierId, 10)
        ) || null;
      this.userId = this.responseApi.getApiResponse().id;
      this.warehouseService.getWarehouse(this.userId).subscribe((data) => {
        this.warehouseId = data.data[0].id;
      });
      this.warehouseName = this.responseApi.getApiResponse().name;
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

validateQuantity(productLines: any[]): boolean {
  return !productLines.some(line => !line.quantity || line.quantity === 0);
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

      line.stock = (selectedProduct.stock *1) + (totalQuantity * 1);

      // Asegurarse que el stock no sea negativo
      if (line.stock < 0) {
        alert('La cantidad total supera el stock disponible');
        line.quantity = line.quantity + line.stock; // revertimos la cantidad ingresada
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
      const updatedStock = (product.stock*1) + (quantity*1);
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
  console.log('Esto es productLines:', this.productLines);

  this.productLines.forEach((line) => {
    const productId = line.id;
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

comprobarDocument() {
  const productLine = this.productLines;

  if (this.formGroup.valid && this.validateIva(productLine) &&productLine.length > 0 && this.validateQuantity(productLine)) {

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
  if (!this.selectSupplier) {
    alert('Por favor, seleccione un cliente.');
    return;
  }
  const selectId = this.selectStatusID
    ? parseInt(this.selectStatusID.toString())
    : 0;

  // this.currentRoute = this.router.url;

  const orderData: DataOrdersSupplierCreate = {
    orderNumber: this.formGroup.value.orderNumberForm,
    supplierId: this.selectSupplier.id,
    warehouseId: this.warehouseId,
    nameSupplier: this.selectSupplier.name,
    nameWarehouse: this.warehouseName,
    statusId: this.formGroup.value.statusForm,
    totalBruto: this.totalBruto,
    totalNeto: this.totalNeto,
    totalIva: this.totalIva,
    totalIrpf: null,
    dateOrder: this.formGroup.value.documentDate,
    paidDated: this.formGroup.value.paidDated,
  };

  this.orderSupplierService.createOrder(orderData).subscribe(
    (response) => {
      console.log('Orden creada:', response);
      const orderId = response.data.id;
      const orderLinesData = this.productLines.map((line) => ({
        order_id: orderId,
        product_id: line.id,
        description_product: line.description,
        quantity: line.quantity,
        price_unity: line.price,
        iva: line.iva,
        total_bruto: line.totalBruto,
        total: line.totalNeto,
      }));

      this.orderSupplierService.createOrderRows(orderLinesData).subscribe(
        (response) => {
          console.log('Líneas de pedido creadas:', response);
          this.updateProductStock();
          Swal.fire({
            icon: 'success',
            title: 'Documento creado',
            text: 'El documento se ha creado con éxito.',
          }).then(() => {
            this.router.navigate(['/listOrderSupplier']);
          });
        },
        (error) => {
          console.error('Error creando las líneas de pedido:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ha ocurrido un error al crear las líneas de pedido.',
          });
        }
      );
    },
    (error) => {
      console.error('Error creando la orden:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ha ocurrido un error al crear la orden.',
      });
    }
  );


}






}
