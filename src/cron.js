import moment from 'moment';
import axios from 'axios';

import { ArticleService } from './services';

const BASE_URL = 'https://api.spaceflightnewsapi.net/v3/';

async function getNewArticles() {
  let lastUpdate = moment()
    .subtract(1, 'day')
    .set('hour', 9)
    .set('minutes', 0)
    .set('seconds', 0)
    .set('milliseconds', 0);

  const response = await axios.get(
    `${BASE_URL}articles?publishedAt_gt=${lastUpdate.toISOString()}`
  );
  return response.data;
}

export default async function cron() {
  try {
    let newArticles = await getNewArticles();
    await ArticleService.createArticle(newArticles);
    console.log(`${newArticles.length} new articles were found and saved.`);
  } catch (error) {
    console.log('Problem getting new articles.');
  }
}
