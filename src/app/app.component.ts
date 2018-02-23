import { Routes } from '@angular/router';
import { AppSubRoute } from './../shared/routes/app-sub-route';
import { AppRoutesTitles } from './../shared/routes/app-routes-titles';
import { Component, ChangeDetectorRef, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatDialog } from '@angular/material';
import { TdMediaService, TdDigitsPipe, TdLayoutManageListComponent, TdRotateAnimation } from '@covalent/core';
import { DatePipe } from '@angular/common';
import { single, multi, pie, times } from './data';
import { AppMainRoute } from '../shared/routes/app-main-route';
import { AppRoute } from '../shared/routes/app-route';

@Component({
  selector: 'RCE-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    TdRotateAnimation(),
  ],
})
export class AppComponent implements AfterViewInit  {
  @ViewChild('manageList') manageList: TdLayoutManageListComponent;
  @ViewChild('dialogContent') template: TemplateRef<any>;

  
  name = 'Robotic Crypto Exchange';

  pie: any[];
  single: any[];
  multi: any[];
  times: any[];

  miniNav: boolean = false;
  routeTitle = 'Dashboard';
 mainRouteTitle = 'Dashboards';
mainIcon = 'dashboard';
  subRoutes: AppRoute[] = [];

  // Timeframe
  dateFrom: Date = new Date(new Date().getTime() - (2 * 60 * 60 * 24 * 1000));
  dateTo: Date = new Date(new Date().getTime() - (1 * 60 * 60 * 24 * 1000));

  // Dialog
  config = {
    width: '50%',
    height: '50%',
  };

  // Nav
  routes: AppMainRoute[] = [];
  usermenu = [{
      title: 'Profile',
      route: '/',
      icon: 'account_box',
    }, {
      title: 'Settings',
      route: '/',
      icon: 'settings',
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
              public approuteTitles: AppRoutesTitles,
              ) {
                
              this._iconRegistry.addSvgIconInNamespace('assets', 'covalent',
              this._domSanitizer.bypassSecurityTrustResourceUrl
          ('https://raw.githubusercontent.com/Teradata/covalent-quickstart/develop/src/assets/icons/covalent.svg'));

          Object.assign(this, {pie, single, multi, times});
          this.routes = this.approuteTitles.routes;
          this.subRoutes = this.approuteTitles.subRoutes.filter( r => r.key === 'dashboard')[0].routes;
  }


  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    this.media.broadcast();
    this._changeDetectorRef.detectChanges();
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
  onRouteChange(item: AppMainRoute) {
    this.mainRouteTitle = item.mainTitle;
    this.mainIcon = item.icon;
    this.subRoutes = this.approuteTitles.subRoutes.filter( r => r.key === item.route)[0].routes;
  }
}

