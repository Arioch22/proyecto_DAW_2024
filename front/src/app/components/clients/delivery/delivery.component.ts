import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { DeliveryService } from '../../../services/client/delivery.service';
import { resultsDelivery, DataDeliveryOrder } from '../../../models/resultsApi.model';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.scss'
})
export class DeliveryComponent implements OnInit {
  deliveries: DataDeliveryOrder[] = [];

  constructor(private deliveryService: DeliveryService) {}

  ngOnInit(): void {
    this.deliveryService.getDeliveries().subscribe(
      data => this.deliveries = data.data,
      error => console.error('Error fetching deliveries:', error)
    );
  }

}
