'use strict';

const chalk = require('chalk'),
      Jimp = require('jimp');

const characterFullBlock = '\u2588',
      characterLowerHalfBlock = '\u2584';

const drawAsString = async function (file, { width, height }) {
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

  let result = '';

  for (let y = 0; y < resizedImage.bitmap.height; y += 2) {
    for (let x = 0; x < resizedImage.bitmap.width; x++) {
      const upperColor = resizedImage.getPixelColor(x, y);
      const lowerColor = resizedImage.getPixelColor(x, y + 1);

      if (upperColor === lowerColor) {
        result += chalk.bgHex(upperColor).hex(upperColor)(characterFullBlock);
        continue;
      }

      result += chalk.bgHex(upperColor).hex(lowerColor)(characterLowerHalfBlock);
    }
    result += '\n';
  }

  return result;
};

const draw = async function (file, { width, height }) {
  process.stdout.write(await drawAsString(file, { width, height }));
};

draw.asString = drawAsString;

module.exports = draw;
