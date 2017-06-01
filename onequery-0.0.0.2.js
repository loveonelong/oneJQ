'use strict';
(function (window, undefined) {


  var oQuery = function(selector,context){
    return new oQuery.fn.init(selector,context,rootoQuery);
  }

  oQuery.fn = oQuery.prototype = {
    init: function(selector,context,rootoQuery){

    }
  }

  oQuery.fn.init.prototype =oQuery.fn

  /**
   * options {参数}
   * url: 请求的url，默认为当前地址
   * type: 请求类型，默认为'GET'
   * async: 是否使用异步，默认'true'
   * contentType: 请求头部
   * data: 请求内容
   */
  oQuery.ajax = function (options) {

    // 如果选项不存在或是不为对象类型
    if (!options || typeof options != 'object') {
      return false
    }

    // 请求的url，默认为当前地址
    var url = options.url || location.pathname

    // 请求类型，转换为大写，默认为'GET'
    var type = (options.type || 'GET').toUpperCase()

    // 是否异步，默认为'true'
    var async = options.async === false ? false : true

    // 请求头部
    var contentType = options.contentType || 'application/x-www-form-urlencoded;charset=utf-8'

    // 请求内容，默认为空对象
    var data = options.data || {}

    // IE5和IE6使用ActiveXObject
    var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP")

    // 规定请求类型，url，以及是否异步处理
    xmlhttp.open(type, (type === 'GET' ? url + '?' + _dataStr : url), async)

    // 根据请求类型的不同，设置请求参数，发送请求
    if (type === 'POST') {
      xmlhttp.open(type, url, async)
      xmlhttp.setRequestHeader("Content-type", options.contentType)
      xmlhttp.send(data)
    } else {
      // 请求为GET时，序列化请求内容
      var _dataStr = ''
      for (var key in data) {
        _dataStr += key + '=' + data[key] + '&'
      }
      xmlhttp.open(type, url + '?' + _dataStr, async)
      xmlhttp.send(null)
    }

    // 监听state
    xmlhttp.onreadystatechange = function () {

      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

        // 响应数据
        var resData = ''

        // 获取响应头部
        var resContentType = xmlhttp.getResponseHeader('Content-Type')

        // 根据响应头部解析响应数据
        if (resContentType.indexOf('xml') > -1) {
          resData = xmlhttp.responseXML
        } else if (resContentType.indexOf('json') > -1) {
          resData = JSON.parse(xmlhtpp.responseText)
        } else {
          resData = xmlhttp.responseText
        }

        // 回调，ajax成功的处理函数
        options.success && options.success(resData);
      }

      /*即使请求xmlhttp.status不成功 ，也需要的响应完成才认作是一个错误的请求*/
      else if (xmlhttp.readyState == 4) {
        options.error && options.error('request fail: ' + url)
      }

    }

  }

  oQuery.post = function (options) {
    options.type = 'POST'
    $.ajax(options)
  }

  oQuery.get = function (options) {
    options.type = 'GET'
    $.ajax(options)
  }

  // 注册全局变量
  window.oQuery === undefined && ( window.$ = oQuery)

})(window);