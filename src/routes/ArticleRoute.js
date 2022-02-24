import { Router } from 'express';
import { ArticleController } from '../controller';

const routes = Router();

routes.get('/articles/count', ArticleController.countArticles);
routes.get('/articles', ArticleController.getArticles);
routes.get('/articles/:articleId', ArticleController.getArticle);
routes.post('/articles', ArticleController.createArticle);
routes.put('/articles/:articleId', ArticleController.updateArticle);
routes.delete('/articles/:articleId', ArticleController.deleteArticle);

export default routes;
