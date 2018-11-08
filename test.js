const console = require('consolemd');
const template = require('./cjs');

const test = (chunks, ...rest) =>
    chunks.reduce((prev, curr, i) => prev + rest[i - 1] + curr);

console.log('# Backtick Template Test');
console.time('test');


console.log('"" empty');
console.assert(test`` === template(''));
console.assert(test`` === template('', {}));
console.assert(test`` === template(test, ''));
console.assert(test`` === template(test, '', {}));


console.log('${1}');
console.assert(test`${1}` === template('${1}'));
console.assert(test`${1}` === template('${1}', {}));
console.assert(test`${1}` === template(test, '${1}'));
console.assert(test`${1}` === template(test, '${1}', {}));


console.log('before${1}');
console.assert(test`before${1}` === template('before${1}'));
console.assert(test`before${1}` === template('before${1}', {}));
console.assert(test`before${1}` === template(test, 'before${1}'));
console.assert(test`before${1}` === template(test, 'before${1}', {}));


console.log('${1}after');
console.assert(test`${1}after` === template('${1}after'));
console.assert(test`${1}after` === template('${1}after', {}));
console.assert(test`${1}after` === template(test, '${1}after'));
console.assert(test`${1}after` === template(test, '${1}after', {}));


console.log('ar${1}ound');
console.assert(test`ar${1}ound` === template('ar${1}ound'));
console.assert(test`ar${1}ound` === template('ar${1}ound', {}));
console.assert(test`ar${1}ound` === template(test, 'ar${1}ound'));
console.assert(test`ar${1}ound` === template(test, 'ar${1}ound', {}));


console.log('ar${one}ou${two}nd');
const one = 1, two = 2;
console.assert(test`ar${one}ou${two}nd` === template('ar${one}ou${two}nd', {one, two}));
console.assert(test`ar${one}ou${two}nd` === template(test, 'ar${one}ou${two}nd', {one, two}));


console.log('hm ... ${f({a: v})}');
const f = function (_) { return 'foo'; }, v = 1;
console.assert(test`hm ... ${f({a: v})}` === template('hm ... ${f({a: v})}', {f, v}));
console.assert(test`hm ... ${f({a: v})}` === template(test, 'hm ... ${f({a: v})}', {f, v}));


String.prototype.template = template.asMethod;
console.log('"".template()');
console.assert(test`` === ''.template());
console.assert(test`` === ''.template({}));
console.assert(test`` === ''.template(test));
console.assert(test`` === ''.template(test, {}));


console.log('"${1}".template()');
console.assert(test`${1}` === '${1}'.template());
console.assert(test`${1}` === '${1}'.template({}));
console.assert(test`${1}` === '${1}'.template(test));
console.assert(test`${1}` === '${1}'.template(test, {}));


console.log('"before${1}".template()');
console.assert(test`before${1}` === 'before${1}'.template());
console.assert(test`before${1}` === 'before${1}'.template({}));
console.assert(test`before${1}` === 'before${1}'.template(test));
console.assert(test`before${1}` === 'before${1}'.template(test, {}));


console.log('"${1}after".template()');
console.assert(test`${1}after` === '${1}after'.template());
console.assert(test`${1}after` === '${1}after'.template({}));
console.assert(test`${1}after` === '${1}after'.template(test));
console.assert(test`${1}after` === '${1}after'.template(test, {}));


console.log('"ar${1}ound".template()');
console.assert(test`ar${1}ound` === 'ar${1}ound'.template());
console.assert(test`ar${1}ound` === 'ar${1}ound'.template('ar${1}ound', {}));
console.assert(test`ar${1}ound` === 'ar${1}ound'.template(test));
console.assert(test`ar${1}ound` === 'ar${1}ound'.template(test, {}));


console.log('"ar${one}ou${two}nd".template({one, two})');
console.assert(test`ar${one}ou${two}nd` === 'ar${one}ou${two}nd'.template({one, two}));
console.assert(test`ar${one}ou${two}nd` === 'ar${one}ou${two}nd'.template(test, {one, two}));


console.log('"hm ... ${f({a: v})}".template()');
console.assert(test`hm ... ${f({a: v})}` === 'hm ... ${f({a: v})}'.template({f, v}));
console.assert(test`hm ... ${f({a: v})}` === 'hm ... ${f({a: v})}'.template(test, {f, v}));


var long = Array(33554432).join('$');
console.log('32M string');
console.assert(long.template() === long.template());
console.assert(template.$ === 33554431);
console.assert('abc'.template() === 'abc'.template());
console.assert('abc'.template() === 'abc'.template());
console.log('after reset');
console.assert(template.$ === 3);

console.log('');
console.timeEnd('test');
console.log('#green(*✔* OK)');
console.log('');
