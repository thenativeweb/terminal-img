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

  const image = await Jimp.read(file);

  const requestedWidth = width || Jimp.AUTO;
  const requestedHeight = height || Jimp.AUTO;

  const resizedImage = image.resize(requestedWidth, requestedHeight, Jimp.RESIZE_NEAREST_NEIGHBOR);

  for (let y = 0; y < resizedImage.bitmap.height; y += 2) {
    for (let x = 0; x < resizedImage.bitmap.width; x++) {
      const upperColor = resizedImage.getPixelColor(x, y);
      const lowerColor = resizedImage.getPixelColor(x, y + 1);

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
