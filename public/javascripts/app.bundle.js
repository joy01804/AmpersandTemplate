(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var app = require('ampersand-app');
var _ = require('underscore');
var config = require('clientconfig');
var Router = require('./router');
var MainView = require('./views/main');
var domReady = require('domready');

// attach our app to `window` so we can
// easily access it from the console.
window.app = app;

// Extends our main app singleton
app.extend({

    router: new Router(),
    // This is where it all starts
    init: function() {
        // Create and attach our main view
        this.mainView = new MainView({
            el: document.body
        });

        // this kicks off our backbutton tracking (browser history)
        // and will cause the first matching handler in the router
        // to fire.
        this.router.history.start({ pushState: true });
    },
    // This is a helper for navigating around the app.
    // this gets called by a global click handler that handles
    // all the <a> tags in the app.
    // it expects a url pathname for example: "/costello/settings"
    navigate: function(page) {
        var url = (page.charAt(0) === '/') ? page.slice(1) : page;
        this.router.history.navigate(url, {
            trigger: true
        });
    }
});

// run it on domReady
domReady(_.bind(app.init, app));

},{"./router":4,"./views/main":6,"ampersand-app":7,"clientconfig":250,"domready":253,"underscore":256}],2:[function(require,module,exports){
/*global $*/
// base view for pages
var View = require('ampersand-view');
var _ = require('underscore');
//var key = require('keymaster');


module.exports = View.extend({
    // register keyboard handlers
    registerKeyboardShortcuts: function () {
        /*
        var self = this;
        _.each(this.keyboardShortcuts, function (value, k) {
            // register key handler scoped to this page
            key(k, self.cid, _.bind(self[value], self));
        });
        key.setScope(this.cid);
        */
    },
    unregisterKeyboardShortcuts: function () {
        //key.deleteScope(this.cid);
    }
});

},{"ampersand-view":86,"underscore":256}],3:[function(require,module,exports){
var PageView = require('./base');
var templates = require('../templates');

module.exports = PageView.extend({
    pageTitle: 'home',
    template: templates.pages.home
});

},{"../templates":5,"./base":2}],4:[function(require,module,exports){
var app = require('ampersand-app');
var Router = require('ampersand-router');
var HomePage = require('./pages/home');


module.exports = Router.extend({
    routes: {
        '': 'home',
        '(*path)': 'catchAll'
    },

    // ------- ROUTE HANDLERS ---------
    home: function () {
        app.trigger('page', new HomePage());
    },

    catchAll: function () {
        this.redirectTo('');
    }
});

},{"./pages/home":3,"ampersand-app":7,"ampersand-router":64}],5:[function(require,module,exports){
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof root === 'undefined' || root !== Object(root)) {
        throw new Error('templatizer: window does not exist or is not an object');
    } else {
        root.templatizer = factory();
    }
}(this, function () {
    var jade=function(){function e(e){return null!=e&&""!==e}function n(t){return(Array.isArray(t)?t.map(n):t&&"object"==typeof t?Object.keys(t).filter(function(e){return t[e]}):[t]).filter(e).join(" ")}var t={};return t.merge=function r(n,t){if(1===arguments.length){for(var a=n[0],i=1;i<n.length;i++)a=r(a,n[i]);return a}var o=n["class"],s=t["class"];(o||s)&&(o=o||[],s=s||[],Array.isArray(o)||(o=[o]),Array.isArray(s)||(s=[s]),n["class"]=o.concat(s).filter(e));for(var l in t)"class"!=l&&(n[l]=t[l]);return n},t.joinClasses=n,t.cls=function(e,r){for(var a=[],i=0;i<e.length;i++)a.push(r&&r[i]?t.escape(n([e[i]])):n(e[i]));var o=n(a);return o.length?' class="'+o+'"':""},t.style=function(e){return e&&"object"==typeof e?Object.keys(e).map(function(n){return n+":"+e[n]}).join(";"):e},t.attr=function(e,n,r,a){return"style"===e&&(n=t.style(n)),"boolean"==typeof n||null==n?n?" "+(a?e:e+'="'+e+'"'):"":0==e.indexOf("data")&&"string"!=typeof n?(-1!==JSON.stringify(n).indexOf("&")&&console.warn("Since Jade 2.0.0, ampersands (`&`) in data attributes will be escaped to `&amp;`"),n&&"function"==typeof n.toISOString&&console.warn("Jade will eliminate the double quotes around dates in ISO form after 2.0.0")," "+e+"='"+JSON.stringify(n).replace(/'/g,"&apos;")+"'"):r?(n&&"function"==typeof n.toISOString&&console.warn("Jade will stringify dates in ISO form after 2.0.0")," "+e+'="'+t.escape(n)+'"'):(n&&"function"==typeof n.toISOString&&console.warn("Jade will stringify dates in ISO form after 2.0.0")," "+e+'="'+n+'"')},t.attrs=function(e,r){var a=[],i=Object.keys(e);if(i.length)for(var o=0;o<i.length;++o){var s=i[o],l=e[s];"class"==s?(l=n(l))&&a.push(" "+s+'="'+l+'"'):a.push(t.attr(s,l,!1,r))}return a.join("")},t.escape=function(e){var n=String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");return n===""+e?e:n},t.rethrow=function a(e,n,t,r){if(!(e instanceof Error))throw e;if(!("undefined"==typeof window&&n||r))throw e.message+=" on line "+t,e;try{r=r||require("fs").readFileSync(n,"utf8")}catch(i){a(e,null,t)}var o=3,s=r.split("\n"),l=Math.max(t-o,0),f=Math.min(s.length,t+o),o=s.slice(l,f).map(function(e,n){var r=n+l+1;return(r==t?"  > ":"    ")+r+"| "+e}).join("\n");throw e.path=n,e.message=(n||"Jade")+":"+t+"\n"+o+"\n\n"+e.message,e},t}(); 

    var templatizer = {};
    templatizer["pages"] = {};

    // body.jade compiled template
    templatizer["body"] = function tmpl_body() {
        return '<div class="container"><main data-hook="page-container"></main><footer></footer></div>';
    };

    // head.jade compiled template
    templatizer["head"] = function tmpl_head() {
        return '<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0"/><meta name="apple-mobile-web-app-capable" content="yes"/>';
    };

    // pages\home.jade compiled template
    templatizer["pages"]["home"] = function tmpl_pages_home() {
        return '<section class="page home"><h2>This is now the realm of Ampersand</h2></section>';
    };

    // pages\home.jade compiled template
    templatizer["pages"]["home"] = function tmpl_pages_home() {
        return '<section class="page home"><h2>This is now the realm of Ampersand</h2></section>';
    };

    return templatizer;
}));
},{"fs":249}],6:[function(require,module,exports){
// This app view is responsible for rendering all content that goes into
// <html>. It's initted right away and renders itself on DOM ready.
var app = require('ampersand-app');
var setFavicon = require('favicon-setter');
var View = require('ampersand-view');
var dom = require('ampersand-dom');
var ViewSwitcher = require('ampersand-view-switcher');
var _ = require('underscore');
var domify = require('domify');
var localLinks = require('local-links');
var templates = require('../templates');


module.exports = View.extend({
    template: templates.body,
    autoRender: true,
    initialize: function () {
        // this marks the correct nav item selected
        this.listenTo(app, 'page', this.handleNewPage);
    },
    events: {
        'click a[href]': 'handleLinkClick'
    },
    render: function () {
        // some additional stuff we want to add to the document head
        document.head.appendChild(domify(templates.head()));

        // main renderer
        this.renderWithTemplate(this);

        // init and configure our page switcher
        this.pageSwitcher = new ViewSwitcher(this.queryByHook('page-container'), {
            show: function (newView, oldView) {
                // it's inserted and rendered for me
                document.title = _.result(newView, 'pageTitle') || 'Ampersand Template';
                document.scrollTop = 0;

                // add a class specifying it's active
                dom.addClass(newView.el, 'active');

                // store an additional reference, just because
                app.currentPage = newView;
            }
        });

        // setting a favicon for fun (note, it's dynamic)
        setFavicon('/favicon.ico');
        return this;
    },

    handleNewPage: function (view) {
        // tell the view switcher to render the new one
        this.pageSwitcher.set(view);

        // mark the correct nav item selected
        this.updateActiveNav();
    },

    // Handles all `<a>` clicks in the app not handled
    // by another view. This lets us determine if this is
    // a click that should be handled internally by the app.
    handleLinkClick: function (e) {
        // This module determines whether a click event is 
        // a local click (making sure the for modifier keys, etc)
        // and dealing with browser quirks to determine if this
        // event was from clicking an internal link. That we should
        // treat like local navigation.
        var localPath = localLinks.pathname(e);
        
        if (localPath) {
            e.preventDefault();
            app.navigate(localPath);
        }
    },

    updateActiveNav: function () {
        var path = window.location.pathname.slice(1);

        this.queryAll('.nav a[href]').forEach(function (aTag) {
            var aPath = aTag.pathname.slice(1);

            if ((!aPath && !path) || (aPath && path.indexOf(aPath) === 0)) {
                dom.addClass(aTag.parentNode, 'active');
            } else {
                dom.removeClass(aTag.parentNode, 'active');
            }
        });
    }
});

},{"../templates":5,"ampersand-app":7,"ampersand-dom":62,"ampersand-view":86,"ampersand-view-switcher":85,"domify":252,"favicon-setter":254,"local-links":255,"underscore":256}],7:[function(require,module,exports){
;if (typeof window !== "undefined") {  window.ampersand = window.ampersand || {};  window.ampersand["ampersand-app"] = window.ampersand["ampersand-app"] || [];  window.ampersand["ampersand-app"].push("1.0.3");}
var Events = require('ampersand-events');
var toArray = require('amp-to-array');
var extend = require('amp-extend');


// instance app, can be used just by itself
// or by calling as function to pass labels
// by attaching all instances to this, we can
// avoid globals
var app = {
    extend: function () {
        var args = toArray(arguments);
        args.unshift(this);
        return extend.apply(null, args);
    },
    reset: function () {
        // clear all events
        this.off();
        // remove all but main two methods
        for (var item in this) {
            if (item !== 'extend' && item !== 'reset') {
                delete this[item];
            }
        }
        // remix events
        Events.createEmitter(this);
    }
};

Events.createEmitter(app);

// export our singleton
module.exports = app;

},{"amp-extend":8,"amp-to-array":30,"ampersand-events":31}],8:[function(require,module,exports){
var isObject = require('amp-is-object');


module.exports = function(obj) {
    if (!isObject(obj)) return obj;
    var source, prop;
    for (var i = 1, length = arguments.length; i < length; i++) {
        source = arguments[i];
        for (prop in source) {
            obj[prop] = source[prop];
        }
    }
    return obj;
};

},{"amp-is-object":9}],9:[function(require,module,exports){
module.exports = function isObject(obj) {
    var type = typeof obj;
    return !!obj && (type === 'function' || type === 'object');
};

},{}],10:[function(require,module,exports){
var toString = Object.prototype.toString;
var nativeIsArray = Array.isArray;


module.exports = nativeIsArray || function isArray(obj) {
    return toString.call(obj) === '[object Array]';
};

},{}],11:[function(require,module,exports){
var createIteratee = require('amp-iteratee');
var objKeys = require('amp-keys');


module.exports = function map(obj, iteratee, context) {
    if (obj == null) return [];
    iteratee = createIteratee(iteratee, context, 3);
    var keys = obj.length !== +obj.length && objKeys(obj);
    var length = (keys || obj).length;
    var results = Array(length);
    var currentKey;
    var index = 0;
    for (; index < length; index++) {
        currentKey = keys ? keys[index] : index;
        results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
};

},{"amp-iteratee":12,"amp-keys":19}],12:[function(require,module,exports){
var isFunction = require('amp-is-function');
var isObject = require('amp-is-object');
var createCallback = require('amp-create-callback');
var matches = require('amp-matches');
var property = require('amp-property');
var identity = function (val) { return val; };


module.exports = function iteratee(value, context, argCount) {
    if (value == null) return identity;
    if (isFunction(value)) return createCallback(value, context, argCount);
    if (isObject(value)) return matches(value);
    return property(value);
};

},{"amp-create-callback":13,"amp-is-function":14,"amp-is-object":15,"amp-matches":16,"amp-property":18}],13:[function(require,module,exports){
module.exports = function createCallback(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount) {
    case 1: 
        return function(value) {
            return func.call(context, value);
        };
    case 2: 
        return function(value, other) {
            return func.call(context, value, other);
        };
    case 3: 
        return function(value, index, collection) {
            return func.call(context, value, index, collection);
        };
    case 4: 
        return function(accumulator, value, index, collection) {
            return func.call(context, accumulator, value, index, collection);
        };
    }
    return function() {
        return func.apply(context, arguments);
    };
};

},{}],14:[function(require,module,exports){
var toString = Object.prototype.toString;
var func = function isFunction(obj) {
    return toString.call(obj) === '[object Function]';
};

// Optimize `isFunction` if appropriate. Work around an IE 11 bug.
if (typeof /./ !== 'function') {
    func = function isFunction(obj) {
      return typeof obj == 'function' || false;
    };
}

module.exports = func;

},{}],15:[function(require,module,exports){
arguments[4][9][0].apply(exports,arguments)
},{"dup":9}],16:[function(require,module,exports){
var getPairs = require('amp-pairs');


module.exports = function matches(attrs) {
    var pairs = getPairs(attrs);
    var length = pairs.length;
    return function(obj) {
        if (obj == null) return !length;
        obj = new Object(obj);
        for (var i = 0; i < length; i++) {
            var pair = pairs[i], key = pair[0];
            if (pair[1] !== obj[key] || !(key in obj)) return false;
        }
        return true;
    };
};

},{"amp-pairs":17}],17:[function(require,module,exports){
var objKeys = require('amp-keys');


module.exports = function pairs(obj) {
    var keys = objKeys(obj);
    var length = keys.length;
    var result = Array(length);
    for (var i = 0; i < length; i++) {
        result[i] = [keys[i], obj[keys[i]]];
    }
    return result;
};

},{"amp-keys":19}],18:[function(require,module,exports){
module.exports = function property(key) {
    return function(obj) {
        return obj == null ? void 0 : obj[key];
    };
};

},{}],19:[function(require,module,exports){
var has = require('amp-has');
var indexOf = require('amp-index-of');
var isObject = require('amp-is-object');
var nativeKeys = Object.keys;
var hasEnumBug = !({toString: null}).propertyIsEnumerable('toString');
var nonEnumerableProps = ['constructor', 'valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];


module.exports = function keys(obj) {
    if (!isObject(obj)) return [];
    if (nativeKeys) {
        return nativeKeys(obj);
    }
    var result = [];
    for (var key in obj) if (has(obj, key)) result.push(key);
    // IE < 9
    if (hasEnumBug) {
        var nonEnumIdx = nonEnumerableProps.length;
        while (nonEnumIdx--) {
            var prop = nonEnumerableProps[nonEnumIdx];
            if (has(obj, prop) && indexOf(result, prop) === -1) result.push(prop);
        }
    }
    return result;
};

},{"amp-has":20,"amp-index-of":21,"amp-is-object":23}],20:[function(require,module,exports){
var hasOwn = Object.prototype.hasOwnProperty;


module.exports = function has(obj, key) {
    return obj != null && hasOwn.call(obj, key);
};

},{}],21:[function(require,module,exports){
var isNumber = require('amp-is-number');


module.exports = function indexOf(arr, item, from) {
    var i = 0;
    var l = arr && arr.length;
    if (isNumber(from)) {
        i = from < 0 ? Math.max(0, l + from) : from;
    }
    for (; i < l; i++) {
        if (arr[i] === item) return i;
    }
    return -1;
};

},{"amp-is-number":22}],22:[function(require,module,exports){
var toString = Object.prototype.toString;


module.exports = function isNumber(obj) {
    return toString.call(obj) === '[object Number]';
};

},{}],23:[function(require,module,exports){
arguments[4][9][0].apply(exports,arguments)
},{"dup":9}],24:[function(require,module,exports){
arguments[4][19][0].apply(exports,arguments)
},{"amp-has":25,"amp-index-of":26,"amp-is-object":28,"dup":19}],25:[function(require,module,exports){
arguments[4][20][0].apply(exports,arguments)
},{"dup":20}],26:[function(require,module,exports){
arguments[4][21][0].apply(exports,arguments)
},{"amp-is-number":27,"dup":21}],27:[function(require,module,exports){
arguments[4][22][0].apply(exports,arguments)
},{"dup":22}],28:[function(require,module,exports){
arguments[4][9][0].apply(exports,arguments)
},{"dup":9}],29:[function(require,module,exports){
var oKeys = require('amp-keys');


module.exports = function values(obj) {
    var keys = oKeys(obj);
    var length = keys.length;
    var vals = Array(length);
    for (var i = 0; i < length; i++) {
        vals[i] = obj[keys[i]];
    }
    return vals;
};

},{"amp-keys":24}],30:[function(require,module,exports){
var values = require('amp-values');
var map = require('amp-map');
var isArray = require('amp-is-array');
var slice = Array.prototype.slice;
var identity = function (val) { return val; };


module.exports = function toArray(obj) {
    if (!obj) return [];
    if (isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return map(obj, identity);
    return values(obj);
};

},{"amp-is-array":10,"amp-map":11,"amp-values":29}],31:[function(require,module,exports){
;if (typeof window !== "undefined") {  window.ampersand = window.ampersand || {};  window.ampersand["ampersand-events"] = window.ampersand["ampersand-events"] || [];  window.ampersand["ampersand-events"].push("1.1.1");}
var runOnce = require('lodash.once');
var uniqueId = require('lodash.uniqueid');
var keys = require('lodash.keys');
var isEmpty = require('lodash.isempty');
var each = require('lodash.foreach');
var bind = require('lodash.bind');
var assign = require('lodash.assign');
var slice = Array.prototype.slice;
var eventSplitter = /\s+/;


var Events = {
    // Bind an event to a `callback` function. Passing `"all"` will bind
    // the callback to all events fired.
    on: function(name, callback, context) {
        if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
        this._events || (this._events = {});
        var events = this._events[name] || (this._events[name] = []);
        events.push({callback: callback, context: context, ctx: context || this});
        return this;
    },

    // Bind an event to only be triggered a single time. After the first time
    // the callback is invoked, it will be removed.
    once: function(name, callback, context) {
        if (!eventsApi(this, 'once', name, [callback, context]) || !callback) return this;
        var self = this;
        var once = runOnce(function() {
            self.off(name, once);
            callback.apply(this, arguments);
        });
        once._callback = callback;
        return this.on(name, once, context);
    },

    // Remove one or many callbacks. If `context` is null, removes all
    // callbacks with that function. If `callback` is null, removes all
    // callbacks for the event. If `name` is null, removes all bound
    // callbacks for all events.
    off: function(name, callback, context) {
        var retain, ev, events, names, i, l, j, k;
        if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
        if (!name && !callback && !context) {
            this._events = void 0;
            return this;
        }
        names = name ? [name] : keys(this._events);
        for (i = 0, l = names.length; i < l; i++) {
            name = names[i];
            if (events = this._events[name]) {
                this._events[name] = retain = [];
                if (callback || context) {
                    for (j = 0, k = events.length; j < k; j++) {
                        ev = events[j];
                        if ((callback && callback !== ev.callback && callback !== ev.callback._callback) ||
                                (context && context !== ev.context)) {
                            retain.push(ev);
                        }
                    }
                }
                if (!retain.length) delete this._events[name];
            }
        }

        return this;
    },

    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    trigger: function(name) {
        if (!this._events) return this;
        var args = slice.call(arguments, 1);
        if (!eventsApi(this, 'trigger', name, args)) return this;
        var events = this._events[name];
        var allEvents = this._events.all;
        if (events) triggerEvents(events, args);
        if (allEvents) triggerEvents(allEvents, arguments);
        return this;
    },

    // Tell this object to stop listening to either specific events ... or
    // to every object it's currently listening to.
    stopListening: function(obj, name, callback) {
        var listeningTo = this._listeningTo;
        if (!listeningTo) return this;
        var remove = !name && !callback;
        if (!callback && typeof name === 'object') callback = this;
        if (obj) (listeningTo = {})[obj._listenId] = obj;
        for (var id in listeningTo) {
            obj = listeningTo[id];
            obj.off(name, callback, this);
            if (remove || isEmpty(obj._events)) delete this._listeningTo[id];
        }
        return this;
    },

    // extend an object with event capabilities if passed
    // or just return a new one.
    createEmitter: function (obj) {
        return assign(obj || {}, Events);
    }
};

Events.bind = Events.on;
Events.unbind = Events.off;


// Implement fancy features of the Events API such as multiple event
// names `"change blur"` and jQuery-style event maps `{change: action}`
// in terms of the existing API.
var eventsApi = function(obj, action, name, rest) {
    if (!name) return true;

    // Handle event maps.
    if (typeof name === 'object') {
        for (var key in name) {
            obj[action].apply(obj, [key, name[key]].concat(rest));
        }
        return false;
    }

    // Handle space separated event names.
    if (eventSplitter.test(name)) {
        var names = name.split(eventSplitter);
        for (var i = 0, l = names.length; i < l; i++) {
            obj[action].apply(obj, [names[i]].concat(rest));
        }
        return false;
    }

    return true;
};

// A difficult-to-believe, but optimized internal dispatch function for
// triggering events. Tries to keep the usual cases speedy.
var triggerEvents = function(events, args) {
    var ev;
    var i = -1;
    var l = events.length;
    var a1 = args[0];
    var a2 = args[1];
    var a3 = args[2];
    switch (args.length) {
        case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
        case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
        case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
        case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
        default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args); return;
    }
};

var listenMethods = {
    listenTo: 'on',
    listenToOnce: 'once'
};

// Inversion-of-control versions of `on` and `once`. Tell *this* object to
// listen to an event in another object ... keeping track of what it's
// listening to.
each(listenMethods, function(implementation, method) {
    Events[method] = function(obj, name, callback, run) {
        var listeningTo = this._listeningTo || (this._listeningTo = {});
        var id = obj._listenId || (obj._listenId = uniqueId('l'));
        listeningTo[id] = obj;
        if (!callback && typeof name === 'object') callback = this;
        obj[implementation](name, callback, this);
        return this;
    };
});

Events.listenToAndRun = function (obj, name, callback) {
    Events.listenTo.apply(this, arguments);
    if (!callback && typeof name === 'object') callback = this;
    callback.apply(this);
    return this;
};

module.exports = Events;

},{"lodash.assign":32,"lodash.bind":38,"lodash.foreach":44,"lodash.isempty":49,"lodash.keys":54,"lodash.once":58,"lodash.uniqueid":60}],32:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseAssign = require('lodash._baseassign'),
    createAssigner = require('lodash._createassigner');

/**
 * Assigns own enumerable properties of source object(s) to the destination
 * object. Subsequent sources overwrite property assignments of previous sources.
 * If `customizer` is provided it is invoked to produce the assigned values.
 * The `customizer` is bound to `thisArg` and invoked with five arguments;
 * (objectValue, sourceValue, key, object, source).
 *
 * @static
 * @memberOf _
 * @alias extend
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @param {Function} [customizer] The function to customize assigning values.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {Object} Returns `object`.
 * @example
 *
 * _.assign({ 'user': 'barney' }, { 'age': 40 }, { 'user': 'fred' });
 * // => { 'user': 'fred', 'age': 40 }
 *
 * // using a customizer callback
 * var defaults = _.partialRight(_.assign, function(value, other) {
 *   return typeof value == 'undefined' ? other : value;
 * });
 *
 * defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
 * // => { 'user': 'barney', 'age': 36 }
 */
var assign = createAssigner(baseAssign);

module.exports = assign;

},{"lodash._baseassign":33,"lodash._createassigner":35}],33:[function(require,module,exports){
/**
 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseCopy = require('lodash._basecopy'),
    keys = require('lodash.keys');

/**
 * The base implementation of `_.assign` without support for argument juggling,
 * multiple sources, and `this` binding `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {Function} [customizer] The function to customize assigning values.
 * @returns {Object} Returns the destination object.
 */
function baseAssign(object, source, customizer) {
  var props = keys(source);
  if (!customizer) {
    return baseCopy(source, object, props);
  }
  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index],
        value = object[key],
        result = customizer(value, source[key], key, object, source);

    if ((result === result ? (result !== value) : (value === value)) ||
        (typeof value == 'undefined' && !(key in object))) {
      object[key] = result;
    }
  }
  return object;
}

module.exports = baseAssign;

},{"lodash._basecopy":34,"lodash.keys":54}],34:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Copies the properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Array} props The property names to copy.
 * @returns {Object} Returns `object`.
 */
function baseCopy(source, object, props) {
  if (!props) {
    props = object;
    object = {};
  }
  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];
    object[key] = source[key];
  }
  return object;
}

