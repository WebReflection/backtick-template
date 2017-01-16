# ES2015 backticks for ES3+ engines [![build status](https://secure.travis-ci.org/WebReflection/backtick-template.svg)](http://travis-ci.org/WebReflection/backtick-template) [![Coverage Status](https://coveralls.io/repos/WebReflection/backtick-template/badge.svg?branch=master)](https://coveralls.io/r/WebReflection/backtick-template?branch=master)

```js
var template = require('backtick-template');

// just string
const info = 'template';
`some ${info}` === template('some ${info}', {info});

// passing through a transformer
transform `some ${info}` ===
    template(transform, 'some ${info}', {info});

// using it as String method
String.prototype.template = template.asMethod;

`some ${info}` === 'some ${info}'.template({info});

transform `some ${info}` ===
    'some ${info}'.template(transform, {info});

```

MIT Style License
