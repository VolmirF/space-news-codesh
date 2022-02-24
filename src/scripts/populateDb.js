import 'core-js/stable';
import 'regenerator-runtime/runtime';
import axios from 'axios';
import { ArticleService } from '../services';

const BASE_URL = 'https://api.spaceflightnewsapi.net/v3/';

async function getNumberOfArticles() {
  const request = await axios.get(`${BASE_URL}articles/count`);
  return request.data;
}

async function getArticlesPage(pageNumber, pageSize) {
  const request = await axios.get(
    `${BASE_URL}articles?_limit=${pageSize}&_start=${
      (pageNumber - 1) * pageSize
    }`
  );
  return request.data;
}

async function populateDb() {
  try {
    const numberArticles = await getNumberOfArticles();
    const documentsPerPage = 100;
    const totalPages = Math.ceil(numberArticles / documentsPerPage);

    console.log(`Found ${numberArticles} articles.\n`);

    for (let actualPage = 1; actualPage <= totalPages; actualPage++) {
      const articles = await getArticlesPage(actualPage, documentsPerPage);

      await ArticleService.createArticle(articles);

      console.log(
        `${actualPage * documentsPerPage}/${numberArticles} articles saved`
      );
    }
    console.log(`All ${numberArticles} articles have been saved`);
  } catch (error) {
    console.log('Problem populating database');
  }
}

populateDb().then(() => {
  process.exit();
});
