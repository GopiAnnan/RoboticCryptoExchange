import { Injectable } from '@angular/core';
import { AppMainRoute } from './app-main-route';
import { AppSubRoute } from './app-sub-route';

@Injectable()
export class AppRoutesTitles {
    routes: AppMainRoute[] = [];
    subRoutes: AppSubRoute[] = [];
    /**
     *
     */
    constructor() {
        this.loadMainRoutes();
        this.loadSubRoutes();
    }
    loadMainRoutes() {
        this.routes = [{
            title: 'Dashboards',
            route: 'dashboard',
            icon: 'dashboard',
            tooltip: '',
            mainTitle: 'Dashboards'
            }, {
            title: 'Exchanges',
            route: 'exchanges',
            icon: 'insert_chart',
            tooltip: '',
            mainTitle: 'Exchanges'
            }, {
            title: 'Orders',
            route: 'orders',
            icon: 'account_balance',
            tooltip: '',
            mainTitle: 'Sales'
            }, {
            title: 'Personal Portfolio',
            route: 'portfolio',
            icon: 'store',
            tooltip: '',
            mainTitle: 'Marketplace'
        }];
    }
    loadSubRoutes() {
        this.subRoutes = [
            {
                key: 'dashboard',
                routes: [{
                    title: 'Dashboard - Coinsecure',
                    route: 'db-exchange',
                    icon: 'assessment',
                    tooltip: 'Coinscure Personaliation'
                },
                {
                    title: 'Dashboard - UnoCoin',
                    route: 'db-exchange',
                    icon: 'assessment',
                    tooltip: 'Coinscure Personaliation'
                },
                {
                    title: 'Dashboard - Binnance',
                    route: 'db-exchange',
                    icon: 'assessment',
                    tooltip: 'Coinscure Personaliation'
                }, {
                    title: 'Dashboard - Bitfinex',
                    route: 'db-exchange',
                    icon: 'assessment',
                    tooltip: 'Coinscure Personaliation'
                }]
            },
                {
                key: 'exchanges',
                routes: [{
                    title: 'Favorite - Exchanges',
                    route: 'exchange-favorite',
                    icon: 'assessment',
                    tooltip: 'Coinscure Personaliation'
                },
                {
                    title: 'All - Exchanges',
                    route: 'exchanges',
                    icon: 'assessment',
                    tooltip: 'Coinscure Personaliation'
                },
                {
                    title: 'Tokens specific',
                    route: 'exchange-token',
                    icon: 'assessment',
                    tooltip: 'Coinscure Personaliation'
                }]
            }, {
                key: 'orders',
                routes: [{
                    title: 'My Orders',
                    route: 'order-my',
                    icon: 'assessment',
                    tooltip: 'Coinscure Personaliation'
                }, {
                    title: 'Market Orders',
                    route: 'order-market',
                    icon: 'assessment',
                    tooltip: 'Coinscure Personaliation'
                },  {
                    title: 'My Orders History',
                    route: 'order-history',
                    icon: 'assessment',
                    tooltip: 'Coinscure Personaliation'
                },  {
                    title: 'Market Orders History',
                    route: 'order-market-histor',
                    icon: 'assessment',
                    tooltip: 'Coinscure Personaliation'
                }]
            } , {
                key: 'portfolio',
                routes: [{
                    title: 'Portfolio',
                    route: 'order-my',
                    icon: 'assessment',
                    tooltip: 'Coinscure Personaliation'
                }, {
                    title: 'Portfolio By Exchange',
                    route: 'order-market',
                    icon: 'assessment',
                    tooltip: 'Coinscure Personaliation'
                },  {
                    title: 'Portfolio By Coin',
                    route: 'order-history',
                    icon: 'assessment',
                    tooltip: 'Coinscure Personaliation'
                }]
            }
        ];
    }
}
