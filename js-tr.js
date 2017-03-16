/* 
 * !DEPENDENCIES
 * freegeoip.net
 *
 * !CREDITS
 * JavaScript Cookie v2.1.3 https://github.com/js-cookie/js-cookie
*/

/*!
 * JavaScript Cookie v2.1.3
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader = false;
	if (typeof define === 'function' && define.amd) {
		define(factory);
		registeredInModuleLoader = true;
	}
	if (typeof exports === 'object') {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var result = {};
		for (var i = 0; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init (converter) {
		function api (key, value, attributes) {
			var result;
			if (typeof document === 'undefined') {
				return;
			}

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value))
						.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				return (document.cookie = [
					key, '=', value,
					attributes.expires ? '; expires=' + attributes.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
					attributes.path ? '; path=' + attributes.path : '',
					attributes.domain ? '; domain=' + attributes.domain : '',
					attributes.secure ? '; secure' : ''
				].join(''));
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = parts[0].replace(rdecode, decodeURIComponent);
					cookie = converter.read ?
						converter.read(cookie, name) : converter(cookie, name) ||
						cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.set = api;
		api.get = function (key) {
			return api.call(api, key);
		};
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));



/// Real Cookie business starts here

var CRf = function() {

}

CRf.prototype.set = function (days,callback) {
        if(callback===undefined) {
            callback = function(t){console.log(t)};
        }
    
        if(Cookies.get('_CR') === undefined) {
                this.json = {
                    ref : document.referrer,
                    lp : document.URL,
                    sys: navigator.platform,
                    nav : navigator.appVersion.replace(";",""),
                    navc: navigator.vendor,
                    sw : window.screen.width,
                    sh : window.screen.height,
                    lang: navigator.language,
                    adw : ""
                };
                if(document.URL.search("gclid=") > -1) {
                    this.json.adw = "AdWords";
                }
            
                //GET URL PARAMETERS IN AN OBJECT
                var QueryString = function () {
                  // This function is anonymous, is executed immediately and 
                  // the return value is assigned to QueryString!
                  var query_string = {};
                  var query = window.location.search.substring(1);
                  var vars = query.split("&");
                  for (var i=0;i<vars.length;i++) {
                    var pair = vars[i].split("=");
                        // If first entry with this name
                    if (typeof query_string[pair[0]] === "undefined") {
                      query_string[pair[0]] = decodeURIComponent(pair[1]);
                        // If second entry with this name
                    } else if (typeof query_string[pair[0]] === "string") {
                      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
                      query_string[pair[0]] = arr;
                        // If third or later entry with this name
                    } else {
                      query_string[pair[0]].push(decodeURIComponent(pair[1]));
                    }
                  } 
                  return query_string;
                }();
            
                if(QueryString.utm_source != undefined) {
                    this.json.utm_source = QueryString.utm_source;
                }
                if(QueryString.utm_medium != undefined) {
                    this.json.utm_medium = QueryString.utm_medium;
                }
                if(QueryString.utm_campaign != undefined) {
                    this.json.utm_campaign = QueryString.utm_campaign;
                }
                if(QueryString.utm_content != undefined) {
                    this.json.utm_content = QueryString.utm_content;
                }            
            //CHECK FOR UTM TAGS over
            //a.com?utm_source=google&utm_medium=organic&utm_campaign=Name&utm_content=content
            
                var jObj = this.json;
            
                ///SET SERVER VARIABLES
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (xhttp.readyState == 4 && xhttp.status == 200) {
                        var data = JSON.parse(xhttp.responseText);
                        // get variables and set cookie
                        callbackSet(data)

                    }
                };
                xhttp.open("GET", "https://freegeoip.net/json/", true);
                xhttp.send();
                ///DONE SET SERVER VARIABLES
                function callbackSet(data){
                        jObj.location = data.city + ", " + data.region_code;
                        jObj.reg = data.region_name;
                        jObj.ip = data.ip;
                        jObj.long = data.longitude;
                        jObj.lat = data.latitude;
                        jObj.country = data.country_name;
                        jObj.zip = data.zip_code;

                        Cookies.set('_CR', jObj, { expires: days });
                        
                        callback(Cookies.getJSON('_CR'));
                }
            
        } else {
                        
                        callback(Cookies.getJSON('_CR'));
        }       
}
