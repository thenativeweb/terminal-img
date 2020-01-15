import { drawAsString } from './drawAsString';
import { DrawOptions } from './DrawOptions';

const draw = async function (fileName: string, options?: DrawOptions): Promise<void> {
  process.stdout.write(await drawAsString(fileName, options));
};

export { draw };
