# ES2015 backticks for ES3+ engines

1:1 native ``backticks`${template}``` 100% code coverage.

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
