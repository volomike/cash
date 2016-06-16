function splitNamespace(name) {
  var namespaceArray = name.split('.')
  return ( name.indexOf('.') !== 0 ? [namespaceArray[0], namespaceArray.slice(1) ] : [null, namespaceArray] );
}

function CashEvent(node, eventName, namespaces, delegate, originalCallback, runOnce) { // jshint ignore:line

  var eventCache = getData(node,'_cashEvents') || setData(node, '_cashEvents', {}),

      callback = function(e) {
        var t = this;

        if ( delegate ) {
          t = e.target;

          while ( t && !matches(t, delegate) ) {
            if (t === this) {
              return (t = false);
            }
            t = t.parentNode;
          }
        }

        if (t) {
          originalCallback.call(t, e, e.data);
          if ( runOnce ) { remove(); }
        }

      },

      remove = function(c, namespace){
        if ( c && originalCallback !== c ) { return; }
        if ( namespace && this.namespaces.indexOf(namespace) < 0 ) { return; }
        node.removeEventListener(eventName, callback);
      };

  this.remove = remove;
  this.namespaces = namespaces;

  node.addEventListener(eventName, callback);

  eventCache[eventName] = eventCache[eventName] || [];
  eventCache[eventName].push(this);

  return this;
}

fn.extend({

  off(eventName, callback) {

    var removeAll = ( arguments.length === 0 ),
        event = splitNamespace(eventName),
        key, namespace;

    eventName = event[0];
    namespace = event[1];

    return this.each(v => {
        var eventCache = getData(v,'_cashEvents');
        if ( removeAll ) {
          for ( key in eventCache ) {
            each(eventCache[key], event => event.remove(callback, namespace) );
          }
        } else {
          each(eventCache[eventName], event => event.remove(callback, namespace) );
        }
        if ( !callback && eventCache ) { eventCache[eventName] = []; }
      });
  },

  on(eventName, delegate, callback, runOnce) { // jshint ignore:line

    if ( !isString(eventName) ) {
      for (var key in eventName) {
        this.on(key,delegate,eventName[key]);
      }
      return this;
    }

    if ( eventName === 'ready' ) {
      onReady(callback);
      return this;
    }

    if ( isFunction(delegate) ) {
      callback = delegate;
      delegate = null;
    }

    var event = splitNamespace(eventName);

    return this.each(v => {
      return new CashEvent(v, event[0], event[1], delegate, callback, runOnce);
    });
  },

  one(eventName, delegate, callback) {
    return this.on(eventName, delegate, callback, true);
  },

  ready: onReady,

  trigger(eventName, data) {
    var evt = doc.createEvent('HTMLEvents');
    evt.data = data;
    evt.initEvent(eventName, true, false);
    return this.each(v => v.dispatchEvent(evt));
  }

});
