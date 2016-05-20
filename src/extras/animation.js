// @todo: Convert % to px
// @todo: Ensure compatibility between Element.animate & requestAnimationFrame version
// @todo: Compatibility in ease functions & Element.animate
// @todo: transform: rotate compatibility. Element.animate seems to rotate the quickest possible way, not the correct way.
// @todo: support 'fill' property

(function($){

  var win = window,
      requestAnimationFrame = win.requestAnimationFrame ||
                              win.webkitRequestAnimationFrame ||
                              win.mozRequestAnimationFrame ||
                              win.msRequestAnimationFrame ||
                              function(callback){ win.setTimeout(callback, 20); }; // IE Fallback

  /** Group all `requestAnimationFrame` calls into one for better performance. */
  var animations = [];
  animations.play = function(){
    /** Prevent calling `requestAnimationFrame` twice if a frame is already requested */
    animations.frame = animations.frame || requestAnimationFrame(animate);
    animations.playing = true;
  };
  $.animations = animations;

  /** One requestAnimationFrame function */
  function animate(){

    var i = animations.length,
        el, index;

    if ( !animations.playing || i === 0  ) {
      animations.playing = false;
      animations.frame = null;
      return;
    }

    while( i-- ){
      el = animations[i];
      if ( el && el() === false ) {
        index = animations.indexOf(el);
        if ( index > -1 ) { animations.splice(index, 1); }
      }
    }

    animations.frame = requestAnimationFrame(animate);
  }


////////////////////////////////////////



  /**
   * Easing delta functions thanks to Nikolay Nemshilov
   * See http://st-on-it.blogspot.com/2011/05/calculating-cubic-bezier-function.html
   */
  var easings = {
        'linear': function(t){ return t; },
      },
      cubicRegex = /cubic-bezier\(([\d\.]+),\s+?([\d\.]+),\s+?([\d\.]+),\s+?([\d\.]+)\)/i

  function Bezier(p1,p2,p3,p4) {

    if ( arguments.length === 1 ) {
      if ( easings[p1] ) { return easings[p1]; }
      var cubicParsed = cubicRegex.exec(p1);
      return easings[p1] = ( cubicParsed ? Bezier.apply(null, cubicParsed.slice(1,5) ) : null );
    }

    // defining the bezier functions in the polynomial form
    var Cx = 3 * p1;
    var Bx = 3 * (p3 - p1) - Cx;
    var Ax = 1 - Cx - Bx;

    var Cy = 3 * p2;
    var By = 3 * (p4 - p2) - Cy;
    var Ay = 1 - Cy - By;

    function bezier_x(t) { return t * (Cx + t * (Bx + t * Ax)); }
    function bezier_y(t) { return t * (Cy + t * (By + t * Ay)); }
    // using Newton's method to aproximate the parametric value of x for t
    function bezier_x_der(t) { return Cx + t * (2*Bx + 3*Ax * t); }

    function find_x_for(t) {
      var x = t,
          i = 0,
          z;

      while (i < 3) { // making 3 iterations max
        z = bezier_x(x) - t;
        if (Math.abs(z) < 1e-3) break; // if already close enough
        x = x - z / bezier_x_der(x);
        i++;
      }

      return x;
    };

    return function(t){ return bezier_y(find_x_for(t)); }
  }

  $.extend(easings,{
    'ease':        Bezier(0.25, 0.1, 0.25, 1.0),
    'ease-in':     Bezier(0.42, 0.0, 1.00, 1.0),
    'ease-out':    Bezier(0.00, 0.0, 0.58, 1.0),
    'ease-in-out': Bezier(0.42, 0.0, 0.58, 1.0)
  });
  $.easings = easings;


////////////////////////////////////////


  /** Build transform conversion functions with defaults values */

  var transformProp = $.prefixedProp('transform');
  var transforms = {};

  function makeTransformFn(name, defaultValue){
    return function(value, onlyValue) {
      value = ( value || value == 0 ? value : defaultValue );
      return ( onlyValue ? value : ' '+name+'('+value+')' );
    }
  }

  $.each('rotate rotateX rotateY rotateZ skew skewX skewY'.split(' '),function(val){
    transforms[val] = makeTransformFn(val, '0deg');
  });

  $.each('x y z'.split(' '),function(val){
    var fullName = 'translate'+val.toUpperCase()
    transforms[fullName] = transforms[val] = makeTransformFn(fullName, 0);
  });

  $.each('scale scaleX scaleY scaleZ'.split(' '),function(val){
    transforms[val] = makeTransformFn(val, 1);
  });


////////////////////////////////////////

  /** Split a string from the number and the unit to allow tweening the number. */
  var unitRegex = /(-?[0-9]+(?:\.[0-9]+)?)([a-z%]+)?$/i;

  function getNumberUnit(val){
    var ret = unitRegex.exec( val );
    if ( !ret && ret !== 0 ) {
      ret = [0,'px'];
    } else {
      ret = ret.slice(1,3);
      ret[0] = parseFloat(ret[0]);
    }

    return ret;
  }


  // http://stackoverflow.com/a/10624656/1012919

  function percentwidth(elem){
    var pa= elem.offsetParent || elem;
    return ((elem.offsetWidth/pa.offsetWidth)*100).toFixed(2)+'%';
  }


////////////////////////////////////////


  /** http://stackoverflow.com/a/30583749/1012919 */
  function decomposeMatrix(a, b, c, d, e, f) {

    var acos = Math.acos, // caching for readability below
        atan = Math.atan,
        sqrt = Math.sqrt,
        pi   = Math.PI,
        determ = a * d - b * c,

        scaleX = 1,
        scaleY = 1,
        skewX,
        skewY,
        rotation,

        output = {},
        r, s;

    // Apply the QR-like decomposition.
    if (a || b) {
      r = sqrt(a*a + b*b);
      rotation = b > 0 ? acos(a / r) : -acos(a / r);
      scaleX = r;
      scaleY = determ / r;
      skewX  = atan((a*c + b*d) / (r*r));
    } else if (c || d) {
      s = sqrt(c*c + d*d);
      rotation = pi * 0.5 - (d > 0 ? acos(-c / s) : -acos(c / s));
      scaleX = determ / s;
      scaleY = s;
      skewY = atan((a*c + b*d) / (s*s));
    }

    if ( e && e !== '0' ) { output.translateX = e; }
    if ( f && e !== '0' ) { output.translateY = f; }
    if ( scaleX !== 1 ) { output.scaleX = scaleX; }
    if ( scaleY !== 1 ) { output.scaleY = scaleY; }
    if ( skewX ) { output.skewX = skewX; }
    if ( skewY ) { output.skewY = skewY; }
    if ( rotation !== 0 ) { output.rotate = rotation * (180/pi) + 'deg'; }

    return output;
  }

  var transformRegex = /([a-z]+)\((.*?)\)/ig;

  function getCurrentTransforms(obj){

    /** Set translateZ for animationg speed boost. */
    var transformObj = { start: { translateZ: 0 }, end: { translateZ: 0 } },
        currentTransforms = obj[transformProp],
        _transform = transformRegex.exec(currentTransforms),

        tempObj = {},
        key, val;

    if ( _transform ) {
      /** Crap. Did we get a matrix? Guess we gotta parse that. */
      if ( _transform[1] === 'matrix' ) {
        tempObj = decomposeMatrix.apply(null, _transform[2].split(/[\s,]+/) );
      } else {
        /** Otherwise, we can just loop through all of those wonderfully easy properties */
        while ( _transform ){
          tempObj[_transform[1]] = _transform[2];
          _transform = transformRegex.exec(currentTransforms);
        }
      }
    }

    /** Set the start & end properties of the transform equally. The end properties will be overridden later */
    for ( key in tempObj ) {
      val = transforms[key](tempObj[key], true );
      transformObj.start[ key ] = val;
      transformObj.end[ key ] = val;
    }

    return transformObj;
  }


////////////////////////////////////////


  function getDeltaValue(delta,start,to){
    var end = to,
        suffix = 0;

    start = ( start && start.length === 2 ? start[0] : start );

    if ( to && to.length === 2 ) {
      end = to[0];
      suffix = to[1] || 0;
    }

    return (start + (end - start) * delta) + suffix;
  }


////////////////////////////////////////


  function buildStyles(obj, end, supportAnimate){
    var props = {
          // Set start & end as empty objects to be filled
          start: {},
          end: {}
        },

        /** If it's an element, we have to get the current styles */
        start = win.getComputedStyle(obj),

        key, propName, startValue, endValue, currentTransforms;

    if ( supportAnimate ) {
      // Use the existing transform style for the start.
      props.start[transformProp] = start[transformProp];
      props.end[transformProp] = '';
    } else {
      // Get current transform values if element to preserve existing transforms and to animate smoothly to new transform values.
      currentTransforms = getCurrentTransforms(start);
      props.transforms = currentTransforms;
    }

    for (key in end){

      endValue = end[key];

      if ( transforms[key] ) {

        /** If using Element.animate, flatten the transforms object to a single transform string. */
        if ( supportAnimate ) {

          props.end[transformProp] += transforms[key](endValue);

        } else {

          currentTransforms.start[key] = getNumberUnit( currentTransforms.start[key] || transforms[key](null,true) );
          currentTransforms.end[key] = getNumberUnit(endValue);

        }

      } else {

        /** Convert to vendor prefixed, camelCase property name */
        propName = $.prefixedProp(key);
        startValue = start[propName];

        /** If not using Element.animate, split the values into an array containing the number and the unit, e.g. [100,'px'] */
        if ( !supportAnimate ) {
          startValue = getNumberUnit(startValue);
          endValue = getNumberUnit(endValue);
/*
          if ( start[1] !== end[1] ) {
            console.log('conversion needed!',start,end);
          }
*/
        }

        props.start[propName] = startValue;
        props.end[propName] = endValue;

      }

    }

    return props;
  }


////////////////////////////////////////


  function noop(){}

  var defaultOpts = {
        iterations: 1,
        duration: 400,
        easing: 'linear',

        delay: 0,
        stagger: 0,

        reversed: false,
        direction: 'normal',
        fill: 'both',

        start: noop,
        progress: noop,
        complete: noop,
        allComplete: noop
      };


  function Animator(objects, end, opts, i){

    objects = objects.length ? objects : [objects];
    opts = $.extend({}, defaultOpts, opts);

    var animationsRemaining = objects.length,
        finished = function(obj,i){
            opts.complete.call(obj,obj,i);
            animationsRemaining--;
            if ( !animationsRemaining ) {
              opts.allComplete.call(objects);
            }
          };

    $.each(objects,function(obj,i){

      var isElement = obj.nodeType,
          supportAnimate = isElement && (!opts.disableAnimate && obj.animate),

          /** Object to apply the animation to. If element, use the style, otherwise apply it to the target itself. */
          target = isElement ? obj.style : obj,

          /** Properties to animate */
          props = {},
          startValues = {},
          endValues = {},

          stagger = opts.stagger * i,
          delay = opts.delay,

          render = noop;

      if ( isElement ){

        props = buildStyles(obj, end, supportAnimate);
        startValues = props.start;
        endValues = props.end;

      } else {
        /** If we're dealing with a plain object, just set the start & end values */
        for (key in end) {
          startValues[key] = target[key];
          endValues[key] = end[key];
        }
      }

      opts.start.call(obj,obj,i);

      // Use element.animate if supported
      if ( supportAnimate ) {

        var localOpts = $.extend({},opts,{ delay: delay + stagger });

        // Use Element.animate to tween the properties.
        render = obj.animate([startValues,endValues],localOpts);

        /** Prevent issues with `fill: both` preventing animations of transforms from working */
        var endState;
        if ( (direction === 'alternate' && iterations % 2 ) || (direction === 'normal') ) {
          endState = endValues;
        }

        render.addEventListener('finish',function(e){

          if ( endState ) {
            /** Apply the end state styles */
            for (key in endState){
              target[key] = endState[key];
            }
          }
          finished(obj,i);

        });

      } else {

        var duration = opts.duration,
            now = Date.now(),
            startTime = now + delay + stagger,

            easing = Bezier(opts.easing) || easings.linear,
            iterations = opts.iterations,
            direction =  opts.direction,
            reversed = ( direction === 'reverse' || direction === 'alternate-reverse' ),

            transformValues = props.transforms,

            progress = 0,
            delta, key, transform;

        render = function(){

          now = Date.now();

          /** Don't run the animation until after the start time in case a delay was set  */
          if ( now < startTime ) { return; }

          progress = ( now - startTime ) / duration;
          if ( progress > 1 ) { progress = 1; }

          delta = easing( reversed ? 1 - progress : progress );

          /** Animate all normal properties or styles */
          for (key in endValues){
            target[key] = getDeltaValue(delta, startValues[key], endValues[key]);
          }

          /** Animate all transforms, grouped together. */
          if ( isElement && transformValues ) {
            transform = '';
            for (key in transformValues.end){
              transform += transforms[key]( getDeltaValue(delta, transformValues.start[key], transformValues.end[key]) );
            }
            target[transformProp] = transform;
          }

          if ( opts.progress() === false ) { return false; }

          if ( progress >= 1 ) {
            if ( direction === 'alternate' || direction === 'alternate-reverse' ) { reversed = !reversed; }
            if ( iterations <= 1 ) {
              finished(obj,i);
              return false;
            } else {
              if ( iterations > 1 && iterations !== Infinity ) { iterations--; }
              startTime = now;
            }
          }

        }

        animations.push(render);
        animations.play();
      }

      return render;
    });
  }


  $.animate = function(obj,end,opts){
    return new Animator(obj,end,opts);
  };

  $.fn.animate = function(end,opts){
    return new Animator(this,end,opts);
  };

})(window.$);
