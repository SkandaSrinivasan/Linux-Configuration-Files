parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"FUtx":[function(require,module,exports) {

},{"./indie-flower-v9-latin-regular.woff2":[["indie-flower-v9-latin-regular.239c829a.woff2","Xxxh"],"Xxxh"]}],"Fe+V":[function(require,module,exports) {

},{}],"fYAS":[function(require,module,exports) {
var define;
var e;!function(r,t){if("object"==typeof exports)module.exports=t(this);else if("function"==typeof e&&e.amd)e([],t.bind(null,"object"==typeof exports?this:r));else{r.ChromePromise=t(r);var n=document.currentScript;if(n){var o=n.dataset.instance;o&&(r[o]=new r.ChromePromise)}}}("undefined"!=typeof self?self:this,function(e){"use strict";var r=Array.prototype.slice,t=Object.prototype.hasOwnProperty;return n.default=n,n;function n(o){var i=(o=o||{}).chrome||e.chrome,s=o.Promise||e.Promise,c=i.runtime,a=this;if(!a)throw new Error("ChromePromise must be called with new keyword");function f(e,t){return function(){var n=r.call(arguments);return new s(function(o,i){n.push(function(){var e=c.lastError,t=r.call(arguments);if(e)i(e);else switch(t.length){case 0:o();break;case 1:o(t[0]);break;default:o(t)}}),e.apply(t,n)})}}function u(e,r){for(var o in e)if(t.call(e,o)){var i=e[o],s=typeof i;"object"!==s||i instanceof n?r[o]="function"===s?f(i,e):i:(r[o]={},u(i,r[o]))}}u(i,a),i.permissions&&i.permissions.onAdded.addListener(function(e){if(e.permissions&&e.permissions.length){var r={};e.permissions.forEach(function(e){var t=/^[^.]+/.exec(e);t in i&&(r[t]=i[t])}),u(r,a)}})}});
},{}],"LKRm":[function(require,module,exports) {
var e=require("./chrome-promise"),r=new e;r.default=r,module.exports=r;
},{"./chrome-promise":"fYAS"}],"msAI":[function(require,module,exports) {
"use strict";

require("../assets/fonts/IndieFlower.scss"), require("./options.scss");

var e = require("chrome-promise"), t = n(e);

function n(e) {
        return e && e.__esModule ? e : {
                default: e
        };
}

window.chromep = t.default;

const o = e => new Promise(t => setTimeout(t, e));

async function c() {
        document.addEventListener("DOMContentLoaded", async function(e) {
                const n = await t.default.runtime.getBackgroundPage(), c = ({target: e}) => {
                        const {checked: t, id: c} = e;
                        t && (window.localStorage.look = c, n.updateCurrentLook(c), o(500).then(() => n.reloadAllNetflixTabs()));
                };
                document.querySelector("#minimal").addEventListener("change", c), document.querySelector("#classic").addEventListener("change", c), 
                o(200).then(() => {
                        const e = window.localStorage.look || "minimal";
                        document.querySelector(`#${e}`).checked = !0;
                });
        });
}

c();
},{"../assets/fonts/IndieFlower.scss":"FUtx","./options.scss":"Fe+V","chrome-promise":"LKRm"}]},{},["msAI"], null)