module.exports = baseCopy;

},{}],35:[function(require,module,exports){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var bindCallback = require('lodash._bindcallback'),
    isIterateeCall = require('lodash._isiterateecall');

/**
 * Creates a function that assigns properties of source object(s) to a given
 * destination object.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return function() {
    var args = arguments,
        length = args.length,
        object = args[0];

    if (length < 2 || object == null) {
      return object;
    }
    var customizer = args[length - 2],
        thisArg = args[length - 1],
        guard = args[3];

    if (length > 3 && typeof customizer == 'function') {
      customizer = bindCallback(customizer, thisArg, 5);
      length -= 2;
    } else {
      customizer = (length > 2 && typeof thisArg == 'function') ? thisArg : null;
      length -= (customizer ? 1 : 0);
    }
    if (guard && isIterateeCall(args[1], args[2], guard)) {
      customizer = length == 3 ? null : customizer;
      length = 2;
    }
    var index = 0;
    while (++index < length) {
      var source = args[index];
      if (source) {
        assigner(object, source, customizer);
      }
    }
    return object;
  };
}

module.exports = createAssigner;

},{"lodash._bindcallback":36,"lodash._isiterateecall":37}],36:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * A specialized version of `baseCallback` which only supports `this` binding
 * and specifying the number of arguments to provide to `func`.
 *
 * @private
 * @param {Function} func The function to bind.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function bindCallback(func, thisArg, argCount) {
  if (typeof func != 'function') {
    return identity;
  }
  if (typeof thisArg == 'undefined') {
    return func;
  }
  switch (argCount) {
    case 1: return function(value) {
      return func.call(thisArg, value);
    };
    case 3: return function(value, index, collection) {
      return func.call(thisArg, value, index, collection);
    };
    case 4: return function(accumulator, value, index, collection) {
      return func.call(thisArg, accumulator, value, index, collection);
    };
    case 5: return function(value, other, key, object, source) {
      return func.call(thisArg, value, other, key, object, source);
    };
  }
  return function() {
    return func.apply(thisArg, arguments);
  };
}

/**
 * This method returns the first argument provided to it.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'user': 'fred' };
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = bindCallback;

},{}],37:[function(require,module,exports){
/**
 * lodash 3.0.5 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = +value;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

/**
 * Checks if the provided arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number') {
    var length = object.length,
        prereq = isLength(length) && isIndex(index, length);
  } else {
    prereq = type == 'string' && index in object;
  }
  if (prereq) {
    var other = object[index];
    return value === value ? (value === other) : (other !== other);
  }
  return false;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return type == 'function' || (!!value && type == 'object');
}

module.exports = isIterateeCall;

},{}],38:[function(require,module,exports){
/**
 * lodash 3.1.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var createWrapper = require('lodash._createwrapper'),
    replaceHolders = require('lodash._replaceholders'),
    restParam = require('lodash.restparam');

/** Used to compose bitmasks for wrapper metadata. */
var BIND_FLAG = 1,
    PARTIAL_FLAG = 32;

/**
 * Creates a function that invokes `func` with the `this` binding of `thisArg`
 * and prepends any additional `_.bind` arguments to those provided to the
 * bound function.
 *
 * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
 * may be used as a placeholder for partially applied arguments.
 *
 * **Note:** Unlike native `Function#bind` this method does not set the `length`
 * property of bound functions.
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to bind.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {...*} [partials] The arguments to be partially applied.
 * @returns {Function} Returns the new bound function.
 * @example
 *
 * var greet = function(greeting, punctuation) {
 *   return greeting + ' ' + this.user + punctuation;
 * };
 *
 * var object = { 'user': 'fred' };
 *
 * var bound = _.bind(greet, object, 'hi');
 * bound('!');
 * // => 'hi fred!'
 *
 * // using placeholders
 * var bound = _.bind(greet, object, _, '!');
 * bound('hi');
 * // => 'hi fred!'
 */
var bind = restParam(function(func, thisArg, partials) {
  var bitmask = BIND_FLAG;
  if (partials.length) {
    var holders = replaceHolders(partials, bind.placeholder);
    bitmask |= PARTIAL_FLAG;
  }
  return createWrapper(func, bitmask, thisArg, partials, holders);
});

// Assign default placeholders.
bind.placeholder = {};

module.exports = bind;

},{"lodash._createwrapper":39,"lodash._replaceholders":42,"lodash.restparam":43}],39:[function(require,module,exports){
(function (global){
/**
 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var arrayCopy = require('lodash._arraycopy'),
    baseCreate = require('lodash._basecreate'),
    replaceHolders = require('lodash._replaceholders');

/** Used to compose bitmasks for wrapper metadata. */
var BIND_FLAG = 1,
    BIND_KEY_FLAG = 2,
    CURRY_BOUND_FLAG = 4,
    CURRY_FLAG = 8,
    CURRY_RIGHT_FLAG = 16,
    PARTIAL_FLAG = 32,
    PARTIAL_RIGHT_FLAG = 64,
    ARY_FLAG = 128;

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * Creates an array that is the composition of partially applied arguments,
 * placeholders, and provided arguments into a single array of arguments.
 *
 * @private
 * @param {Array|Object} args The provided arguments.
 * @param {Array} partials The arguments to prepend to those provided.
 * @param {Array} holders The `partials` placeholder indexes.
 * @returns {Array} Returns the new array of composed arguments.
 */
function composeArgs(args, partials, holders) {
  var holdersLength = holders.length,
      argsIndex = -1,
      argsLength = nativeMax(args.length - holdersLength, 0),
      leftIndex = -1,
      leftLength = partials.length,
      result = Array(argsLength + leftLength);

  while (++leftIndex < leftLength) {
    result[leftIndex] = partials[leftIndex];
  }
  while (++argsIndex < holdersLength) {
    result[holders[argsIndex]] = args[argsIndex];
  }
  while (argsLength--) {
    result[leftIndex++] = args[argsIndex++];
  }
  return result;
}

/**
 * This function is like `composeArgs` except that the arguments composition
 * is tailored for `_.partialRight`.
 *
 * @private
 * @param {Array|Object} args The provided arguments.
 * @param {Array} partials The arguments to append to those provided.
 * @param {Array} holders The `partials` placeholder indexes.
 * @returns {Array} Returns the new array of composed arguments.
 */
function composeArgsRight(args, partials, holders) {
  var holdersIndex = -1,
      holdersLength = holders.length,
      argsIndex = -1,
      argsLength = nativeMax(args.length - holdersLength, 0),
      rightIndex = -1,
      rightLength = partials.length,
      result = Array(argsLength + rightLength);

  while (++argsIndex < argsLength) {
    result[argsIndex] = args[argsIndex];
  }
  var pad = argsIndex;
  while (++rightIndex < rightLength) {
    result[pad + rightIndex] = partials[rightIndex];
  }
  while (++holdersIndex < holdersLength) {
    result[pad + holders[holdersIndex]] = args[argsIndex++];
  }
  return result;
}

/**
 * Creates a function that wraps `func` and invokes it with the `this`
 * binding of `thisArg`.
 *
 * @private
 * @param {Function} func The function to bind.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @returns {Function} Returns the new bound function.
 */
function createBindWrapper(func, thisArg) {
  var Ctor = createCtorWrapper(func);

  function wrapper() {
    var fn = (this && this !== global && this instanceof wrapper) ? Ctor : func;
    return fn.apply(thisArg, arguments);
  }
  return wrapper;
}

/**
 * Creates a function that produces an instance of `Ctor` regardless of
 * whether it was invoked as part of a `new` expression or by `call` or `apply`.
 *
 * @private
 * @param {Function} Ctor The constructor to wrap.
 * @returns {Function} Returns the new wrapped function.
 */
function createCtorWrapper(Ctor) {
  return function() {
    var thisBinding = baseCreate(Ctor.prototype),
        result = Ctor.apply(thisBinding, arguments);

    // Mimic the constructor's `return` behavior.
    // See https://es5.github.io/#x13.2.2 for more details.
    return isObject(result) ? result : thisBinding;
  };
}

/**
 * Creates a function that wraps `func` and invokes it with optional `this`
 * binding of, partial application, and currying.
 *
 * @private
 * @param {Function|string} func The function or method name to reference.
 * @param {number} bitmask The bitmask of flags. See `createWrapper` for more details.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to prepend to those provided to the new function.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [partialsRight] The arguments to append to those provided to the new function.
 * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createHybridWrapper(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
  var isAry = bitmask & ARY_FLAG,
      isBind = bitmask & BIND_FLAG,
      isBindKey = bitmask & BIND_KEY_FLAG,
      isCurry = bitmask & CURRY_FLAG,
      isCurryBound = bitmask & CURRY_BOUND_FLAG,
      isCurryRight = bitmask & CURRY_RIGHT_FLAG;

  var Ctor = !isBindKey && createCtorWrapper(func),
      key = func;

  function wrapper() {
    // Avoid `arguments` object use disqualifying optimizations by
    // converting it to an array before providing it to other functions.
    var length = arguments.length,
        index = length,
        args = Array(length);

    while (index--) {
      args[index] = arguments[index];
    }
    if (partials) {
      args = composeArgs(args, partials, holders);
    }
    if (partialsRight) {
      args = composeArgsRight(args, partialsRight, holdersRight);
    }
    if (isCurry || isCurryRight) {
      var placeholder = wrapper.placeholder,
          argsHolders = replaceHolders(args, placeholder);

      length -= argsHolders.length;
      if (length < arity) {
        var newArgPos = argPos ? arrayCopy(argPos) : null,
            newArity = nativeMax(arity - length, 0),
            newsHolders = isCurry ? argsHolders : null,
            newHoldersRight = isCurry ? null : argsHolders,
            newPartials = isCurry ? args : null,
            newPartialsRight = isCurry ? null : args;

        bitmask |= (isCurry ? PARTIAL_FLAG : PARTIAL_RIGHT_FLAG);
        bitmask &= ~(isCurry ? PARTIAL_RIGHT_FLAG : PARTIAL_FLAG);

        if (!isCurryBound) {
          bitmask &= ~(BIND_FLAG | BIND_KEY_FLAG);
        }
        var result = createHybridWrapper(func, bitmask, thisArg, newPartials, newsHolders, newPartialsRight, newHoldersRight, newArgPos, ary, newArity);

        result.placeholder = placeholder;
        return result;
      }
    }
    var thisBinding = isBind ? thisArg : this;
    if (isBindKey) {
      func = thisBinding[key];
    }
    if (argPos) {
      args = reorder(args, argPos);
    }
    if (isAry && ary < args.length) {
      args.length = ary;
    }
    var fn = (this && this !== global && this instanceof wrapper) ? (Ctor || createCtorWrapper(func)) : func;
    return fn.apply(thisBinding, args);
  }
  return wrapper;
}

/**
 * Creates a function that wraps `func` and invokes it with the optional `this`
 * binding of `thisArg` and the `partials` prepended to those provided to
 * the wrapper.
 *
 * @private
 * @param {Function} func The function to partially apply arguments to.
 * @param {number} bitmask The bitmask of flags. See `createWrapper` for more details.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} partials The arguments to prepend to those provided to the new function.
 * @returns {Function} Returns the new bound function.
 */
function createPartialWrapper(func, bitmask, thisArg, partials) {
  var isBind = bitmask & BIND_FLAG,
      Ctor = createCtorWrapper(func);

  function wrapper() {
    // Avoid `arguments` object use disqualifying optimizations by
    // converting it to an array before providing it `func`.
    var argsIndex = -1,
        argsLength = arguments.length,
        leftIndex = -1,
        leftLength = partials.length,
        args = Array(argsLength + leftLength);

    while (++leftIndex < leftLength) {
      args[leftIndex] = partials[leftIndex];
    }
    while (argsLength--) {
      args[leftIndex++] = arguments[++argsIndex];
    }
    var fn = (this && this !== global && this instanceof wrapper) ? Ctor : func;
    return fn.apply(isBind ? thisArg : this, args);
  }
  return wrapper;
}

/**
 * Creates a function that either curries or invokes `func` with optional
 * `this` binding and partially applied arguments.
 *
 * @private
 * @param {Function|string} func The function or method name to reference.
 * @param {number} bitmask The bitmask of flags.
 *  The bitmask may be composed of the following flags:
 *     1 - `_.bind`
 *     2 - `_.bindKey`
 *     4 - `_.curry` or `_.curryRight` of a bound function
 *     8 - `_.curry`
 *    16 - `_.curryRight`
 *    32 - `_.partial`
 *    64 - `_.partialRight`
 *   128 - `_.rearg`
 *   256 - `_.ary`
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to be partially applied.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createWrapper(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
  var isBindKey = bitmask & BIND_KEY_FLAG;
  if (!isBindKey && typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var length = partials ? partials.length : 0;
  if (!length) {
    bitmask &= ~(PARTIAL_FLAG | PARTIAL_RIGHT_FLAG);
    partials = holders = null;
  }
  length -= (holders ? holders.length : 0);
  if (bitmask & PARTIAL_RIGHT_FLAG) {
    var partialsRight = partials,
        holdersRight = holders;

    partials = holders = null;
  }
  var newData = [func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity];

  newData[9] = arity == null
    ? (isBindKey ? 0 : func.length)
    : (nativeMax(arity - length, 0) || 0);

  if (bitmask == BIND_FLAG) {
    var result = createBindWrapper(newData[0], newData[2]);
  } else if ((bitmask == PARTIAL_FLAG || bitmask == (BIND_FLAG | PARTIAL_FLAG)) && !newData[4].length) {
    result = createPartialWrapper.apply(undefined, newData);
  } else {
    result = createHybridWrapper.apply(undefined, newData);
  }
  return result;
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = +value;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

/**
 * Reorder `array` according to the specified indexes where the element at
 * the first index is assigned as the first element, the element at
 * the second index is assigned as the second element, and so on.
 *
 * @private
 * @param {Array} array The array to reorder.
 * @param {Array} indexes The arranged array indexes.
 * @returns {Array} Returns `array`.
 */
function reorder(array, indexes) {
  var arrLength = array.length,
      length = nativeMin(indexes.length, arrLength),
      oldArray = arrayCopy(array);

  while (length--) {
    var index = indexes[length];
    array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
  }
  return array;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return type == 'function' || (!!value && type == 'object');
}

module.exports = createWrapper;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"lodash._arraycopy":40,"lodash._basecreate":41,"lodash._replaceholders":42}],40:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function arrayCopy(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = arrayCopy;

},{}],41:[function(require,module,exports){
(function (global){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} prototype The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function Object() {}
  return function(prototype) {
    if (isObject(prototype)) {
      Object.prototype = prototype;
      var result = new Object;
      Object.prototype = null;
    }
    return result || global.Object();
  };
}());

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return type == 'function' || (!!value && type == 'object');
}

module.exports = baseCreate;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],42:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** Used as the internal argument placeholder. */
var PLACEHOLDER = '__lodash_placeholder__';

/**
 * Replaces all `placeholder` elements in `array` with an internal placeholder
 * and returns an array of their indexes.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {*} placeholder The placeholder to replace.
 * @returns {Array} Returns the new array of placeholder indexes.
 */
function replaceHolders(array, placeholder) {
  var index = -1,
      length = array.length,
      resIndex = -1,
      result = [];

  while (++index < length) {
    if (array[index] === placeholder) {
      array[index] = PLACEHOLDER;
      result[++resIndex] = index;
    }
  }
  return result;
}

module.exports = replaceHolders;

},{}],43:[function(require,module,exports){
/**
 * lodash 3.6.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that invokes `func` with the `this` binding of the
 * created function and arguments from `start` and beyond provided as an array.
 *
 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var say = _.restParam(function(what, names) {
 *   return what + ' ' + _.initial(names).join(', ') +
 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
 * });
 *
 * say('hello', 'fred', 'barney', 'pebbles');
 * // => 'hello fred, barney, & pebbles'
 */
function restParam(func, start) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  start = nativeMax(typeof start == 'undefined' ? (func.length - 1) : (+start || 0), 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        rest = Array(length);

    while (++index < length) {
      rest[index] = args[start + index];
    }
    switch (start) {
      case 0: return func.call(this, rest);
      case 1: return func.call(this, args[0], rest);
      case 2: return func.call(this, args[0], args[1], rest);
    }
    var otherArgs = Array(start + 1);
    index = -1;
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = rest;
    return func.apply(this, otherArgs);
  };
}

module.exports = restParam;

},{}],44:[function(require,module,exports){
/**
 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var arrayEach = require('lodash._arrayeach'),
    baseEach = require('lodash._baseeach'),
    bindCallback = require('lodash._bindcallback'),
    isArray = require('lodash.isarray');

/**
 * Creates a function for `_.forEach` or `_.forEachRight`.
 *
 * @private
 * @param {Function} arrayFunc The function to iterate over an array.
 * @param {Function} eachFunc The function to iterate over a collection.
 * @returns {Function} Returns the new each function.
 */
function createForEach(arrayFunc, eachFunc) {
  return function(collection, iteratee, thisArg) {
    return (typeof iteratee == 'function' && typeof thisArg == 'undefined' && isArray(collection))
      ? arrayFunc(collection, iteratee)
      : eachFunc(collection, bindCallback(iteratee, thisArg, 3));
  };
}

/**
 * Iterates over elements of `collection` invoking `iteratee` for each element.
 * The `iteratee` is bound to `thisArg` and invoked with three arguments:
 * (value, index|key, collection). Iterator functions may exit iteration early
 * by explicitly returning `false`.
 *
 * **Note:** As with other "Collections" methods, objects with a `length` property
 * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
 * may be used for object iteration.
 *
 * @static
 * @memberOf _
 * @alias each
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Array|Object|string} Returns `collection`.
 * @example
 *
 * _([1, 2]).forEach(function(n) {
 *   console.log(n);
 * }).value();
 * // => logs each value from left to right and returns the array
 *
 * _.forEach({ 'a': 1, 'b': 2 }, function(n, key) {
 *   console.log(n, key);
 * });
 * // => logs each value-key pair and returns the object (iteration order is not guaranteed)
 */
var forEach = createForEach(arrayEach, baseEach);

module.exports = forEach;

},{"lodash._arrayeach":45,"lodash._baseeach":46,"lodash._bindcallback":47,"lodash.isarray":48}],45:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * A specialized version of `_.forEach` for arrays without support for callback
 * shorthands or `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;

},{}],46:[function(require,module,exports){
/**
 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var keys = require('lodash.keys');

/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * The base implementation of `_.forEach` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object|string} Returns `collection`.
 */
var baseEach = createBaseEach(baseForOwn);

/**
 * The base implementation of `baseForIn` and `baseForOwn` which iterates
 * over `object` properties returned by `keysFunc` invoking `iteratee` for
 * each property. Iterator functions may exit iteration early by explicitly
 * returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

/**
 * The base implementation of `_.forOwn` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return baseFor(object, iteratee, keys);
}

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    var length = collection ? collection.length : 0;
    if (!isLength(length)) {
      return eachFunc(collection, iteratee);
    }
    var index = fromRight ? length : -1,
        iterable = toObject(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

/**
 * Creates a base function for `_.forIn` or `_.forInRight`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var iterable = toObject(object),
        props = keysFunc(object),
        length = props.length,
        index = fromRight ? length : -1;

    while ((fromRight ? index-- : ++index < length)) {
      var key = props[index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Converts `value` to an object if it is not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Object} Returns the object.
 */
function toObject(value) {
  return isObject(value) ? value : Object(value);
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return type == 'function' || (!!value && type == 'object');
}

module.exports = baseEach;

},{"lodash.keys":54}],47:[function(require,module,exports){
arguments[4][36][0].apply(exports,arguments)
},{"dup":36}],48:[function(require,module,exports){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var arrayTag = '[object Array]',
    funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reHostCtor = /^\[object .+?Constructor\]$/;

/**
 * Used to match `RegExp` [special characters](http://www.regular-expressions.info/characters.html#special).
 * In addition to special characters the forward slash is escaped to allow for
 * easier `eval` use and `Function` compilation.
 */
var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
    reHasRegExpChars = RegExp(reRegExpChars.source);

/**
 * Converts `value` to a string if it is not one. An empty string is returned
 * for `null` or `undefined` values.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  if (typeof value == 'string') {
    return value;
  }
  return value == null ? '' : (value + '');
}

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reNative = RegExp('^' +
  escapeRegExp(objToString)
  .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsArray = isNative(nativeIsArray = Array.isArray) && nativeIsArray;

/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(function() { return arguments; }());
 * // => false
 */
var isArray = nativeIsArray || function(value) {
  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
};

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (objToString.call(value) == funcTag) {
    return reNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reHostCtor.test(value);
}

/**
 * Escapes the `RegExp` special characters "\", "/", "^", "$", ".", "|", "?",
 * "*", "+", "(", ")", "[", "]", "{" and "}" in `string`.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escapeRegExp('[lodash](https://lodash.com/)');
 * // => '\[lodash\]\(https:\/\/lodash\.com\/\)'
 */
function escapeRegExp(string) {
  string = baseToString(string);
  return (string && reHasRegExpChars.test(string))
    ? string.replace(reRegExpChars, '\\$&')
    : string;
}

module.exports = isArray;

},{}],49:[function(require,module,exports){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var isArguments = require('lodash.isarguments'),
    isArray = require('lodash.isarray'),
    isFunction = require('lodash.isfunction'),
    isString = require('lodash.isstring'),
    keys = require('lodash.keys');

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is empty. A value is considered empty unless it is an
 * `arguments` object, array, string, or jQuery-like collection with a length
 * greater than `0` or an object with own enumerable properties.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {Array|Object|string} value The value to inspect.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * _.isEmpty(null);
 * // => true
 *
 * _.isEmpty(true);
 * // => true
 *
 * _.isEmpty(1);
 * // => true
 *
 * _.isEmpty([1, 2, 3]);
 * // => false
 *
 * _.isEmpty({ 'a': 1 });
 * // => false
 */
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  var length = value.length;
  if (isLength(length) && (isArray(value) || isString(value) || isArguments(value) ||
      (isObjectLike(value) && isFunction(value.splice)))) {
    return !length;
  }
  return !keys(value).length;
}

module.exports = isEmpty;

},{"lodash.isarguments":50,"lodash.isarray":51,"lodash.isfunction":52,"lodash.isstring":53,"lodash.keys":54}],50:[function(require,module,exports){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is classified as an `arguments` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  var length = isObjectLike(value) ? value.length : undefined;
  return isLength(length) && objToString.call(value) == argsTag;
}

module.exports = isArguments;

},{}],51:[function(require,module,exports){
arguments[4][48][0].apply(exports,arguments)
},{"dup":48}],52:[function(require,module,exports){
(function (global){
/**
 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reHostCtor = /^\[object .+?Constructor\]$/;

/**
 * Used to match `RegExp` [special characters](http://www.regular-expressions.info/characters.html#special).
 * In addition to special characters the forward slash is escaped to allow for
 * easier `eval` use and `Function` compilation.
 */
var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
    reHasRegExpChars = RegExp(reRegExpChars.source);

/**
 * The base implementation of `_.isFunction` without support for environments
 * with incorrect `typeof` results.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 */
function baseIsFunction(value) {
  // Avoid a Chakra JIT bug in compatibility modes of IE 11.
  // See https://github.com/jashkenas/underscore/issues/1621 for more details.
  return typeof value == 'function' || false;
}

/**
 * Converts `value` to a string if it is not one. An empty string is returned
 * for `null` or `undefined` values.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  if (typeof value == 'string') {
    return value;
  }
  return value == null ? '' : (value + '');
}

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reNative = RegExp('^' +
  escapeRegExp(objToString)
  .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Native method references. */
var Uint8Array = isNative(Uint8Array = global.Uint8Array) && Uint8Array;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
var isFunction = !(baseIsFunction(/x/) || (Uint8Array && !baseIsFunction(Uint8Array))) ? baseIsFunction : function(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return objToString.call(value) == funcTag;
};

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (objToString.call(value) == funcTag) {
    return reNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reHostCtor.test(value);
}

/**
 * Escapes the `RegExp` special characters "\", "/", "^", "$", ".", "|", "?",
 * "*", "+", "(", ")", "[", "]", "{" and "}" in `string`.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escapeRegExp('[lodash](https://lodash.com/)');
 * // => '\[lodash\]\(https:\/\/lodash\.com\/\)'
 */
function escapeRegExp(string) {
  string = baseToString(string);
  return (string && reHasRegExpChars.test(string))
    ? string.replace(reRegExpChars, '\\$&')
    : string;
}

module.exports = isFunction;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],53:[function(require,module,exports){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var stringTag = '[object String]';

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' || (isObjectLike(value) && objToString.call(value) == stringTag);
}

module.exports = isString;

},{}],54:[function(require,module,exports){
/**
 * lodash 3.0.5 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var isArguments = require('lodash.isarguments'),
    isArray = require('lodash.isarray'),
    isNative = require('lodash.isnative');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Native method references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeKeys = isNative(nativeKeys = Object.keys) && nativeKeys;

/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * An object environment feature flags.
 *
 * @static
 * @memberOf _
 * @type Object
 */
var support = {};

(function(x) {

  /**
   * Detect if `arguments` object indexes are non-enumerable.
   *
   * In Firefox < 4, IE < 9, PhantomJS, and Safari < 5.1 `arguments` object
   * indexes are non-enumerable. Chrome < 25 and Node.js < 0.11.0 treat
   * `arguments` object indexes as non-enumerable and fail `hasOwnProperty`
   * checks for indexes that exceed their function's formal parameters with
   * associated values of `0`.
   *
   * @memberOf _.support
   * @type boolean
   */
  try {
    support.nonEnumArgs = !propertyIsEnumerable.call(arguments, 1);
  } catch(e) {
    support.nonEnumArgs = true;
  }
}(0, 0));

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = +value;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * A fallback implementation of `Object.keys` which creates an array of the
 * own enumerable property names of `object`.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns the array of property names.
 */
function shimKeys(object) {
  var props = keysIn(object),
      propsLength = props.length,
      length = propsLength && object.length;

  var allowIndexes = length && isLength(length) &&
    (isArray(object) || (support.nonEnumArgs && isArguments(object)));

  var index = -1,
      result = [];

  while (++index < propsLength) {
    var key = props[index];
    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return type == 'function' || (!!value && type == 'object');
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.keys)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
var keys = !nativeKeys ? shimKeys : function(object) {
  if (object) {
    var Ctor = object.constructor,
        length = object.length;
  }
  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
      (typeof object != 'function' && (length && isLength(length)))) {
    return shimKeys(object);
  }
  return isObject(object) ? nativeKeys(object) : [];
};

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  if (object == null) {
    return [];
  }
  if (!isObject(object)) {
    object = Object(object);
  }
  var length = object.length;
  length = (length && isLength(length) &&
    (isArray(object) || (support.nonEnumArgs && isArguments(object))) && length) || 0;

  var Ctor = object.constructor,
      index = -1,
      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
      result = Array(length),
      skipIndexes = length > 0;

  while (++index < length) {
    result[index] = (index + '');
  }
  for (var key in object) {
    if (!(skipIndexes && isIndex(key, length)) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keys;

},{"lodash.isarguments":55,"lodash.isarray":56,"lodash.isnative":57}],55:[function(require,module,exports){
arguments[4][50][0].apply(exports,arguments)
},{"dup":50}],56:[function(require,module,exports){
arguments[4][48][0].apply(exports,arguments)
},{"dup":48}],57:[function(require,module,exports){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reHostCtor = /^\[object .+?Constructor\]$/;

/**
 * Used to match `RegExp` [special characters](http://www.regular-expressions.info/characters.html#special).
 * In addition to special characters the forward slash is escaped to allow for
 * easier `eval` use and `Function` compilation.
 */
var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
    reHasRegExpChars = RegExp(reRegExpChars.source);

/**
 * Converts `value` to a string if it is not one. An empty string is returned
 * for `null` or `undefined` values.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  if (typeof value == 'string') {
    return value;
  }
  return value == null ? '' : (value + '');
}

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reNative = RegExp('^' +
  escapeRegExp(objToString)
  .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (objToString.call(value) == funcTag) {
    return reNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reHostCtor.test(value);
}

/**
 * Escapes the `RegExp` special characters "\", "/", "^", "$", ".", "|", "?",
 * "*", "+", "(", ")", "[", "]", "{" and "}" in `string`.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escapeRegExp('[lodash](https://lodash.com/)');
 * // => '\[lodash\]\(https:\/\/lodash\.com\/\)'
 */
function escapeRegExp(string) {
  string = baseToString(string);
  return (string && reHasRegExpChars.test(string))
    ? string.replace(reRegExpChars, '\\$&')
    : string;
}

module.exports = isNative;

},{}],58:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var before = require('lodash.before');

/**
 * Creates a function that is restricted to invoking `func` once. Repeat calls
 * to the function return the value of the first call. The `func` is invoked
 * with the `this` binding of the created function.
 *
 * @static
 * @memberOf _
 * @type Function
 * @category Function
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new restricted function.
 * @example
 *
 * var initialize = _.once(createApplication);
 * initialize();
 * initialize();
 * // `initialize` invokes `createApplication` once
 */
function once(func) {
  return before(func, 2);
}

module.exports = once;

},{"lodash.before":59}],59:[function(require,module,exports){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that invokes `func`, with the `this` binding and arguments
 * of the created function, while it is called less than `n` times. Subsequent
 * calls to the created function return the result of the last `func` invocation.
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {number} n The number of calls at which `func` is no longer invoked.
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new restricted function.
 * @example
 *
 * jQuery('#add').on('click', _.before(5, addContactToList));
 * // => allows adding up to 4 contacts to the list
 */
function before(n, func) {
  var result;
  if (typeof func != 'function') {
    if (typeof n == 'function') {
      var temp = n;
      n = func;
      func = temp;
    } else {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
  }
  return function() {
    if (--n > 0) {
      result = func.apply(this, arguments);
    } else {
      func = null;
    }
    return result;
  };
}

module.exports = before;

},{}],60:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseToString = require('lodash._basetostring');

/** Used to generate unique IDs. */
var idCounter = 0;

/**
 * Generates a unique ID. If `prefix` is provided the ID is appended to it.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {string} [prefix] The value to prefix the ID with.
 * @returns {string} Returns the unique ID.
 * @example
 *
 * _.uniqueId('contact_');
 * // => 'contact_104'
 *
 * _.uniqueId();
 * // => '105'
 */
function uniqueId(prefix) {
  var id = ++idCounter;
  return baseToString(prefix) + id;
}

module.exports = uniqueId;

},{"lodash._basetostring":61}],61:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Converts `value` to a string if it is not one. An empty string is returned
 * for `null` or `undefined` values.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  if (typeof value == 'string') {
    return value;
  }
  return value == null ? '' : (value + '');
}

module.exports = baseToString;

},{}],62:[function(require,module,exports){
;if (typeof window !== "undefined") {  window.ampersand = window.ampersand || {};  window.ampersand["ampersand-dom"] = window.ampersand["ampersand-dom"] || [];  window.ampersand["ampersand-dom"].push("1.4.0");}
var dom = module.exports = {
    text: function (el, val) {
        el.textContent = getString(val);
    },
    // optimize if we have classList
    addClass: function (el, cls) {
        cls = getString(cls);
        if (!cls) return;
        if (Array.isArray(cls)) {
            cls.forEach(function(c) {
                dom.addClass(el, c);
            });
        } else if (el.classList) {
            el.classList.add(cls);
        } else {
            if (!hasClass(el, cls)) {
                if (el.classList) {
                    el.classList.add(cls);
                } else {
                    el.className += ' ' + cls;
                }
            }
        }
    },
    removeClass: function (el, cls) {
        if (Array.isArray(cls)) {
            cls.forEach(function(c) {
                dom.removeClass(el, c);
            });
        } else if (el.classList) {
            cls = getString(cls);
            if (cls) el.classList.remove(cls);
        } else {
            // may be faster to not edit unless we know we have it?
            el.className = el.className.replace(new RegExp('(^|\\b)' + cls.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    },
    hasClass: hasClass,
    switchClass: function (el, prevCls, newCls) {
        if (prevCls) this.removeClass(el, prevCls);
        this.addClass(el, newCls);
    },
    // makes sure attribute (with no content) is added
    // if exists it will be cleared of content
    addAttribute: function (el, attr) {
        // setting to empty string does same
        el.setAttribute(attr, '');
        // Some browsers won't update UI for boolean attributes unless you
        // set it directly. So we do both
        if (hasBooleanProperty(el, attr)) el[attr] = true;
    },
    // completely removes attribute
    removeAttribute: function (el, attr) {
        el.removeAttribute(attr);
        if (hasBooleanProperty(el, attr)) el[attr] = false;
    },
    // sets attribute to string value given, clearing any current value
    setAttribute: function (el, attr, value) {
        el.setAttribute(attr, getString(value));
    },
    getAttribute: function (el, attr) {
        return el.getAttribute(attr);
    },
    hasAttribute: function (el, attr) {
        return el.hasAttribute(attr);
    },
    hide: function (el, mode) {
        if (!mode) mode = 'display';
        if (!isHidden(el)) {
            storeDisplayStyle(el, mode);
            hide(el, mode);
        }
    },
    // show element
    show: function (el, mode) {
        if (!mode) mode = 'display';
        show(el, mode);
    },
    html: function (el, content) {
        el.innerHTML = content;
    }
};

// helpers
function getString(val) {
    if (!val && val !== 0) {
        return '';
    } else {
        return val;
    }
}

function hasClass(el, cls) {
    if (el.classList) {
        return el.classList.contains(cls);
    } else {
        return new RegExp('(^| )' + cls + '( |$)', 'gi').test(el.className);
    }
}

function hasBooleanProperty(el, prop) {
    var val = el[prop];
    return prop in el && (val === true || val === false);
}

function isHidden (el) {
    return dom.getAttribute(el, 'data-anddom-hidden') === 'true';
}

function storeDisplayStyle (el, mode) {
    dom.setAttribute(el, 'data-anddom-' + mode, el.style[mode]);
}

function show (el, mode) {
    el.style[mode] = dom.getAttribute(el, 'data-anddom-' + mode) || '';
    dom.removeAttribute(el, 'data-anddom-hidden');
}

function hide (el, mode) {
    dom.setAttribute(el, 'data-anddom-hidden', 'true');
    el.style[mode] = (mode === 'visibility' ? 'hidden' : 'none');
}

},{}],63:[function(require,module,exports){
var Events = require('backbone-events-standalone');
var extend = require('amp-extend');
var bind = require('amp-bind');


// Handles cross-browser history management, based on either
// [pushState](http://diveintohtml5.info/history.html) and real URLs, or
// [onhashchange](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange)
// and URL fragments. If the browser supports neither.
var History = function () {
    this.handlers = [];
    this.checkUrl = bind(this.checkUrl, this);

    // Ensure that `History` can be used outside of the browser.
    if (typeof window !== 'undefined') {
        this.location = window.location;
        this.history = window.history;
    }
};

// Cached regex for stripping a leading hash/slash and trailing space.
var routeStripper = /^[#\/]|\s+$/g;

// Cached regex for stripping leading and trailing slashes.
var rootStripper = /^\/+|\/+$/g;

// Cached regex for stripping urls of hash.
var pathStripper = /#.*$/;

// Has the history handling already been started?
History.started = false;

// Set up all inheritable **Backbone.History** properties and methods.
extend(History.prototype, Events, {

    // The default interval to poll for hash changes, if necessary, is
    // twenty times a second.
    interval: 50,

    // Are we at the app root?
    atRoot: function () {
        var path = this.location.pathname.replace(/[^\/]$/, '$&/');
        return path === this.root && !this.location.search;
    },

    // Gets the true hash value. Cannot use location.hash directly due to bug
    // in Firefox where location.hash will always be decoded.
    getHash: function (window) {
        var match = (window || this).location.href.match(/#(.*)$/);
        return match ? match[1] : '';
    },

    // Get the pathname and search params, without the root.
    getPath: function () {
        var path = decodeURI(this.location.pathname + this.location.search);
        var root = this.root.slice(0, -1);
        if (!path.indexOf(root)) path = path.slice(root.length);
        return path.slice(1);
    },

    // Get the cross-browser normalized URL fragment from the path or hash.
    getFragment: function (fragment) {
        if (fragment == null) {
            if (this._hasPushState || !this._wantsHashChange) {
                fragment = this.getPath();
            } else {
                fragment = this.getHash();
            }
        }
        return fragment.replace(routeStripper, '');
    },

    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    start: function (options) {
        if (History.started) throw new Error("Backbone.history has already been started");
        History.started = true;

        // Figure out the initial configuration.
        // Is pushState desired ... is it available?
        this.options          = extend({root: '/'}, this.options, options);
        this.root             = this.options.root;
        this._wantsHashChange = this.options.hashChange !== false;
        this._hasHashChange   = 'onhashchange' in window;
        this._wantsPushState  = !!this.options.pushState;
        this._hasPushState    = !!(this.options.pushState && this.history && this.history.pushState);
        this.fragment         = this.getFragment();

        // Add a cross-platform `addEventListener` shim for older browsers.
        var addEventListener = window.addEventListener;

        // Normalize root to always include a leading and trailing slash.
        this.root = ('/' + this.root + '/').replace(rootStripper, '/');

        // Depending on whether we're using pushState or hashes, and whether
        // 'onhashchange' is supported, determine how we check the URL state.
        if (this._hasPushState) {
            addEventListener('popstate', this.checkUrl, false);
        } else if (this._wantsHashChange && this._hasHashChange) {
            addEventListener('hashchange', this.checkUrl, false);
        } else if (this._wantsHashChange) {
            this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
        }

        // Transition from hashChange to pushState or vice versa if both are
        // requested.
        if (this._wantsHashChange && this._wantsPushState) {

            // If we've started off with a route from a `pushState`-enabled
            // browser, but we're currently in a browser that doesn't support it...
            if (!this._hasPushState && !this.atRoot()) {
                this.location.replace(this.root + '#' + this.getPath());
                // Return immediately as browser will do redirect to new url
                return true;

            // Or if we've started out with a hash-based route, but we're currently
            // in a browser where it could be `pushState`-based instead...
            } else if (this._hasPushState && this.atRoot()) {
                this.navigate(this.getHash(), {replace: true});
            }
        }

        if (!this.options.silent) return this.loadUrl();
    },

    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
    // but possibly useful for unit testing Routers.
    stop: function () {
        // Add a cross-platform `removeEventListener` shim for older browsers.
        var removeEventListener = window.removeEventListener;

        // Remove window listeners.
        if (this._hasPushState) {
            removeEventListener('popstate', this.checkUrl, false);
        } else if (this._wantsHashChange && this._hasHashChange) {
            removeEventListener('hashchange', this.checkUrl, false);
        }

        // Some environments will throw when clearing an undefined interval.
        if (this._checkUrlInterval) clearInterval(this._checkUrlInterval);
        History.started = false;
    },

    // Add a route to be tested when the fragment changes. Routes added later
    // may override previous routes.
    route: function (route, callback) {
        this.handlers.unshift({route: route, callback: callback});
    },

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`.
    checkUrl: function (e) {
        var current = this.getFragment();
        if (current === this.fragment) return false;
        this.loadUrl();
    },

    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.
    loadUrl: function (fragment) {
        fragment = this.fragment = this.getFragment(fragment);
        return this.handlers.some(function (handler) {
            if (handler.route.test(fragment)) {
                handler.callback(fragment);
                return true;
            }
        });
    },

    // Save a fragment into the hash history, or replace the URL state if the
    // 'replace' option is passed. You are responsible for properly URL-encoding
    // the fragment in advance.
    //
    // The options object can contain `trigger: true` if you wish to have the
    // route callback be fired (not usually desirable), or `replace: true`, if
    // you wish to modify the current URL without adding an entry to the history.
    navigate: function (fragment, options) {
        if (!History.started) return false;
        if (!options || options === true) options = {trigger: !!options};

        var url = this.root + (fragment = this.getFragment(fragment || ''));

        // Strip the hash and decode for matching.
        fragment = decodeURI(fragment.replace(pathStripper, ''));

        if (this.fragment === fragment) return;
        this.fragment = fragment;

        // Don't include a trailing slash on the root.
        if (fragment === '' && url !== '/') url = url.slice(0, -1);

        // If pushState is available, we use it to set the fragment as a real URL.
        if (this._hasPushState) {
            this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

            // If hash changes haven't been explicitly disabled, update the hash
            // fragment to store history.
        } else if (this._wantsHashChange) {
            this._updateHash(this.location, fragment, options.replace);
            // If you've told us that you explicitly don't want fallback hashchange-
            // based history, then `navigate` becomes a page refresh.
        } else {
            return this.location.assign(url);
        }
        if (options.trigger) return this.loadUrl(fragment);
    },

    // Update the hash location, either replacing the current entry, or adding
    // a new one to the browser history.
    _updateHash: function (location, fragment, replace) {
        if (replace) {
            var href = location.href.replace(/(javascript:|#).*$/, '');
            location.replace(href + '#' + fragment);
        } else {
            // Some browsers require that `hash` contains a leading #.
            location.hash = '#' + fragment;
        }
    }

});

