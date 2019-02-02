'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var chalk = require('chalk'),
    Jimp = require('jimp');

var characterFullBlock = "\u2588",
    characterLowerHalfBlock = "\u2584";

var drawAsString =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(file, _ref) {
    var width, height, image, requestedWidth, requestedHeight, resizedImage, result, y, x, upperColor, lowerColor;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            width = _ref.width, height = _ref.height;

            if (file) {
              _context.next = 3;
              break;
            }

            throw new Error('File is missing.');

          case 3:
            if (!width && !height) {
              width = process.stdout.columns || 80;
            }

            _context.next = 6;
            return Jimp.read(file);

          case 6:
            image = _context.sent;
            requestedWidth = width || Jimp.AUTO;
            requestedHeight = height || Jimp.AUTO;
            resizedImage = image.resize(requestedWidth, requestedHeight, Jimp.RESIZE_NEAREST_NEIGHBOR);
            result = '';
            y = 0;

          case 12:
            if (!(y < resizedImage.bitmap.height)) {
              _context.next = 28;
              break;
            }

            x = 0;

          case 14:
            if (!(x < resizedImage.bitmap.width)) {
              _context.next = 24;
              break;
            }

            upperColor = resizedImage.getPixelColor(x, y);
            lowerColor = resizedImage.getPixelColor(x, y + 1);

            if (!(upperColor === lowerColor)) {
              _context.next = 20;
              break;
            }

            result += chalk.bgHex(upperColor).hex(upperColor)(characterFullBlock);
            return _context.abrupt("continue", 21);

          case 20:
            result += chalk.bgHex(upperColor).hex(lowerColor)(characterLowerHalfBlock);

          case 21:
            x++;
            _context.next = 14;
            break;

          case 24:
            result += '\n';

          case 25:
            y += 2;
            _context.next = 12;
            break;

          case 28:
            return _context.abrupt("return", result);

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function drawAsString(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var draw =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(file, _ref3) {
    var width, height;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            width = _ref3.width, height = _ref3.height;
            _context2.t0 = process.stdout;
            _context2.next = 4;
            return drawAsString(file, {
              width: width,
              height: height
            });

          case 4:
            _context2.t1 = _context2.sent;

            _context2.t0.write.call(_context2.t0, _context2.t1);

          case 6:
          case "end":
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