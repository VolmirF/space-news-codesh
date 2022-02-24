import { Router } from 'express';
import ArticleRoute from './ArticleRoute';

const routes = Router();

routes.get('/', (req, res) => {
  res.send('Back-end Challenge 2021 🏅 - Space Flight News');
});

export default [routes, ArticleRoute];
