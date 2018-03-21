
import { Component, ChangeDetectorRef, AfterViewInit, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatDialog } from '@angular/material';
import { TdMediaService, TdDigitsPipe, TdLayoutManageListComponent, TdRotateAnimation } from '@covalent/core';
import { DatePipe } from '@angular/common';
import { single, multi, pie, times } from './data';
import { AppMainRoute } from './shared/routes/app-main-route';
import { AppRoute } from './shared/routes/app-route';
import { LocalStorageService } from 'ngx-webstorage';

import { User } from './_models/index';
import { UserService } from './_services/index';
import { Routes, ActivatedRoute, Router } from '@angular/router';
import { AppSubRoute } from './shared/routes/app-sub-route';
import { AppRoutesTitles } from './shared/routes/app-routes-titles';

@Component({
  selector: 'RCE-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    TdRotateAnimation(),
  ],
})
export class AppComponent implements  OnInit, AfterViewInit  {
  currentUser: User;
  users: User[] = [];
  exchangeName: any;
  loggedInUser = '';
pageTitle: any;
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

constructor(private userService: UserService, public media: TdMediaService,
            public dialog: MatDialog,
            private _changeDetectorRef: ChangeDetectorRef,
            private _iconRegistry: MatIconRegistry,
            private _domSanitizer: DomSanitizer,
            public approuteTitles: AppRoutesTitles,
            private activatedRoute: ActivatedRoute,
            private localSt: LocalStorageService,
            private router: Router
            ) {
              this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
              if (this.currentUser === null) {
                this.router.navigate(['/login']);
              }
            this._iconRegistry.addSvgIconInNamespace('assets', 'covalent',
            this._domSanitizer.bypassSecurityTrustResourceUrl
        ('https://raw.githubusercontent.com/Teradata/covalent-quickstart/develop/src/assets/icons/covalent.svg'));

        Object.assign(this, {pie, single, multi, times});
        this.routes = this.approuteTitles.routes;
        this.subRoutes = this.approuteTitles.subRoutes.filter( r => r.key === 'db-exchange')[0].routes;
        this.localSt.observe('currentUser').subscribe( u => {
          this.currentUser = JSON.parse(u); });
}


ngAfterViewInit(): void {
  // broadcast to all listener observables when loading the page
  this.media.broadcast();
  this._changeDetectorRef.detectChanges();
}
ngOnInit() {
  this.loadAllUsers();
  this.localSt.observe('pageTitle')
  .subscribe((value) => this.pageTitle  = value);
}
toggleMiniNav(): void {
  this.miniNav = !this.miniNav;
  setTimeout(() => {
    this.manageList.sidenav._animationStarted.emit();
  });
}
deleteUser(id: number) {
  this.userService.delete(id).subscribe(() => { this.loadAllUsers()});
}

private loadAllUsers() {
  this.userService.getAll().subscribe(users => { this.users = users; });
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
  this.router.navigate([item.route]);
}
logout() {
  this.currentUser = undefined;
  localStorage.removeItem('currentUser');
  this.router.navigate(['/login']);
}
}

