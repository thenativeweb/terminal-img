import { draw } from '../lib';
import path from 'path';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async (): Promise<void> => {
  try {
    await draw(path.join(__dirname, 'wolkenkit.png'), { width: 100 });
  } catch (ex: unknown) {
    // eslint-disable-next-line no-console
    console.log(ex);

    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1);
  }
})();
