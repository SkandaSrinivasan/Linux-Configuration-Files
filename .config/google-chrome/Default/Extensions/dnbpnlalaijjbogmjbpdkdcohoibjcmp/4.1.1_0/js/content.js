parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"xso1":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
        value: !0
});

let e = class {
        constructor(e = {}) {
                this.namespace = e.namespace || "extension";
        }
}, s = class extends e {
        constructor(e = {}) {
                super(e), this.port = chrome.runtime.connect({
                        name: this.namespace
                });
        }
        proxyMessages() {
                this.port.onMessage.addListener(e => {
                        e.sender = "bg", e.ns = this.namespace, window.postMessage(e, "*");
                }), window.addEventListener("message", e => {
                        const s = e.data && "bg" !== e.data.sender && e.data.ns === this.namespace;
                        s && this.port.postMessage(e.data);
                });
        }
}, a = class extends e {
        constructor(e = {}) {
                super(e);
        }
        onMessage(e) {
                window.addEventListener("message", s => {
                        const a = s.data && "page" !== s.data.sender && s.data.ns === this.namespace;
                        a && e(s.data);
                });
        }
        postMessage(e) {
                e.sender = "page", e.ns = this.namespace, window.postMessage(e, document.location.origin);
        }
};

exports.CSMessaging = s, exports.PageMessaging = a;
},{}],"b7NS":[function(require,module,exports) {
"use strict";

var t = require("./messaging");

!function() {
        const e = new t.CSMessaging();
        e.proxyMessages();
        const n = document.createElement("script");
        n.setAttribute("type", "text/javascript"), n.setAttribute("charset", "utf-8"), n.src = chrome.extension.getURL("js/context.js"), 
        n.async = !1, document.documentElement.appendChild(n), e.port && e.port.onDisconnect.addListener(() => {
                document.location.reload();
        });
}();
},{"./messaging":"xso1"}]},{},["b7NS"], null)