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

var draw = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(file, _ref) {
    var width = _ref.width,
        height = _ref.height;
    var png, requestedWidth, requestedHeight, resizedLogo, y, x, upperColor, lowerColor;
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
            png = _context.sent;
            requestedWidth = width || Jimp.AUTO;
            requestedHeight = height || Jimp.AUTO;
            resizedLogo = png.resize(requestedWidth, requestedHeight, Jimp.RESIZE_NEAREST_NEIGHBOR);
            y = 0;

          case 10:
            if (!(y < resizedLogo.bitmap.height)) {
              _context.next = 26;
              break;
            }

            x = 0;

          case 12:
            if (!(x < resizedLogo.bitmap.width)) {
              _context.next = 22;
              break;
            }

            upperColor = resizedLogo.getPixelColor(x, y);
            lowerColor = resizedLogo.getPixelColor(x, y + 1);

            if (!(upperColor === lowerColor)) {
              _context.next = 18;
              break;
            }

            process.stdout.write(chalk.bgHex(upperColor).hex(upperColor)(characterFullBlock));
            return _context.abrupt('continue', 19);

          case 18:

            process.stdout.write(chalk.bgHex(upperColor).hex(lowerColor)(characterLowerHalfBlock));

          case 19:
            x++;
            _context.next = 12;
            break;

          case 22:
            process.stdout.write('\n');

          case 23:
            y += 2;
            _context.next = 10;
            break;

          case 26:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function draw(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports = draw;