module.exports = new History();

},{"amp-bind":65,"amp-extend":67,"backbone-events-standalone":84}],64:[function(require,module,exports){
;if (typeof window !== "undefined") {  window.ampersand = window.ampersand || {};  window.ampersand["ampersand-router"] = window.ampersand["ampersand-router"] || [];  window.ampersand["ampersand-router"].push("1.0.7");}
var classExtend = require('ampersand-class-extend');
var Events = require('backbone-events-standalone');
var ampHistory = require('./ampersand-history');
var extend = require('amp-extend');
var isRegexp = require('amp-is-regexp');
var isFunction = require('amp-is-function');
var result = require('amp-result');

// Routers map faux-URLs to actions, and fire events when routes are
// matched. Creating a new one sets its `routes` hash, if not set statically.
var Router = module.exports = function (options) {
    options || (options = {});
    this.history = options.history || ampHistory;
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
};

// Cached regular expressions for matching named param parts and splatted
// parts of route strings.
var optionalParam = /\((.*?)\)/g;
var namedParam    = /(\(\?)?:\w+/g;
var splatParam    = /\*\w+/g;
var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

// Set up all inheritable **Backbone.Router** properties and methods.
extend(Router.prototype, Events, {

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function () {},

    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function (query, num) {
    //       ...
    //     });
    //
    route: function (route, name, callback) {
        if (!isRegexp(route)) route = this._routeToRegExp(route);
        if (isFunction(name)) {
            callback = name;
            name = '';
        }
        if (!callback) callback = this[name];
        var router = this;
        this.history.route(route, function (fragment) {
            var args = router._extractParameters(route, fragment);
            if (router.execute(callback, args, name) !== false) {
                router.trigger.apply(router, ['route:' + name].concat(args));
                router.trigger('route', name, args);
                router.history.trigger('route', router, name, args);
            }
        });
        return this;
    },

    // Execute a route handler with the provided parameters.  This is an
    // excellent place to do pre-route setup or post-route cleanup.
    execute: function (callback, args, name) {
        if (callback) callback.apply(this, args);
    },

    // Simple proxy to `ampHistory` to save a fragment into the history.
    navigate: function (fragment, options) {
        this.history.navigate(fragment, options);
        return this;
    },

    // Helper for doing `internal` redirects without adding to history
    // and thereby breaking backbutton functionality.
    redirectTo: function (newUrl) {
        this.navigate(newUrl, {replace: true, trigger: true});
    },

    // Bind all defined routes to `history`. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.
    _bindRoutes: function () {
        if (!this.routes) return;
        this.routes = result(this, 'routes');
        var route, routes = Object.keys(this.routes);
        while ((route = routes.pop()) != null) {
            this.route(route, this.routes[route]);
        }
    },

    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    _routeToRegExp: function (route) {
        route = route
            .replace(escapeRegExp, '\\$&')
            .replace(optionalParam, '(?:$1)?')
            .replace(namedParam, function (match, optional) {
                return optional ? match : '([^/?]+)';
            })
            .replace(splatParam, '([^?]*?)');
        return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
    },

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted decoded parameters. Empty or unmatched parameters will be
    // treated as `null` to normalize cross-browser behavior.
    _extractParameters: function (route, fragment) {
        var params = route.exec(fragment).slice(1);
        return params.map(function (param, i) {
            // Don't decode the search params.
            if (i === params.length - 1) return param || null;
            return param ? decodeURIComponent(param) : null;
        });
    }

});

Router.extend = classExtend;

},{"./ampersand-history":63,"amp-extend":67,"amp-is-function":69,"amp-is-regexp":70,"amp-result":71,"ampersand-class-extend":72,"backbone-events-standalone":84}],65:[function(require,module,exports){
var isFunction = require('amp-is-function');
var isObject = require('amp-is-object');
var nativeBind = Function.prototype.bind;
var slice = Array.prototype.slice;
var Ctor = function () {};


module.exports = function bind(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!isFunction(func)) throw new TypeError('Bind must be called on a function');
    args = slice.call(arguments, 2);
    bound = function() {
        if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
        Ctor.prototype = func.prototype;
        var self = new Ctor();
        Ctor.prototype = null;
        var result = func.apply(self, args.concat(slice.call(arguments)));
        if (isObject(result)) return result;
        return self;
    };
    return bound;
};

},{"amp-is-function":69,"amp-is-object":66}],66:[function(require,module,exports){
arguments[4][9][0].apply(exports,arguments)
},{"dup":9}],67:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"amp-is-object":68,"dup":8}],68:[function(require,module,exports){
arguments[4][9][0].apply(exports,arguments)
},{"dup":9}],69:[function(require,module,exports){
arguments[4][14][0].apply(exports,arguments)
},{"dup":14}],70:[function(require,module,exports){
var toString = Object.prototype.toString;


module.exports = function isRegExp(obj) {
    return toString.call(obj) === '[object RegExp]';
};

},{}],71:[function(require,module,exports){
var isFunction = require('amp-is-function');


module.exports = function result(object, property, defaultValue) {
    var value = object == null ? void 0 : object[property];
    if (value === void 0) {
        return isFunction(defaultValue) ? defaultValue() : defaultValue;
    }
    return isFunction(value) ? object[property]() : value;
};

},{"amp-is-function":69}],72:[function(require,module,exports){
var assign = require('lodash.assign');

/// Following code is largely pasted from Backbone.js

// Helper function to correctly set up the prototype chain, for subclasses.
// Similar to `goog.inherits`, but uses a hash of prototype properties and
// class properties to be extended.
var extend = function(protoProps) {
    var parent = this;
    var child;
    var args = [].slice.call(arguments);

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && protoProps.hasOwnProperty('constructor')) {
        child = protoProps.constructor;
    } else {
        child = function () {
            return parent.apply(this, arguments);
        };
    }

    // Add static properties to the constructor function from parent
    assign(child, parent);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();

    // Mix in all prototype properties to the subclass if supplied.
    if (protoProps) {
        args.unshift(child.prototype);
        assign.apply(null, args);
    }

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
};

// Expose the extend function
module.exports = extend;

},{"lodash.assign":73}],73:[function(require,module,exports){
arguments[4][32][0].apply(exports,arguments)
},{"dup":32,"lodash._baseassign":74,"lodash._createassigner":80}],74:[function(require,module,exports){
arguments[4][33][0].apply(exports,arguments)
},{"dup":33,"lodash._basecopy":75,"lodash.keys":76}],75:[function(require,module,exports){
arguments[4][34][0].apply(exports,arguments)
},{"dup":34}],76:[function(require,module,exports){
arguments[4][54][0].apply(exports,arguments)
},{"dup":54,"lodash.isarguments":77,"lodash.isarray":78,"lodash.isnative":79}],77:[function(require,module,exports){
arguments[4][50][0].apply(exports,arguments)
},{"dup":50}],78:[function(require,module,exports){
arguments[4][48][0].apply(exports,arguments)
},{"dup":48}],79:[function(require,module,exports){
arguments[4][57][0].apply(exports,arguments)
},{"dup":57}],80:[function(require,module,exports){
arguments[4][35][0].apply(exports,arguments)
},{"dup":35,"lodash._bindcallback":81,"lodash._isiterateecall":82}],81:[function(require,module,exports){
arguments[4][36][0].apply(exports,arguments)
},{"dup":36}],82:[function(require,module,exports){
arguments[4][37][0].apply(exports,arguments)
},{"dup":37}],83:[function(require,module,exports){
/**
 * Standalone extraction of Backbone.Events, no external dependency required.
 * Degrades nicely when Backone/underscore are already available in the current
 * global context.
 *
 * Note that docs suggest to use underscore's `_.extend()` method to add Events
 * support to some given object. A `mixin()` method has been added to the Events
 * prototype to avoid using underscore for that sole purpose:
 *
 *     var myEventEmitter = BackboneEvents.mixin({});
 *
 * Or for a function constructor:
 *
 *     function MyConstructor(){}
 *     MyConstructor.prototype.foo = function(){}
 *     BackboneEvents.mixin(MyConstructor.prototype);
 *
 * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud Inc.
 * (c) 2013 Nicolas Perriault
 */
/* global exports:true, define, module */
(function() {
  var root = this,
      breaker = {},
      nativeForEach = Array.prototype.forEach,
      hasOwnProperty = Object.prototype.hasOwnProperty,
      slice = Array.prototype.slice,
      idCounter = 0;

  // Returns a partial implementation matching the minimal API subset required
  // by Backbone.Events
  function miniscore() {
    return {
      keys: Object.keys,

      uniqueId: function(prefix) {
        var id = ++idCounter + '';
        return prefix ? prefix + id : id;
      },

      has: function(obj, key) {
        return hasOwnProperty.call(obj, key);
      },

      each: function(obj, iterator, context) {
        if (obj == null) return;
        if (nativeForEach && obj.forEach === nativeForEach) {
          obj.forEach(iterator, context);
        } else if (obj.length === +obj.length) {
          for (var i = 0, l = obj.length; i < l; i++) {
            if (iterator.call(context, obj[i], i, obj) === breaker) return;
          }
        } else {
          for (var key in obj) {
            if (this.has(obj, key)) {
              if (iterator.call(context, obj[key], key, obj) === breaker) return;
            }
          }
        }
      },

      once: function(func) {
        var ran = false, memo;
        return function() {
          if (ran) return memo;
          ran = true;
          memo = func.apply(this, arguments);
          func = null;
          return memo;
        };
      }
    };
  }

  var _ = miniscore(), Events;

  // Backbone.Events
  // ---------------

  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may bind with `on` or remove with `off` callback
  // functions to an event; `trigger`-ing an event fires all callbacks in
  // succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  Events = {

    // Bind an event to a `callback` function. Passing `"all"` will bind
    // the callback to all events fired.
    on: function(name, callback, context) {
      if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
      this._events || (this._events = {});
      var events = this._events[name] || (this._events[name] = []);
      events.push({callback: callback, context: context, ctx: context || this});
      return this;
    },

    // Bind an event to only be triggered a single time. After the first time
    // the callback is invoked, it will be removed.
    once: function(name, callback, context) {
      if (!eventsApi(this, 'once', name, [callback, context]) || !callback) return this;
      var self = this;
      var once = _.once(function() {
        self.off(name, once);
        callback.apply(this, arguments);
      });
      once._callback = callback;
      return this.on(name, once, context);
    },

    // Remove one or many callbacks. If `context` is null, removes all
    // callbacks with that function. If `callback` is null, removes all
    // callbacks for the event. If `name` is null, removes all bound
    // callbacks for all events.
    off: function(name, callback, context) {
      var retain, ev, events, names, i, l, j, k;
      if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
      if (!name && !callback && !context) {
        this._events = {};
        return this;
      }

      names = name ? [name] : _.keys(this._events);
      for (i = 0, l = names.length; i < l; i++) {
        name = names[i];
        if (events = this._events[name]) {
          this._events[name] = retain = [];
          if (callback || context) {
            for (j = 0, k = events.length; j < k; j++) {
              ev = events[j];
              if ((callback && callback !== ev.callback && callback !== ev.callback._callback) ||
                  (context && context !== ev.context)) {
                retain.push(ev);
              }
            }
          }
          if (!retain.length) delete this._events[name];
        }
      }

      return this;
    },

    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    trigger: function(name) {
      if (!this._events) return this;
      var args = slice.call(arguments, 1);
      if (!eventsApi(this, 'trigger', name, args)) return this;
      var events = this._events[name];
      var allEvents = this._events.all;
      if (events) triggerEvents(events, args);
      if (allEvents) triggerEvents(allEvents, arguments);
      return this;
    },

    // Tell this object to stop listening to either specific events ... or
    // to every object it's currently listening to.
    stopListening: function(obj, name, callback) {
      var listeners = this._listeners;
      if (!listeners) return this;
      var deleteListener = !name && !callback;
      if (typeof name === 'object') callback = this;
      if (obj) (listeners = {})[obj._listenerId] = obj;
      for (var id in listeners) {
        listeners[id].off(name, callback, this);
        if (deleteListener) delete this._listeners[id];
      }
      return this;
    }

  };

  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;

  // Implement fancy features of the Events API such as multiple event
  // names `"change blur"` and jQuery-style event maps `{change: action}`
  // in terms of the existing API.
  var eventsApi = function(obj, action, name, rest) {
    if (!name) return true;

    // Handle event maps.
    if (typeof name === 'object') {
      for (var key in name) {
        obj[action].apply(obj, [key, name[key]].concat(rest));
      }
      return false;
    }

    // Handle space separated event names.
    if (eventSplitter.test(name)) {
      var names = name.split(eventSplitter);
      for (var i = 0, l = names.length; i < l; i++) {
        obj[action].apply(obj, [names[i]].concat(rest));
      }
      return false;
    }

    return true;
  };

  // A difficult-to-believe, but optimized internal dispatch function for
  // triggering events. Tries to keep the usual cases speedy (most internal
  // Backbone events have 3 arguments).
  var triggerEvents = function(events, args) {
    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
    switch (args.length) {
      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args);
    }
  };

  var listenMethods = {listenTo: 'on', listenToOnce: 'once'};

  // Inversion-of-control versions of `on` and `once`. Tell *this* object to
  // listen to an event in another object ... keeping track of what it's
  // listening to.
  _.each(listenMethods, function(implementation, method) {
    Events[method] = function(obj, name, callback) {
      var listeners = this._listeners || (this._listeners = {});
      var id = obj._listenerId || (obj._listenerId = _.uniqueId('l'));
      listeners[id] = obj;
      if (typeof name === 'object') callback = this;
      obj[implementation](name, callback, this);
      return this;
    };
  });

  // Aliases for backwards compatibility.
  Events.bind   = Events.on;
  Events.unbind = Events.off;

  // Mixin utility
  Events.mixin = function(proto) {
    var exports = ['on', 'once', 'off', 'trigger', 'stopListening', 'listenTo',
                   'listenToOnce', 'bind', 'unbind'];
    _.each(exports, function(name) {
      proto[name] = this[name];
    }, this);
    return proto;
  };

  // Export Events as BackboneEvents depending on current context
  if (typeof define === "function") {
    define(function() {
      return Events;
    });
  } else if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = Events;
    }
    exports.BackboneEvents = Events;
  } else {
    root.BackboneEvents = Events;
  }
})(this);

},{}],84:[function(require,module,exports){
module.exports = require('./backbone-events-standalone');

},{"./backbone-events-standalone":83}],85:[function(require,module,exports){
;if (typeof window !== "undefined") {  window.ampersand = window.ampersand || {};  window.ampersand["ampersand-view-switcher"] = window.ampersand["ampersand-view-switcher"] || [];  window.ampersand["ampersand-view-switcher"].push("1.1.2");}
function ViewSwitcher(el, options) {
    options || (options = {});
    this.el = el;
    this.config = {
        hide: null,
        show: null,
        empty: null,
        waitForRemove: false
    };
    for (var item in options) {
        if (this.config.hasOwnProperty(item)) {
            this.config[item] = options[item];
        }
    }
    if (options.view) {
        this.set(options.view);
    } else {
        // call this so the empty callback gets called
        this._onViewRemove();
    }
}

ViewSwitcher.prototype.set = function (view) {
    var self = this;
    var prev = this.previous = this.current;
    var current = this._setCurrent(view);
    if (this.config.waitForRemove) {
        this._hide(prev, function () {
            // make sure we're still dealing with the same one
            // that way if we're navigating quickly we don't start
            // to show one that's already old.
            if (prev === self.previous && current === self.current) {
                self._show(current);
            }
        });
    } else {
        this._hide(prev);
        this._show(current);
    }
};

ViewSwitcher.prototype._setCurrent = function (view) {
    this.current = view;
    if (view) this._registerRemoveListener(view);
    var emptyCb = this.config.empty;
    if (emptyCb && !this.current) {
        emptyCb();
    }
    return view;
};

ViewSwitcher.prototype.clear = function (cb) {
    this._hide(this.current, cb);
};

// If the view switcher itself is removed, remove its child to avoid memory leaks
ViewSwitcher.prototype.remove = function () {
    if (this.current) this.current.remove();
};

ViewSwitcher.prototype._show = function (view, cb) {
    var customShow = this.config.show;
    if (customShow) {
        // async
        if (customShow.length === 3) {
            this._render(view);
            customShow(view, cb);
        } else {
            this._render(view);
            customShow(view);
            if (cb) cb();
        }
    } else {
        this._render(view);
        if (cb) cb();
    }
};

ViewSwitcher.prototype._registerRemoveListener = function (view) {
    if (view) view.once('remove', this._onViewRemove, this);
};

ViewSwitcher.prototype._onViewRemove = function (view) {
    var emptyCb = this.config.empty;
    if (this.current === view) {
        this.current = null;
    }
    if (emptyCb && !this.current) {
        emptyCb();
    }
};

ViewSwitcher.prototype._render = function (view) {
    if (!view.rendered) view.render({containerEl: this.el});
    if (!view.insertSelf) this.el.appendChild(view.el);
};

ViewSwitcher.prototype._hide = function (view, cb) {
    if (!view) return cb && cb();
    var customHide = this.config.hide;
    if (customHide) {
        // async
        if (customHide.length === 3) {
            customHide(view, this.current, function () {
                view.remove();
                if (cb) cb();
            });
        } else {
            customHide(view, this.current);
            view.remove();
            if (cb) cb();
        }
    } else {
        view.remove();
        if (cb) cb();
    }
};


module.exports = ViewSwitcher;

},{}],86:[function(require,module,exports){
;if (typeof window !== "undefined") {  window.ampersand = window.ampersand || {};  window.ampersand["ampersand-view"] = window.ampersand["ampersand-view"] || [];  window.ampersand["ampersand-view"].push("7.3.0");}
var State = require('ampersand-state');
var CollectionView = require('ampersand-collection-view');
var domify = require('domify');
var uniqueId = require("lodash.uniqueid");
var pick = require("lodash.pick");
var assign = require("lodash.assign");
var forEach = require("lodash.foreach");
var result = require("lodash.result");
var last = require("lodash.last");
var isString = require("lodash.isstring");
var bind = require("lodash.bind");
var flatten = require("lodash.flatten");
var invoke = require("lodash.invoke");
var events = require('events-mixin');
var matches = require('matches-selector');
var bindings = require('ampersand-dom-bindings');
var getPath = require('get-object-path');


function View(attrs) {
    this.cid = uniqueId('view');
    attrs || (attrs = {});
    var parent = attrs.parent;
    delete attrs.parent;
    BaseState.call(this, attrs, {init: false, parent: parent});
    this.on('change:el', this._handleElementChange, this);
    this._parsedBindings = bindings(this.bindings, this);
    this._initializeBindings();
    if (attrs.el && !this.autoRender) {
        this._handleElementChange();
    }
    this._initializeSubviews();
    this.template = attrs.template || this.template;
    this.initialize.apply(this, arguments);
    this.set(pick(attrs, viewOptions));
    if (this.autoRender && this.template) {
        this.render();
    }
}

var BaseState = State.extend({
    dataTypes: {
        element: {
            set: function (newVal) {
                return {
                    val: newVal,
                    type: newVal instanceof Element ? 'element' : typeof newVal
                };
            },
            compare: function (el1, el2) {
                return el1 === el2;
            }
        },
        collection: {
            set: function (newVal) {
                return {
                    val: newVal,
                    type: newVal && newVal.isCollection ? 'collection' : typeof newVal
                };
            },
            compare: function (currentVal, newVal) {
                return currentVal === newVal;
            }
        }
    },
    props: {
        model: 'state',
        el: 'element',
        collection: 'collection'
    },
    derived: {
        rendered: {
            deps: ['el'],
            fn: function () {
                return !!this.el;
            }
        },
        hasData: {
            deps: ['model'],
            fn: function () {
                return !!this.model;
            }
        }
    }
});

// Cached regex to split keys for `delegate`.
var delegateEventSplitter = /^(\S+)\s*(.*)$/;

// List of view options to be merged as properties.
var viewOptions = ['model', 'collection', 'el'];

View.prototype = Object.create(BaseState.prototype);

// Set up all inheritable properties and methods.
assign(View.prototype, {
    // ## query
    // Get an single element based on CSS selector scoped to this.el
    // if you pass an empty string it return `this.el`.
    // If you pass an element we just return it back.
    // This lets us use `get` to handle cases where users
    // can pass a selector or an already selected element.
    query: function (selector) {
        if (!selector) return this.el;
        if (typeof selector === 'string') {
            if (matches(this.el, selector)) return this.el;
            return this.el.querySelector(selector) || undefined;
        }
        return selector;
    },

    // ## queryAll
    // Returns an array of elements based on CSS selector scoped to this.el
    // if you pass an empty string it return `this.el`. Also includes root
    // element.
    queryAll: function (selector) {
        var res = [];
        if (!this.el) return res;
        if (selector === '') return [this.el];
        if (matches(this.el, selector)) res.push(this.el);
        return res.concat(Array.prototype.slice.call(this.el.querySelectorAll(selector)));
    },

    // ## queryByHook
    // Convenience method for fetching element by it's `data-hook` attribute.
    // Also tries to match against root element.
    // Also supports matching 'one' of several space separated hooks.
    queryByHook: function (hook) {
        return this.query('[data-hook~="' + hook + '"]');
    },

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function () {},

    // **render** is the core function that your view can override, its job is
    // to populate its element (`this.el`), with the appropriate HTML.
    render: function () {
        this.renderWithTemplate(this);
        return this;
    },

    // Remove this view by taking the element out of the DOM, and removing any
    // applicable events listeners.
    remove: function () {
        var parsedBindings = this._parsedBindings;
        if (this.el && this.el.parentNode) this.el.parentNode.removeChild(this.el);
        if (this._subviews) invoke(flatten(this._subviews), 'remove');
        this.stopListening();
        // TODO: Not sure if this is actually necessary.
        // Just trying to de-reference this potentially large
        // amount of generated functions to avoid memory leaks.
        forEach(parsedBindings, function (properties, modelName) {
            forEach(properties, function (value, key) {
                delete parsedBindings[modelName][key];
            });
            delete parsedBindings[modelName];
        });
        this.trigger('remove', this);
        return this;
    },

    // Change the view's element (`this.el` property), including event
    // re-delegation.
    _handleElementChange: function (element, delegate) {
        if (this.eventManager) this.eventManager.unbind();
        this.eventManager = events(this.el, this);
        this.delegateEvents();
        this._applyBindingsForKey();
        return this;
    },

    // Set callbacks, where `this.events` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save',
    //       'click .open':       function (e) { ... }
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    // This only works for delegate-able events: not `focus`, `blur`, and
    // not `change`, `submit`, and `reset` in Internet Explorer.
    delegateEvents: function (events) {
        if (!(events || (events = result(this, 'events')))) return this;
        this.undelegateEvents();
        for (var key in events) {
            this.eventManager.bind(key, events[key]);
        }
        return this;
    },

    // Clears all callbacks previously bound to the view with `delegateEvents`.
    // You usually don't need to use this, but may wish to if you have multiple
    // Backbone views attached to the same DOM element.
    undelegateEvents: function () {
        this.eventManager.unbind();
        return this;
    },

    // ## registerSubview
    // Pass it a view. This can be anything with a `remove` method
    registerSubview: function (view) {
        // Storage for our subviews.
        this._subviews || (this._subviews = []);
        this._subviews.push(view);
        // If view has an 'el' it's a single view not
        // an array of views registered by renderCollection
        // so we store a reference to the parent view.
        if (view.el) view.parent = this;
        return view;
    },

    // ## renderSubview
    // Pass it a view instance and a container element
    // to render it in. It's `remove` method will be called
    // when the parent view is destroyed.
    renderSubview: function (view, container) {
        if (typeof container === 'string') {
            container = this.query(container);
        }
        this.registerSubview(view);
        view.render();
        (container || this.el).appendChild(view.el);
        return view;
    },

    _applyBindingsForKey: function (name) {
        if (!this.el) return;
        var fns = this._parsedBindings.getGrouped(name);
        var item;
        for (item in fns) {
            fns[item].forEach(function (fn) {
                fn(this.el, getPath(this, item), last(item.split('.')));
            }, this);
        }
    },

    _initializeBindings: function () {
        if (!this.bindings) return;
        this.on('all', function (eventName) {
            if (eventName.slice(0, 7) === 'change:') {
                this._applyBindingsForKey(eventName.split(':')[1]);
            }
        }, this);
    },

    // ## _initializeSubviews
    // this is called at setup and grabs declared subviews
    _initializeSubviews: function () {
        if (!this.subviews) return;
        for (var item in this.subviews) {
            this._parseSubview(this.subviews[item], item);
        }
    },

    // ## _parseSubview
    // helper for parsing out the subview declaration and registering
    // the `waitFor` if need be.
    _parseSubview: function (subview, name) {
        var self = this;
        var opts = {
            selector: subview.container || '[data-hook="' + subview.hook + '"]',
            waitFor: subview.waitFor || '',
            prepareView: subview.prepareView || function (el) {
                return new subview.constructor({
                    el: el,
                    parent: self
                });
            }
        };
        function action() {
            var el, subview;
            // if not rendered or we can't find our element, stop here.
            if (!this.el || !(el = this.query(opts.selector))) return;
            if (!opts.waitFor || getPath(this, opts.waitFor)) {
                subview = this[name] = opts.prepareView.call(this, el);
                subview.render();
                this.registerSubview(subview);
                this.off('change', action);
            }
        }
        // we listen for main `change` items
        this.on('change', action, this);
    },


    // Shortcut for doing everything we need to do to
    // render and fully replace current root element.
    // Either define a `template` property of your view
    // or pass in a template directly.
    // The template can either be a string or a function.
    // If it's a function it will be passed the `context`
    // argument.
    renderWithTemplate: function (context, templateArg) {
        var template = templateArg || this.template;
        if (!template) throw new Error('Template string or function needed.');
        var newDom = isString(template) ? template : template.call(this, context || this);
        if (isString(newDom)) newDom = domify(newDom);
        var parent = this.el && this.el.parentNode;
        if (parent) parent.replaceChild(newDom, this.el);
        if (newDom.nodeName === '#document-fragment') throw new Error('Views can only have one root element.');
        this.el = newDom;
        return this;
    },

    // ## cacheElements
    // This is a shortcut for adding reference to specific elements within your view for
    // access later. This avoids excessive DOM queries and makes it easier to update
    // your view if your template changes.
    //
    // In your `render` method. Use it like so:
    //
    //     render: function () {
    //       this.basicRender();
    //       this.cacheElements({
    //         pages: '#pages',
    //         chat: '#teamChat',
    //         nav: 'nav#views ul',
    //         me: '#me',
    //         cheatSheet: '#cheatSheet',
    //         omniBox: '#awesomeSauce'
    //       });
    //     }
    //
    // Then later you can access elements by reference like so: `this.pages`, or `this.chat`.
    cacheElements: function (hash) {
        for (var item in hash) {
            this[item] = this.query(hash[item]);
        }
        return this;
    },

    // ## listenToAndRun
    // Shortcut for registering a listener for a model
    // and also triggering it right away.
    listenToAndRun: function (object, events, handler) {
        var bound = bind(handler, this);
        this.listenTo(object, events, bound);
        bound();
    },

    // ## animateRemove
    // Placeholder for if you want to do something special when they're removed.
    // For example fade it out, etc.
    // Any override here should call `.remove()` when done.
    animateRemove: function () {
        this.remove();
    },

    // ## renderCollection
    // Method for rendering a collections with individual views.
    // Just pass it the collection, and the view to use for the items in the
    // collection. The collectionView is returned.
    renderCollection: function (collection, ViewClass, container, opts) {
        var containerEl = (typeof container === 'string') ? this.query(container) : container;
        var config = assign({
            collection: collection,
            el: containerEl || this.el,
            view: ViewClass,
            parent: this,
            viewOptions: {
                parent: this
            }
        }, opts);
        var collectionView = new CollectionView(config);
        collectionView.render();
        return this.registerSubview(collectionView);
    }
});

View.extend = BaseState.extend;
module.exports = View;

},{"ampersand-collection-view":87,"ampersand-dom-bindings":122,"ampersand-state":124,"domify":252,"events-mixin":188,"get-object-path":193,"lodash.assign":194,"lodash.bind":204,"lodash.flatten":210,"lodash.foreach":215,"lodash.invoke":223,"lodash.isstring":230,"lodash.last":231,"lodash.pick":232,"lodash.result":244,"lodash.uniqueid":246,"matches-selector":248}],87:[function(require,module,exports){
;if (typeof window !== "undefined") {  window.ampersand = window.ampersand || {};  window.ampersand["ampersand-collection-view"] = window.ampersand["ampersand-collection-view"] || [];  window.ampersand["ampersand-collection-view"].push("1.4.0");}
var assign = require('lodash.assign');
var invoke = require('lodash.invoke');
var pick = require('lodash.pick');
var find = require('lodash.find');
var difference = require('lodash.difference');
var Events = require('ampersand-events');
var ampExtend = require('ampersand-class-extend');

// options
var options = ['collection', 'el', 'viewOptions', 'view', 'emptyView', 'filter', 'reverse', 'parent'];


function CollectionView(spec) {
    if (!spec) {
        throw new ReferenceError('Collection view missing required parameters: collection, el');
    }
    if (!spec.collection) {
        throw new ReferenceError('Collection view requires a collection');
    }
    if (!spec.el && !this.insertSelf) {
        throw new ReferenceError('Collection view requires an el');
    }
    assign(this, pick(spec, options));
    this.views = [];
    this.listenTo(this.collection, 'add', this._addViewForModel);
    this.listenTo(this.collection, 'remove', this._removeViewForModel);
    this.listenTo(this.collection, 'sort', this._rerenderAll);
    this.listenTo(this.collection, 'refresh reset', this._reset);
}

assign(CollectionView.prototype, Events, {
    // for view contract compliance
    render: function () {
        this._renderAll();
        return this;
    },
    remove: function () {
        invoke(this.views, 'remove');
        this.stopListening();
    },
    _getViewByModel: function (model) {
        return find(this.views, function (view) {
            return model === view.model;
        });
    },
    _createViewForModel: function (model, renderOpts) {
        var defaultViewOptions = {model: model, collection: this.collection, parent: this};
        var view = new this.view(assign(defaultViewOptions, this.viewOptions));
        this.views.push(view);
        view.renderedByParentView = true;
        view.render(renderOpts);
        return view;
    },
    _getOrCreateByModel: function (model, renderOpts) {
        return this._getViewByModel(model) || this._createViewForModel(model, renderOpts);
    },
    _addViewForModel: function (model, collection, options) {
        var matches = this.filter ? this.filter(model) : true;
        if (!matches) {
            return;
        }
        if (this.renderedEmptyView) {
            this.renderedEmptyView.remove();
            delete this.renderedEmptyView;
        }
        var view = this._getOrCreateByModel(model, {containerEl: this.el});
        if (options && options.rerender) {
            this._insertView(view);
        } else {
            this._insertViewAtIndex(view);
        }
    },
    _insertViewAtIndex: function (view) {
        if (!view.insertSelf) {
            var pos = this.collection.indexOf(view.model);
            var modelToInsertBefore, viewToInsertBefore;

            if (this.reverse) {
                modelToInsertBefore = this.collection.at(pos - 1);
            } else {
                modelToInsertBefore = this.collection.at(pos + 1);
            }

            viewToInsertBefore = this._getViewByModel(modelToInsertBefore);

            // FIX IE bug (https://developer.mozilla.org/en-US/docs/Web/API/Node.insertBefore)
            // "In Internet Explorer an undefined value as referenceElement will throw errors, while in rest of the modern browsers, this works fine."
            if(viewToInsertBefore) {
                this.el.insertBefore(view.el, viewToInsertBefore && viewToInsertBefore.el);
            } else {
                this.el.appendChild(view.el);
            }
        }
    },
    _insertView: function (view) {
        if (!view.insertSelf) {
            if (this.reverse && this.el.firstChild) {
                this.el.insertBefore(view.el, this.el.firstChild);
            } else {
                this.el.appendChild(view.el);
            }
        }
    },
    _removeViewForModel: function (model) {
        var view = this._getViewByModel(model);
        if (!view) {
            return;
        }
        var index = this.views.indexOf(view);
        if (index !== -1) {
            // remove it if we found it calling animateRemove
            // to give user option of gracefully destroying.
            view = this.views.splice(index, 1)[0];
            this._removeView(view);
            if (this.views.length === 0) {
                this._renderEmptyView();
            }
        }
    },
    _removeView: function (view) {
        if (view.animateRemove) {
            view.animateRemove();
        } else {
            view.remove();
        }
    },
    _renderAll: function () {
        this.collection.each(this._addViewForModel, this);
        if (this.views.length === 0) {
            this._renderEmptyView();
        }
    },
    _rerenderAll: function (collection, options) {
        options = options || {};
        this.collection.each(function (model) {
            this._addViewForModel(model, this, assign(options, {rerender: true}));
        }, this);
    },
    _renderEmptyView: function() {
        if (this.emptyView && !this.renderedEmptyView) {
            var view = this.renderedEmptyView = new this.emptyView({parent: this});
            this.el.appendChild(view.render().el);
        }
    },
    _reset: function () {
        var newViews = this.collection.map(this._getOrCreateByModel, this);

        //Remove existing views from the ui
        var toRemove = difference(this.views, newViews);
        toRemove.forEach(this._removeView, this);

        //Rerender the full list with the new views
        this.views = newViews;
        this._rerenderAll();
        if (this.views.length === 0) {
            this._renderEmptyView();
        }
    }
});

CollectionView.extend = ampExtend;

module.exports = CollectionView;

},{"ampersand-class-extend":88,"ampersand-events":89,"lodash.assign":194,"lodash.difference":100,"lodash.find":110,"lodash.invoke":223,"lodash.pick":232}],88:[function(require,module,exports){
arguments[4][72][0].apply(exports,arguments)
},{"dup":72,"lodash.assign":194}],89:[function(require,module,exports){
arguments[4][31][0].apply(exports,arguments)
},{"dup":31,"lodash.assign":194,"lodash.bind":204,"lodash.foreach":215,"lodash.isempty":90,"lodash.keys":94,"lodash.once":98,"lodash.uniqueid":246}],90:[function(require,module,exports){
arguments[4][49][0].apply(exports,arguments)
},{"dup":49,"lodash.isarguments":91,"lodash.isarray":92,"lodash.isfunction":93,"lodash.isstring":230,"lodash.keys":94}],91:[function(require,module,exports){
arguments[4][50][0].apply(exports,arguments)
},{"dup":50}],92:[function(require,module,exports){
arguments[4][48][0].apply(exports,arguments)
},{"dup":48}],93:[function(require,module,exports){
(function (global){
/**
 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reHostCtor = /^\[object .+?Constructor\]$/;

/**
 * Used to match `RegExp` [special characters](http://www.regular-expressions.info/characters.html#special).
 * In addition to special characters the forward slash is escaped to allow for
 * easier `eval` use and `Function` compilation.
 */
var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
    reHasRegExpChars = RegExp(reRegExpChars.source);

/**
 * The base implementation of `_.isFunction` without support for environments
 * with incorrect `typeof` results.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 */
function baseIsFunction(value) {
  // Avoid a Chakra JIT bug in compatibility modes of IE 11.
  // See https://github.com/jashkenas/underscore/issues/1621 for more details.
  return typeof value == 'function' || false;
}

/**
 * Converts `value` to a string if it is not one. An empty string is returned
 * for `null` or `undefined` values.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  if (typeof value == 'string') {
    return value;
  }
  return value == null ? '' : (value + '');
}

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reNative = RegExp('^' +
  escapeRegExp(objToString)
  .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Native method references. */
var Uint8Array = isNative(Uint8Array = global.Uint8Array) && Uint8Array;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
var isFunction = !(baseIsFunction(/x/) || (Uint8Array && !baseIsFunction(Uint8Array))) ? baseIsFunction : function(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return objToString.call(value) == funcTag;
};

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (objToString.call(value) == funcTag) {
    return reNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reHostCtor.test(value);
}

/**
 * Escapes the `RegExp` special characters "\", "/", "^", "$", ".", "|", "?",
 * "*", "+", "(", ")", "[", "]", "{" and "}" in `string`.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escapeRegExp('[lodash](https://lodash.com/)');
 * // => '\[lodash\]\(https:\/\/lodash\.com\/\)'
 */
function escapeRegExp(string) {
  string = baseToString(string);
  return (string && reHasRegExpChars.test(string))
    ? string.replace(reRegExpChars, '\\$&')
    : string;
}

module.exports = isFunction;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],94:[function(require,module,exports){
arguments[4][54][0].apply(exports,arguments)
},{"dup":54,"lodash.isarguments":95,"lodash.isarray":96,"lodash.isnative":97}],95:[function(require,module,exports){
arguments[4][50][0].apply(exports,arguments)
},{"dup":50}],96:[function(require,module,exports){
arguments[4][48][0].apply(exports,arguments)
},{"dup":48}],97:[function(require,module,exports){
arguments[4][57][0].apply(exports,arguments)
},{"dup":57}],98:[function(require,module,exports){
arguments[4][58][0].apply(exports,arguments)
},{"dup":58,"lodash.before":99}],99:[function(require,module,exports){
arguments[4][59][0].apply(exports,arguments)
},{"dup":59}],100:[function(require,module,exports){
/**
 * lodash 3.1.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseDifference = require('lodash._basedifference'),
    baseFlatten = require('lodash._baseflatten'),
    isArguments = require('lodash.isarguments'),
    isArray = require('lodash.isarray'),
    restParam = require('lodash.restparam');

/**
 * Creates an array excluding all values of the provided arrays using
 * `SameValueZero` for equality comparisons.
 *
 * **Note:** [`SameValueZero`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
 * comparisons are like strict equality comparisons, e.g. `===`, except that
 * `NaN` matches `NaN`.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {...Array} [values] The arrays of values to exclude.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * _.difference([1, 2, 3], [4, 2]);
 * // => [1, 3]
 */
var difference = restParam(function(array, values) {
  return (isArray(array) || isArguments(array))
    ? baseDifference(array, baseFlatten(values, false, true))
    : [];
});

module.exports = difference;

},{"lodash._basedifference":101,"lodash._baseflatten":106,"lodash.isarguments":107,"lodash.isarray":108,"lodash.restparam":109}],101:[function(require,module,exports){
/**
 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseIndexOf = require('lodash._baseindexof'),
    cacheIndexOf = require('lodash._cacheindexof'),
    createCache = require('lodash._createcache');

/**
 * The base implementation of `_.difference` which accepts a single array
 * of values to exclude.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} values The values to exclude.
 * @returns {Array} Returns the new array of filtered values.
 */
function baseDifference(array, values) {
  var length = array ? array.length : 0,
      result = [];

  if (!length) {
    return result;
  }
  var index = -1,
      indexOf = baseIndexOf,
      isCommon = true,
      cache = (isCommon && values.length >= 200) ? createCache(values) : null,
      valuesLength = values.length;

  if (cache) {
    indexOf = cacheIndexOf;
    isCommon = false;
    values = cache;
  }
  outer:
  while (++index < length) {
    var value = array[index];

    if (isCommon && value === value) {
      var valuesIndex = valuesLength;
      while (valuesIndex--) {
        if (values[valuesIndex] === value) {
          continue outer;
        }
      }
      result.push(value);
    }
    else if (indexOf(values, value, 0) < 0) {
      result.push(value);
    }
  }
  return result;
}

module.exports = baseDifference;

},{"lodash._baseindexof":102,"lodash._cacheindexof":103,"lodash._createcache":104}],102:[function(require,module,exports){
/**
 * lodash 3.1.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * The base implementation of `_.indexOf` without support for binary searches.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  if (value !== value) {
    return indexOfNaN(array, fromIndex);
  }
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

/**
 * Gets the index at which the first occurrence of `NaN` is found in `array`.
 * If `fromRight` is provided elements of `array` are iterated from right to left.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched `NaN`, else `-1`.
 */
function indexOfNaN(array, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 0 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    var other = array[index];
    if (other !== other) {
      return index;
    }
  }
  return -1;
}

module.exports = baseIndexOf;

},{}],103:[function(require,module,exports){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Checks if `value` is in `cache` mimicking the return signature of
 * `_.indexOf` by returning `0` if the value is found, else `-1`.
 *
 * @private
 * @param {Object} cache The cache to search.
 * @param {*} value The value to search for.
 * @returns {number} Returns `0` if `value` is found, else `-1`.
 */
function cacheIndexOf(cache, value) {
  var data = cache.data,
      result = (typeof value == 'string' || isObject(value)) ? data.set.has(value) : data.hash[value];

  return result ? 0 : -1;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return type == 'function' || (!!value && type == 'object');
}

module.exports = cacheIndexOf;

},{}],104:[function(require,module,exports){
(function (global){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var isNative = require('lodash.isnative');

/** Native method references. */
var Set = isNative(Set = global.Set) && Set;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeCreate = isNative(nativeCreate = Object.create) && nativeCreate;

/**
 *
 * Creates a cache object to store unique values.
 *
 * @private
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var length = values ? values.length : 0;

  this.data = { 'hash': nativeCreate(null), 'set': new Set };
  while (length--) {
    this.push(values[length]);
  }
}

/**
 * Adds `value` to the cache.
 *
 * @private
 * @name push
 * @memberOf SetCache
 * @param {*} value The value to cache.
 */
function cachePush(value) {
  var data = this.data;
  if (typeof value == 'string' || isObject(value)) {
    data.set.add(value);
  } else {
    data.hash[value] = true;
  }
}

/**
 * Creates a `Set` cache object to optimize linear searches of large arrays.
 *
 * @private
 * @param {Array} [values] The values to cache.
 * @returns {null|Object} Returns the new cache object if `Set` is supported, else `null`.
 */
var createCache = !(nativeCreate && Set) ? constant(null) : function(values) {
  return new SetCache(values);
};

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return type == 'function' || (!!value && type == 'object');
}

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var object = { 'user': 'fred' };
 * var getter = _.constant(object);
 *
 * getter() === object;
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

// Add functions to the `Set` cache.
SetCache.prototype.push = cachePush;

module.exports = createCache;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"lodash.isnative":105}],105:[function(require,module,exports){
arguments[4][57][0].apply(exports,arguments)
},{"dup":57}],106:[function(require,module,exports){
/**
 * lodash 3.1.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var isArguments = require('lodash.isarguments'),
    isArray = require('lodash.isarray');

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * The base implementation of `_.flatten` with added support for restricting
 * flattening and specifying the start index.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {boolean} isDeep Specify a deep flatten.
 * @param {boolean} isStrict Restrict flattening to arrays and `arguments` objects.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, isDeep, isStrict) {
  var index = -1,
      length = array.length,
      resIndex = -1,
      result = [];

  while (++index < length) {
    var value = array[index];

    if (isObjectLike(value) && isLength(value.length) && (isArray(value) || isArguments(value))) {
      if (isDeep) {
        // Recursively flatten arrays (susceptible to call stack limits).
        value = baseFlatten(value, isDeep, isStrict);
      }
      var valIndex = -1,
          valLength = value.length;

      result.length += valLength;
      while (++valIndex < valLength) {
        result[++resIndex] = value[valIndex];
      }
    } else if (!isStrict) {
      result[++resIndex] = value;
    }
  }
  return result;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = baseFlatten;

},{"lodash.isarguments":107,"lodash.isarray":108}],107:[function(require,module,exports){
arguments[4][50][0].apply(exports,arguments)
},{"dup":50}],108:[function(require,module,exports){
arguments[4][48][0].apply(exports,arguments)
},{"dup":48}],109:[function(require,module,exports){
arguments[4][43][0].apply(exports,arguments)
},{"dup":43}],110:[function(require,module,exports){
/**
 * lodash 3.2.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseCallback = require('lodash._basecallback'),
    baseEach = require('lodash._baseeach'),
    baseFind = require('lodash._basefind'),
    baseFindIndex = require('lodash._basefindindex'),
    isArray = require('lodash.isarray'),
    keys = require('lodash.keys');

/**
 * Creates a `_.find` or `_.findLast` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new find function.
 */
function createFind(eachFunc, fromRight) {
  return function(collection, predicate, thisArg) {
    predicate = baseCallback(predicate, thisArg, 3);
    if (isArray(collection)) {
      var index = baseFindIndex(collection, predicate, fromRight);
      return index > -1 ? collection[index] : undefined;
    }
    return baseFind(collection, predicate, eachFunc);
  }
}

/**
 * Iterates over elements of `collection`, returning the first element
 * `predicate` returns truthy for. The predicate is bound to `thisArg` and
 * invoked with three arguments: (value, index|key, collection).
 *
 * If a property name is provided for `predicate` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `predicate` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * @static
 * @memberOf _
 * @alias detect
 * @category Collection
 * @param {Array|Object|string} collection The collection to search.
 * @param {Function|Object|string} [predicate=_.identity] The function invoked
 *  per iteration.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {*} Returns the matched element, else `undefined`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'age': 36, 'active': true },
 *   { 'user': 'fred',    'age': 40, 'active': false },
 *   { 'user': 'pebbles', 'age': 1,  'active': true }
 * ];
 *
 * _.result(_.find(users, function(chr) {
 *   return chr.age < 40;
 * }), 'user');
 * // => 'barney'
 *
 * // using the `_.matches` callback shorthand
 * _.result(_.find(users, { 'age': 1, 'active': true }), 'user');
 * // => 'pebbles'
 *
 * // using the `_.matchesProperty` callback shorthand
 * _.result(_.find(users, 'active', false), 'user');
 * // => 'fred'
 *
 * // using the `_.property` callback shorthand
 * _.result(_.find(users, 'active'), 'user');
 * // => 'barney'
 */
var find = createFind(baseEach);

module.exports = find;

},{"lodash._basecallback":111,"lodash._baseeach":115,"lodash._basefind":116,"lodash._basefindindex":117,"lodash.isarray":118,"lodash.keys":119}],111:[function(require,module,exports){
/**
 * lodash 3.1.3 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseIsEqual = require('lodash._baseisequal'),
    bindCallback = require('lodash._bindcallback'),
    keys = require('lodash.keys');

/**
 * The base implementation of `_.callback` which supports specifying the
 * number of arguments to provide to `func`.
 *
 * @private
 * @param {*} [func=_.identity] The value to convert to a callback.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function baseCallback(func, thisArg, argCount) {
  var type = typeof func;
  if (type == 'function') {
    return typeof thisArg == 'undefined'
      ? func
      : bindCallback(func, thisArg, argCount);
  }
  if (func == null) {
    return identity;
  }
  if (type == 'object') {
    return baseMatches(func);
  }
  return typeof thisArg == 'undefined'
    ? baseProperty(func + '')
    : baseMatchesProperty(func + '', thisArg);
}

/**
 * The base implementation of `_.isMatch` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Array} props The source property names to match.
 * @param {Array} values The source values to match.
 * @param {Array} strictCompareFlags Strict comparison flags for source values.
 * @param {Function} [customizer] The function to customize comparing objects.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, props, values, strictCompareFlags, customizer) {
  var index = -1,
      length = props.length,
      noCustomizer = !customizer;

  while (++index < length) {
    if ((noCustomizer && strictCompareFlags[index])
          ? values[index] !== object[props[index]]
          : !(props[index] in object)
        ) {
      return false;
    }
  }
  index = -1;
  while (++index < length) {
    var key = props[index],
        objValue = object[key],
        srcValue = values[index];

    if (noCustomizer && strictCompareFlags[index]) {
      var result = typeof objValue != 'undefined' || (key in object);
    } else {
      result = customizer ? customizer(objValue, srcValue, key) : undefined;
      if (typeof result == 'undefined') {
        result = baseIsEqual(srcValue, objValue, customizer, true);
      }
    }
    if (!result) {
      return false;
    }
  }
  return true;
}

/**
 * The base implementation of `_.matches` which does not clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new function.
 */
function baseMatches(source) {
  var props = keys(source),
      length = props.length;

  if (!length) {
    return constant(true);
  }
  if (length == 1) {
    var key = props[0],
        value = source[key];

    if (isStrictComparable(value)) {
      return function(object) {
        return object != null && object[key] === value &&
          (typeof value != 'undefined' || (key in toObject(object)));
      };
    }
  }
  var values = Array(length),
      strictCompareFlags = Array(length);

  while (length--) {
    value = source[props[length]];
    values[length] = value;
    strictCompareFlags[length] = isStrictComparable(value);
  }
  return function(object) {
    return object != null && baseIsMatch(toObject(object), props, values, strictCompareFlags);
  };
}

/**
 * The base implementation of `_.matchesProperty` which does not coerce `key`
 * to a string.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} value The value to compare.
 * @returns {Function} Returns the new function.
 */
function baseMatchesProperty(key, value) {
  if (isStrictComparable(value)) {
    return function(object) {
      return object != null && object[key] === value &&
        (typeof value != 'undefined' || (key in toObject(object)));
    };
  }
  return function(object) {
    return object != null && baseIsEqual(value, object[key], null, true);
  };
}

/**
 * The base implementation of `_.property` which does not coerce `key` to a string.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && (value === 0 ? ((1 / value) > 0) : !isObject(value));
}

/**
 * Converts `value` to an object if it is not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Object} Returns the object.
 */
function toObject(value) {
  return isObject(value) ? value : Object(value);
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return type == 'function' || (!!value && type == 'object');
}

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var object = { 'user': 'fred' };
 * var getter = _.constant(object);
 *
 * getter() === object;
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

/**
 * This method returns the first argument provided to it.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'user': 'fred' };
 *
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = baseCallback;

},{"lodash._baseisequal":112,"lodash._bindcallback":114,"lodash.keys":119}],112:[function(require,module,exports){
/**
 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var isArray = require('lodash.isarray'),
    isTypedArray = require('lodash.istypedarray'),
    keys = require('lodash.keys');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    stringTag = '[object String]';

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * The base implementation of `_.isEqual` without support for `this` binding
 * `customizer` functions.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparing values.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
  // Exit early for identical values.
  if (value === other) {
    // Treat `+0` vs. `-0` as not equal.
    return value !== 0 || (1 / value == 1 / other);
  }
  var valType = typeof value,
      othType = typeof other;

  // Exit early for unlike primitive values.
  if ((valType != 'function' && valType != 'object' && othType != 'function' && othType != 'object') ||
      value == null || other == null) {
    // Return `false` unless both values are `NaN`.
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
}

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing objects.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA=[]] Tracks traversed `value` objects.
 * @param {Array} [stackB=[]] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = arrayTag,
      othTag = arrayTag;

  if (!objIsArr) {
    objTag = objToString.call(object);
    if (objTag == argsTag) {
      objTag = objectTag;
    } else if (objTag != objectTag) {
      objIsArr = isTypedArray(object);
    }
  }
  if (!othIsArr) {
    othTag = objToString.call(other);
    if (othTag == argsTag) {
      othTag = objectTag;
    } else if (othTag != objectTag) {
      othIsArr = isTypedArray(other);
    }
  }
  var objIsObj = (objTag == objectTag || (isLoose && objTag == funcTag)),
      othIsObj = (othTag == objectTag || (isLoose && othTag == funcTag)),
      isSameTag = objTag == othTag;

  if (isSameTag && !(objIsArr || objIsObj)) {
    return equalByTag(object, other, objTag);
  }
  if (isLoose) {
    if (!isSameTag && !(objIsObj && othIsObj)) {
      return false;
    }
  } else {
    var valWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (valWrapped || othWrapped) {
      return equalFunc(valWrapped ? object.value() : object, othWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
    }
    if (!isSameTag) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  // For more information on detecting circular references see https://es5.github.io/#JO.
  stackA || (stackA = []);
  stackB || (stackB = []);

  var length = stackA.length;
  while (length--) {
    if (stackA[length] == object) {
      return stackB[length] == other;
    }
  }
  // Add `object` and `other` to the stack of traversed objects.
  stackA.push(object);
  stackB.push(other);

  var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);

  stackA.pop();
  stackB.pop();

  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing arrays.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
  var index = -1,
      arrLength = array.length,
      othLength = other.length,
      result = true;

  if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
    return false;
  }
  // Deep compare the contents, ignoring non-numeric properties.
  while (result && ++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    result = undefined;
    if (customizer) {
      result = isLoose
        ? customizer(othValue, arrValue, index)
        : customizer(arrValue, othValue, index);
    }
    if (typeof result == 'undefined') {
      // Recursively compare arrays (susceptible to call stack limits).
      if (isLoose) {
        var othIndex = othLength;
        while (othIndex--) {
          othValue = other[othIndex];
          result = (arrValue && arrValue === othValue) || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
          if (result) {
            break;
          }
        }
      } else {
        result = (arrValue && arrValue === othValue) || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
      }
    }
  }
  return !!result;
}

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} value The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag) {
  switch (tag) {
    case boolTag:
    case dateTag:
      // Coerce dates and booleans to numbers, dates to milliseconds and booleans
      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
      return +object == +other;

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case numberTag:
      // Treat `NaN` vs. `NaN` as equal.
      return (object != +object)
        ? other != +other
        // But, treat `-0` vs. `+0` as not equal.
        : (object == 0 ? ((1 / object) == (1 / other)) : object == +other);

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings primitives and string
      // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
      return object == (other + '');
  }
  return false;
}

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing values.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
  var objProps = keys(object),
      objLength = objProps.length,
      othProps = keys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isLoose) {
    return false;
  }
  var skipCtor = isLoose,
      index = -1;

  while (++index < objLength) {
    var key = objProps[index],
        result = isLoose ? key in other : hasOwnProperty.call(other, key);

    if (result) {
      var objValue = object[key],
          othValue = other[key];

      result = undefined;
      if (customizer) {
        result = isLoose
          ? customizer(othValue, objValue, key)
          : customizer(objValue, othValue, key);
      }
      if (typeof result == 'undefined') {
        // Recursively compare objects (susceptible to call stack limits).
        result = (objValue && objValue === othValue) || equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB);
      }
    }
    if (!result) {
      return false;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (!skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      return false;
    }
  }
  return true;
}

module.exports = baseIsEqual;

},{"lodash.isarray":118,"lodash.istypedarray":113,"lodash.keys":119}],113:[function(require,module,exports){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dateTag] = typedArrayTags[errorTag] =
typedArrayTags[funcTag] = typedArrayTags[mapTag] =
typedArrayTags[numberTag] = typedArrayTags[objectTag] =
typedArrayTags[regexpTag] = typedArrayTags[setTag] =
typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
function isTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
}

module.exports = isTypedArray;

},{}],114:[function(require,module,exports){
arguments[4][36][0].apply(exports,arguments)
},{"dup":36}],115:[function(require,module,exports){
arguments[4][46][0].apply(exports,arguments)
},{"dup":46,"lodash.keys":119}],116:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * The base implementation of `_.find`, `_.findLast`, `_.findKey`, and `_.findLastKey`,
 * without support for callback shorthands and `this` binding, which iterates
 * over `collection` using the provided `eachFunc`.
 *
 * @private
 * @param {Array|Object|string} collection The collection to search.
 * @param {Function} predicate The function invoked per iteration.
 * @param {Function} eachFunc The function to iterate over `collection`.
 * @param {boolean} [retKey] Specify returning the key of the found element
 *  instead of the element itself.
 * @returns {*} Returns the found element or its key, else `undefined`.
 */
function baseFind(collection, predicate, eachFunc, retKey) {
  var result;
  eachFunc(collection, function(value, key, collection) {
    if (predicate(value, key, collection)) {
      result = retKey ? key : value;
      return false;
    }
  });
  return result;
}

module.exports = baseFind;

},{}],117:[function(require,module,exports){
/**
 * lodash 3.6.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for callback shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {Function} predicate The function invoked per iteration.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromRight) {
  var length = array.length,
      index = fromRight ? length : -1;

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

module.exports = baseFindIndex;

},{}],118:[function(require,module,exports){
arguments[4][48][0].apply(exports,arguments)
},{"dup":48}],119:[function(require,module,exports){
arguments[4][54][0].apply(exports,arguments)
},{"dup":54,"lodash.isarguments":120,"lodash.isarray":118,"lodash.isnative":121}],120:[function(require,module,exports){
arguments[4][50][0].apply(exports,arguments)
},{"dup":50}],121:[function(require,module,exports){
arguments[4][57][0].apply(exports,arguments)
},{"dup":57}],122:[function(require,module,exports){
;if (typeof window !== "undefined") {  window.ampersand = window.ampersand || {};  window.ampersand["ampersand-dom-bindings"] = window.ampersand["ampersand-dom-bindings"] || [];  window.ampersand["ampersand-dom-bindings"].push("3.5.0");}
var Store = require('key-tree-store');
var dom = require('ampersand-dom');
var matchesSelector = require('matches-selector');


// returns a key-tree-store of functions
// that can be applied to any element/model.

// all resulting functions should be called
// like func(el, value, lastKeyName)
module.exports = function (bindings, context) {
    var store = new Store();
    var key, current;

    for (key in bindings) {
        current = bindings[key];
        if (typeof current === 'string') {
            store.add(key, getBindingFunc({
                type: 'text',
                selector: current
            }));
        } else if (current.forEach) {
            current.forEach(function (binding) {
                store.add(key, getBindingFunc(binding, context));
            });
        } else {
            store.add(key, getBindingFunc(current, context));
        }
    }

    return store;
};


var slice = Array.prototype.slice;

function getMatches(el, selector) {
    if (selector === '') return [el];
    var matches = [];
    if (matchesSelector(el, selector)) matches.push(el);
    return matches.concat(slice.call(el.querySelectorAll(selector)));
}

function setAttributes(el, attrs) {
    for (var name in attrs) {
        dom.setAttribute(el, name, attrs[name]);
    }
}

function removeAttributes(el, attrs) {
    for (var name in attrs) {
        dom.removeAttribute(el, name);
    }
}

function makeArray(val) {
    return Array.isArray(val) ? val : [val];
}

function getBindingFunc(binding, context) {
    var type = binding.type || 'text';
    var isCustomBinding = typeof type === 'function';
    var selector = (function () {
        if (typeof binding.selector === 'string') {
            return binding.selector;
        } else if (binding.hook) {
            return '[data-hook~="' + binding.hook + '"]';
        } else {
            return '';
        }
    })();
    var yes = binding.yes;
    var no = binding.no;
    var hasYesNo = !!(yes || no);

    // storage variable for previous if relevant
    var previousValue;

    if (isCustomBinding) {
        return function (el, value) {
            getMatches(el, selector).forEach(function (match) {
                type.call(context, match, value, previousValue);
            });
            previousValue = value;
        };
    } else if (type === 'text') {
        return function (el, value) {
            getMatches(el, selector).forEach(function (match) {
                dom.text(match, value);
            });
        };
    } else if (type === 'class') {
        return function (el, value) {
            getMatches(el, selector).forEach(function (match) {
                dom.switchClass(match, previousValue, value);
            });
            previousValue = value;
        };
    } else if (type === 'attribute') {
        if (!binding.name) throw Error('attribute bindings must have a "name"');
        return function (el, value) {
            var names = makeArray(binding.name);
            getMatches(el, selector).forEach(function (match) {
                names.forEach(function (name) {
                    dom.setAttribute(match, name, value);
                });
            });
            previousValue = value;
        };
    } else if (type === 'value') {
        return function (el, value) {
            getMatches(el, selector).forEach(function (match) {
                if (!value && value !== 0) value = '';
                // only apply bindings if element is not currently focused
                if (document.activeElement !== match) match.value = value;
            });
            previousValue = value;
        };
    } else if (type === 'booleanClass') {
        // if there's a `no` case this is actually a switch
        if (hasYesNo) {
            yes = makeArray(yes || '');
            no = makeArray(no || '');
            return function (el, value) {
                var prevClass = value ? no : yes;
                var newClass = value ? yes : no;
                getMatches(el, selector).forEach(function (match) {
                    prevClass.forEach(function (pc) {
                        dom.removeClass(match, pc);
                    });
                    newClass.forEach(function (nc) {
                        dom.addClass(match, nc);
                    });
                });
            };
        } else {
            return function (el, value, keyName) {
                var name = makeArray(binding.name || keyName);
                getMatches(el, selector).forEach(function (match) {
                    name.forEach(function (className) {
                        dom[value ? 'addClass' : 'removeClass'](match, className);
                    });
                });
            };
        }
    } else if (type === 'booleanAttribute') {
        // if there are `yes` and `no` selectors, this swaps between them
        if (hasYesNo) {
            yes = makeArray(yes || '');
            no = makeArray(no || '');
            return function (el, value) {
                var prevAttribute = value ? no : yes;
                var newAttribute = value ? yes : no;
                getMatches(el, selector).forEach(function (match) {
                    prevAttribute.forEach(function (pa) {
                        if (pa) {
                            dom.removeAttribute(match, pa);
                        }
                    });
                    newAttribute.forEach(function (na) {
                        if (na) {
                            dom.addAttribute(match, na);
                        }
                    });
                });
            };
        } else {
            return function (el, value, keyName) {
                var name = makeArray(binding.name || keyName);
                getMatches(el, selector).forEach(function (match) {
                    name.forEach(function (attr) {
                        dom[value ? 'addAttribute' : 'removeAttribute'](match, attr);
                    });
                });
            };
        }
    } else if (type === 'toggle') {
        var mode = (binding.mode || 'display');
        // this doesn't require a selector since we can pass yes/no selectors
        if (hasYesNo) {
            return function (el, value) {
                getMatches(el, yes).forEach(function (match) {
                    dom[value ? 'show' : 'hide'](match, mode);
                });
                getMatches(el, no).forEach(function (match) {
                    dom[value ? 'hide' : 'show'](match, mode);
                });
            };
        } else {
            return function (el, value) {
                getMatches(el, selector).forEach(function (match) {
                    dom[value ? 'show' : 'hide'](match, mode);
                });
            };
        }
    } else if (type === 'switch') {
        if (!binding.cases) throw Error('switch bindings must have "cases"');
        return function (el, value) {
            for (var item in binding.cases) {
                getMatches(el, binding.cases[item]).forEach(function (match) {
                    dom[value === item ? 'show' : 'hide'](match);
                });
            }
        };
    } else if (type === 'innerHTML') {
        return function (el, value) {
            getMatches(el, selector).forEach(function (match) {
                dom.html(match, value);
            });
        };
    } else if (type === 'switchClass') {
        if (!binding.cases) throw Error('switchClass bindings must have "cases"');
        return function (el, value, keyName) {
            var name = makeArray(binding.name || keyName);
            for (var item in binding.cases) {
                getMatches(el, binding.cases[item]).forEach(function (match) {
                    name.forEach(function (className) {
                        dom[value === item ? 'addClass' : 'removeClass'](match, className);
                    });
                });
            }
        };
    } else if (type === 'switchAttribute') {
        if (!binding.cases) throw Error('switchAttribute bindings must have "cases"');
        return function (el, value, keyName) {
            getMatches(el, selector).forEach(function (match) {
                if (previousValue) {
                    removeAttributes(match, previousValue);
                }

                if (value in binding.cases) {
                    var attrs = binding.cases[value];
                    if (typeof attrs === 'string') {
                        attrs = {};
                        attrs[binding.name || keyName] = binding.cases[value];
                    }
                    setAttributes(match, attrs);

                    previousValue = attrs;
                }
            });
        };
    } else {
        throw new Error('no such binding type: ' + type);
    }
}

},{"ampersand-dom":62,"key-tree-store":123,"matches-selector":248}],123:[function(require,module,exports){
var slice = Array.prototype.slice;

// our constructor
function KeyTreeStore() {
    this.storage = {};
}

// add an object to the store
KeyTreeStore.prototype.add = function (keypath, obj) {
    var arr = this.storage[keypath] || (this.storage[keypath] = []);
    arr.push(obj);
};

// remove an object
KeyTreeStore.prototype.remove = function (obj) {
    var path, arr;
    for (path in this.storage) {
        arr = this.storage[path];
        arr.some(function (item, index) {
            if (item === obj) {
                arr.splice(index, 1);
                return true;
            }
        });
    }
};

// get array of all all relevant functions, without keys
KeyTreeStore.prototype.get = function (keypath) {
    var res = [];
    var key;

    for (key in this.storage) {
        if (!keypath || keypath === key || key.indexOf(keypath + '.') === 0) {
            res = res.concat(this.storage[key]);
        }
    }

    return res;
};

// get all results that match keypath but still grouped by key
KeyTreeStore.prototype.getGrouped = function (keypath) {
    var res = {};
    var key;

    for (key in this.storage) {
        if (!keypath || keypath === key || key.indexOf(keypath + '.') === 0) {
            res[key] = slice.call(this.storage[key]);
        }
    }

    return res;
};

// get all results that match keypath but still grouped by key
KeyTreeStore.prototype.getAll = function (keypath) {
    var res = {};
    var key;

    for (key in this.storage) {
        if (keypath === key || key.indexOf(keypath + '.') === 0) {
            res[key] = slice.call(this.storage[key]);
        }
    }

    return res;
};

// run all matches with optional context
KeyTreeStore.prototype.run = function (keypath, context) {
    var args = slice.call(arguments, 2);
    this.get(keypath).forEach(function (fn) {
        fn.apply(context || this, args);
    });
};



module.exports = KeyTreeStore;

},{}],124:[function(require,module,exports){
;if (typeof window !== "undefined") {  window.ampersand = window.ampersand || {};  window.ampersand["ampersand-state"] = window.ampersand["ampersand-state"] || [];  window.ampersand["ampersand-state"].push("4.5.3");}
var uniqueId = require('lodash.uniqueid');
var assign = require('lodash.assign');
var omit = require('lodash.omit');
var escape = require('lodash.escape');
var forEach = require('lodash.foreach');
var includes = require('lodash.includes');
var isString = require('lodash.isstring');
var isObject = require('lodash.isobject');
var isArray = require('lodash.isarray');
var isDate = require('lodash.isdate');
var isUndefined = require('lodash.isundefined');
var isFunction = require('lodash.isfunction');
var isNull = require('lodash.isnull');
var isEmpty = require('lodash.isempty');
var isEqual = require('lodash.isequal');
var clone = require('lodash.clone');
var has = require('lodash.has');
var result = require('lodash.result');
var keys = require('lodash.keys');
var bind = require('lodash.bind');
var defaults = require('lodash.defaults');
var union = require('lodash.union');
var Events = require('ampersand-events');
var KeyTree = require('key-tree-store');
var arrayNext = require('array-next');
var changeRE = /^change:/;

function Base(attrs, options) {
    options || (options = {});
    this.cid || (this.cid = uniqueId('state'));
    this._events = {};
    this._values = {};
    this._definition = Object.create(this._definition);
    if (options.parse) attrs = this.parse(attrs, options);
    this.parent = options.parent;
    this.collection = options.collection;
    this._keyTree = new KeyTree();
    this._initCollections();
    this._initChildren();
    this._cache = {};
    this._previousAttributes = {};
    if (attrs) this.set(attrs, assign({silent: true, initial: true}, options));
    this._changed = {};
    if (this._derived) this._initDerived();
    if (options.init !== false) this.initialize.apply(this, arguments);
}


assign(Base.prototype, Events, {
    // can be allow, ignore, reject
    extraProperties: 'ignore',

    idAttribute: 'id',

    namespaceAttribute: 'namespace',

    typeAttribute: 'modelType',

    // Stubbed out to be overwritten
    initialize: function () {
        return this;
    },

    // Get ID of model per configuration.
    // Should *always* be how ID is determined by other code.
    getId: function () {
        return this[this.idAttribute];
    },

    // Get namespace of model per configuration.
    // Should *always* be how namespace is determined by other code.
    getNamespace: function () {
        return this[this.namespaceAttribute];
    },

    // Get type of model per configuration.
    // Should *always* be how type is determined by other code.
    getType: function () {
        return this[this.typeAttribute];
    },

    // A model is new if it has never been saved to the server, and lacks an id.
    isNew: function () {
        return this.getId() == null;
    },

    // get HTML-escaped value of attribute
    escape: function (attr) {
        return escape(this.get(attr));
    },

    // Check if the model is currently in a valid state.
    isValid: function (options) {
        return this._validate({}, assign(options || {}, { validate: true }));
    },

    // Parse can be used remap/restructure/rename incoming properties
    // before they are applied to attributes.
    parse: function (resp, options) {
        //jshint unused:false
        return resp;
    },

    // Serialize is the inverse of `parse` it lets you massage data
    // on the way out. Before, sending to server, for example.
    serialize: function () {
        var res = this.getAttributes({props: true}, true);
        forEach(this._children, function (value, key) {
            res[key] = this[key].serialize();
        }, this);
        forEach(this._collections, function (value, key) {
            res[key] = this[key].serialize();
        }, this);
        return res;
    },

    // Main set method used by generated setters/getters and can
    // be used directly if you need to pass options or set multiple
    // properties at once.
    set: function (key, value, options) {
        var self = this;
        var extraProperties = this.extraProperties;
        var changing, changes, newType, newVal, def, cast, err, attr,
            attrs, dataType, silent, unset, currentVal, initial, hasChanged, isEqual;

        // Handle both `"key", value` and `{key: value}` -style arguments.
        if (isObject(key) || key === null) {
            attrs = key;
            options = value;
        } else {
            attrs = {};
            attrs[key] = value;
        }

        options = options || {};

        if (!this._validate(attrs, options)) return false;

        // Extract attributes and options.
        unset = options.unset;
        silent = options.silent;
        initial = options.initial;

        changes = [];
        changing = this._changing;
        this._changing = true;

        // if not already changing, store previous
        if (!changing) {
            this._previousAttributes = this.attributes;
            this._changed = {};
        }

        // For each `set` attribute...
        for (attr in attrs) {
            newVal = attrs[attr];
            newType = typeof newVal;
            currentVal = this._values[attr];
            def = this._definition[attr];


            if (!def) {
                // if this is a child model or collection
                if (this._children[attr] || this._collections[attr]) {
                    this[attr].set(newVal, options);
                    continue;
                } else if (extraProperties === 'ignore') {
                    continue;
                } else if (extraProperties === 'reject') {
                    throw new TypeError('No "' + attr + '" property defined on ' + (this.type || 'this') + ' model and extraProperties not set to "ignore" or "allow"');
                } else if (extraProperties === 'allow') {
                    def = this._createPropertyDefinition(attr, 'any');
                } else if (extraProperties) {
                    throw new TypeError('Invalid value for extraProperties: "' + extraProperties + '"');
                }
            }

            isEqual = this._getCompareForType(def.type);
            dataType = this._dataTypes[def.type];

            // check type if we have one
            if (dataType && dataType.set) {
                cast = dataType.set(newVal);
                newVal = cast.val;
                newType = cast.type;
            }

            // If we've defined a test, run it
            if (def.test) {
                err = def.test.call(this, newVal, newType);
                if (err) {
                    throw new TypeError('Property \'' + attr + '\' failed validation with error: ' + err);
                }
            }

            // If we are required but undefined, throw error.
            // If we are null and are not allowing null, throw error
            // If we have a defined type and the new type doesn't match, and we are not null, throw error.

            if (isUndefined(newVal) && def.required) {
                throw new TypeError('Required property \'' + attr + '\' must be of type ' + def.type + '. Tried to set ' + newVal);
            }
            if (isNull(newVal) && def.required && !def.allowNull) {
                throw new TypeError('Property \'' + attr + '\' must be of type ' + def.type + ' (cannot be null). Tried to set ' + newVal);
            }
            if ((def.type && def.type !== 'any' && def.type !== newType) && !isNull(newVal) && !isUndefined(newVal)) {
                throw new TypeError('Property \'' + attr + '\' must be of type ' + def.type + '. Tried to set ' + newVal);
            }
            if (def.values && !includes(def.values, newVal)) {
                throw new TypeError('Property \'' + attr + '\' must be one of values: ' + def.values.join(', ') + '. Tried to set ' + newVal);
            }

            hasChanged = !isEqual(currentVal, newVal, attr);

            // enforce `setOnce` for properties if set
            if (def.setOnce && currentVal !== undefined && hasChanged && !initial) {
                throw new TypeError('Property \'' + attr + '\' can only be set once.');
            }

            // keep track of changed attributes
            // and push to changes array
            if (hasChanged) {
                changes.push({prev: currentVal, val: newVal, key: attr});
                self._changed[attr] = newVal;
            } else {
                delete self._changed[attr];
            }
        }

        // actually update our values
        forEach(changes, function (change) {
            self._previousAttributes[change.key] = change.prev;
            if (unset) {
                delete self._values[change.key];
            } else {
                self._values[change.key] = change.val;
            }
        });

        if (!silent && changes.length) self._pending = true;
        if (!silent) {
            forEach(changes, function (change) {
                self.trigger('change:' + change.key, self, change.val, options);
            });
        }

        // You might be wondering why there's a `while` loop here. Changes can
        // be recursively nested within `"change"` events.
        if (changing) return this;
        if (!silent) {
            while (this._pending) {
                this._pending = false;
                this.trigger('change', this, options);
            }
        }
        this._pending = false;
        this._changing = false;
        return this;
    },

    get: function (attr) {
        return this[attr];
    },

    // Toggle boolean properties or properties that have a `values`
    // array in its definition.
    toggle: function (property) {
        var def = this._definition[property];
        if (def.type === 'boolean') {
            // if it's a bool, just flip it
            this[property] = !this[property];
        } else if (def && def.values) {
            // If it's a property with an array of values
            // skip to the next one looping back if at end.
            this[property] = arrayNext(def.values, this[property]);
        } else {
            throw new TypeError('Can only toggle properties that are type `boolean` or have `values` array.');
        }
        return this;
    },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes: function () {
        return clone(this._previousAttributes);
    },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged: function (attr) {
        if (attr == null) return !isEmpty(this._changed);
        return has(this._changed, attr);
    },

    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.
    changedAttributes: function (diff) {
        if (!diff) return this.hasChanged() ? clone(this._changed) : false;
        var val, changed = false;
        var old = this._changing ? this._previousAttributes : this.attributes;
        var def, isEqual;
        for (var attr in diff) {
            def = this._definition[attr];
            if (!def) continue;
            isEqual = this._getCompareForType(def.type);
            if (isEqual(old[attr], (val = diff[attr]))) continue;
            (changed || (changed = {}))[attr] = val;
        }
        return changed;
    },

    toJSON: function () {
        return this.serialize();
    },

    unset: function (attrs, options) {
        attrs = Array.isArray(attrs) ? attrs : [attrs];
        forEach(attrs, function (key) {
            var def = this._definition[key];
            var val;
            if (def.required) {
                val = result(def, 'default');
                return this.set(key, val, options);
            } else {
                return this.set(key, val, assign({}, options, {unset: true}));
            }
        }, this);
    },

    clear: function (options) {
        var self = this;
        forEach(keys(this.attributes), function (key) {
            self.unset(key, options);
        });
        return this;
    },

    previous: function (attr) {
        if (attr == null || !Object.keys(this._previousAttributes).length) return null;
        return this._previousAttributes[attr];
    },

    // Get default values for a certain type
    _getDefaultForType: function (type) {
        var dataType = this._dataTypes[type];
        return dataType && dataType.default;
    },

    // Determine which comparison algorithm to use for comparing a property
    _getCompareForType: function (type) {
        var dataType = this._dataTypes[type];
        if (dataType && dataType.compare) return bind(dataType.compare, this);
        return isEqual;
    },

    // Run validation against the next complete set of model attributes,
    // returning `true` if all is well. Otherwise, fire an `"invalid"` event.
    _validate: function (attrs, options) {
        if (!options.validate || !this.validate) return true;
        attrs = assign({}, this.attributes, attrs);
        var error = this.validationError = this.validate(attrs, options) || null;
        if (!error) return true;
        this.trigger('invalid', this, error, assign(options || {}, {validationError: error}));
        return false;
    },

    _createPropertyDefinition: function (name, desc, isSession) {
        return createPropertyDefinition(this, name, desc, isSession);
    },

    // just makes friendlier errors when trying to define a new model
    // only used when setting up original property definitions
    _ensureValidType: function (type) {
        return includes(['string', 'number', 'boolean', 'array', 'object', 'date', 'any'].concat(keys(this._dataTypes)), type) ? type : undefined;
    },

    getAttributes: function (options, raw) {
        options || (options = {});
        defaults(options, {
            session: false,
            props: false,
            derived: false
        });
        var res = {};
        var val, item, def;
        for (item in this._definition) {
            def = this._definition[item];
            if ((options.session && def.session) || (options.props && !def.session)) {
                val = (raw) ? this._values[item] : this[item];
                if (typeof val === 'undefined') val = result(def, 'default');
                if (typeof val !== 'undefined') res[item] = val;
            }
        }
        if (options.derived) {
            for (item in this._derived) res[item] = this[item];
        }
        return res;
    },

    _initDerived: function () {
        var self = this;

        forEach(this._derived, function (value, name) {
            var def = self._derived[name];
            def.deps = def.depList;

            var update = function (options) {
                options = options || {};

                var newVal = def.fn.call(self);

                if (self._cache[name] !== newVal || !def.cache) {
                    if (def.cache) {
                        self._previousAttributes[name] = self._cache[name];
                    }
                    self._cache[name] = newVal;
                    self.trigger('change:' + name, self, self._cache[name]);
                }
            };

            def.deps.forEach(function (propString) {
                self._keyTree.add(propString, update);
            });
        });

        this.on('all', function (eventName) {
            if (changeRE.test(eventName)) {
                self._keyTree.get(eventName.split(':')[1]).forEach(function (fn) {
                    fn();
                });
            }
        }, this);
    },

    _getDerivedProperty: function (name, flushCache) {
        // is this a derived property that is cached
        if (this._derived[name].cache) {
            //set if this is the first time, or flushCache is set
            if (flushCache || !this._cache.hasOwnProperty(name)) {
                this._cache[name] = this._derived[name].fn.apply(this);
            }
            return this._cache[name];
        } else {
            return this._derived[name].fn.apply(this);
        }
    },

    _initCollections: function () {
        var coll;
        if (!this._collections) return;
        for (coll in this._collections) {
            this[coll] = new this._collections[coll](null, {parent: this});
        }
    },

    _initChildren: function () {
        var child;
        if (!this._children) return;
        for (child in this._children) {
            this[child] = new this._children[child]({}, {parent: this});
            this.listenTo(this[child], 'all', this._getEventBubblingHandler(child));
        }
    },

    // Returns a bound handler for doing event bubbling while
    // adding a name to the change string.
    _getEventBubblingHandler: function (propertyName) {
        return bind(function (name, model, newValue) {
            if (changeRE.test(name)) {
                this.trigger('change:' + propertyName + '.' + name.split(':')[1], model, newValue);
            } else if (name === 'change') {
                this.trigger('change', this);
            }
        }, this);
    },

    // Check that all required attributes are present
    _verifyRequired: function () {
        var attrs = this.attributes; // should include session
        for (var def in this._definition) {
            if (this._definition[def].required && typeof attrs[def] === 'undefined') {
                return false;
            }
        }
        return true;
    }
});

// getter for attributes
Object.defineProperties(Base.prototype, {
    attributes: {
        get: function () {
            return this.getAttributes({props: true, session: true});
        }
    },
    all: {
        get: function () {
            return this.getAttributes({
                session: true,
                props: true,
                derived: true
            });
        }
    },
    isState: {
        get: function () { return true; },
        set: function () { }
    }
});

// helper for creating/storing property definitions and creating
// appropriate getters/setters
function createPropertyDefinition(object, name, desc, isSession) {
    var def = object._definition[name] = {};
    var type, descArray;

    if (isString(desc)) {
        // grab our type if all we've got is a string
        type = object._ensureValidType(desc);
        if (type) def.type = type;
    } else {

        //Transform array of ['type', required, default] to object form
        if (isArray(desc)) {
            descArray = desc;
            desc = {
                type: descArray[0],
                required: descArray[1],
                default: descArray[2]
            };
        }

        type = object._ensureValidType(desc.type);
        if (type) def.type = type;

        if (desc.required) def.required = true;

        if (desc.default && typeof desc.default === 'object') {
            throw new TypeError('The default value for ' + name + ' cannot be an object/array, must be a value or a function which returns a value/object/array');
        }
        def.default = desc.default;

        def.allowNull = desc.allowNull ? desc.allowNull : false;
        if (desc.setOnce) def.setOnce = true;
        if (def.required && isUndefined(def.default) && !def.setOnce) def.default = object._getDefaultForType(type);
        def.test = desc.test;
        def.values = desc.values;
    }
    if (isSession) def.session = true;

    // define a getter/setter on the prototype
    // but they get/set on the instance
    Object.defineProperty(object, name, {
        set: function (val) {
            this.set(name, val);
        },
        get: function () {
            var value = this._values[name];
            var typeDef = this._dataTypes[def.type];
            if (typeof value !== 'undefined') {
                if (typeDef && typeDef.get) {
                    value = typeDef.get(value);
                }
                return value;
            }
            value = result(def, 'default');
            this._values[name] = value;
            return value;
        }
    });

    return def;
}

// helper for creating derived property definitions
function createDerivedProperty(modelProto, name, definition) {
    var def = modelProto._derived[name] = {
        fn: isFunction(definition) ? definition : definition.fn,
        cache: (definition.cache !== false),
        depList: definition.deps || []
    };

    // add to our shared dependency list
    forEach(def.depList, function (dep) {
        modelProto._deps[dep] = union(modelProto._deps[dep] || [], [name]);
    });

    // defined a top-level getter for derived names
    Object.defineProperty(modelProto, name, {
        get: function () {
            return this._getDerivedProperty(name);
        },
        set: function () {
            throw new TypeError('"' + name + '" is a derived property, it can\'t be set directly.');
        }
    });
}

var dataTypes = {
    string: {
        default: function () {
            return '';
        }
    },
    date: {
        set: function (newVal) {
            var newType;
            if (newVal == null) {
                newType = typeof null;
            } else if (!isDate(newVal)) {
                try {
                    var dateVal = new Date(newVal).valueOf();
                    if (isNaN(dateVal)) {
                        // If the newVal cant be parsed, then try parseInt first
                        dateVal = new Date(parseInt(newVal, 10)).valueOf();
                        if (isNaN(dateVal)) throw TypeError;
                    }
                    newVal = dateVal;
                    newType = 'date';
                } catch (e) {
                    newType = typeof newVal;
                }
            } else {
                newType = 'date';
                newVal = newVal.valueOf();
            }

            return {
                val: newVal,
                type: newType
            };
        },
        get: function (val) {
            if (val == null) { return val; }
            return new Date(val);
        },
        default: function () {
            return new Date();
        }
    },
    array: {
        set: function (newVal) {
            return {
                val: newVal,
                type: isArray(newVal) ? 'array' : typeof newVal
            };
        },
        default: function () {
            return [];
        }
    },
    object: {
        set: function (newVal) {
            var newType = typeof newVal;
            // we have to have a way of supporting "missing" objects.
            // Null is an object, but setting a value to undefined
            // should work too, IMO. We just override it, in that case.
            if (newType !== 'object' && isUndefined(newVal)) {
                newVal = null;
                newType = 'object';
            }
            return {
                val: newVal,
                type: newType
            };
        },
        default: function () {
            return {};
        }
    },
    // the `state` data type is a bit special in that setting it should
    // also bubble events
    state: {
        set: function (newVal) {
            var isInstance = newVal instanceof Base || (newVal && newVal.isState);
            if (isInstance) {
                return {
                    val: newVal,
                    type: 'state'
                };
            } else {
                return {
                    val: newVal,
                    type: typeof newVal
                };
            }
        },
        compare: function (currentVal, newVal, attributeName) {
            var isSame = currentVal === newVal;

            // if this has changed we want to also handle
            // event propagation
            if (!isSame) {
                if (currentVal) {
                    this.stopListening(currentVal);
                }

                if (newVal != null) {
                    this.listenTo(newVal, 'all', this._getEventBubblingHandler(attributeName));
                }
            }

            return isSame;
        }
    }
};

// the extend method used to extend prototypes, maintain inheritance chains for instanceof
// and allow for additions to the model definitions.
function extend(protoProps) {
    var parent = this;
    var child;
    var args = [].slice.call(arguments);

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && protoProps.hasOwnProperty('constructor')) {
        child = protoProps.constructor;
    } else {
        child = function () {
            return parent.apply(this, arguments);
        };
    }

    // Add static properties to the constructor function from parent
    assign(child, parent);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function () { this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();

    // set prototype level objects
    child.prototype._derived =  assign({}, parent.prototype._derived);
    child.prototype._deps = assign({}, parent.prototype._deps);
    child.prototype._definition = assign({}, parent.prototype._definition);
    child.prototype._collections = assign({}, parent.prototype._collections);
    child.prototype._children = assign({}, parent.prototype._children);
    child.prototype._dataTypes = assign({}, parent.prototype._dataTypes || dataTypes);

    // Mix in all prototype properties to the subclass if supplied.
    if (protoProps) {
        var omitFromExtend = [
            'dataTypes', 'props', 'session', 'derived', 'collections', 'children'
        ];
        args.forEach(function processArg(def) {
            if (def.dataTypes) {
                forEach(def.dataTypes, function (def, name) {
                    child.prototype._dataTypes[name] = def;
                });
            }
            if (def.props) {
                forEach(def.props, function (def, name) {
                    createPropertyDefinition(child.prototype, name, def);
                });
            }
            if (def.session) {
                forEach(def.session, function (def, name) {
                    createPropertyDefinition(child.prototype, name, def, true);
                });
            }
            if (def.derived) {
                forEach(def.derived, function (def, name) {
                    createDerivedProperty(child.prototype, name, def);
                });
            }
            if (def.collections) {
                forEach(def.collections, function (constructor, name) {
                    child.prototype._collections[name] = constructor;
                });
            }
            if (def.children) {
                forEach(def.children, function (constructor, name) {
                    child.prototype._children[name] = constructor;
                });
            }
            assign(child.prototype, omit(def, omitFromExtend));
        });
    }

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
}

Base.extend = extend;

// Our main exports
module.exports = Base;

},{"ampersand-events":125,"array-next":128,"key-tree-store":129,"lodash.assign":194,"lodash.bind":204,"lodash.clone":130,"lodash.defaults":139,"lodash.escape":141,"lodash.foreach":215,"lodash.has":143,"lodash.includes":144,"lodash.isarray":148,"lodash.isdate":149,"lodash.isempty":150,"lodash.isequal":152,"lodash.isfunction":156,"lodash.isnull":157,"lodash.isobject":158,"lodash.isstring":230,"lodash.isundefined":159,"lodash.keys":160,"lodash.omit":163,"lodash.result":244,"lodash.union":179,"lodash.uniqueid":246}],125:[function(require,module,exports){
arguments[4][31][0].apply(exports,arguments)
},{"dup":31,"lodash.assign":194,"lodash.bind":204,"lodash.foreach":215,"lodash.isempty":150,"lodash.keys":160,"lodash.once":126,"lodash.uniqueid":246}],126:[function(require,module,exports){
arguments[4][58][0].apply(exports,arguments)
},{"dup":58,"lodash.before":127}],127:[function(require,module,exports){
arguments[4][59][0].apply(exports,arguments)
},{"dup":59}],128:[function(require,module,exports){
module.exports = function arrayNext(array, currentItem) {
    var len = array.length;
    var newIndex = array.indexOf(currentItem) + 1;
    if (newIndex > (len - 1)) newIndex = 0;
    return array[newIndex];
};

},{}],129:[function(require,module,exports){
arguments[4][123][0].apply(exports,arguments)
},{"dup":123}],130:[function(require,module,exports){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseClone = require('lodash._baseclone'),
    bindCallback = require('lodash._bindcallback'),
    isIterateeCall = require('lodash._isiterateecall');

/**
 * Creates a clone of `value`. If `isDeep` is `true` nested objects are cloned,
 * otherwise they are assigned by reference. If `customizer` is provided it is
 * invoked to produce the cloned values. If `customizer` returns `undefined`
 * cloning is handled by the method instead. The `customizer` is bound to
 * `thisArg` and invoked with two argument; (value [, index|key, object]).
 *
 * **Note:** This method is loosely based on the structured clone algorithm.
 * The enumerable properties of `arguments` objects and objects created by
 * constructors other than `Object` are cloned to plain `Object` objects. An
 * empty object is returned for uncloneable values such as functions, DOM nodes,
 * Maps, Sets, and WeakMaps. See the [HTML5 specification](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @param {Function} [customizer] The function to customize cloning values.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {*} Returns the cloned value.
 * @example
 *
 * var users = [
 *   { 'user': 'barney' },
 *   { 'user': 'fred' }
 * ];
 *
 * var shallow = _.clone(users);
 * shallow[0] === users[0];
 * // => true
 *
 * var deep = _.clone(users, true);
 * deep[0] === users[0];
 * // => false
 *
 * // using a customizer callback
 * var el = _.clone(document.body, function(value) {
 *   if (_.isElement(value)) {
 *     return value.cloneNode(false);
 *   }
 * });
 *
 * el === document.body
 * // => false
 * el.nodeName
 * // => BODY
 * el.childNodes.length;
 * // => 0
 */
function clone(value, isDeep, customizer, thisArg) {
  if (isDeep && typeof isDeep != 'boolean' && isIterateeCall(value, isDeep, customizer)) {
    isDeep = false;
  }
  else if (typeof isDeep == 'function') {
    thisArg = customizer;
    customizer = isDeep;
    isDeep = false;
  }
  customizer = typeof customizer == 'function' && bindCallback(customizer, thisArg, 1);
  return baseClone(value, isDeep, customizer);
}

module.exports = clone;

},{"lodash._baseclone":131,"lodash._bindcallback":137,"lodash._isiterateecall":138}],131:[function(require,module,exports){
(function (global){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var arrayCopy = require('lodash._arraycopy'),
    arrayEach = require('lodash._arrayeach'),
    baseCopy = require('lodash._basecopy'),
    baseFor = require('lodash._basefor'),
    isArray = require('lodash.isarray'),
    isNative = require('lodash.isnative'),
    keys = require('lodash.keys');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[boolTag] =
cloneableTags[dateTag] = cloneableTags[float32Tag] =
cloneableTags[float64Tag] = cloneableTags[int8Tag] =
cloneableTags[int16Tag] = cloneableTags[int32Tag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[stringTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[mapTag] = cloneableTags[setTag] =
cloneableTags[weakMapTag] = false;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Native method references. */
var ArrayBuffer = isNative(ArrayBuffer = global.ArrayBuffer) && ArrayBuffer,
    bufferSlice = isNative(bufferSlice = ArrayBuffer && new ArrayBuffer(0).slice) && bufferSlice,
    floor = Math.floor,
    Uint8Array = isNative(Uint8Array = global.Uint8Array) && Uint8Array;

/** Used to clone array buffers. */
var Float64Array = (function() {
  // Safari 5 errors when using an array buffer to initialize a typed array
  // where the array buffer's `byteLength` is not a multiple of the typed
  // array's `BYTES_PER_ELEMENT`.
  try {
    var func = isNative(func = global.Float64Array) && func,
        result = new func(new ArrayBuffer(10), 0, 1) && func;
  } catch(e) {}
  return result;
}());

/** Used as the size, in bytes, of each `Float64Array` element. */
var FLOAT64_BYTES_PER_ELEMENT = Float64Array ? Float64Array.BYTES_PER_ELEMENT : 0;

/**
 * The base implementation of `_.clone` without support for argument juggling
 * and `this` binding `customizer` functions.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @param {Function} [customizer] The function to customize cloning values.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The object `value` belongs to.
 * @param {Array} [stackA=[]] Tracks traversed source objects.
 * @param {Array} [stackB=[]] Associates clones with source counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, isDeep, customizer, key, object, stackA, stackB) {
  var result;
  if (customizer) {
    result = object ? customizer(value, key, object) : customizer(value);
  }
  if (typeof result != 'undefined') {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return arrayCopy(value, result);
    }
  } else {
    var tag = objToString.call(value),
        isFunc = tag == funcTag;

    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = initCloneObject(isFunc ? {} : value);
      if (!isDeep) {
        return baseCopy(value, result, keys(value));
      }
    } else {
      return cloneableTags[tag]
        ? initCloneByTag(value, tag, isDeep)
        : (object ? value : {});
    }
  }
  // Check for circular references and return corresponding clone.
  stackA || (stackA = []);
  stackB || (stackB = []);

  var length = stackA.length;
  while (length--) {
    if (stackA[length] == value) {
      return stackB[length];
    }
  }
  // Add the source value to the stack of traversed objects and associate it with its clone.
  stackA.push(value);
  stackB.push(result);

  // Recursively populate clone (susceptible to call stack limits).
  (isArr ? arrayEach : baseForOwn)(value, function(subValue, key) {
    result[key] = baseClone(subValue, isDeep, customizer, key, value, stackA, stackB);
  });
  return result;
}

/**
 * The base implementation of `_.forOwn` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return baseFor(object, iteratee, keys);
}

/**
 * Creates a clone of the given array buffer.
 *
 * @private
 * @param {ArrayBuffer} buffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function bufferClone(buffer) {
  return bufferSlice.call(buffer, 0);
}
if (!bufferSlice) {
  // PhantomJS has `ArrayBuffer` and `Uint8Array` but not `Float64Array`.
  bufferClone = !(ArrayBuffer && Uint8Array) ? constant(null) : function(buffer) {
    var byteLength = buffer.byteLength,
        floatLength = Float64Array ? floor(byteLength / FLOAT64_BYTES_PER_ELEMENT) : 0,
        offset = floatLength * FLOAT64_BYTES_PER_ELEMENT,
        result = new ArrayBuffer(byteLength);

    if (floatLength) {
      var view = new Float64Array(result, 0, floatLength);
      view.set(new Float64Array(buffer, 0, floatLength));
    }
    if (byteLength != offset) {
      view = new Uint8Array(result, offset);
      view.set(new Uint8Array(buffer, offset));
    }
    return result;
  };
}

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = new array.constructor(length);

  // Add array properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  var Ctor = object.constructor;
  if (!(typeof Ctor == 'function' && Ctor instanceof Ctor)) {
    Ctor = Object;
  }
  return new Ctor;
}

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return bufferClone(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      var buffer = object.buffer;
      return new Ctor(isDeep ? bufferClone(buffer) : buffer, object.byteOffset, object.length);

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      var result = new Ctor(object.source, reFlags.exec(object));
      result.lastIndex = object.lastIndex;
  }
  return result;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return type == 'function' || (!!value && type == 'object');
}

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var object = { 'user': 'fred' };
 * var getter = _.constant(object);
 *
 * getter() === object;
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = baseClone;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"lodash._arraycopy":132,"lodash._arrayeach":133,"lodash._basecopy":134,"lodash._basefor":135,"lodash.isarray":148,"lodash.isnative":136,"lodash.keys":160}],132:[function(require,module,exports){
arguments[4][40][0].apply(exports,arguments)
},{"dup":40}],133:[function(require,module,exports){
arguments[4][45][0].apply(exports,arguments)
},{"dup":45}],134:[function(require,module,exports){
arguments[4][34][0].apply(exports,arguments)
},{"dup":34}],135:[function(require,module,exports){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * The base implementation of `baseForIn` and `baseForOwn` which iterates
 * over `object` properties returned by `keysFunc` invoking `iteratee` for
 * each property. Iterator functions may exit iteration early by explicitly
 * returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

/**
 * Creates a base function for `_.forIn` or `_.forInRight`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var iterable = toObject(object),
        props = keysFunc(object),
        length = props.length,
        index = fromRight ? length : -1;

    while ((fromRight ? index-- : ++index < length)) {
      var key = props[index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

/**
 * Converts `value` to an object if it is not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Object} Returns the object.
 */
function toObject(value) {
  return isObject(value) ? value : Object(value);
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return type == 'function' || (!!value && type == 'object');
}

module.exports = baseFor;

},{}],136:[function(require,module,exports){
arguments[4][57][0].apply(exports,arguments)
},{"dup":57}],137:[function(require,module,exports){
arguments[4][36][0].apply(exports,arguments)
},{"dup":36}],138:[function(require,module,exports){
arguments[4][37][0].apply(exports,arguments)
},{"dup":37}],139:[function(require,module,exports){
/**
 * lodash 3.1.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var assign = require('lodash.assign'),
    restParam = require('lodash.restparam');

/**
 * Used by `_.defaults` to customize its `_.assign` use.
 *
 * @private
 * @param {*} objectValue The destination object property value.
 * @param {*} sourceValue The source object property value.
 * @returns {*} Returns the value to assign to the destination object.
 */
function assignDefaults(objectValue, sourceValue) {
  return typeof objectValue == 'undefined' ? sourceValue : objectValue;
}

/**
 * Assigns own enumerable properties of source object(s) to the destination
 * object for all destination properties that resolve to `undefined`. Once a
 * property is set, additional values of the same property are ignored.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * _.defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
 * // => { 'user': 'barney', 'age': 36 }
 */
var defaults = restParam(function(args) {
  var object = args[0];
  if (object == null) {
    return object;
  }
  args.push(assignDefaults);
  return assign.apply(undefined, args);
});

module.exports = defaults;

},{"lodash.assign":194,"lodash.restparam":140}],140:[function(require,module,exports){
arguments[4][43][0].apply(exports,arguments)
},{"dup":43}],141:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseToString = require('lodash._basetostring');

/** Used to match HTML entities and HTML characters. */
var reUnescapedHtml = /[&<>"'`]/g,
    reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

/** Used to map characters to HTML entities. */
var htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '`': '&#96;'
};

/**
 * Used by `_.escape` to convert characters to HTML entities.
 *
 * @private
 * @param {string} chr The matched character to escape.
 * @returns {string} Returns the escaped character.
 */
function escapeHtmlChar(chr) {
  return htmlEscapes[chr];
}

/**
 * Converts the characters "&", "<", ">", '"', "'", and '`', in `string` to
 * their corresponding HTML entities.
 *
 * **Note:** No other characters are escaped. To escape additional characters
 * use a third-party library like [_he_](https://mths.be/he).
 *
 * Though the ">" character is escaped for symmetry, characters like
 * ">" and "/" don't require escaping in HTML and have no special meaning
 * unless they're part of a tag or unquoted attribute value.
 * See [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
 * (under "semi-related fun fact") for more details.
 *
 * Backticks are escaped because in Internet Explorer < 9, they can break out
 * of attribute values or HTML comments. See [#102](https://html5sec.org/#102),
 * [#108](https://html5sec.org/#108), and [#133](https://html5sec.org/#133) of
 * the [HTML5 Security Cheatsheet](https://html5sec.org/) for more details.
 *
 * When working with HTML you should always quote attribute values to reduce
 * XSS vectors. See [Ryan Grove's article](http://wonko.com/post/html-escaping)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escape('fred, barney, & pebbles');
 * // => 'fred, barney, &amp; pebbles'
 */
function escape(string) {
  // Reset `lastIndex` because in IE < 9 `String#replace` does not.
  string = baseToString(string);
  return (string && reHasUnescapedHtml.test(string))
    ? string.replace(reUnescapedHtml, escapeHtmlChar)
    : string;
}

module.exports = escape;

},{"lodash._basetostring":142}],142:[function(require,module,exports){
arguments[4][61][0].apply(exports,arguments)
},{"dup":61}],143:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if `key` exists as a direct property of `object` instead of an
 * inherited property.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to inspect.
 * @param {string} key The key to check.
 * @returns {boolean} Returns `true` if `key` is a direct property, else `false`.
 * @example
 *
 * _.has({ 'a': 1, 'b': 2, 'c': 3 }, 'b');
 * // => true
 */
function has(object, key) {
  return object ? hasOwnProperty.call(object, key) : false;
}

module.exports = has;

},{}],144:[function(require,module,exports){
/**
 * lodash 3.1.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseIndexOf = require('lodash._baseindexof'),
    baseValues = require('lodash._basevalues'),
    isIterateeCall = require('lodash._isiterateecall'),
    isArray = require('lodash.isarray'),
    isString = require('lodash.isstring'),
    keys = require('lodash.keys');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is in `collection` using `SameValueZero` for equality
 * comparisons. If `fromIndex` is negative, it is used as the offset from
 * the end of `collection`.
 *
 * **Note:** [`SameValueZero`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
 * comparisons are like strict equality comparisons, e.g. `===`, except that
 * `NaN` matches `NaN`.
 *
 * @static
 * @memberOf _
 * @alias contains, include
 * @category Collection
 * @param {Array|Object|string} collection The collection to search.
 * @param {*} target The value to search for.
 * @param {number} [fromIndex=0] The index to search from.
 * @param- {Object} [guard] Enables use as a callback for functions like `_.reduce`.
 * @returns {boolean} Returns `true` if a matching element is found, else `false`.
 * @example
 *
 * _.includes([1, 2, 3], 1);
 * // => true
 *
 * _.includes([1, 2, 3], 1, 2);
 * // => false
 *
 * _.includes({ 'user': 'fred', 'age': 40 }, 'fred');
 * // => true
 *
 * _.includes('pebbles', 'eb');
 * // => true
 */
function includes(collection, target, fromIndex, guard) {
  var length = collection ? collection.length : 0;
  if (!isLength(length)) {
    collection = values(collection);
    length = collection.length;
  }
  if (!length) {
    return false;
  }
  if (typeof fromIndex != 'number' || (guard && isIterateeCall(target, fromIndex, guard))) {
    fromIndex = 0;
  } else {
    fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : (fromIndex || 0);
  }
  return (typeof collection == 'string' || !isArray(collection) && isString(collection))
    ? (fromIndex < length && collection.indexOf(target, fromIndex) > -1)
    : (baseIndexOf(collection, target, fromIndex) > -1);
}

/**
 * Creates an array of the own enumerable property values of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property values.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.values(new Foo);
 * // => [1, 2] (iteration order is not guaranteed)
 *
 * _.values('hi');
 * // => ['h', 'i']
 */
function values(object) {
  return baseValues(object, keys(object));
}

module.exports = includes;

},{"lodash._baseindexof":145,"lodash._basevalues":146,"lodash._isiterateecall":147,"lodash.isarray":148,"lodash.isstring":230,"lodash.keys":160}],145:[function(require,module,exports){
arguments[4][102][0].apply(exports,arguments)
},{"dup":102}],146:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * The base implementation of `_.values` and `_.valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * returned by `keysFunc`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */
function baseValues(object, props) {
  var index = -1,
      length = props.length,
      result = Array(length);

  while (++index < length) {
    result[index] = object[props[index]];
  }
  return result;
}

module.exports = baseValues;

},{}],147:[function(require,module,exports){
arguments[4][37][0].apply(exports,arguments)
},{"dup":37}],148:[function(require,module,exports){
arguments[4][48][0].apply(exports,arguments)
},{"dup":48}],149:[function(require,module,exports){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var dateTag = '[object Date]';

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Date` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isDate(new Date);
 * // => true
 *
 * _.isDate('Mon April 23 2012');
 * // => false
 */
function isDate(value) {
  return isObjectLike(value) && objToString.call(value) == dateTag;
}

module.exports = isDate;

},{}],150:[function(require,module,exports){
arguments[4][49][0].apply(exports,arguments)
},{"dup":49,"lodash.isarguments":151,"lodash.isarray":148,"lodash.isfunction":156,"lodash.isstring":230,"lodash.keys":160}],151:[function(require,module,exports){
arguments[4][50][0].apply(exports,arguments)
},{"dup":50}],152:[function(require,module,exports){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseIsEqual = require('lodash._baseisequal'),
    bindCallback = require('lodash._bindcallback');

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && (value === 0 ? ((1 / value) > 0) : !isObject(value));
}

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent. If `customizer` is provided it is invoked to compare values.
 * If `customizer` returns `undefined` comparisons are handled by the method
 * instead. The `customizer` is bound to `thisArg` and invoked with three
 * arguments: (value, other [, index|key]).
 *
 * **Note:** This method supports comparing arrays, booleans, `Date` objects,
 * numbers, `Object` objects, regexes, and strings. Objects are compared by
 * their own, not inherited, enumerable properties. Functions and DOM nodes
 * are **not** supported. Provide a customizer function to extend support
 * for comparing other values.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparing values.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'user': 'fred' };
 * var other = { 'user': 'fred' };
 *
 * object == other;
 * // => false
 *
 * _.isEqual(object, other);
 * // => true
 *
 * // using a customizer callback
 * var array = ['hello', 'goodbye'];
 * var other = ['hi', 'goodbye'];
 *
 * _.isEqual(array, other, function(value, other) {
 *   if (_.every([value, other], RegExp.prototype.test, /^h(?:i|ello)$/)) {
 *     return true;
 *   }
 * });
 * // => true
 */
function isEqual(value, other, customizer, thisArg) {
  customizer = typeof customizer == 'function' && bindCallback(customizer, thisArg, 3);
  if (!customizer && isStrictComparable(value) && isStrictComparable(other)) {
    return value === other;
  }
  var result = customizer ? customizer(value, other) : undefined;
  return typeof result == 'undefined' ? baseIsEqual(value, other, customizer) : !!result;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return type == 'function' || (!!value && type == 'object');
}

module.exports = isEqual;

},{"lodash._baseisequal":153,"lodash._bindcallback":155}],153:[function(require,module,exports){
arguments[4][112][0].apply(exports,arguments)
},{"dup":112,"lodash.isarray":148,"lodash.istypedarray":154,"lodash.keys":160}],154:[function(require,module,exports){
arguments[4][113][0].apply(exports,arguments)
},{"dup":113}],155:[function(require,module,exports){
arguments[4][36][0].apply(exports,arguments)
},{"dup":36}],156:[function(require,module,exports){
(function (global){
/**
 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reHostCtor = /^\[object .+?Constructor\]$/;

/**
 * Used to match `RegExp` [special characters](http://www.regular-expressions.info/characters.html#special).
 * In addition to special characters the forward slash is escaped to allow for
 * easier `eval` use and `Function` compilation.
 */
var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
    reHasRegExpChars = RegExp(reRegExpChars.source);

/**
 * The base implementation of `_.isFunction` without support for environments
 * with incorrect `typeof` results.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 */
function baseIsFunction(value) {
  // Avoid a Chakra JIT bug in compatibility modes of IE 11.
  // See https://github.com/jashkenas/underscore/issues/1621 for more details.
  return typeof value == 'function' || false;
}

/**
 * Converts `value` to a string if it is not one. An empty string is returned
 * for `null` or `undefined` values.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  if (typeof value == 'string') {
    return value;
  }
  return value == null ? '' : (value + '');
}

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reNative = RegExp('^' +
  escapeRegExp(objToString)
  .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Native method references. */
var Uint8Array = isNative(Uint8Array = global.Uint8Array) && Uint8Array;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
var isFunction = !(baseIsFunction(/x/) || (Uint8Array && !baseIsFunction(Uint8Array))) ? baseIsFunction : function(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return objToString.call(value) == funcTag;
};

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (objToString.call(value) == funcTag) {
    return reNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reHostCtor.test(value);
}

/**
 * Escapes the `RegExp` special characters "\", "/", "^", "$", ".", "|", "?",
 * "*", "+", "(", ")", "[", "]", "{" and "}" in `string`.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escapeRegExp('[lodash](https://lodash.com/)');
 * // => '\[lodash\]\(https:\/\/lodash\.com\/\)'
 */
function escapeRegExp(string) {
  string = baseToString(string);
  return (string && reHasRegExpChars.test(string))
    ? string.replace(reRegExpChars, '\\$&')
    : string;
}

module.exports = isFunction;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],157:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Checks if `value` is `null`.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
 * @example
 *
 * _.isNull(null);
 * // => true
 *
 * _.isNull(void 0);
 * // => false
 */
function isNull(value) {
  return value === null;
}

module.exports = isNull;

},{}],158:[function(require,module,exports){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return type == 'function' || (!!value && type == 'object');
}

module.exports = isObject;

},{}],159:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Checks if `value` is `undefined`.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
 * @example
 *
 * _.isUndefined(void 0);
 * // => true
 *
 * _.isUndefined(null);
 * // => false
 */
