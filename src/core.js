function noop(){}
function isFunction(item){ return typeof item === typeof noop; }
function isString(item) { return typeof item === typeof ''; }

var idMatch    = /^#[\w-]*$/,
    classMatch = /^\.[\w-]*$/,
    htmlMatch =  /<.+>/,
    singlet    = /^\w+$/;

/**
 * Find elements matching a selector using the fastest method.
 *
 * @type {Function}
 * @param {String} selector - Selector to filter elements
 * @param {Node} [context=document] - Node to start the search
 * @returns {NodeList|HTMLCollection}
 *
 */
function find(selector,context) {
  context = context || doc;
  var elems = (
        classMatch.test(selector) ?
          context.getElementsByClassName(selector.slice(1)) :
          singlet.test(selector) ?
            context.getElementsByTagName(selector) :
            context.querySelectorAll(selector)
      );
  return elems;
}

/**
 * Convert a string to HTML elements.
 *
 * @type {Function}
 * @param {String} str - String to parse as HTML
 * @returns {NodeList}
 *
 */
var frag, tmp;
function parseHTML(str) {
  frag = frag || doc.createDocumentFragment();
  tmp = tmp || frag.appendChild(doc.createElement('div'));
  tmp.innerHTML = str;
  return tmp.childNodes;
}

/**
 * Run a callback function after the document is ready.
 *
 * @type {Function}
 * @param {Function} fn - Callback function
 *
 */
function onReady(fn) {
  if ( doc.readyState !== 'loading' ) { fn(); }
  else { doc.addEventListener('DOMContentLoaded', fn); }
}

/**
 * Class for Cash collections, typically created by calling `$(selector,context)` or
 * `cash(selector,context)` instead of directly using the `Init` function.
 *
 * @class
 * @param {String|Node|Node[]|Function|CashCollection} selector - Selector to filter nodes, string of HTML, nodes, an array of nodes, or a function to be called when the document is ready.
 * @param {Node} [context=document] - Node to start the search
 * @returns {CashCollection}
 *
 */
function Init(selector,context){

  if ( !selector ) { return this; }

  // If already a cash collection, don't do any further processing
  if ( selector.cash && selector !== win ) { return selector; }

  var elems = selector,
      i = 0,
      length;

  if ( isString(selector) ) {
    elems = (
      idMatch.test(selector) ?
        // If an ID use the faster getElementById check
        doc.getElementById(selector.slice(1)) :
        htmlMatch.test(selector) ?
          // If HTML, parse it into real elements
          parseHTML(selector) :
          // else use `find`
          find(selector,context)
      );

  // If function, use as shortcut for DOM ready
  } else if ( isFunction(selector) ) { onReady(selector); return this; }

  if ( !elems ) { return this; }

  // If a single DOM element is passed in or received via ID, return the single element
  if ( elems.nodeType || elems === win ) {
    this[0] = elems;
    this.length = 1;
  } else {
    // Treat like an array and loop through each item.
    length = this.length = elems.length;
    for( ; i < length; i++ ) { this[i] = elems[i]; }
  }

  return this;
}

/**
 * Create a Cash collection
 *
 * @type {Class}
 * @param {String|Node|Node[]|Function|CashCollection} selector - Selector to filter nodes, string of HTML, nodes, an array of nodes, or a function to be called when the document is ready.
 * @param {Node} [context=document] - Node to start the search
 * @returns {CashCollection}
 *
 * @example
 *  $(function(){
 *    var $divs = $('div'),
 *        $heading = $(document.querySelector('h1')),
 *        $myElement = $('#myElement'),
 *        $win = $(window);
 *
 *  });
 */
function cash(selector,context) {
  return new Init(selector,context);
}

/**
 * Collection prototype containing all the methods for manipulating collections.
 *
 * @type {Object}
 * @lends Init.prototype
 *
 */
var fn = cash.fn = cash.prototype = Init.prototype = { // jshint ignore:line
  constructor: cash,
  cash: true,
  length: 0,
  push: push,
  splice: ArrayProto.splice,
  map: ArrayProto.map,
  init: Init
};

cash.parseHTML = parseHTML;
cash.noop = noop;
cash.isFunction = isFunction;
cash.isString = isString;
