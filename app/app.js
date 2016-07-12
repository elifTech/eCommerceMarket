'use strict';

import angular from 'angular';
import ngResources from 'angular-resource';
import ngRoute from 'angular-ui-router';

import config from './config';
import base from './base/base'

let appName = 'eMarket';

angular.module(appName, [ngResources, ngRoute, base]).constant("APP", config);

angular.element(document).ready(function () {
   angular.bootstrap(document, [appName]) 
});