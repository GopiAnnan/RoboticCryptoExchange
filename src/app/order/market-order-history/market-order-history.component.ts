import { Component, OnInit } from '@angular/core';
import { TdDataTableService } from '@covalent/core';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'RCE-market-order-history',
  templateUrl: './market-order-history.component.html',
  styleUrls: ['./market-order-history.component.scss']
})
export class MarketOrderHistoryComponent implements OnInit {

  constructor(private _dataTableService: TdDataTableService,
    private storage: LocalStorageService) {
    this.storage.store('pageTitle', 'Market Order History');
   }

  ngOnInit() {
  }

}
