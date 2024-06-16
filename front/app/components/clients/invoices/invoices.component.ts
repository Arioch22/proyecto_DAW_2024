import { Component, OnInit } from '@angular/core';
import { DeliveryService } from '../../../services/client/delivery.service';
import { resultsDelivery, DataInvoiceOrder } from '../../../models/resultsApi.model';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.scss'
})
export class InvoicesComponent implements OnInit{

  invoices: DataInvoiceOrder[] = [];

  constructor(private deliveryService: DeliveryService) {}

  ngOnInit(): void {
    this.deliveryService.getInvoices().subscribe(
      data => this.invoices = data.data,
      error => console.error('Error fetching invoices:', error)
    );
  }

}
