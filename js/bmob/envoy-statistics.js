/*
 * envoy statistics script
 * powered by bmob JavaScript SDK
 * version 0.5.1
 * 
 * require: Sohu IP interface (https://pv.sohu.com/cityjson)
 *          Bmob SDK (https://docs.bmob.cn)
 * 
 * Copyright (c) envoy 2017
 * Released under the Apache-2.0 license.
 */

(function () {
  'use strict';

  // Application id and secret key for Bmob service is public
  // You can do whatever you want :-)
  var applicationId = '60a9daad038e3963a9dc0ed5c42b99c1';
  var restAPIKey = '55799ac3fcff183bdb7593c0ebf32344';

  // init Bmob service
  Bmob.initialize(applicationId, restAPIKey);

  var sendIpInfoToBmob = function (ipInfo) {
    // update DB
    var Visitors = Bmob.Object.extend('Visitors');
    var visitors = new Visitors();
    for (var key in ipInfo) {
      visitors.set(key, ipInfo[key]);
    }
    visitors.save(null, {
      success: function () {
        // do nothing
      },
      error: function () {
        console.log('Error occured when sending ip info to Bomb');
      }
    });
  };

  // fetch ip info from ipapi
  $.get('https://ipapi.co/json', function (data) {
    delete data.country_code;
    delete data.country_code_iso3;
    delete data.country_capital;
    delete data.country_tld;
    delete data.in_eu;
    delete data.postal;
    delete data.latitude;
    delete data.longitude;
    delete data.currency_name;
    delete data.country_area;
    delete data.country_population;
    delete data.message;

    data.ipv4 = window.returnCitySN ? window.returnCitySN.cip : '';  // add ipv4 from sohu
    data.url = window.location.href;  // add url
    data.userAgent = navigator.userAgent; // add userAgent
    sendIpInfoToBmob(data);
  }).fail(function () {
    console.log('Failed to fetch ip info from ipapi');
    var data = {
      ipv4: window.returnCitySN ? window.returnCitySN.cip : '',  // add ipv4 from sohu
      url: window.location.href,  // add url
      userAgent: navigator.userAgent // add userAgent
    };
    sendIpInfoToBmob(data);
  });

})();
