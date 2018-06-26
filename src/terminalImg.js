'use strict';

const chalk = require('chalk'),
      Jimp = require('jimp');

const characterFullBlock = '\u2588',
      characterLowerHalfBlock = '\u2584';

const draw = async function (file, { width, height }) {
  if (!file) {
    throw new Error('File is missing.');
  }

  if (!width && !height) {
    width = process.stdout.columns || 80;
  }

  const png = await Jimp.read(file);

  const requestedWidth = width || Jimp.AUTO;
  const requestedHeight = height || Jimp.AUTO;

  const resizedLogo = png.resize(requestedWidth, requestedHeight, Jimp.RESIZE_NEAREST_NEIGHBOR);

  for (let y = 0; y < resizedLogo.bitmap.height; y += 2) {
    for (let x = 0; x < resizedLogo.bitmap.width; x++) {
      const upperColor = resizedLogo.getPixelColor(x, y);
      const lowerColor = resizedLogo.getPixelColor(x, y + 1);

      if (upperColor === lowerColor) {
        process.stdout.write(chalk.bgHex(upperColor).hex(upperColor)(characterFullBlock));
        continue;
      }

      process.stdout.write(chalk.bgHex(upperColor).hex(lowerColor)(characterLowerHalfBlock));
    }
    process.stdout.write('\n');
  }
};

module.exports = draw;
