import { Component, OnInit } from '@angular/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core/data-table';
import { IPageChangeEvent } from '@covalent/core/paging';

const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(2);

import * as ccxt from 'ccxt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import { ExchangeInfo } from '../exchanges/exchange-info';
import { LocalStorageService } from 'ngx-webstorage';
@Component({
  selector: 'RCE-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit {

  marketId = 'bittrex';
  constructor(private _dataTableService: TdDataTableService, private storage: LocalStorageService) {
    this.storage.store('pageTitle', 'Exchange - Markets');

     }

  ngOnInit() {

  }
}
