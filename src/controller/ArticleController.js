import { ArticleService } from '../services';

export default {
  countArticles: async (req, res) => {
    try {
      const count = await ArticleService.countArticles();
      res.status(200).send({ count });
    } catch (error) {
      res.status(400).send('Error counting articles');
    }
  },
  getArticles: async (req, res) => {
    try {
      const articles = await ArticleService.getArticles(
        req.query.page_size,
        req.query.page_num
      );
      res.send(articles);
    } catch (error) {
      res.status(400).send('Error loading articles');
    }
  },
  getArticle: async (req, res) => {
    try {
      const article = await ArticleService.getArticle(req.params.articleId);
      if (article === null) {
        return res.status(404).send('Article not found');
      }
      res.send(article);
    } catch (error) {
      console.log('error: ', error);
      res.status(400).send('Error loading article');
    }
  },
  createArticle: async (req, res) => {
    try {
      const article = await ArticleService.createArticle(req.body);
      res.status(201).send(article);
    } catch (error) {
      console.log('error: ', error);

      res.status(400).send('Error creating new article');
    }
  },
  updateArticle: async (req, res) => {
    try {
      const article = await ArticleService.updateArticle(
        req.params.articleId,
        req.body
      );
      res.send(article);
    } catch (error) {
      res.status(400).send('Error creating new article');
    }
  },
  deleteArticle: async (req, res) => {
    try {
      await ArticleService.deleteArticle(req.params.articleId);
      res.send();
    } catch (error) {
      res.status(400).send('Error deleting reservation');
    }
  },
};
