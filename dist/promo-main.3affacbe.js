parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"ozuS":[function(require,module,exports) {

},{"./../fonts/Lato-Bold.woff2":[["Lato-Bold.25bc545b.woff2","cyiI"],"cyiI"],"./../fonts/Lato-Bold.woff":[["Lato-Bold.172b6fe1.woff","duQU"],"duQU"],"./../fonts/Lato-Regular.woff2":[["Lato-Regular.f0c7b2c2.woff2","liH8"],"liH8"],"./../fonts/Lato-Regular.woff":[["Lato-Regular.4d417de1.woff","LpL8"],"LpL8"],"./../fonts/Lato-Light.woff2":[["Lato-Light.e740ee5a.woff2","WvyH"],"WvyH"],"./../fonts/Lato-Light.woff":[["Lato-Light.074c2336.woff","zcf3"],"zcf3"],"./../fonts/Lato-Italic.woff2":[["Lato-Italic.7fae71bb.woff2","yATR"],"yATR"],"./../fonts/Lato-Italic.woff":[["Lato-Italic.5589d871.woff","WEAD"],"WEAD"],"./../images/hero_background.png":[["hero_background.1fd52703.png","dDvA"],"dDvA"],"./../images/plus.svg":[["plus.6181b5e0.svg","l65S"],"l65S"]}],"G3t5":[function(require,module,exports) {
var e=/^((\+7|7|8)+([0-9]){10})/,t=/^.{3,}$/,n=/^([1-9]|[0-2][0-9]|[3][0-1])$/,a=/^([1-9]|[0][1-9]|[0-1][0-2])$/,d=/^[0-9]{4}$/,m=function(e){e.classList.add("fieldValid"),e.classList.remove("fieldInvalid")},i=function(e){e.classList.add("fieldInvalid"),e.classList.remove("fieldValid")},s=function(s){var l=s.target;"name"==l.name&&(t.test(l.value)?m(l):i(l)),"phone"==l.name&&(e.test(l.value)?m(l):i(l)),"day"==l.name&&(n.test(l.value)?m(l):i(l)),"month"==l.name&&(a.test(l.value)?m(l):i(l)),"year"==l.name&&(d.test(l.value)?m(l):i(l))},l=function(e){var t=document.querySelector("#".concat(e));return t.addEventListener("submit",function(e){e.preventDefault(),alert("Submitted")}),t.elements.namedItem("name").addEventListener("input",s),t.elements.namedItem("phone").addEventListener("input",s),t.elements.namedItem("day").addEventListener("input",s),t.elements.namedItem("month").addEventListener("input",s),t.elements.namedItem("year").addEventListener("input",s),t},r=l("form-desktop"),u=l("form-mobile");
},{}],"oa0C":[function(require,module,exports) {
"use strict";require("../styles/promo-main.scss");var r=require("./forms-logic");
},{"../styles/promo-main.scss":"ozuS","./forms-logic":"G3t5"}]},{},["oa0C"], null)
//# sourceMappingURL=promo-main.3affacbe.js.map