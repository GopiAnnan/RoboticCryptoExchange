import { ExchangeRoutingModule } from './../../exchanges/exchange-routing.module';
import { apiKeys } from './keys';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as ccxt from 'ccxt';
import 'rxjs/add/observable/from';
import { ITdDataTableColumn } from '@covalent/core';
import { TdDataTableSortingOrder } from '@covalent/core';
import { ITdDataTableSortChangeEvent } from '@covalent/core';
import { TdDataTableService } from '@covalent/core';
import { LocalStorageService } from 'ngx-webstorage';
import { IPageChangeEvent } from '@covalent/core';

export interface ApiKey {
  exchange: string;
  apiKey?: string;
  secret?: string;
  skip?: boolean;
}

@Component({
  selector: 'RCE-api-key',
  templateUrl: './api-key.component.html',
  styleUrls: ['./api-key.component.scss']
})
export class ApiKeyComponent implements OnInit {
  exchangeAppKey: ApiKey[] = [];
  
  columns: ITdDataTableColumn[] = [
    { name: 'exchange',  label: 'Exchange', sortable: true, filter: true, width: 100 },
    { name: 'apiKey', label: 'Api Key', filter: true, sortable: true, width: 350 },
    { name: 'secret', label: 'Secret', filter: true, sortable: true, width: 450 },
    { name: 'skip', label: 'Skip', filter: true, sortable: true, width: 100  }
  ];

  filteredData: ApiKey[] = [];
  filteredTotal: number;

  searchTerm: string = '';
  fromRow: number = 1;
  currentPage: number = 1;
  pageSize: number = 50;
  sortBy: string = 'exchange';
  selectedRows: any[] = [];
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Ascending;
  constructor(private _dataTableService: TdDataTableService , private storage: LocalStorageService) {
    this.storage.store('pageTitle', 'Mange Api Key');
  }

  ngOnInit() {
    const exchanges = Observable.from(ccxt.exchanges);
    exchanges.subscribe( e => {
      let ak: ApiKey = {
        exchange: e
      };
      if (apiKeys[e]) {
        if (apiKeys[e].apiKey) {
          ak.apiKey = apiKeys[e].apiKey;
        }
        if (apiKeys[e].secret) {
          ak.secret = apiKeys[e].secret;
        }
        if (apiKeys[e].skip !== undefined) {
          ak.skip = apiKeys[e].skip;
        }
      }
      this.exchangeAppKey.push(ak);
    },
    (e) => console.log(e),
    () => {
      this.filter();
    });
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
    let newData: any[] = this.exchangeAppKey;
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