function isUndefined(value) {
  return typeof value == 'undefined';
}

module.exports = isUndefined;

},{}],160:[function(require,module,exports){
arguments[4][54][0].apply(exports,arguments)
},{"dup":54,"lodash.isarguments":161,"lodash.isarray":148,"lodash.isnative":162}],161:[function(require,module,exports){
arguments[4][50][0].apply(exports,arguments)
},{"dup":50}],162:[function(require,module,exports){
arguments[4][57][0].apply(exports,arguments)
},{"dup":57}],163:[function(require,module,exports){
/**
 * lodash 3.1.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var arrayMap = require('lodash._arraymap'),
    baseDifference = require('lodash._basedifference'),
    baseFlatten = require('lodash._baseflatten'),
    bindCallback = require('lodash._bindcallback'),
    pickByArray = require('lodash._pickbyarray'),
    pickByCallback = require('lodash._pickbycallback'),
    keysIn = require('lodash.keysin'),
    restParam = require('lodash.restparam');

/**
 * The opposite of `_.pick`; this method creates an object composed of the
 * own and inherited enumerable properties of `object` that are not omitted.
 * Property names may be specified as individual arguments or as arrays of
 * property names. If `predicate` is provided it is invoked for each property
 * of `object` omitting the properties `predicate` returns truthy for. The
 * predicate is bound to `thisArg` and invoked with three arguments:
 * (value, key, object).
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {Function|...(string|string[])} [predicate] The function invoked per
 *  iteration or property names to omit, specified as individual property
 *  names or arrays of property names.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'user': 'fred', 'age': 40 };
 *
 * _.omit(object, 'age');
 * // => { 'user': 'fred' }
 *
 * _.omit(object, _.isNumber);
 * // => { 'user': 'fred' }
 */
var omit = restParam(function(object, props) {
  if (object == null) {
    return {};
  }
  if (typeof props[0] != 'function') {
    var props = arrayMap(baseFlatten(props), String);
    return pickByArray(object, baseDifference(keysIn(object), props));
  }
  var predicate = bindCallback(props[0], props[1], 3);
  return pickByCallback(object, function(value, key, object) {
    return !predicate(value, key, object);
  });
});

module.exports = omit;

},{"lodash._arraymap":164,"lodash._basedifference":165,"lodash._baseflatten":170,"lodash._bindcallback":172,"lodash._pickbyarray":173,"lodash._pickbycallback":174,"lodash.keysin":176,"lodash.restparam":178}],164:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * A specialized version of `_.map` for arrays without support for callback
 * shorthands or `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;

},{}],165:[function(require,module,exports){
arguments[4][101][0].apply(exports,arguments)
},{"dup":101,"lodash._baseindexof":166,"lodash._cacheindexof":167,"lodash._createcache":168}],166:[function(require,module,exports){
arguments[4][102][0].apply(exports,arguments)
},{"dup":102}],167:[function(require,module,exports){
arguments[4][103][0].apply(exports,arguments)
},{"dup":103}],168:[function(require,module,exports){
(function (global){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var isNative = require('lodash.isnative');

/** Native method references. */
var Set = isNative(Set = global.Set) && Set;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeCreate = isNative(nativeCreate = Object.create) && nativeCreate;

/**
 *
 * Creates a cache object to store unique values.
 *
 * @private
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var length = values ? values.length : 0;

  this.data = { 'hash': nativeCreate(null), 'set': new Set };
  while (length--) {
    this.push(values[length]);
  }
}

/**
 * Adds `value` to the cache.
 *
 * @private
 * @name push
 * @memberOf SetCache
 * @param {*} value The value to cache.
 */
function cachePush(value) {
  var data = this.data;
  if (typeof value == 'string' || isObject(value)) {
    data.set.add(value);
  } else {
    data.hash[value] = true;
  }
}

/**
 * Creates a `Set` cache object to optimize linear searches of large arrays.
 *
 * @private
 * @param {Array} [values] The values to cache.
 * @returns {null|Object} Returns the new cache object if `Set` is supported, else `null`.
 */
var createCache = !(nativeCreate && Set) ? constant(null) : function(values) {
  return new SetCache(values);
};

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return type == 'function' || (!!value && type == 'object');
}

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var object = { 'user': 'fred' };
 * var getter = _.constant(object);
 *
 * getter() === object;
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

// Add functions to the `Set` cache.
SetCache.prototype.push = cachePush;

module.exports = createCache;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"lodash.isnative":169}],169:[function(require,module,exports){
arguments[4][57][0].apply(exports,arguments)
},{"dup":57}],170:[function(require,module,exports){
arguments[4][106][0].apply(exports,arguments)
},{"dup":106,"lodash.isarguments":171,"lodash.isarray":148}],171:[function(require,module,exports){
arguments[4][50][0].apply(exports,arguments)
},{"dup":50}],172:[function(require,module,exports){
arguments[4][36][0].apply(exports,arguments)
},{"dup":36}],173:[function(require,module,exports){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * A specialized version of `_.pick` that picks `object` properties specified
 * by the `props` array.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} props The property names to pick.
 * @returns {Object} Returns the new object.
 */
function pickByArray(object, props) {
  object = toObject(object);

  var index = -1,
      length = props.length,
      result = {};

  while (++index < length) {
    var key = props[index];
    if (key in object) {
      result[key] = object[key];
    }
  }
  return result;
}

/**
 * Converts `value` to an object if it is not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Object} Returns the object.
 */
function toObject(value) {
  return isObject(value) ? value : Object(value);
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return type == 'function' || (!!value && type == 'object');
}

module.exports = pickByArray;

},{}],174:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseFor = require('lodash._basefor'),
    keysIn = require('lodash.keysin');

/**
 * The base implementation of `_.forIn` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForIn(object, iteratee) {
  return baseFor(object, iteratee, keysIn);
}

/**
 * A specialized version of `_.pick` that picks `object` properties `predicate`
 * returns truthy for.
 *
 * @private
 * @param {Object} object The source object.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Object} Returns the new object.
 */
function pickByCallback(object, predicate) {
  var result = {};
  baseForIn(object, function(value, key, object) {
    if (predicate(value, key, object)) {
      result[key] = value;
    }
  });
  return result;
}

module.exports = pickByCallback;

},{"lodash._basefor":175,"lodash.keysin":176}],175:[function(require,module,exports){
arguments[4][135][0].apply(exports,arguments)
},{"dup":135}],176:[function(require,module,exports){
/**
 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var isArguments = require('lodash.isarguments'),
    isArray = require('lodash.isarray');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Native method references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * An object environment feature flags.
 *
 * @static
 * @memberOf _
 * @type Object
 */
var support = {};

(function(x) {

  /**
   * Detect if `arguments` object indexes are non-enumerable.
   *
   * In Firefox < 4, IE < 9, PhantomJS, and Safari < 5.1 `arguments` object
   * indexes are non-enumerable. Chrome < 25 and Node.js < 0.11.0 treat
   * `arguments` object indexes as non-enumerable and fail `hasOwnProperty`
   * checks for indexes that exceed their function's formal parameters with
   * associated values of `0`.
   *
   * @memberOf _.support
   * @type boolean
   */
  try {
    support.nonEnumArgs = !propertyIsEnumerable.call(arguments, 1);
  } catch(e) {
    support.nonEnumArgs = true;
  }
}(0, 0));

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = +value;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return type == 'function' || (!!value && type == 'object');
}

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  if (object == null) {
    return [];
  }
  if (!isObject(object)) {
    object = Object(object);
  }
  var length = object.length;
  length = (length && isLength(length) &&
    (isArray(object) || (support.nonEnumArgs && isArguments(object))) && length) || 0;

  var Ctor = object.constructor,
      index = -1,
      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
      result = Array(length),
      skipIndexes = length > 0;

  while (++index < length) {
    result[index] = (index + '');
  }
  for (var key in object) {
    if (!(skipIndexes && isIndex(key, length)) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keysIn;

},{"lodash.isarguments":177,"lodash.isarray":148}],177:[function(require,module,exports){
arguments[4][50][0].apply(exports,arguments)
},{"dup":50}],178:[function(require,module,exports){
arguments[4][43][0].apply(exports,arguments)
},{"dup":43}],179:[function(require,module,exports){
/**
 * lodash 3.1.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseFlatten = require('lodash._baseflatten'),
    baseUniq = require('lodash._baseuniq'),
    restParam = require('lodash.restparam');

/**
 * Creates an array of unique values, in order, of the provided arrays using
 * `SameValueZero` for equality comparisons.
 *
 * **Note:** [`SameValueZero`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
 * comparisons are like strict equality comparisons, e.g. `===`, except that
 * `NaN` matches `NaN`.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of combined values.
 * @example
 *
 * _.union([1, 2], [4, 2], [2, 1]);
 * // => [1, 2, 4]
 */
var union = restParam(function(arrays) {
  return baseUniq(baseFlatten(arrays, false, true));
});

module.exports = union;

},{"lodash._baseflatten":180,"lodash._baseuniq":182,"lodash.restparam":187}],180:[function(require,module,exports){
arguments[4][106][0].apply(exports,arguments)
},{"dup":106,"lodash.isarguments":181,"lodash.isarray":148}],181:[function(require,module,exports){
arguments[4][50][0].apply(exports,arguments)
},{"dup":50}],182:[function(require,module,exports){
/**
 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseIndexOf = require('lodash._baseindexof'),
    cacheIndexOf = require('lodash._cacheindexof'),
    createCache = require('lodash._createcache');

/**
 * The base implementation of `_.uniq` without support for callback shorthands
 * and `this` binding.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The function invoked per iteration.
 * @returns {Array} Returns the new duplicate-value-free array.
 */
function baseUniq(array, iteratee) {
  var index = -1,
      indexOf = baseIndexOf,
      length = array.length,
      isCommon = true,
      isLarge = isCommon && length >= 200,
      seen = isLarge ? createCache() : null,
      result = [];

  if (seen) {
    indexOf = cacheIndexOf;
    isCommon = false;
  } else {
    isLarge = false;
    seen = iteratee ? [] : result;
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value, index, array) : value;

    if (isCommon && value === value) {
      var seenIndex = seen.length;
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }
      if (iteratee) {
        seen.push(computed);
      }
      result.push(value);
    }
    else if (indexOf(seen, computed, 0) < 0) {
      if (iteratee || isLarge) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

module.exports = baseUniq;

},{"lodash._baseindexof":183,"lodash._cacheindexof":184,"lodash._createcache":185}],183:[function(require,module,exports){
arguments[4][102][0].apply(exports,arguments)
},{"dup":102}],184:[function(require,module,exports){
arguments[4][103][0].apply(exports,arguments)
},{"dup":103}],185:[function(require,module,exports){
(function (global){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var isNative = require('lodash.isnative');

/** Native method references. */
var Set = isNative(Set = global.Set) && Set;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeCreate = isNative(nativeCreate = Object.create) && nativeCreate;

/**
 *
 * Creates a cache object to store unique values.
 *
 * @private
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var length = values ? values.length : 0;

  this.data = { 'hash': nativeCreate(null), 'set': new Set };
  while (length--) {
    this.push(values[length]);
  }
}

/**
 * Adds `value` to the cache.
 *
 * @private
 * @name push
 * @memberOf SetCache
 * @param {*} value The value to cache.
 */
function cachePush(value) {
  var data = this.data;
  if (typeof value == 'string' || isObject(value)) {
    data.set.add(value);
  } else {
    data.hash[value] = true;
  }
}

/**
 * Creates a `Set` cache object to optimize linear searches of large arrays.
 *
 * @private
 * @param {Array} [values] The values to cache.
 * @returns {null|Object} Returns the new cache object if `Set` is supported, else `null`.
 */
var createCache = !(nativeCreate && Set) ? constant(null) : function(values) {
  return new SetCache(values);
};

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return type == 'function' || (!!value && type == 'object');
}

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var object = { 'user': 'fred' };
 * var getter = _.constant(object);
 *
 * getter() === object;
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

// Add functions to the `Set` cache.
SetCache.prototype.push = cachePush;

module.exports = createCache;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"lodash.isnative":186}],186:[function(require,module,exports){
arguments[4][57][0].apply(exports,arguments)
},{"dup":57}],187:[function(require,module,exports){
arguments[4][43][0].apply(exports,arguments)
},{"dup":43}],188:[function(require,module,exports){

/**
 * Module dependencies.
 */

var events = require('component-event');
var delegate = require('delegate-events');
var forceCaptureEvents = ['focus', 'blur'];

/**
 * Expose `Events`.
 */

module.exports = Events;

/**
 * Initialize an `Events` with the given
 * `el` object which events will be bound to,
 * and the `obj` which will receive method calls.
 *
 * @param {Object} el
 * @param {Object} obj
 * @api public
 */

function Events(el, obj) {
  if (!(this instanceof Events)) return new Events(el, obj);
  if (!el) throw new Error('element required');
  if (!obj) throw new Error('object required');
  this.el = el;
  this.obj = obj;
  this._events = {};
}

/**
 * Subscription helper.
 */

Events.prototype.sub = function(event, method, cb){
  this._events[event] = this._events[event] || {};
  this._events[event][method] = cb;
};

/**
 * Bind to `event` with optional `method` name.
 * When `method` is undefined it becomes `event`
 * with the "on" prefix.
 *
 * Examples:
 *
 *  Direct event handling:
 *
 *    events.bind('click') // implies "onclick"
 *    events.bind('click', 'remove')
 *    events.bind('click', 'sort', 'asc')
 *
 *  Delegated event handling:
 *
 *    events.bind('click li > a')
 *    events.bind('click li > a', 'remove')
 *    events.bind('click a.sort-ascending', 'sort', 'asc')
 *    events.bind('click a.sort-descending', 'sort', 'desc')
 *
 * @param {String} event
 * @param {String|function} [method]
 * @return {Function} callback
 * @api public
 */

Events.prototype.bind = function(event, method){
  var e = parse(event);
  var el = this.el;
  var obj = this.obj;
  var name = e.name;
  var method = method || 'on' + name;
  var args = [].slice.call(arguments, 2);

  // callback
  function cb(){
    var a = [].slice.call(arguments).concat(args);

    if (typeof method === 'function') {
        method.apply(obj, a);    
        return;
    }
    
    if (!obj[method]) {
        throw new Error(method + ' method is not defined');
    } else {
        obj[method].apply(obj, a);
    }
  }

  // bind
  if (e.selector) {
    cb = delegate.bind(el, e.selector, name, cb);
  } else {
    events.bind(el, name, cb);
  }

  // subscription for unbinding
  this.sub(name, method, cb);

  return cb;
};

/**
 * Unbind a single binding, all bindings for `event`,
 * or all bindings within the manager.
 *
 * Examples:
 *
 *  Unbind direct handlers:
 *
 *     events.unbind('click', 'remove')
 *     events.unbind('click')
 *     events.unbind()
 *
 * Unbind delegate handlers:
 *
 *     events.unbind('click', 'remove')
 *     events.unbind('click')
 *     events.unbind()
 *
 * @param {String|Function} [event]
 * @param {String|Function} [method]
 * @api public
 */

Events.prototype.unbind = function(event, method){
  if (0 == arguments.length) return this.unbindAll();
  if (1 == arguments.length) return this.unbindAllOf(event);

  // no bindings for this event
  var bindings = this._events[event];
  var capture = (forceCaptureEvents.indexOf(event) !== -1);
  if (!bindings) return;

  // no bindings for this method
  var cb = bindings[method];
  if (!cb) return;

  events.unbind(this.el, event, cb, capture);
};

/**
 * Unbind all events.
 *
 * @api private
 */

Events.prototype.unbindAll = function(){
  for (var event in this._events) {
    this.unbindAllOf(event);
  }
};

/**
 * Unbind all events for `event`.
 *
 * @param {String} event
 * @api private
 */

Events.prototype.unbindAllOf = function(event){
  var bindings = this._events[event];
  if (!bindings) return;

  for (var method in bindings) {
    this.unbind(event, method);
  }
};

/**
 * Parse `event`.
 *
 * @param {String} event
 * @return {Object}
 * @api private
 */

function parse(event) {
  var parts = event.split(/ +/);
  return {
    name: parts.shift(),
    selector: parts.join(' ')
  }
}

},{"component-event":189,"delegate-events":190}],189:[function(require,module,exports){
var bind = window.addEventListener ? 'addEventListener' : 'attachEvent',
    unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent',
    prefix = bind !== 'addEventListener' ? 'on' : '';

/**
 * Bind `el` event `type` to `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.bind = function(el, type, fn, capture){
  el[bind](prefix + type, fn, capture || false);
  return fn;
};

