import mongoose from 'mongoose';

import Article from '../models/Article';
import Event from '../models/Event';
import Launch from '../models/Launch';

export default {
  countArticles: async () => {
    const articlesCount = await Article.count();
    return articlesCount;
  },
  getArticles: async (pageSize = 100, pageNumber) => {
    const articles = await Article.find()
      .skip(pageNumber > 0 ? (pageNumber - 1) * pageSize : 0)
      .limit(pageSize)
      .populate(['launches', 'events']);
    return articles;
  },
  getArticle: async (articleId) => {
    const article = await Article.findById(articleId).populate([
      'launches',
      'events',
    ]);
    return article;
  },
  createArticle: async (article) => {
    const session = await mongoose.startSession();

    let documents;

    await session.withTransaction(async () => {
      let articlesToCreate = article;
      if (!article.length) {
        articlesToCreate = [articlesToCreate];
      }

      for (let i = 0; i < articlesToCreate.length; i++) {
        const articleElement = articlesToCreate[i];
        let launches = [];
        let events = [];
        if (articleElement.launches)
          for (let j = 0; j < articleElement.launches.length; j++) {
            const launch = articleElement.launches[j];
            if (launch._id) {
              launches.push({ _id: launch._id });
            } else {
              let launchCreated = await Launch.create([launch], {
                session: session,
              });
              launches.push({ _id: launchCreated[0]._id });
            }
          }

        if (articleElement.events)
          for (let j = 0; j < articleElement.events.length; j++) {
            const event = articleElement.events[j];
            if (event._id) {
              events.push({ _id: event._id });
            } else {
              let eventCreated = await Event.create([event], {
                session: session,
              });
              events.push({ _id: eventCreated[0]._id });
            }
          }
        articleElement.launches = launches;
        articleElement.events = events;
      }

      articlesToCreate = await Article.create(articlesToCreate, {
        session: session,
      });

      documents = articlesToCreate;
    });
    session.endSession();

    const articlesCreated = await Article.find({
      _id: {
        $in: documents.map((e) => e._id),
      },
    }).populate(['launches', 'events']);

    if (!article.length) {
      return articlesCreated[0];
    }
    return articlesCreated;
  },
  updateArticle: async (articleId, article) => {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      let launches = [];
      let events = [];

      if (article.launches)
        for (let i = 0; i < article.launches.length; i++) {
          const launch = article.launches[i];
          if (launch._id) {
            launches.push({ _id: launch._id });
          } else {
            let launchCreated = await Launch.create([launch], {
              session: session,
            });
            launches.push({ _id: launchCreated[0]._id });
          }
        }

      if (article.events)
        for (let i = 0; i < article.events.length; i++) {
          const event = article.events[i];
          if (event._id) {
            events.push({ _id: event._id });
          } else {
            let eventCreated = await Event.create([event], {
              session: session,
            });
            events.push({ _id: eventCreated[0]._id });
          }
        }

      article.launches = launches;
      article.events = events;
      article = await Article.findByIdAndUpdate(articleId, article, {
        new: true,
        session: session,
      });
      await session.commitTransaction();
      session.endSession();
      return article;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw 'Error creating new article';
    }
  },
  deleteArticle: async (articleId) => {
    await Article.findByIdAndRemove(articleId);
  },
};
