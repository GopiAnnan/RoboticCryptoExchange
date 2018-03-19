
import { Component, OnInit, Input } from '@angular/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core/data-table';
import { IPageChangeEvent } from '@covalent/core/paging';

import * as ccxt from 'ccxt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ExchangeInfo } from '../../exchanges/exchange-info';
import { Market } from 'ccxt';
import { MarketValues } from './market-values';

@Component({
  selector: 'RCE-display-market',
  templateUrl: './display-market.component.html',
  styleUrls: ['./display-market.component.scss']
})
export class DisplayMarketComponent implements OnInit {

  data: any;
  filteredData: any[];
  exchanges = ccxt.exchanges;
  proxy = 'https://cors-anywhere.herokuapp.com/';
  
  columns: ITdDataTableColumn[] = [
    { name: 'marketName', label: 'Market', sortable: true, filter: true, width: 150 },
    { name: 'marketCurrencyLong', label: 'Currency', filter: true, sortable: true, width: 150 },
    { name: 'volume', label: 'Volume', filter: true, sortable: true, width: 150 },
    { name: 'bid', label: 'Bid', width: 150 },
    { name: 'ask', label: 'Ask',  width: 150 },
    { name: 'high', label: 'high', width: 150 },
    { name: 'low', label: 'low', width: 150 },
    { name: 'timeStamp', label: 'Date' },
  ];

  //filteredData: ExchangeInfo[] = this.data;
  filteredTotal: number;

  searchTerm: string = '';
  fromRow: number = 1;
  currentPage: number = 1;
  pageSize: number = 50;
  sortBy: string = 'volume';
  selectedRows: any[] = [];
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;
  exSelected = 'bittrex';
  marketValues: MarketValues[] = [];
  @Input() marketId: string;
  constructor(private _dataTableService: TdDataTableService) { }

  ngOnInit() {

    // let ex = new ccxt.kraken();
    //ex.proxy = 'https://crossorigin.me/';
    // ex.proxy = 'https://localhost:8081/';
    // console.log(ex.loadMarkets());
    this.loadSelectedMarket(this.exSelected);
  }
 human_value = function (price) {
    return typeof price === 'undefined' ? 'N/A' : price;
};
  fetchTickers(exchange: any, market: Market, symbol: any) {
    try {
      const ticker = Observable.from(exchange.fetchTicker(symbol));
      ticker.subscribe ( t => {
        this.marketValues.push({
          symbol: symbol,
          high: this.human_value (t['high']),
          low: this.human_value (t['low']),
          bid: this.human_value (t['bid']),
          ask: this.human_value (t['ask']),
          volume: this.human_value (t['quoteVolume']),
          timeStamp:  t['datetime'],
          baseCurrency: market.info['BaseCurrency'],
          marketCurrency: market.info['MarketCurrency'],
          marketName: market.info['MarketName'],
          marketCurrencyLong: market.info['MarketCurrencyLong']
        });
      } ,
        (error) => console.log(error),
        () => {
          this.data = this.marketValues;
          this.filter();
        });
    } catch (error) {
      console.log(error);
    }
}


  loadSelectedMarket(selectedExchange) {
    try {
    const ex = new ccxt[selectedExchange]({ 'proxy': this.proxy });
    this.data = [];
      const markets = Observable.from(ex.loadMarkets());
      markets.subscribe( m => {
        Object.values(m).forEach( v => {
          this.fetchTickers(ex, v, v.symbol);
      });
    });
    } catch (error) {
      console.log (error);
    }
  }


  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
    this.filter();
  }

  search(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filter();
  }

  page(pagingEvent: IPageChangeEvent): void {
    this.fromRow = pagingEvent.fromRow;
    this.currentPage = pagingEvent.page;
    this.pageSize = pagingEvent.pageSize;
    this.filter();
  }

  showAlert(event: any): void {
    let row: any = event.row;
    // .. do something with event.row
  }

  filter(): void {
    let newData: any[] = this.data;
    const excludedColumns: string[] = this.columns
    .filter((column: ITdDataTableColumn) => {
      return ((column.filter === undefined && column.hidden === true) ||
              (column.filter !== undefined && column.filter === false));
    }).map((column: ITdDataTableColumn) => {
      return column.name;
    });
    this.filteredTotal = newData.length;
    newData = this._dataTableService.filterData(newData, this.searchTerm, true, excludedColumns);    
    newData = this._dataTableService.sortData(newData, this.sortBy, this.sortOrder);
    newData = this._dataTableService.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
    this.filteredData = newData;
  }
}
