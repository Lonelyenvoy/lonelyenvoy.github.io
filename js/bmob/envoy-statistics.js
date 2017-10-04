/*
 * envoy statistics script
 * powered by bmob JavaScript SDK
 * version 0.1
 * 
 * require: Sohu IP interface (http://pv.sohu.com/cityjson)
 *          Bmob SDK (https://docs.bmob.cn)
 * 
 * Copyright (c) envoy 2017
 * Released under the MIT license.
 */

(function () {
  'use strict';

  // Application id and secret key for Bmob service is public
  // You can do whatever you want :-)
  var applicationId = '60a9daad038e3963a9dc0ed5c42b99c1';
  var restAPIKey = '55799ac3fcff183bdb7593c0ebf32344';

  // ajax util function
  function ajax() {
    var ajaxData = {
      type: arguments[0].type || "GET",
      url: arguments[0].url || "",
      async: arguments[0].async || "true",
      data: arguments[0].data || null,
      dataType: arguments[0].dataType || "text",
      contentType: arguments[0].contentType || "application/x-www-form-urlencoded",
      beforeSend: arguments[0].beforeSend || function () { },
      success: arguments[0].success || function () { },
      error: arguments[0].error || function () { }
    }
    ajaxData.beforeSend();
    var xhr = _createxmlHttpRequest();
    xhr.responseType = ajaxData.dataType;
    xhr.open(ajaxData.type, ajaxData.url, ajaxData.async);
    xhr.setRequestHeader("Content-Type", ajaxData.contentType);
    xhr.send(_convertData(ajaxData.data));
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          ajaxData.success(xhr.response)
        } else {
          ajaxData.error()
        }
      }
    }
  }

  function _createxmlHttpRequest() {
    if (window.ActiveXObject) {
      return new ActiveXObject("Microsoft.XMLHTTP");
    } else if (window.XMLHttpRequest) {
      return new XMLHttpRequest();
    }
  }

  function _convertData(data) {
    if (typeof data === 'object') {
      var convertResult = "";
      for (var c in data) {
        convertResult += c + "=" + data[c] + "&";
      }
      convertResult = convertResult.substring(0, convertResult.length - 1)
      return convertResult;
    } else {
      return data;
    }
  }

  // fetch ip address from Sohu IP interface
  if (!returnCitySN) {
    console.log('Failed to fetch ip address from Sohu ip service');
    return;
  }
  var ip = returnCitySN.cip;

  // init Bmob service
  Bmob.initialize(applicationId, restAPIKey);

  // get ip info from Taobao IP service
  ajax({
    url: 'http://ip.taobao.com/service/getIpInfo.php?ip=' + ip,
    success: function(result) {
      if (result.code !== 0) {
        console.log('Failed to get info from Taobao ip service');
        console.log(result);
      } else {
        // send ip info to Bmob
        var ipInfo = {
          'ip': result.data.ip,
          'country': result.data.country,
          'area': result.data.area,
          'region': result.data.region,
          'city': result.data.city,
          'county': result.data.county,
          'isp': result.data.isp,
          'countryId': result.data.country_id,
          'areaId': result.data.area_id,
          'regionId': result.data.region_id,
          'cityId': result.data.city_id,
          'countyId': result.data.county_id,
          'ispId': result.data.isp_id,
          'url': window.location.href
        }

        // update DB
        var Visitors = Bmob.Object.extend('Visitors');
        var visitors = new Visitors();
        for (var key in ipInfo) {
          visitors.set(key, ipInfo[key]);
        }
        visitors.save(null, {
          success: function() {
            console.log('echo hello');
          },
          error: function() {
            console.log('error occured when sending ip info to Bomb');
          }
        })
        
      }
    },
    error: function(msg) {
      console.log('error occured when getting info from Taobao ip service');      
      console.log(msg);
    }
  })

})();
