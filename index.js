/*! (C) 2017-2018 Andrea Giammarchi - MIT Style License */
function template(fn, $str, $object) {'use strict';
  // reset cache every 32M
  if (33554432 < template.$) {
    template._ = {};
    template.$ = 0;
  }
  var
    hasTransformer = typeof fn === 'function',
    str = hasTransformer ? $str : fn,
    object = hasTransformer ? $object : $str,
    _ = template._,
    known = _.hasOwnProperty(str),
    parsed = known ? _[str] : (_[str] = template.parse(str)),
    chunks = parsed.chunks,
    values = parsed.values,
    strings
  ;
  // add str length only if not known
  if (!known)
    template.$ += str.length;
  if (hasTransformer) {
    str = 'function' + (Math.random() * 1e5 | 0);
    strings = [
      str,
      'with(this)return ' + str + '([' + chunks + ']' + (
        values.length ? (',' + values.join(',')) : ''
      ) + ')'
    ];
  } else {
    strings = chunks.slice(0, 1);
    for (var i = 1, length = chunks.length; i < length; i++)
      strings.push(values[i - 1], chunks[i]);
    strings = ['with(this)return ' + strings.join('+')];
  }
  return Function.apply(null, strings).apply(
    object,
    hasTransformer ? [fn] : []
  );
}

template._ = {};
template.$ = 0;

template.asMethod = function (fn, object) {'use strict';
  return typeof fn === 'function' ?
    template(fn, this, object) :
    template(this, fn);
};

template.parse = function (str) {
  var
    stringify = JSON.stringify,
    open = 0, close = 0, counter = 0,
    i = 0, length = str.length,
    chunks = i < length ? [] : ['""'],
    values = []
  ;
  while (i < length) {
    open = str.indexOf('${', i);
    if (-1 < open) {
      chunks.push(stringify(str.slice(i, open)));
      open += 2;
      close = open;
      counter = 1;
      while (close < length) {
        switch (str.charAt(close++)) {
          case '}': --counter; break;
          case '{': ++counter; break;
        }
        if (counter < 1) {
          values.push('(' + str.slice(open, close - 1) + ')');
          break;
        }
      }
      i = close;
    } else {
      chunks.push(stringify(str.slice(i)));
      i = length;
    }
  }
  if (chunks.length === values.length)
    chunks.push('""');
  return {chunks: chunks, values: values};
};
