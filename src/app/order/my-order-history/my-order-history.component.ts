import { Order } from '../my-order/order';
import { Price } from '../my-order/price';
import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { TdMediaService } from '@covalent/core';

import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core/data-table';
import { IPageChangeEvent } from '@covalent/core/paging';
import * as ccxt from 'ccxt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ExchangeInfo } from '../../exchanges/exchange-info';
import { Market } from 'ccxt';
import { MarketValues } from '../../market/display-market/market-values';
import {FormBuilder, FormGroup} from '@angular/forms';
import { LocalStorageService } from 'ngx-webstorage';

export enum OrderBy {
  ASC = <any>'asc',
  DESC = <any>'desc',
}

export interface IHeaders {
  [key: string]: OrderBy;
}
const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(4);

@Component({
  selector: 'RCE-my-order-history',
  templateUrl: './my-order-history.component.html',
  styleUrls: ['./my-order-history.component.scss']
})
export class MyOrderHistoryComponent implements OnInit {
  [x: string]: any;
  sellPrice: any;
  buyQty: any;
  buyPrice: any;
  sellQty: any;
  sortByAsk = 'price';
  sortByBid = 'price';
  filteredDataBidTotal: number;
  filteredDataAskTotal: number;
  filteredDataAsk: any[];
  filteredDataBid: any[];
  dataAsk: any[] = [];
  dataBid: any[] = [];
  selectedExchange = '';
  selectedSymbol = '';
  selectedCurrency = '';
  data: any;
  filteredData: any[];
  exchanges = ccxt.exchanges;
  filteredBuyOrders: any[];
  filteredSellOrders: any[];
  sortByOrder = 'total';
  filteredBuyOrdersTotal = 0;
  filteredSellOrdersTotal = 0;

  proxy = 'https://cors-anywhere.herokuapp.com/';
  bidColumns: ITdDataTableColumn[] = [
    { name: 'price', label: 'Price', sortable: true, filter: true, width: 200 },
    { name: 'amount', label: 'Quantity', sortable: true, filter: true }
  ];
  asksColumns: ITdDataTableColumn[] = [
    { name: 'price', label: 'Price', sortable: true, filter: true, width: 200 },
    { name: 'amount', label: 'Quantity', sortable: true, filter: true }
  ];
  columns: ITdDataTableColumn[] = [
    { name: 'symbol', label: 'Symbol', sortable: true, filter: true, width: 150 },
    { name: 'marketName', label: 'Market', sortable: true, filter: true, width: 150 },
    { name: 'marketCurrencyLong', label: 'Currency', filter: true, sortable: true },
    { name: 'volume', label: 'Volume', filter: true, sortable: true, width: 150 },
    { name: 'bid', label: 'Bid', width: 100 },
    { name: 'ask', label: 'Ask',  width: 100 },
    { name: 'high', label: 'high', width: 100 },
    { name: 'low', label: 'low', width: 100 }
  ];
  orderColumns: ITdDataTableColumn[] = [
    { name: 'orderId', label: 'Order Id', sortable: true, filter: true, width: 150 },
    { name: 'exchange', label: 'Exchange', sortable: true, filter: true, width: 150 },
    { name: 'market', label: 'Symbol', filter: true, sortable: true },
    { name: 'currency', label: 'Currency', filter: true, sortable: true, width: 150 },
    { name: 'price', label: 'Price', width: 100 },
    { name: 'volume', label: 'Volume',  width: 100 },
    { name: 'total', label: 'Total', width: 150, format: DECIMAL_FORMAT },
  ];

  //filteredData: ExchangeInfo[] = this.data;
  filteredTotal: number;
  clickable = true;
  selectable = true;
  searchTerm: string = '';
  fromRow: number = 1;
  currentPage: number = 1;
  pageSize: number = 10;
  pageSizeMarket: number = 50;
  sortBy: string = 'volume';
  selectedRows: any[] = [];
  ex: any;
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;
  exSelected = 'bittrex';
  marketValues: MarketValues[] = [];
  typeSelected = 'limit';
  @Input() marketId: string;

  sellOrders: Order[] = [];
  buyOrders: Order[] = [];
  constructor(private _dataTableService: TdDataTableService,
    private storage: LocalStorageService) { 
      this.storage.store('pageTitle', 'Order History');
    }

  ngOnInit() {
    this.buyOrders = this.storage.retrieve('buyOrders');
    this.filterBuyOrder();
    this.sellOrders = this.storage.retrieve('sellOrders');
    this.filterSellOrder();
  }
  filterBuyOrder(): void {
    let newData: any[] = this.buyOrders;
    const excludedColumns: string[] = this.columns
    .filter((column: ITdDataTableColumn) => {
      return ((column.filter === undefined && column.hidden === true) ||
              (column.filter !== undefined && column.filter === false));
    }).map((column: ITdDataTableColumn) => {
      return column.name;
    });
    this.filteredBuyOrdersTotal = newData.length;
    newData = this._dataTableService.filterData(newData, this.searchTerm, true, excludedColumns);
    newData = this._dataTableService.sortData(newData, this.sortBy, this.sortOrder);
    newData = this._dataTableService.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
    this.filteredBuyOrders = newData;
  }
  filterSellOrder(): void {
    let newData: any[] = this.sellOrders;
    const excludedColumns: string[] = this.columns
    .filter((column: ITdDataTableColumn) => {
      return ((column.filter === undefined && column.hidden === true) ||
              (column.filter !== undefined && column.filter === false));
    }).map((column: ITdDataTableColumn) => {
      return column.name;
    });
    this.filteredSellOrdersTotal = newData.length;
    newData = this._dataTableService.filterData(newData, this.searchTerm, true, excludedColumns);
    newData = this._dataTableService.sortData(newData, this.sortBy, this.sortOrder);
    newData = this._dataTableService.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
    this.filteredSellOrders = newData;
  }
  filteredBuyOrderPage(pagingEvent: IPageChangeEvent): void {
    this.fromRow = pagingEvent.fromRow;
    this.currentPage = pagingEvent.page;
    this.pageSize = pagingEvent.pageSize;
    this.filterBuyOrder();
  }
  filteredSellOrderPage(pagingEvent: IPageChangeEvent): void {
    this.fromRow = pagingEvent.fromRow;
    this.currentPage = pagingEvent.page;
    this.pageSize = pagingEvent.pageSize;
    this.filterSellOrder();
  }
  sortBuy(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
    this.filterBuyOrder();
  }
  sortSell(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBySell = sortEvent.name;
    this.sortOrder = sortEvent.order;
    this.filterSellOrder();
  }


  searchBuy(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filterBuyOrder();
  }
  searchSell(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filterSellOrder();
  }

}