/**
 * Unbind `el` event `type`'s callback `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.unbind = function(el, type, fn, capture){
  el[unbind](prefix + type, fn, capture || false);
  return fn;
};
},{}],190:[function(require,module,exports){
/**
 * Module dependencies.
 */

var closest = require('closest')
  , event = require('event');

/**
 * Delegate event `type` to `selector`
 * and invoke `fn(e)`. A callback function
 * is returned which may be passed to `.unbind()`.
 *
 * @param {Element} el
 * @param {String} selector
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

// Some events don't bubble, so we want to bind to the capture phase instead
// when delegating.
var forceCaptureEvents = ['focus', 'blur'];

exports.bind = function(el, selector, type, fn, capture){
  if (forceCaptureEvents.indexOf(type) !== -1) capture = true;

  return event.bind(el, type, function(e){
    var target = e.target || e.srcElement;
    e.delegateTarget = closest(target, selector, true, el);
    if (e.delegateTarget) fn.call(el, e);
  }, capture);
};

/**
 * Unbind event `type`'s callback `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @api public
 */

exports.unbind = function(el, type, fn, capture){
  if (forceCaptureEvents.indexOf(type) !== -1) capture = true;

  event.unbind(el, type, fn, capture);
};

},{"closest":191,"event":189}],191:[function(require,module,exports){
var matches = require('matches-selector')

module.exports = function (element, selector, checkYoSelf) {
  var parent = checkYoSelf ? element : element.parentNode

  while (parent && parent !== document) {
    if (matches(parent, selector)) return parent;
    parent = parent.parentNode
  }
}

},{"matches-selector":192}],192:[function(require,module,exports){

/**
 * Element prototype.
 */

var proto = Element.prototype;

/**
 * Vendor function.
 */

var vendor = proto.matchesSelector
  || proto.webkitMatchesSelector
  || proto.mozMatchesSelector
  || proto.msMatchesSelector
  || proto.oMatchesSelector;

/**
 * Expose `match()`.
 */

module.exports = match;

/**
 * Match `el` to `selector`.
 *
 * @param {Element} el
 * @param {String} selector
 * @return {Boolean}
 * @api public
 */

function match(el, selector) {
  if (vendor) return vendor.call(el, selector);
  var nodes = el.parentNode.querySelectorAll(selector);
  for (var i = 0; i < nodes.length; ++i) {
    if (nodes[i] == el) return true;
  }
  return false;
}
},{}],193:[function(require,module,exports){
module.exports = get;

function get (context, path) {
  if (path.indexOf('.') == -1 && path.indexOf('[') == -1) {
    return context[path];
  }

  var crumbs = path.split(/\.|\[|\]/g);
  var i = -1;
  var len = crumbs.length;
  var result;

  while (++i < len) {
    if (i == 0) result = context;
    if (!crumbs[i]) continue;
    if (result == undefined) break;
    result = result[crumbs[i]];
  }

  return result;
}

},{}],194:[function(require,module,exports){
arguments[4][32][0].apply(exports,arguments)
},{"dup":32,"lodash._baseassign":195,"lodash._createassigner":201}],195:[function(require,module,exports){
arguments[4][33][0].apply(exports,arguments)
},{"dup":33,"lodash._basecopy":196,"lodash.keys":197}],196:[function(require,module,exports){
arguments[4][34][0].apply(exports,arguments)
},{"dup":34}],197:[function(require,module,exports){
arguments[4][54][0].apply(exports,arguments)
},{"dup":54,"lodash.isarguments":198,"lodash.isarray":199,"lodash.isnative":200}],198:[function(require,module,exports){
arguments[4][50][0].apply(exports,arguments)
},{"dup":50}],199:[function(require,module,exports){
arguments[4][48][0].apply(exports,arguments)
},{"dup":48}],200:[function(require,module,exports){
arguments[4][57][0].apply(exports,arguments)
},{"dup":57}],201:[function(require,module,exports){
arguments[4][35][0].apply(exports,arguments)
},{"dup":35,"lodash._bindcallback":202,"lodash._isiterateecall":203}],202:[function(require,module,exports){
arguments[4][36][0].apply(exports,arguments)
},{"dup":36}],203:[function(require,module,exports){
arguments[4][37][0].apply(exports,arguments)
},{"dup":37}],204:[function(require,module,exports){
arguments[4][38][0].apply(exports,arguments)
},{"dup":38,"lodash._createwrapper":205,"lodash._replaceholders":208,"lodash.restparam":209}],205:[function(require,module,exports){
(function (global){
/**
 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var arrayCopy = require('lodash._arraycopy'),
    baseCreate = require('lodash._basecreate'),
    replaceHolders = require('lodash._replaceholders');

/** Used to compose bitmasks for wrapper metadata. */
var BIND_FLAG = 1,
    BIND_KEY_FLAG = 2,
    CURRY_BOUND_FLAG = 4,
    CURRY_FLAG = 8,
    CURRY_RIGHT_FLAG = 16,
    PARTIAL_FLAG = 32,
    PARTIAL_RIGHT_FLAG = 64,
    ARY_FLAG = 128;

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * Creates an array that is the composition of partially applied arguments,
 * placeholders, and provided arguments into a single array of arguments.
 *
 * @private
 * @param {Array|Object} args The provided arguments.
 * @param {Array} partials The arguments to prepend to those provided.
 * @param {Array} holders The `partials` placeholder indexes.
 * @returns {Array} Returns the new array of composed arguments.
 */
function composeArgs(args, partials, holders) {
  var holdersLength = holders.length,
      argsIndex = -1,
      argsLength = nativeMax(args.length - holdersLength, 0),
      leftIndex = -1,
      leftLength = partials.length,
      result = Array(argsLength + leftLength);

  while (++leftIndex < leftLength) {
    result[leftIndex] = partials[leftIndex];
  }
  while (++argsIndex < holdersLength) {
    result[holders[argsIndex]] = args[argsIndex];
  }
  while (argsLength--) {
    result[leftIndex++] = args[argsIndex++];
  }
  return result;
}

/**
 * This function is like `composeArgs` except that the arguments composition
 * is tailored for `_.partialRight`.
 *
 * @private
 * @param {Array|Object} args The provided arguments.
 * @param {Array} partials The arguments to append to those provided.
 * @param {Array} holders The `partials` placeholder indexes.
 * @returns {Array} Returns the new array of composed arguments.
 */
function composeArgsRight(args, partials, holders) {
  var holdersIndex = -1,
      holdersLength = holders.length,
      argsIndex = -1,
      argsLength = nativeMax(args.length - holdersLength, 0),
      rightIndex = -1,
      rightLength = partials.length,
      result = Array(argsLength + rightLength);

  while (++argsIndex < argsLength) {
    result[argsIndex] = args[argsIndex];
  }
  var pad = argsIndex;
  while (++rightIndex < rightLength) {
    result[pad + rightIndex] = partials[rightIndex];
  }
  while (++holdersIndex < holdersLength) {
    result[pad + holders[holdersIndex]] = args[argsIndex++];
  }
  return result;
}

/**
 * Creates a function that wraps `func` and invokes it with the `this`
 * binding of `thisArg`.
 *
 * @private
 * @param {Function} func The function to bind.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @returns {Function} Returns the new bound function.
 */
function createBindWrapper(func, thisArg) {
  var Ctor = createCtorWrapper(func);

  function wrapper() {
    var fn = (this && this !== global && this instanceof wrapper) ? Ctor : func;
    return fn.apply(thisArg, arguments);
  }
  return wrapper;
}

/**
 * Creates a function that produces an instance of `Ctor` regardless of
 * whether it was invoked as part of a `new` expression or by `call` or `apply`.
 *
 * @private
 * @param {Function} Ctor The constructor to wrap.
 * @returns {Function} Returns the new wrapped function.
 */
function createCtorWrapper(Ctor) {
  return function() {
    var thisBinding = baseCreate(Ctor.prototype),
        result = Ctor.apply(thisBinding, arguments);

    // Mimic the constructor's `return` behavior.
    // See https://es5.github.io/#x13.2.2 for more details.
    return isObject(result) ? result : thisBinding;
  };
}

/**
 * Creates a function that wraps `func` and invokes it with optional `this`
 * binding of, partial application, and currying.
 *
 * @private
 * @param {Function|string} func The function or method name to reference.
 * @param {number} bitmask The bitmask of flags. See `createWrapper` for more details.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to prepend to those provided to the new function.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [partialsRight] The arguments to append to those provided to the new function.
 * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createHybridWrapper(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
  var isAry = bitmask & ARY_FLAG,
      isBind = bitmask & BIND_FLAG,
      isBindKey = bitmask & BIND_KEY_FLAG,
      isCurry = bitmask & CURRY_FLAG,
      isCurryBound = bitmask & CURRY_BOUND_FLAG,
      isCurryRight = bitmask & CURRY_RIGHT_FLAG;

  var Ctor = !isBindKey && createCtorWrapper(func),
      key = func;

  function wrapper() {
    // Avoid `arguments` object use disqualifying optimizations by
    // converting it to an array before providing it to other functions.
    var length = arguments.length,
        index = length,
        args = Array(length);

    while (index--) {
      args[index] = arguments[index];
    }
    if (partials) {
      args = composeArgs(args, partials, holders);
    }
    if (partialsRight) {
      args = composeArgsRight(args, partialsRight, holdersRight);
    }
    if (isCurry || isCurryRight) {
      var placeholder = wrapper.placeholder,
          argsHolders = replaceHolders(args, placeholder);

      length -= argsHolders.length;
      if (length < arity) {
        var newArgPos = argPos ? arrayCopy(argPos) : null,
            newArity = nativeMax(arity - length, 0),
            newsHolders = isCurry ? argsHolders : null,
            newHoldersRight = isCurry ? null : argsHolders,
            newPartials = isCurry ? args : null,
            newPartialsRight = isCurry ? null : args;

        bitmask |= (isCurry ? PARTIAL_FLAG : PARTIAL_RIGHT_FLAG);
        bitmask &= ~(isCurry ? PARTIAL_RIGHT_FLAG : PARTIAL_FLAG);

        if (!isCurryBound) {
          bitmask &= ~(BIND_FLAG | BIND_KEY_FLAG);
        }
        var result = createHybridWrapper(func, bitmask, thisArg, newPartials, newsHolders, newPartialsRight, newHoldersRight, newArgPos, ary, newArity);

        result.placeholder = placeholder;
        return result;
      }
    }
    var thisBinding = isBind ? thisArg : this;
    if (isBindKey) {
      func = thisBinding[key];
    }
    if (argPos) {
      args = reorder(args, argPos);
    }
    if (isAry && ary < args.length) {
      args.length = ary;
    }
    var fn = (this && this !== global && this instanceof wrapper) ? (Ctor || createCtorWrapper(func)) : func;
    return fn.apply(thisBinding, args);
  }
  return wrapper;
}

/**
 * Creates a function that wraps `func` and invokes it with the optional `this`
 * binding of `thisArg` and the `partials` prepended to those provided to
 * the wrapper.
 *
 * @private
 * @param {Function} func The function to partially apply arguments to.
 * @param {number} bitmask The bitmask of flags. See `createWrapper` for more details.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} partials The arguments to prepend to those provided to the new function.
 * @returns {Function} Returns the new bound function.
 */
function createPartialWrapper(func, bitmask, thisArg, partials) {
  var isBind = bitmask & BIND_FLAG,
      Ctor = createCtorWrapper(func);

  function wrapper() {
    // Avoid `arguments` object use disqualifying optimizations by
    // converting it to an array before providing it `func`.
    var argsIndex = -1,
        argsLength = arguments.length,
        leftIndex = -1,
        leftLength = partials.length,
        args = Array(argsLength + leftLength);

    while (++leftIndex < leftLength) {
      args[leftIndex] = partials[leftIndex];
    }
    while (argsLength--) {
      args[leftIndex++] = arguments[++argsIndex];
    }
    var fn = (this && this !== global && this instanceof wrapper) ? Ctor : func;
    return fn.apply(isBind ? thisArg : this, args);
  }
  return wrapper;
}

/**
 * Creates a function that either curries or invokes `func` with optional
 * `this` binding and partially applied arguments.
 *
 * @private
 * @param {Function|string} func The function or method name to reference.
 * @param {number} bitmask The bitmask of flags.
 *  The bitmask may be composed of the following flags:
 *     1 - `_.bind`
 *     2 - `_.bindKey`
 *     4 - `_.curry` or `_.curryRight` of a bound function
 *     8 - `_.curry`
 *    16 - `_.curryRight`
 *    32 - `_.partial`
 *    64 - `_.partialRight`
 *   128 - `_.rearg`
 *   256 - `_.ary`
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to be partially applied.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createWrapper(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
  var isBindKey = bitmask & BIND_KEY_FLAG;
  if (!isBindKey && typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var length = partials ? partials.length : 0;
  if (!length) {
    bitmask &= ~(PARTIAL_FLAG | PARTIAL_RIGHT_FLAG);
    partials = holders = null;
  }
  length -= (holders ? holders.length : 0);
  if (bitmask & PARTIAL_RIGHT_FLAG) {
    var partialsRight = partials,
        holdersRight = holders;

    partials = holders = null;
  }
  var newData = [func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity];

  newData[9] = arity == null
    ? (isBindKey ? 0 : func.length)
    : (nativeMax(arity - length, 0) || 0);

  if (bitmask == BIND_FLAG) {
    var result = createBindWrapper(newData[0], newData[2]);
  } else if ((bitmask == PARTIAL_FLAG || bitmask == (BIND_FLAG | PARTIAL_FLAG)) && !newData[4].length) {
    result = createPartialWrapper.apply(undefined, newData);
  } else {
    result = createHybridWrapper.apply(undefined, newData);
  }
  return result;
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = +value;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

/**
 * Reorder `array` according to the specified indexes where the element at
 * the first index is assigned as the first element, the element at
 * the second index is assigned as the second element, and so on.
 *
 * @private
 * @param {Array} array The array to reorder.
 * @param {Array} indexes The arranged array indexes.
 * @returns {Array} Returns `array`.
 */
function reorder(array, indexes) {
  var arrLength = array.length,
      length = nativeMin(indexes.length, arrLength),
      oldArray = arrayCopy(array);

  while (length--) {
    var index = indexes[length];
    array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
  }
  return array;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return type == 'function' || (!!value && type == 'object');
}

module.exports = createWrapper;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"lodash._arraycopy":206,"lodash._basecreate":207,"lodash._replaceholders":208}],206:[function(require,module,exports){
arguments[4][40][0].apply(exports,arguments)
},{"dup":40}],207:[function(require,module,exports){
(function (global){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} prototype The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function Object() {}
  return function(prototype) {
    if (isObject(prototype)) {
      Object.prototype = prototype;
      var result = new Object;
      Object.prototype = null;
    }
    return result || global.Object();
  };
}());

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return type == 'function' || (!!value && type == 'object');
}

module.exports = baseCreate;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],208:[function(require,module,exports){
arguments[4][42][0].apply(exports,arguments)
},{"dup":42}],209:[function(require,module,exports){
arguments[4][43][0].apply(exports,arguments)
},{"dup":43}],210:[function(require,module,exports){
/**
 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseFlatten = require('lodash._baseflatten'),
    isIterateeCall = require('lodash._isiterateecall');

/**
 * Flattens a nested array. If `isDeep` is `true` the array is recursively
 * flattened, otherwise it is only flattened a single level.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to flatten.
 * @param {boolean} [isDeep] Specify a deep flatten.
 * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flatten([1, [2, 3, [4]]]);
 * // => [1, 2, 3, [4]]
 *
 * // using `isDeep`
 * _.flatten([1, [2, 3, [4]]], true);
 * // => [1, 2, 3, 4]
 */
function flatten(array, isDeep, guard) {
  var length = array ? array.length : 0;
  if (guard && isIterateeCall(array, isDeep, guard)) {
    isDeep = false;
  }
  return length ? baseFlatten(array, isDeep) : [];
}

module.exports = flatten;

},{"lodash._baseflatten":211,"lodash._isiterateecall":214}],211:[function(require,module,exports){
arguments[4][106][0].apply(exports,arguments)
},{"dup":106,"lodash.isarguments":212,"lodash.isarray":213}],212:[function(require,module,exports){
arguments[4][50][0].apply(exports,arguments)
},{"dup":50}],213:[function(require,module,exports){
arguments[4][48][0].apply(exports,arguments)
},{"dup":48}],214:[function(require,module,exports){
arguments[4][37][0].apply(exports,arguments)
},{"dup":37}],215:[function(require,module,exports){
arguments[4][44][0].apply(exports,arguments)
},{"dup":44,"lodash._arrayeach":216,"lodash._baseeach":217,"lodash._bindcallback":221,"lodash.isarray":222}],216:[function(require,module,exports){
arguments[4][45][0].apply(exports,arguments)
},{"dup":45}],217:[function(require,module,exports){
arguments[4][46][0].apply(exports,arguments)
},{"dup":46,"lodash.keys":218}],218:[function(require,module,exports){
arguments[4][54][0].apply(exports,arguments)
},{"dup":54,"lodash.isarguments":219,"lodash.isarray":222,"lodash.isnative":220}],219:[function(require,module,exports){
arguments[4][50][0].apply(exports,arguments)
},{"dup":50}],220:[function(require,module,exports){
arguments[4][57][0].apply(exports,arguments)
},{"dup":57}],221:[function(require,module,exports){
arguments[4][36][0].apply(exports,arguments)
},{"dup":36}],222:[function(require,module,exports){
arguments[4][48][0].apply(exports,arguments)
},{"dup":48}],223:[function(require,module,exports){
/**
 * lodash 3.1.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseEach = require('lodash._baseeach'),
    restParam = require('lodash.restparam');

/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Invokes the method named by `methodName` on each element in `collection`,
 * returning an array of the results of each invoked method. Any additional
 * arguments are provided to each invoked method. If `methodName` is a function
 * it is invoked for, and `this` bound to, each element in `collection`.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|string} methodName The name of the method to invoke or
 *  the function invoked per iteration.
 * @param {...*} [args] The arguments to invoke the method with.
 * @returns {Array} Returns the array of results.
 * @example
 *
 * _.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
 * // => [[1, 5, 7], [1, 2, 3]]
 *
 * _.invoke([123, 456], String.prototype.split, '');
 * // => [['1', '2', '3'], ['4', '5', '6']]
 */
var invoke = restParam(function(collection, methodName, args) {
  var index = -1,
      isFunc = typeof methodName == 'function',
      length = collection ? collection.length : 0,
      result = isLength(length) ? Array(length) : [];

  baseEach(collection, function(value) {
    var func = isFunc ? methodName : (value != null && value[methodName]);
    result[++index] = func ? func.apply(value, args) : undefined;
  });
  return result;
});

module.exports = invoke;

},{"lodash._baseeach":224,"lodash.restparam":229}],224:[function(require,module,exports){
arguments[4][46][0].apply(exports,arguments)
},{"dup":46,"lodash.keys":225}],225:[function(require,module,exports){
arguments[4][54][0].apply(exports,arguments)
},{"dup":54,"lodash.isarguments":226,"lodash.isarray":227,"lodash.isnative":228}],226:[function(require,module,exports){
arguments[4][50][0].apply(exports,arguments)
},{"dup":50}],227:[function(require,module,exports){
arguments[4][48][0].apply(exports,arguments)
},{"dup":48}],228:[function(require,module,exports){
arguments[4][57][0].apply(exports,arguments)
},{"dup":57}],229:[function(require,module,exports){
arguments[4][43][0].apply(exports,arguments)
},{"dup":43}],230:[function(require,module,exports){
arguments[4][53][0].apply(exports,arguments)
},{"dup":53}],231:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */
function last(array) {
  var length = array ? array.length : 0;
  return length ? array[length - 1] : undefined;
}

module.exports = last;

},{}],232:[function(require,module,exports){
/**
 * lodash 3.1.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseFlatten = require('lodash._baseflatten'),
    bindCallback = require('lodash._bindcallback'),
    pickByArray = require('lodash._pickbyarray'),
    pickByCallback = require('lodash._pickbycallback'),
    restParam = require('lodash.restparam');

/**
 * Creates an object composed of the picked `object` properties. Property
 * names may be specified as individual arguments or as arrays of property
 * names. If `predicate` is provided it is invoked for each property of `object`
 * picking the properties `predicate` returns truthy for. The predicate is
 * bound to `thisArg` and invoked with three arguments: (value, key, object).
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {Function|...(string|string[])} [predicate] The function invoked per
 *  iteration or property names to pick, specified as individual property
 *  names or arrays of property names.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'user': 'fred', 'age': 40 };
 *
 * _.pick(object, 'user');
 * // => { 'user': 'fred' }
 *
 * _.pick(object, _.isString);
 * // => { 'user': 'fred' }
 */
var pick = restParam(function(object, props) {
  if (object == null) {
    return {};
  }
  return typeof props[0] == 'function'
    ? pickByCallback(object, bindCallback(props[0], props[1], 3))
    : pickByArray(object, baseFlatten(props));
});

module.exports = pick;

},{"lodash._baseflatten":233,"lodash._bindcallback":236,"lodash._pickbyarray":237,"lodash._pickbycallback":238,"lodash.restparam":243}],233:[function(require,module,exports){
arguments[4][106][0].apply(exports,arguments)
},{"dup":106,"lodash.isarguments":234,"lodash.isarray":235}],234:[function(require,module,exports){
arguments[4][50][0].apply(exports,arguments)
},{"dup":50}],235:[function(require,module,exports){
arguments[4][48][0].apply(exports,arguments)
},{"dup":48}],236:[function(require,module,exports){
arguments[4][36][0].apply(exports,arguments)
},{"dup":36}],237:[function(require,module,exports){
arguments[4][173][0].apply(exports,arguments)
},{"dup":173}],238:[function(require,module,exports){
arguments[4][174][0].apply(exports,arguments)
},{"dup":174,"lodash._basefor":239,"lodash.keysin":240}],239:[function(require,module,exports){
arguments[4][135][0].apply(exports,arguments)
},{"dup":135}],240:[function(require,module,exports){
arguments[4][176][0].apply(exports,arguments)
},{"dup":176,"lodash.isarguments":241,"lodash.isarray":242}],241:[function(require,module,exports){
arguments[4][50][0].apply(exports,arguments)
},{"dup":50}],242:[function(require,module,exports){
arguments[4][48][0].apply(exports,arguments)
},{"dup":48}],243:[function(require,module,exports){
arguments[4][43][0].apply(exports,arguments)
},{"dup":43}],244:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var isFunction = require('lodash.isfunction');

