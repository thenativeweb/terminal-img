# terminal-img

terminal-img renders an image to the terminal.

## Status

| Category         | Status                                                                                                                                           |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Version          | [![npm](https://img.shields.io/npm/v/terminal-img)](https://www.npmjs.com/package/terminal-img)                                                      |
| Dependencies     | ![David](https://img.shields.io/david/thenativeweb/terminal-img)                                                                                   |
| Dev dependencies | ![David](https://img.shields.io/david/dev/thenativeweb/terminal-img)                                                                               |
| Build            | ![GitHub Actions](https://github.com/thenativeweb/terminal-img/workflows/Release/badge.svg?branch=master) |
| License          | ![GitHub](https://img.shields.io/github/license/thenativeweb/terminal-img)                                                                         |


## Installation

```shell
$ npm install terminal-img
```

## Quick start

First you need to integrate terminal-img into your application:

```javascript
const { draw, drawAsString } = require('terminal-img');
```

If you use TypeScript, use the following code instead:

```typescript
import { draw, drawAsString } from 'terminal-img';
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

### Stringifying the image

From time to time, you may want to get the image as a string, instead of having it drawn immediately. For that, use the `drawAsString` function:

```javascript
const image = await drawAsString('logo.png');
```

All the options that work for `draw` work for `drawAsString` in the very same way.

### Running the sample application

To run the sample application, use the following command:

```shell
$ npx ts-node samples/app.ts
```

## Running the quality assurance

To build this module use [roboter](https://www.npmjs.com/package/roboter).

```shell
$ npx roboter
```
