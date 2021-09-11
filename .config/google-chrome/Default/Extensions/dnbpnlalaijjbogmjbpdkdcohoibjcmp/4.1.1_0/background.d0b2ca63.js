parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"8MgT":[function(require,module,exports) {
"use strict";

function e(e, t) {
        if (null === e) return null;
        if (0 === e) return "0";
        t = !t || t < 0 ? 0 : t;
        var s = e.toPrecision(2).split("e"), i = 1 === s.length ? 0 : Math.floor(Math.min(s[1].slice(1), 14) / 3), r = i < 1 ? e.toFixed(0 + t) : (e / Math.pow(10, 3 * i)).toFixed(1 + t);
        return (r < 0 ? r : Math.abs(r)) + [ "", "K", "M", "B", "T" ][i];
}

Object.defineProperty(exports, "__esModule", {
        value: !0
}), exports.abbreviateNumber = e;

const t = exports.nfVideoInfoPath = (e => [ [ "videos", e += "", "boxarts", [ "_1920x1080", "_342x192", "_342x684", "_112x63" ], "jpg" ], [ "videos", e, [ "creators", "directors", "writers" ], {
        from: 0,
        to: 3
}, [ "id", "name" ] ], [ "videos", e, [ "displayRuntime", "interactiveBookmark", "runtime", "title", "userRating" ] ], [ "videos", e, [ "summary", "availabilityEndDateNear", "delivery", "episodeBadges", "episodeCount", "maturity", "numSeasonsLabel", "releaseYear", "runtime", "seasonCount", "synopsis" ] ], [ "videos", e, "seasonList", "current", "summary" ], [ "videos", e, [ "data", "dpSupplementalMessage", "evidence", "regularSynopsis", "requestId" ] ] ]);
},{}],"QFWw":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
        value: !0
});

const e = {
        contexts: [ "browser_action" ]
}, t = {
        changeStyle: {
                title: "Change style"
        },
        _1: {
                type: "separator"
        }
};

let n = class {
        constructor(e) {
                chrome.contextMenus.onClicked.addListener(this.onClicked.bind(this)), this.store = null;
        }
        _createMenuTree() {
                return Object.assign({}, t);
        }
        async onClicked(e, t) {
                if ("changeStyle" === e.menuItemId) {
                        const e = 520, t = 560, n = Math.round(window.screen.width / 2 - e / 2), r = Math.round(window.screen.height / 2 - t / 2);
                        chrome.windows.create({
                                url: chrome.runtime.getURL("options.html"),
                                type: "popup",
                                width: e,
                                height: t,
                                left: n,
                                top: r
                        }, function(e) {});
                }
        }
        _createContextMenuEntry(t) {
                chrome.contextMenus.create(Object.assign({}, e, t));
        }
        _traverseTree(e, t = []) {
                for (const n in e) {
                        const r = t.concat(n), o = Object.assign({}, e[n]);
                        delete o.children, o.id = r.join("."), o.parentId = t.join(".") || null, this._createContextMenuEntry(o), 
                        e[n].children && this._traverseTree(e[n].children, r);
                }
        }
        updateContextMenu() {
                chrome.contextMenus.removeAll();
                const e = this._createMenuTree();
                return e && this._traverseTree(e), !0;
        }
};

const r = new n();

r.updateContextMenu(), exports.default = r;
},{}],"JlD7":[function(require,module,exports) {
"use strict";

var e = require("./utils");

require("./context_menu");

let t = window.localStorage.look || "minimal";

window.updateCurrentLook = (e => {
        t = e;
});

const n = chrome.runtime.getManifest() || {}, r = [ "3.3.7" ], i = "e254bb8d", o = "https://www.omdbapi.com/", a = {};

function c(e) {
        return e && "" !== e && "0" !== e && "N/A" !== e ? e : null;
}

function s(e) {
        return Object.keys(e).forEach(function(t) {
                var n = t.toLowerCase();
                if (n != t) {
                        var r = e[t];
                        e[n] = r, delete e[t], "object" == typeof r && s(r);
                }
        }), e;
}

async function u(t, n, r) {
        const a = new URL(o);
        let c;
        a.search = new URLSearchParams((() => {
                const e = {
                        apikey: i,
                        t,
                        type: n || "movie"
                };
                return r && (e.y = r), e;
        })());
        try {
                c = await fetch(a);
        } catch (e) {
                return;
        }
        const u = s(await c.json()), l = u && u.imdbid;
        if (!l && u.error && u.error.includes("not found!")) return 404;
        if (!l) return !1;
        if (Object.keys(u).forEach(function(e) {
                "N/A" === u[e] && delete u[e];
        }), u.imdbvotes && !u.imdbvotes.includes("N/A")) {
                u.imdbvotes_num = parseInt(u.imdbvotes.trim().replace(/,/gi, ""));
                try {
                        u.imdbvotes_human = (0, e.abbreviateNumber)(u.imdbvotes_num);
                } catch (e) {
                        u.imdbvotes_human = u.imdbvotes;
                }
        }
        if (u.imdbrating && !u.imdbrating.includes("N/A") && (u.imdbrating_num = parseFloat(u.imdbrating.trim())), 
        u.ratings && u.ratings.length) {
                u.ratings.map(e => s(e));
                const e = u.ratings.find(e => "Rotten Tomatoes" === e.source);
                e && (u.rtrating = e.value);
        }
        return u;
}

async function l(e, t) {
        const n = (e = "") => e.replace(/[\W_]+/g, "").toLowerCase(), r = await u(t.title, t.type, t.releaseYear || t.effectiveReleaseYear);
        if (!r || 404 === r) return u(t.title, t.type);
        const i = ((e, t) => n(e) !== n(t))(t.title, r.title);
        return i ? u(t.title, t.type) : r;
}

function m() {
        chrome.tabs.query({
                url: [ "*://www.netflix.com/*" ]
        }, function(e) {
                for (const t of e) chrome.tabs.reload(t.id, {
                        bypassCache: !0
                });
        });
}

function d() {
        chrome.tabs.query({
                url: [ "*://www.netflix.com/*" ]
        }, function(e) {
                e.length >= 1 ? (chrome.tabs.update(e[0].id, {
                        active: !0
                }), chrome.windows.update(e[0].windowId, {
                        focused: !0
                }), chrome.tabs.reload(e[0].id)) : chrome.tabs.create({
                        url: "https://www.netflix.com/browse"
                });
        });
}

function f() {
        return chrome.browserAction.setBadgeText({
                text: ""
        }), chrome.browserAction.setTitle({
                title: `${n.name}\n\nClick to open Netflix.\nRight-click to change style.`
        }), !1;
}

window.apiCache = a, chrome.runtime.onConnect.addListener(function(e) {
        e.onMessage.addListener(async function(n) {
                if ("check" === n.action) {
                        if (n.look = t, !n.shakti) return;
                        let r = a[n.nfId];
                        if (r) return n.meta = r, e.postMessage(n), !0;
                        if (r = await l(n.nfId, n.shakti)) return a[n.nfId] = r, n.meta = r, e.postMessage(n), 
                        !0;
                }
        });
}), window.reloadAllNetflixTabs = m, f(), chrome.browserAction.onClicked.addListener(function(e) {
        return d();
}), chrome.runtime.onInstalled.addListener(e => {
        "install" === e.reason && (m(), chrome.tabs.create({
                url: chrome.runtime.getURL("intro.html"),
                active: !0
        }), window.localStorage.setItem("installVersion", n.version)), e.reason;
});
},{"./utils":"8MgT","./context_menu":"QFWw"}]},{},["JlD7"], null)