/**
 * Resolves the value of property `key` on `object`. If the value of `key` is
 * a function it is invoked with the `this` binding of `object` and its result
 * is returned, else the property value is returned. If the property value is
 * `undefined` the `defaultValue` is used in its place.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @param {string} key The key of the property to resolve.
 * @param {*} [defaultValue] The value returned if the property value
 *  resolves to `undefined`.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'user': 'fred', 'age': _.constant(40) };
 *
 * _.result(object, 'user');
 * // => 'fred'
 *
 * _.result(object, 'age');
 * // => 40
 *
 * _.result(object, 'status', 'busy');
 * // => 'busy'
 *
 * _.result(object, 'status', _.constant('busy'));
 * // => 'busy'
 */
function result(object, key, defaultValue) {
  var value = object == null ? undefined : object[key];
  if (typeof value == 'undefined') {
    value = defaultValue;
  }
  return isFunction(value) ? value.call(object) : value;
}

module.exports = result;

},{"lodash.isfunction":245}],245:[function(require,module,exports){
(function (global){
/**
 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reHostCtor = /^\[object .+?Constructor\]$/;

/**
 * Used to match `RegExp` [special characters](http://www.regular-expressions.info/characters.html#special).
 * In addition to special characters the forward slash is escaped to allow for
 * easier `eval` use and `Function` compilation.
 */
var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
    reHasRegExpChars = RegExp(reRegExpChars.source);

/**
 * The base implementation of `_.isFunction` without support for environments
 * with incorrect `typeof` results.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 */
function baseIsFunction(value) {
  // Avoid a Chakra JIT bug in compatibility modes of IE 11.
  // See https://github.com/jashkenas/underscore/issues/1621 for more details.
  return typeof value == 'function' || false;
}

/**
 * Converts `value` to a string if it is not one. An empty string is returned
 * for `null` or `undefined` values.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  if (typeof value == 'string') {
    return value;
  }
  return value == null ? '' : (value + '');
}

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reNative = RegExp('^' +
  escapeRegExp(objToString)
  .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Native method references. */
var Uint8Array = isNative(Uint8Array = global.Uint8Array) && Uint8Array;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
var isFunction = !(baseIsFunction(/x/) || (Uint8Array && !baseIsFunction(Uint8Array))) ? baseIsFunction : function(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return objToString.call(value) == funcTag;
};

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (objToString.call(value) == funcTag) {
    return reNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reHostCtor.test(value);
}

/**
 * Escapes the `RegExp` special characters "\", "/", "^", "$", ".", "|", "?",
 * "*", "+", "(", ")", "[", "]", "{" and "}" in `string`.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escapeRegExp('[lodash](https://lodash.com/)');
 * // => '\[lodash\]\(https:\/\/lodash\.com\/\)'
 */
function escapeRegExp(string) {
  string = baseToString(string);
  return (string && reHasRegExpChars.test(string))
    ? string.replace(reRegExpChars, '\\$&')
    : string;
}

module.exports = isFunction;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],246:[function(require,module,exports){
arguments[4][60][0].apply(exports,arguments)
},{"dup":60,"lodash._basetostring":247}],247:[function(require,module,exports){
arguments[4][61][0].apply(exports,arguments)
},{"dup":61}],248:[function(require,module,exports){
'use strict';

var proto = Element.prototype;
var vendor = proto.matches
  || proto.matchesSelector
  || proto.webkitMatchesSelector
  || proto.mozMatchesSelector
  || proto.msMatchesSelector
  || proto.oMatchesSelector;

module.exports = match;

/**
 * Match `el` to `selector`.
 *
 * @param {Element} el
 * @param {String} selector
 * @return {Boolean}
 * @api public
 */

function match(el, selector) {
  if (vendor) return vendor.call(el, selector);
  var nodes = el.parentNode.querySelectorAll(selector);
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i] == el) return true;
  }
  return false;
}
},{}],249:[function(require,module,exports){

},{}],250:[function(require,module,exports){
var cookies = require('cookie-getter'),
    config = cookies('config') || {};

// freeze it if browser supported
if (Object.freeze) {
    Object.freeze(config);
}

// wipe it out
document.cookie = 'config=;expires=Thu, 01 Jan 1970 00:00:00 GMT';

// export it
module.exports = config;

},{"cookie-getter":251}],251:[function(require,module,exports){
// simple commonJS cookie reader, best perf according to http://jsperf.com/cookie-parsing
module.exports = function (name) {
    var cookie = document.cookie,
        setPos = cookie.indexOf(name + '='),
        stopPos = cookie.indexOf(';', setPos),
        res;
    if (!~setPos) return null;
    res = decodeURIComponent(cookie.substring(setPos, ~stopPos ? stopPos : undefined).split('=')[1]);
    return (res.charAt(0) === '{') ? JSON.parse(res) : res;
};

},{}],252:[function(require,module,exports){

/**
 * Expose `parse`.
 */

module.exports = parse;

/**
 * Tests for browser support.
 */

var div = document.createElement('div');
// Setup
div.innerHTML = '  <link/><table></table><a href="/a">a</a><input type="checkbox"/>';
// Make sure that link elements get serialized correctly by innerHTML
// This requires a wrapper element in IE
var innerHTMLBug = !div.getElementsByTagName('link').length;
div = undefined;

/**
 * Wrap map from jquery.
 */

var map = {
  legend: [1, '<fieldset>', '</fieldset>'],
  tr: [2, '<table><tbody>', '</tbody></table>'],
  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
  // for script/link/style tags to work in IE6-8, you have to wrap
  // in a div with a non-whitespace character in front, ha!
  _default: innerHTMLBug ? [1, 'X<div>', '</div>'] : [0, '', '']
};

map.td =
map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

map.option =
map.optgroup = [1, '<select multiple="multiple">', '</select>'];

map.thead =
map.tbody =
map.colgroup =
map.caption =
map.tfoot = [1, '<table>', '</table>'];

map.polyline =
map.ellipse =
map.polygon =
map.circle =
map.text =
map.line =
map.path =
map.rect =
map.g = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">','</svg>'];

/**
 * Parse `html` and return a DOM Node instance, which could be a TextNode,
 * HTML DOM Node of some kind (<div> for example), or a DocumentFragment
 * instance, depending on the contents of the `html` string.
 *
 * @param {String} html - HTML string to "domify"
 * @param {Document} doc - The `document` instance to create the Node for
 * @return {DOMNode} the TextNode, DOM Node, or DocumentFragment instance
 * @api private
 */

function parse(html, doc) {
  if ('string' != typeof html) throw new TypeError('String expected');

  // default to the global `document` object
  if (!doc) doc = document;

  // tag name
  var m = /<([\w:]+)/.exec(html);
  if (!m) return doc.createTextNode(html);

  html = html.replace(/^\s+|\s+$/g, ''); // Remove leading/trailing whitespace

  var tag = m[1];

  // body support
  if (tag == 'body') {
    var el = doc.createElement('html');
    el.innerHTML = html;
    return el.removeChild(el.lastChild);
  }

  // wrap map
  var wrap = map[tag] || map._default;
  var depth = wrap[0];
  var prefix = wrap[1];
  var suffix = wrap[2];
  var el = doc.createElement('div');
  el.innerHTML = prefix + html + suffix;
  while (depth--) el = el.lastChild;

  // one element
  if (el.firstChild == el.lastChild) {
    return el.removeChild(el.firstChild);
  }

  // several elements
  var fragment = doc.createDocumentFragment();
  while (el.firstChild) {
    fragment.appendChild(el.removeChild(el.firstChild));
  }

  return fragment;
}

},{}],253:[function(require,module,exports){
/*!
  * domready (c) Dustin Diaz 2014 - License MIT
  */
!function (name, definition) {

  if (typeof module != 'undefined') module.exports = definition()
  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
  else this[name] = definition()

}('domready', function () {

  var fns = [], listener
    , doc = document
    , hack = doc.documentElement.doScroll
    , domContentLoaded = 'DOMContentLoaded'
    , loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState)


  if (!loaded)
  doc.addEventListener(domContentLoaded, listener = function () {
    doc.removeEventListener(domContentLoaded, listener)
    loaded = 1
    while (listener = fns.shift()) listener()
  })

  return function (fn) {
    loaded ? fn() : fns.push(fn)
  }

});

},{}],254:[function(require,module,exports){
// follow @HenrikJoreteg and @andyet if you like this ;)
// props to @mathias for this https://gist.github.com/428626 which served as starting point
// for this code.
(function () {
    function setFavicon(href) {
        var head = (document.head = document.getElementsByTagName('head')[0]);
        var faviconId = 'favicon';
        var link = document.createElement('link');
        var oldLink = document.getElementById(faviconId);
        link.id = faviconId;
        link.rel = 'shortcut icon';
        link.href = href;
        if (oldLink) {
            head.removeChild(oldLink);
        }
        head.appendChild(link);

        return this;
    };

    // export for various systems
    if (typeof module !== 'undefined') {
        module.exports = setFavicon;
    } else if (typeof $ !== 'undefined') {
        $.setFavicon = setFavicon;
    } else {
        window.setFavicon = setFavicon;
    }
})();

},{}],255:[function(require,module,exports){
function isHTMLElement(obj) {
    return obj && (typeof obj === 'object') &&
      (obj.nodeType === 1) && (typeof obj.style === 'object') &&
      (typeof obj.ownerDocument ==='object');
}

function isA(obj) {
    return isHTMLElement(obj) && obj.tagName === 'A';
}

function closestA(checkNode) {
    do {
        if (isA(checkNode)) {
            return checkNode;
        }
    } while ((checkNode = checkNode.parentNode));
}

function normalizeLeadingSlash(pathname) {
    if (pathname.charAt(0) !== '/') {
        pathname = '/' + pathname;
    }
    return pathname;
}

// [1] http://blogs.msdn.com/b/ieinternals/archive/2011/02/28/internet-explorer-window-location-pathname-missing-slash-and-host-has-port.aspx
// [2] https://github.com/substack/catch-links/blob/7aee219cdc2c845c78caad6070886a9380b90e4c/index.js#L13-L17
// [3] IE10 (and possibly later) report that anchor.port is the default port
//     but dont append it to the hostname, so if the host doesnt end with the port
//     append it to the anchor host as well

function isLocal(event, anchor, lookForHash) {
    event || (event = {});

    // Skip modifier events
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
        return null;
    }

    // If we have an anchor but its not an A tag
    // try to find the closest one
    if (anchor && !isA(anchor)) {
        anchor = closestA(anchor);
    }

    // Only test anchor elements
    if (!anchor || !isA(anchor)) {
        return null;
    }

    // Dont test anchors with target=_blank
    if (anchor.target === '_blank') {
        return null;
    }

    // IE9 doesn't put a leading slash on anchor.pathname [1]
    var aPathname = normalizeLeadingSlash(anchor.pathname);
    var wPathname = normalizeLeadingSlash(window.location.pathname);
    var aHost = anchor.host;
    var aPort = anchor.port;
    var wHost = window.location.host;
    var wPort = window.location.port;

    // Some browsers (Chrome 36) return an empty string for anchor.hash
    // even when href="#", so we also check the href
    var aHash = anchor.hash || (anchor.href.indexOf('#') > -1 ? '#' + anchor.href.split('#')[1] : null);
    var inPageHash;

    // Window has no port, but anchor has the default port
    if (!wPort && aPort && (aPort === '80' || aPort === '443')) {
        // IE9 sometimes includes the default port (80 or 443) on anchor.host
        // so we append the default port to the window host in this case
        // so they will match for the host equality check [1]
        wHost += ':' + aPort;
        aHost += aHost.indexOf(aPort, aHost.length - aPort.length) === -1 ? ':' + aPort : ''; // [3]
    }

    // Hosts are the same, its a local link
    if (aHost === wHost) {

        // If everything else is the same
        // and hash exists, then it is an in-page hash [2]
        inPageHash =
            aPathname === wPathname &&
            anchor.search === window.location.search &&
            aHash;

        if (lookForHash === true) {
            // If we are looking for the hash then this will
            // only return a truthy value if the link
            // is an *in-page* hash link
            return inPageHash;
        } else {
            // If this is an in page hash link
            // then ignore it because we werent looking for hash links
            return inPageHash ?
                null :
                aPathname + (anchor.search || '') + (aHash || '');
        }
    }

    return null;
}

// Take two arguments and return an ordered array of [event, anchor]
function getEventAndAnchor(arg1, arg2) {
    var ev = null;
    var anchor = null;

    // Two arguments will come in this order
    if (arguments.length === 2) {
        ev = arg1;
        anchor = arg2;
    }
    // If our first arg is an element
    // then use that as our anchor
    else if (isHTMLElement(arg1)) {
        anchor = arg1;
    }
    // Otherwise our argument is an event
    else {
        ev = arg1;
    }

    // If there is no anchor, but we have an event
    // then use event.target
    if (!anchor && ev && ev.target) {
        anchor = ev.target;
    }

    // Return an array so that it can be used with Function.apply
    return [ev, anchor];
}


// Functions to be used in exports. Defined here for alias purposes
function pathname () {
    return isLocal.apply(null, getEventAndAnchor.apply(null, arguments));
}

function hash () {
    return isLocal.apply(null, getEventAndAnchor.apply(null, arguments).concat(true));
}

function active () {
    var args = Array.prototype.slice.call(arguments);
    var last = args[args.length - 1];
    var checkPath = window.location.pathname;

    if (typeof last === 'string') {
        checkPath = last;
        args = args.slice(0, -1);
    }

    return pathname.apply(null, args) === normalizeLeadingSlash(checkPath);
}

module.exports = {
    isLocal: isLocal,
    pathname: pathname,
    getLocalPathname: pathname,
    hash: hash,
    getLocalHash: hash,
    active: active,
    isActive: active
};

},{}],256:[function(require,module,exports){
//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind,
    nativeCreate       = Object.create;

  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.8.3';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value)) return _.matcher(value);
    return _.property(value);
  };
  _.iteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, undefinedOnly) {
    return function(obj) {
      var length = arguments.length;
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

  // An internal function for creating a new object that inherits from another.
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  };

  var property = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = property('length');
  var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Create a reducing function iterating left or right.
  function createReduce(dir) {
    // Optimized iterator function as using arguments.length
    // in the main function will deoptimize the, see #1991.
    function iterator(obj, iteratee, memo, keys, index, length) {
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    }

    return function(obj, iteratee, memo, context) {
      iteratee = optimizeCb(iteratee, context, 4);
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      // Determine the initial value if none is provided.
      if (arguments.length < 3) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      return iterator(obj, iteratee, memo, keys, index, length);
    };
  }

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = createReduce(-1);

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var key;
    if (isArrayLike(obj)) {
      key = _.findIndex(obj, predicate, context);
    } else {
      key = _.findKey(obj, predicate, context);
    }
    if (key !== void 0 && key !== -1) return obj[key];
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given item (using `===`).
  // Aliased as `includes` and `include`.
  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return _.indexOf(obj, item, fromIndex) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      var func = isFunc ? method : value[method];
      return func == null ? func : func.apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = isArrayLike(obj) ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, startIndex) {
    var output = [], idx = 0;
    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        //flatten current level of array or arguments object
        if (!shallow) value = flatten(value, shallow, strict);
        var j = 0, len = value.length;
        output.length += len;
        while (j < len) {
          output[idx++] = value[j++];
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(arguments, true, true, 1);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    return _.unzip(arguments);
  };

  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices
  _.unzip = function(array) {
    var length = array && _.max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Generator function to create the findIndex and findLastIndex functions
  function createPredicateIndexFinder(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  }

  // Returns the first index on an array-like that passes a predicate test
  _.findIndex = createPredicateIndexFinder(1);
  _.findLastIndex = createPredicateIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Generator function to create the indexOf and lastIndexOf functions
  function createIndexFinder(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == 'number') {
        if (dir > 0) {
            i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  }

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments
  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var args = slice.call(arguments, 2);
    var bound = function() {
      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = _.partial(_.delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed on and after the Nth call.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed up to (but not including) the Nth call.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  function collectNonEnumProps(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  }

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Returns the results of applying the iteratee to each element of the object
  // In contrast to _.map it returns an object
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys =  _.keys(obj),
          length = keys.length,
          results = {},
          currentKey;
      for (var index = 0; index < length; index++) {
        currentKey = keys[index];
        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
      }
      return results;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = createAssigner(_.allKeys);

  // Assigns a given object with all the own properties in the passed-in object(s)
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  _.extendOwn = _.assign = createAssigner(_.keys);

  // Returns the first key on an object that passes a predicate test
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(object, oiteratee, context) {
    var result = {}, obj = object, iteratee, keys;
    if (obj == null) return result;
    if (_.isFunction(oiteratee)) {
      keys = _.allKeys(obj);
      iteratee = optimizeCb(oiteratee, context);
    } else {
      keys = flatten(arguments, false, false, 1);
      iteratee = function(value, key, obj) { return key in obj; };
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(flatten(arguments, false, false, 1), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = createAssigner(_.allKeys, true);

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  _.create = function(prototype, props) {
    var result = baseCreate(prototype);
    if (props) _.extendOwn(result, props);
    return result;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Returns whether an object has a given set of `key:value` pairs.
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs), length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };


  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }

    var areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                               _.isFunction(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      length = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (_.keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), and in Safari 8 (#1929).
  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  // Predicate-generating functions. Often useful outside of Underscore.
  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = property;

  // Generates a function for a given object that returns a given property.
  _.propertyOf = function(obj) {
    return obj == null ? function(){} : function(key) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property, fallback) {
    var value = object == null ? void 0 : object[property];
    if (value === void 0) {
      value = fallback;
    }
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function() {
    return '' + this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}.call(this));

},{}]},{},[1])