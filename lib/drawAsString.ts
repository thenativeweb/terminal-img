import chalk from 'chalk';
import { DrawOptions } from './DrawOptions';
import Jimp from 'jimp';

const characterFullBlock = '\u2588',
      characterLowerHalfBlock = '\u2584';

const drawAsString = async function (fileName: string, options: DrawOptions = {}): Promise<string> {
  let requestedWidth = options.width;
  let requestedHeight = options.height;

  if (!requestedWidth && !requestedHeight) {
    requestedWidth = process.stdout.columns || 80;
  }

  requestedWidth = requestedWidth ?? Jimp.AUTO;
  requestedHeight = requestedHeight ?? Jimp.AUTO;

  const image = await Jimp.read(fileName);

  const resizedImage = image.resize(requestedWidth, requestedHeight, Jimp.RESIZE_NEAREST_NEIGHBOR);

  let result = '';

  for (let y = 0; y < resizedImage.bitmap.height; y += 2) {
    for (let x = 0; x < resizedImage.bitmap.width; x++) {
      const upperColor = resizedImage.getPixelColor(x, y);
      const lowerColor = resizedImage.getPixelColor(x, y + 1);

      const upperColorAsRgba = Jimp.intToRGBA(upperColor);
      const lowerColorAsRgba = Jimp.intToRGBA(lowerColor);

      if (upperColor === lowerColor) {
        result += chalk.bgRgb(
          upperColorAsRgba.r,
          upperColorAsRgba.g,
          upperColorAsRgba.b
        ).rgb(
          upperColorAsRgba.r,
          upperColorAsRgba.g,
          upperColorAsRgba.b
        )(characterFullBlock);
        continue;
      }

      result += chalk.bgRgb(
        upperColorAsRgba.r,
        upperColorAsRgba.g,
        upperColorAsRgba.b
      ).rgb(
        lowerColorAsRgba.r,
        lowerColorAsRgba.g,
        lowerColorAsRgba.b
      )(characterLowerHalfBlock);
    }
    result += '\n';
  }

  return result;
};

export { drawAsString };
