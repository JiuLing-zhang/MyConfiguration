// ==UserScript==
// @name         微软URL重定向工具
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  如果打开的连接是非中文，则自动跳转到中文版
// @author       九零
// @license      MIT
// @match        https://*.microsoft.com/*
// @exclude      https://docs.microsoft.com/*/answers/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    let url = window.location.href;
    var reg = new RegExp("(https://\\S*.microsoft.com)/(en-us|zh-hk|zh-tw)/", "ig");
    let result = reg.exec(url);
    if (result == null) {
        return;
    }

    window.document.write("<div style='text-align:center;font-size: 30px;margin-top: 30px;color: #B6895A;'>" + "准备为您跳转到中文版" + "</div>");
    //原始路径，类似https://docs.microsoft.com/en-us/
    let srcPart = result[0];
    //去掉语言部分的路径，类似https://docs.microsoft.com
    let dstPart = result[1];

    //清除原始地址的头部
    url = url.replace(srcPart, "");

    //拼装中文版地址并跳转
    url = dstPart + "/zh-cn/" + url;

    window.location.href = url;
})();
