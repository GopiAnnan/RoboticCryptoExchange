import { Component, OnInit } from '@angular/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core/data-table';
import { IPageChangeEvent } from '@covalent/core/paging';
import { ExchangeInfo } from '../exchange-info';

const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(2);

import * as ccxt from 'ccxt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import { LocalStorageService } from 'ngx-webstorage';
@Component({
  selector: 'RCE-all-exchanges',
  templateUrl: './all-exchanges.component.html',
  styleUrls: ['./all-exchanges.component.scss']
})
export class AllExchangesComponent implements OnInit {
  data: ExchangeInfo[];
  columns: ITdDataTableColumn[] = [
    { name: 'id',  label: 'Id', sortable: true, filter: true, width: 150 },
    { name: 'name', label: 'Name', filter: true, sortable: true, width: 150 },
    { name: 'logo', label: 'Brand', filter: true, sortable: true, width: 150 },
    { name: 'www', label: 'Website', hidden: true },
    { name: 'countries', label: 'countries', filter: true, sortable: true, width: 150 },
    { name: 'doc', label: 'References', filter: true, sortable: true},
  ];
  
  filteredTotal: number;
  filteredData: ExchangeInfo[] = [];
  searchTerm: string = '';
  fromRow: number = 1;
  currentPage: number = 1;
  pageSize: number = 50;
  sortBy: string = 'name';
  selectedRows: any[] = [];
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Ascending;

  constructor(private _dataTableService: TdDataTableService , private storage: LocalStorageService) {
    this.storage.store('pageTitle', 'All Supported Exchanges');
  }
  

  ngOnInit() {
    const exchanges = Observable.from(ccxt.exchanges);
    const exchangeToBind: ExchangeInfo[] = [];
    let exInfo: ExchangeInfo;
    exchanges.subscribe( e => {
        const ex = new ccxt[e];
        exInfo = {
          id: ex.id,
          name: ex.name,
          logo: ex.urls.logo,
          countries: ex.countries,
          www: ex.urls.www,
          api: ex.urls.api,
          doc: ex.urls.doc
        };
        exchangeToBind.push(exInfo);
      },
      (e) => console.log(e),
      () => {
        this.data = exchangeToBind;
        this.filter();
      }
    );
    
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
