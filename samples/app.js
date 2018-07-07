'use strict';

const path = require('path');

const draw = require('../src/terminalImg');

(async () => {
  await draw(path.join(__dirname, 'wolkenkit.png'), { width: 50 });
})();
