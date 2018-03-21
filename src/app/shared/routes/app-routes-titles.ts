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
            route: 'db-exchange',
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
            route: 'order',
            icon: 'account_balance',
            tooltip: '',
            mainTitle: 'Orders'
            }, {
            title: 'Personal Portfolio',
            route: 'portfolio',
            icon: 'store',
            tooltip: '',
            mainTitle: 'Marketplace'
        }, {
            title: 'Admin Config',
            route: 'admin-config',
            icon: 'settings',
            tooltip: '',
            mainTitle: 'Marketplace'
        }];
    }
    loadSubRoutes() {
        this.subRoutes = [
            {
                key: 'db-exchange',
                routes: [{
                    title: 'Dashboard - Bittrex',
                    route: 'db-exchange/bittrex',
                    icon: 'dashboard',
                    tooltip: 'Coinscure Personaliation',
                    id: 'Bittrex'
                },
                {
                    title: 'Dashboard - OKEx',
                    route: 'db-exchange/okex',
                    icon: 'dashboard',
                    tooltip: 'Coinscure Personaliation',
                    id: 'OKEx'
                },
                {
                    title: 'Dashboard - Binance',
                    route: 'db-exchange/binance',
                    icon: 'dashboard',
                    tooltip: 'Coinscure Personaliation',
                    id : 'Binance'
                }, {
                    title: 'Dashboard - Huobi',
                    route: 'db-exchange/huobi',
                    icon: 'dashboard',
                    tooltip: 'Coinscure Personaliation',
                    id: 'Huobi'
                }, {
                    title: 'Dashboard - Bitfinex',
                    route: 'db-exchange/bitfinex',
                    icon: 'dashboard',
                    tooltip: 'Coinscure Personaliation',
                    id: 'Bitfinex'
                }, {
                    title: 'Dashboard - Upbit',
                    route: 'db-exchange/upbit',
                    icon: 'dashboard',
                    tooltip: 'Coinscure Personaliation',
                    id: 'Upbit'
                }]
            },
                {
                key: 'exchanges',
                routes: [
                //     {
                //     title: 'Favorite - Exchanges',
                //     route: 'exchanges/fav-exchanges',
                //     icon: 'assessment',
                //     tooltip: 'Coinscure Personaliation'
                // },
                {
                    title: 'All - Exchanges',
                    route: 'exchanges/all-exchanges',
                    icon: 'assessment',
                    tooltip: 'Coinscure Personaliation'
                }, {
                    title: 'Markets',
                    route: 'exchange-market',
                    icon: 'assessment',
                    tooltip: 'Exchange Markets'
                }]
            }, {
                key: 'order',
                routes: [{
                    title: 'Order',
                    route: 'order/my-order',
                    icon: 'assessment',
                    tooltip: 'Coinscure Personaliation'
                },   {
                    title: 'My Order History',
                    route: 'order/my-order-history',
                    icon: 'assessment',
                    tooltip: 'Coinscure Personaliation'
                }, {
                    title: 'Market Order History',
                    route: 'order/market-order-history',
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
            },  {
                key: 'admin-config',
                routes: [{
                    title: "Api's",
                    route: 'exchange-apis',
                    icon: 'assessment',
                    tooltip: 'Manage Api of Exchanges'
                }, {
                    title: 'App Keys',
                    route: 'api-keys',
                    icon: 'assessment',
                    tooltip: 'Manage Api Keys'
                }]
                }
        ];
    }
}
