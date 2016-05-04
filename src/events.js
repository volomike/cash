function CashEvent(node, eventName, delegate, originalCallback, runOnce) { // jshint ignore:line

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

      remove = function(c){
        if ( !c || originalCallback === c ) {
          node.removeEventListener(eventName, callback);
        }
      };

  this.remove = remove;

  node.addEventListener(eventName, callback);

  eventCache[eventName] = eventCache[eventName] || [];
  eventCache[eventName].push(this);

  return this;
}

fn.extend({

  off(eventName, callback) {
    return this.each(v => {
        var eventCache = getData(v,'_cashEvents');
        each(eventCache[eventName], event => event.remove(callback) );
        if ( !callback ) { eventCache[eventName] = []; }
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

    return this.each(v => {
      return new CashEvent(v, eventName, delegate, callback, runOnce);
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
