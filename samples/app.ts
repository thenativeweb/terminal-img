import { draw } from '../lib';
import path from 'path';

/* eslint-disable @typescript-eslint/no-floating-promises */
(async (): Promise<void> => {
  try {
    await draw(path.join(__dirname, 'wolkenkit.png'), { width: 100 });
  } catch (ex) {
    /* eslint-disable no-console */
    console.log(ex);
    /* eslint-enable no-console */

    /* eslint-disable unicorn/no-process-exit */
    process.exit(1);
    /* eslint-enable unicorn/no-process-exit */
  }
})();
/* eslint-enable @typescript-eslint/no-floating-promises */
