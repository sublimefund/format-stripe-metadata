# format-stripe-metadata [![npm](https://img.shields.io/npm/v/format-stripe-metadata.svg)](https://www.npmjs.com/package/format-stripe-metadata) [![npm](https://img.shields.io/npm/l/format-stripe-metadata.svg)](https://github.com/sublimefund/format-stripe-metadata/blob/master/LICENSE) [![Build Status](https://travis-ci.org/sublimefund/format-stripe-metadata.svg?branch=master)](https://travis-ci.org/sublimefund/format-stripe-metadata) [![codecov](https://codecov.io/gh/sublimefund/format-stripe-metadata/branch/master/graph/badge.svg)](https://codecov.io/gh/sublimefund/format-stripe-metadata)
[Stripe](https://stripe.com/) allows attaching
[metadata](https://stripe.com/docs/api#metadata) to certain objects. However,
there are documented limits on the metadata, the data must be in a key/value
format, and values must be strings (nested objects aren't allowed). If these
requirements aren't met, then calling the Stripe API will fail. This package
formats the input data to ensure compliance.

From the docs:
> You can specify up to 20 keys, with key names up to 40 characters long and values up to 500 characters long.

These values are used internally, but you can override them if necessary.

## Installation
```sh
$ yarn add format-stripe-metadata
# or
$ npm install --save format-stripe-metadata
```

## Usage
The returned object will contain a property called `_fullData` with a value of
either `'true'` or `'false'`. If the value is `'false'`, then information was
lost in the formatting process. Depending on how you are using the metadata
field, you may want to treat this situation as a bug, log a warning, etc.

Values are converted to strings as necesssary using [`JSON.stringify`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify).

```js
import {formatStripeMetadata} from 'format-stripe-metadata';
// or
const formatStripeMetadata = require('format-stripe-metadata').formatStripeMetadata;

let formatted = formatStripeMetadata(null);
// {_fullData: 'true'}

// Strings, numbers, and arrays are set as the value for the 'data' key
formatted = formatStripeMetadata('Mandarin orange');
// {_fullData: 'true', data: 'Mandarin orange'}
formatted = formatStripeMetadata(679);
// {_fullData: 'true', data: '679'}
formatted = formatStripeMetadata(['foo', 'bar', 'baz']);
// {_fullData: 'true', data: '["foo","bar","baz"]'}

// Objects are copied as much as possible
formatted = formatStripeMetadata({thomas: 'edison', nikola: 'tesla'});
// {_fullData: 'true', thomas: 'edison', nikola: 'tesla'}
formatted = formatStripeMetadata({thisisakeythatisabsurdlylong: 'Too Long'});
// {_fullData: 'false', thisisakeythatisabsu: 'Too Long'}

// The default limits can be overriden
formated = formatStripeMetadata(metadata, {
    maxNumKeys: 15,
    maxKeyLength: 18,
    maxValueLength: 400
});
```

## License
[MIT](https://github.com/sublimefund/format-stripe-metadata/blob/master/LICENSE)
