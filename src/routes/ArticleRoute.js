import { Router } from 'express';
import { ArticleController } from '../controller';

const routes = Router();

routes.get(
  '/articles/count',
  ArticleController.countArticles
  /*
    #swagger.tags = ['Articles']
  */
);

routes.get(
  '/articles',
  ArticleController.getArticles
  /*
    #swagger.tags = ['Articles']
    #swagger.parameters['page_size'] = {
      in: 'query',
      description: 'Number of documents per page.',
      type: 'number'
    }
    #swagger.parameters['page_num'] = {
      in: 'query',
      description: 'Number of current page.',
      type: 'number'
    }
    #swagger.responses[200] = { 
      schema: [{ $ref: "#/definitions/Article" }],
      description: 'Article list.'
    }
  */
);

routes.get(
  '/articles/:articleId',
  ArticleController.getArticle
  /*
    #swagger.tags = ['Articles']
    #swagger.parameters['articleId'] = { description: 'Article id.'}
    #swagger.responses[200] = { 
      schema: { $ref: "#/definitions/Article" },
      description: 'Article found.'
    }
  */
);

routes.post(
  '/articles',
  ArticleController.createArticle
  /*
    #swagger.tags = ['Articles']
    #swagger.parameters['newArticle'] = {
      in: 'body',
      description: 'Article that will be created. Can be an array, creating 
                    multiple records at once ',
      required: true,
      schema: { $ref: "#/definitions/NewArticle" }
    }
    #swagger.responses[200] = { 
      schema: { $ref: "#/definitions/Article" },
      description: 'Article created.'
    }
  */
);

routes.put(
  '/articles/:articleId',
  ArticleController.updateArticle
  /*
    #swagger.tags = ['Articles']
    #swagger.parameters['articleId'] = { description: 'Article id.'}
    #swagger.parameters['updatedArticle'] = {
      in: 'body',
      description: 'Article that will be updated.',
      required: true,
      schema: { $ref: "#/definitions/NewArticle" }
    }
    #swagger.responses[200] = { 
      schema: { $ref: "#/definitions/NewArticle" },
      description: 'Article updated.'
    }
  */
);
routes.delete(
  '/articles/:articleId',
  ArticleController.deleteArticle
  /*
    #swagger.tags = ['Articles']
    #swagger.parameters['articleId'] = { description: 'Article id.'}
    
  */
);

export default routes;
