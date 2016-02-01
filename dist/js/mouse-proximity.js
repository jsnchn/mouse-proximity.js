(function (root, factory) {
    var pluginName = 'mouseProximity';

    if (typeof define === 'function' && define.amd) {
        define([], factory(pluginName));
    } else if (typeof exports === 'object') {
        module.exports = factory(pluginName);
    } else {
        root[pluginName] = factory(pluginName);
    }
}(this, function (pluginName) {
    'use strict';

    var defaults = {
        clear: false,
        origin: 'center',
        showAttribute: true,
        cb: function(el,distance){
            console.log(el.outerHTML + ', distance ' + distance);
        }
    };

    var mpos = {
        x: 0,
        y: 0
    }

    /**
     * Merge defaults with user options
     * @param {Object} defaults Default settings
     * @param {Object} options User options
     */
    var extend = function (target, options) {
        var prop, extended = {};
        for (prop in defaults) {
            if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
                extended[prop] = defaults[prop];
            }
        }
        for (prop in options) {
            if (Object.prototype.hasOwnProperty.call(options, prop)) {
                extended[prop] = options[prop];
            }
        }
        return extended;
    };


    /**
     * track the mouse by setting mouse position data locally
     */
    var mouseTrack = function(ev) {
        mpos.x = ev.pageX;
        mpos.y = ev.pageY;

        // console.clear();
        // console.log("x: " + mpos.x);
        // console.log("y: " + mpos.y);
    };
    /**
     * get offset data of element
     */
    var offset = function(elt) {
        var rect = elt.getBoundingClientRect(), bodyElt = document.body;

        return {
          top: rect.top + bodyElt .scrollTop,
          left: rect.left + bodyElt .scrollLeft
        }
    }

    /**
     * Plugin Object
     * @param element The html element to initialize
     * @param {Object} options User options
     * @constructor
     */
    function Plugin(elements, options) {
        var plugin = this;
        this.options = extend(defaults, options);

        this.elements = [].slice.call(elements).length > 0 ? [].slice.call(elements) : [elements];
        var els = this.elements;
        var elCount = this.elements.length;

        console.log('mouse proximity sensing inititalized for:', this.elements);

        this.calcDists = function(ev){
            mouseTrack(ev);
            if (plugin.options.clear){
                console.clear();
            }

            els.forEach(plugin.calcDist);
        }
        /**
         * do the math
         */
        this.calcDist = function(e,i,a) {
            //maths
            e.mouseProximity = Math.floor(Math.sqrt(Math.pow(mpos.x - (offset(e).left+(e.offsetWidth/2)), 2) + Math.pow(mpos.y - (offset(e).top+(e.offsetHeight/2)), 2)));
            if (plugin.options.showAttribute){
                e.setAttribute('data-mouse-proximity',e.mouseProximity);
            }
            /**
             * Callback
             * @param e: element
             * @param distance: distance
             */
            plugin.options.cb(e,e.mouseProximity);
        }
    }

    // Plugin prototype
    Plugin.prototype = {

        run: function(cb) {
            //only set a single listener cause there is only ever one mouse
            this.options.cb = cb ? cb : this.options.cb;
            this.options.clear = cb ? false : true;
            document.addEventListener("mousemove",this.calcDists,false);
        },
        stop: function() {
            document.removeEventListener("mousemove",this.calcDists,false);
        }

    };

    // jQuery wrapper
    if(window.jQuery) {
        var $ = window.jQuery;

        $.fn[pluginName] = function ( options ) {
            options = options || {};

            return this.each(function() {
                // add plugin to element data
                if (!$.data(this, pluginName) ) {
                    options.element = this;
                    $.data(this, pluginName, new Plugin(this, options));
                }
            });
        };
    }


    return Plugin;
}));
