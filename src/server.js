import 'core-js/stable';
import 'regenerator-runtime/runtime';
import nodeCron from 'node-cron';

import cron from './cron';
import app from './app.js';

if (process.env.NODE_ENV !== 'test') {
  nodeCron.schedule('* 9 * * *', cron, {
    scheduled: true,
    timezone: 'America/Sao_Paulo',
  });
}

app.listen(process.env.PORT || 3000);
