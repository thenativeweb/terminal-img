'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chalk = require('chalk'),
    Jimp = require('jimp');

var characterFullBlock = '\u2588',
    characterLowerHalfBlock = '\u2584';

var drawAsString = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(file, _ref) {
    var width = _ref.width,
        height = _ref.height;
    var image, requestedWidth, requestedHeight, resizedImage, result, y, x, upperColor, lowerColor;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (file) {
              _context.next = 2;
              break;
            }

            throw new Error('File is missing.');

          case 2:

            if (!width && !height) {
              width = process.stdout.columns || 80;
            }

            _context.next = 5;
            return Jimp.read(file);

          case 5:
            image = _context.sent;
            requestedWidth = width || Jimp.AUTO;
            requestedHeight = height || Jimp.AUTO;
            resizedImage = image.resize(requestedWidth, requestedHeight, Jimp.RESIZE_NEAREST_NEIGHBOR);
            result = '';
            y = 0;

          case 11:
            if (!(y < resizedImage.bitmap.height)) {
              _context.next = 27;
              break;
            }

            x = 0;

          case 13:
            if (!(x < resizedImage.bitmap.width)) {
              _context.next = 23;
              break;
            }

            upperColor = resizedImage.getPixelColor(x, y);
            lowerColor = resizedImage.getPixelColor(x, y + 1);

            if (!(upperColor === lowerColor)) {
              _context.next = 19;
              break;
            }

            result += chalk.bgHex(upperColor).hex(upperColor)(characterFullBlock);
            return _context.abrupt('continue', 20);

          case 19:

            result += chalk.bgHex(upperColor).hex(lowerColor)(characterLowerHalfBlock);

          case 20:
            x++;
            _context.next = 13;
            break;

          case 23:
            result += '\n';

          case 24:
            y += 2;
            _context.next = 11;
            break;

          case 27:
            return _context.abrupt('return', result);

          case 28:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function drawAsString(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var draw = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(file, _ref3) {
    var width = _ref3.width,
        height = _ref3.height;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = process.stdout;
            _context2.next = 3;
            return drawAsString(file, { width: width, height: height });

          case 3:
            _context2.t1 = _context2.sent;

            _context2.t0.write.call(_context2.t0, _context2.t1);

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function draw(_x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}();

draw.asString = drawAsString;

module.exports = draw;