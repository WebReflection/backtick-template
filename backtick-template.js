/*! (C) 2017 Andrea Giammarchi - MIT Style License */
function template(fn, $str, $object) {'use strict';
  var
    stringify = JSON.stringify,
    hasTransformer = typeof fn === 'function',
    str = hasTransformer ? $str : fn,
    object = hasTransformer ? $object : $str,
    i = 0, length = str.length,
    strings = i < length ? [] : ['""'],
    values = hasTransformer ? [] : strings,
    open, close, counter
  ;
  while (i < length) {
    open = str.indexOf('${', i);
    if (-1 < open) {
      strings.push(stringify(str.slice(i, open)));
      open += 2;
      close = open;
      counter = 1;
      while (close < length) {
        switch (str.charAt(close++)) {
          case '}': counter -= 1; break;
          case '{': counter += 1; break;
        }
        if (counter < 1) {
          values.push('(' + str.slice(open, close - 1) + ')');
          break;
        }
      }
      i = close;
    } else {
      strings.push(stringify(str.slice(i)));
      i = length;
    }
  }
  if (hasTransformer) {
    str = 'function' + (Math.random() * 1e5 | 0);
    if (strings.length === values.length) strings.push('""');
    strings = [
      str,
      'with(this)return ' + str + '([' + strings + ']' + (
        values.length ? (',' + values.join(',')) : ''
      ) + ')'
    ];
  } else {
    strings = ['with(this)return ' + strings.join('+')];
  }
  return Function.apply(null, strings).apply(
    object,
    hasTransformer ? [fn] : []
  );
}

template.asMethod = function (fn, object) {'use strict';
  return typeof fn === 'function' ?
    template(fn, this, object) :
    template(this, fn);
};

try { module.exports = template; } catch(o_O) {}
