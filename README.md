# terminal-img

terminal-img renders an image to the terminal.

## Installation

```shell
$ npm install terminal-img
```

## Quick start

First you need to integrate terminal-img into your application.

```javascript
const draw = require('terminal-img');
```

Then you can call the `draw` function with an image file as parameter to draw the image to the terminal. The file can be given either as a path or a url. The module supports the image formats `.png` and `.jpg`:

```javascript
await draw('logo.png');
```

By default, the image is being rendered using the terminal's width. If the width can not be determined, the `draw` function falls back to 80 columns.

### Resizing the image

To resize the image, you may optionally specify a `width` and or a `height` using an options object:

```javascript
await draw('logo.png', { width: 80, height: 25 });
```

If you specify only one of `width` and `height`, the other value is calculated automatically in a way that preserves the image's aspect ratio. If you provide both of them, the image may become deformed.

## Running the build

To build this module use [roboter](https://www.npmjs.com/package/roboter).

```shell
$ npx roboter
```

## License

The MIT License (MIT)
Copyright (c) 2018 the native web.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
