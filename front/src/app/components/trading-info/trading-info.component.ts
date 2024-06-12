import { Component, OnInit } from '@angular/core';
import { TradingService } from '../../services/trading.service';

@Component({
  selector: 'app-trading-info',
  templateUrl: './trading-info.component.html',
  styleUrl: './trading-info.component.scss'
})
export class TradingInfoComponent implements OnInit{
  tradingName: string = '';
  userId: number = 0;

  constructor(private TradingService: TradingService) {}

  ngOnInit(): void {
      this.userId = 2;
      this.getTradingName(this.userId);
  }

  getTradingName(userId: number): void {
    this.TradingService.getTradingNameByUserID(userId).subscribe(
      data => {
        this.tradingName = data.tradingName
        this.TradingService.codifyNameTrading(this.tradingName);
      },
      error => {
        console.error('Error, nombre no encontrado');
      }
    );
  }
}
