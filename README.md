# format-stripe-metadata [![npm](https://img.shields.io/npm/v/format-stripe-metadata.svg)](https://www.npmjs.com/package/format-stripe-metadata) [![npm](https://img.shields.io/npm/l/format-stripe-metadata.svg)](https://github.com/sublimefund/format-stripe-metadata/blob/master/LICENSE) [![Build Status](https://travis-ci.org/sublimefund/format-stripe-metadata.svg?branch=master)](https://travis-ci.org/sublimefund/format-stripe-metadata) [![codecov](https://codecov.io/gh/sublimefund/format-stripe-metadata/branch/master/graph/badge.svg)](https://codecov.io/gh/sublimefund/format-stripe-metadata)
[Stripe](https://stripe.com/) allows attaching [metadata](https://stripe.com/docs/api#metadata) to certain objects. However, there are documented limits on the metadata. If
they aren't met, then calling the Stripe API will fail. This package formats the
input data to ensure compliance.

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
```js
import {formatStripeMetadata} from 'format-stripe-metadata';
// or
const formatStripeMetadata = require('format-stripe-metadata').formatStripeMetadata;

formatStripeMetadata(null); // returns {}
```

## Alternatives

## License
[MIT](https://github.com/sublimefund/format-stripe-metadata/blob/master/LICENSE)
