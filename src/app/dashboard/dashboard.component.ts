import { Component, ChangeDetectorRef, OnInit, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatDialog } from '@angular/material';
import { TdMediaService, TdDigitsPipe, TdLayoutManageListComponent, TdRotateAnimation } from '@covalent/core';
import { DatePipe } from '@angular/common';
import { single, multi, pie, times } from '../data';
import * as ccxt from 'ccxt';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'RCE-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('manageList') manageList: TdLayoutManageListComponent;
  @ViewChild('dialogContent') template: TemplateRef<any>;


  name = 'UI Platform';

  miniNav: boolean = false;

  exchangeId: string;

  

  pie: any[];
  single: any[];
  multi: any[];
  times: any[];

  // Timeframe
  dateFrom: Date = new Date(new Date().getTime() - (2 * 60 * 60 * 24 * 1000));
  dateTo: Date = new Date(new Date().getTime() - (1 * 60 * 60 * 24 * 1000));

  // Dialog
  config = {
    width: '50%',
    height: '50%',
  };
  // Data table
  data: any[] = [
    {
      'name': 'Ada',
      'Buy/Sell': 'Limit Buy',
      'LastPrice': 159.0,
      '% Change': 6.0,
      '24hr high': 24.0,
      '24hr low': 4.0,
    }, {
      'name': 'Power Ledger',
      'Buy/Sell': 'Limit Buy',
      'LastPrice': 237.0,
      '% Change': 9.0,
     '24hr high': 37.0,
      '24hr low': 4.3,
    }, {
      'name': 'Eclair',
      'Buy/Sell': 'Limit Buy',
      'LastPrice':  262.0,
      '% Change': 16.0,
     '24hr high': 24.0,
      '24hr low':  6.0,
    }, {
      'name': 'Cupcake',
      'Buy/Sell': 'Limit Buy',
      'LastPrice':  305.0,
      '% Change': 3.7,
     '24hr high': 67.0,
      '24hr low': 4.3,
    }, {
      'name': 'Jelly bean',
      'Buy/Sell': 'Limit Buy',
      'LastPrice':  375.0,
      '% Change': 0.0,
     '24hr high': 94.0,
      '24hr low': 0.0,
    }, {
      'name': 'Lollipop',
      'Buy/Sell': 'Limit Sell',
      'LastPrice': 392.0,
      '% Change': 0.2,
     '24hr high': 98.0,
      '24hr low': 0.0,
    }, {
      'name': 'Honeycomb',
      'Buy/Sell': 'Limit Sell',
      'LastPrice': 408.0,
      '% Change': 3.2,
     '24hr high': 87.0,
      '24hr low': 6.5,
    }, {
      'name': 'Donut',
      'Buy/Sell': 'Limit Buy',
      'LastPrice': 452.0,
      '% Change': 25.0,
     '24hr high': 51.0,
      '24hr low': 4.9,
    }, {
      'name': 'KitKat',
      'Buy/Sell': 'Limit Buy',
      'LastPrice': 518.0,
      '% Change': 26.0,
     '24hr high': 65.0,
      '24hr low': 7.0,
    }, {
      'name': 'Chocolate',
      'Buy/Sell': 'Limit Buy',
      'LastPrice': 518.0,
      '% Change': 26.0,
     '24hr high': 65.0,
      '24hr low': 7.0,
    }, {
      'name': 'Chamoy',
      'Buy/Sell': 'Limit Sell',
      'LastPrice': 518.0,
      '% Change': 26.0,
     '24hr high': 65.0,
      '24hr low': 7.0,
    },
  ];
   // Theme toggle
  get activeTheme(): string {
    return localStorage.getItem('theme');
  }
  theme(theme: string): void {
    localStorage.setItem('theme', theme);
  }
  constructor(public media: TdMediaService,
    public dialog: MatDialog,
    private _changeDetectorRef: ChangeDetectorRef,
    private _iconRegistry: MatIconRegistry,
    private _domSanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private storage: LocalStorageService) {
      this._iconRegistry.addSvgIconInNamespace('assets', 'covalent',
              this._domSanitizer.bypassSecurityTrustResourceUrl
          ('https://raw.githubusercontent.com/Teradata/covalent-quickstart/develop/src/assets/icons/covalent.svg'));

          Object.assign(this, {pie, single, multi, times});
          this.route.paramMap.subscribe( param => {
            this.exchangeId = param.get('id');
            if (this.exchangeId) {
              this.pie = [];
              this.single = [];
              this.multi = [];
              this.times = [];
              Object.assign(this, {pie, single, multi, times});
              this.storage.store('pageTitle', 'Dashboard - ' + this.exchangeId.toUpperCase());
            } else {
              this.storage.store('pageTitle', 'Dashboard - BITTREX');
            }
          });

    }

  ngOnInit() {
    
    
    // let exchange = new ccxt[10] ({ enableRateLimit: true });

    // console.log(exchange.urls);

    // const coinsecureEx = new coinsecure();
    // console.log(coinsecureEx.getMarket('BTC/USD'));
  }

  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    this.media.broadcast();
    this._changeDetectorRef.detectChanges();
  }
  loadMarkets(marketId: string) {


    
  }

  toggleMiniNav(): void {
    this.miniNav = !this.miniNav;
    setTimeout(() => {
      this.manageList.sidenav._animationStarted.emit()
    });
  }

  openTemplate() {
    this.dialog.open(this.template, this.config);
  }

  // NGX Charts Axis
  axisDigits(val: any): any {
    return new TdDigitsPipe().transform(val);
  }

  axisDate(val: string): string {
    return new DatePipe('en').transform(val, 'hh a');
  }
}
