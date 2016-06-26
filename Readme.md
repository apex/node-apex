
# Apex Node.js

Node.js module that makes AWS Lambda's user experience a little nicer.

```js
export default λ(e => 'Hello World')
```

## Installation

```
$ npm install --save apex.js
```

## Features

- return promises
- return results
- actually report uncaught errors (Lambda does not)

## Example

The following example fetches some urls and reports the response status of each. The context and callback are also passed, but are not
shown here.

```js
import axios from 'axios'
import λ from 'apex.js'
import 'babel-polyfill'

export default λ(e => {
  console.log('fetching %d urls', e.urls.length)
  return Promise.all(e.urls.map(async (url) => {
    console.log('fetching %s', url)
    return {
      status: (await axios.get(url)).status,
      url
    }
  }))
})
```

Without this module it looks something like the following, as Lambda does not try/catch, and the Context
provided has awkward method names that are not idiomatic, or you must use the callback.

```js
import axios from 'axios'
import 'babel-polyfill'

// Vanilla Lambda function.
export default async (e, ctx, cb) => {
  console.log('fetching %d urls', e.urls.length)

  try {
    const res = await Promise.all(e.urls.map(async (url) => {
      console.log('fetching %s', url)
      return {
        status: (await axios.get(url)).status,
        url
      }
    }))

    // or ctx.succeed(res);
    cb(null, res);
  } catch (err) {
    // or ctx.fail(err);
    cb(err);
  }
}
```

## Contributors

- [TJ Holowaychuk](https://github.com/tj)

## Badges

![](https://img.shields.io/badge/license-MIT-blue.svg)
![](https://img.shields.io/badge/status-stable-green.svg)

---

> [tjholowaychuk.com](http://tjholowaychuk.com) &nbsp;&middot;&nbsp;
> GitHub [@tj](https://github.com/tj) &nbsp;&middot;&nbsp;
> Twitter [@tjholowaychuk](https://twitter.com/tjholowaychuk)
