import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { Trending } from 'src/app/interfaces/trending';
import { TrendingItem } from 'src/app/interfaces/trending-item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  trending: Trending[] = [];
  trendingCoins: TrendingItem[] = [];
  candlestickData: any;
  cryptoData: any;

  isLoading = true;

  constructor(private cryptoService: RequestService, public router: Router) {}

  ngOnInit(): void {
    this.candlestickChart();
    this.trendingCrypto();
    this.getCoinsData();
  }

  public openCrypto(id: string) {
    //tu ustawiamy symbol, który pobieramy z template HTML
    this.router.navigate([`crypto/${id}`]);
  }

  candlestickChart(): void {
    this.cryptoService.getCandlesticksInfo().subscribe({
      next: (response) => {
        this.candlestickData = response;
        console.log('candlestick chart data: ', this.candlestickData);
      },
      error: (error: any) => console.log('error: ', error),
      complete: () => (this.isLoading = false),
    });
  }

  getCoinsData(): void {
    this.cryptoService.getMarketData().subscribe({
      next: (data) => {
        this.cryptoData = data;
        console.log('crypto market data: ', this.cryptoData);
      },
      error: (error: any) =>
        console.log('error while fetching crypto market data: ', error),
      complete: () => (this.isLoading = false),
    });
  }

  trendingCrypto(): void {
    this.cryptoService.getTrending().subscribe({
      next: (response) => {
        this.trending = response;
        console.log('trending: ', this.trending);
        this.trendingCoins = this.trending.map((coins) => coins.item);
        console.log('trending coins list: ', this.trendingCoins);
      },
      error: (error: any) =>
        console.log('error while fetching trending data: ', error),
      complete: () => (this.isLoading = false),
    });
  }
}
