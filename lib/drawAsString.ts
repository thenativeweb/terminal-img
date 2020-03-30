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

      const upperColorAsRGBA = Jimp.intToRGBA(upperColor);
      const lowerColorAsRGBA = Jimp.intToRGBA(lowerColor);

      if (upperColor === lowerColor) {
        result += chalk.bgRgb(
          upperColorAsRGBA.r,
          upperColorAsRGBA.g,
          upperColorAsRGBA.b
        ).rgb(
          upperColorAsRGBA.r,
          upperColorAsRGBA.g,
          upperColorAsRGBA.b
        )(characterFullBlock);
        continue;
      }

      result += chalk.bgRgb(
        upperColorAsRGBA.r,
        upperColorAsRGBA.g,
        upperColorAsRGBA.b
      ).rgb(
        lowerColorAsRGBA.r,
        lowerColorAsRGBA.g,
        lowerColorAsRGBA.b
      )(characterLowerHalfBlock);
    }
    result += '\n';
  }

  return result;
};

export { drawAsString };
