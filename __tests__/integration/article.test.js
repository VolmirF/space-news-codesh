import request from 'supertest';
import app from '../../src/app';

describe('CRUD Article', () => {
  const article = {
    title:
      'SpaceX Falcon 9 rockets scheduled to launch five Starlink missions in a row',
    url: 'https://www.teslarati.com/spacex-falcon-9-five-starlink-launches-in-a-row/',
    imageUrl:
      'https://www.teslarati.com/wp-content/uploads/2020/06/Starlink-V1-L8-Falcon-9-B1059-LC40-061220-Richard-Angle-prelaunch-4-c.jpg',
    newsSite: 'Teslarati',
    summary:
      'In lieu of commercial missions ready to fly, SpaceX Falcon 9 rockets are currently scheduled to launch at least five batches of...',
    featured: false,
    launches: [
      {
        provider: 'Launch Library 2',
      },
    ],
    events: [
      {
        provider: 'Event Library 2',
      },
    ],
  };

  let countArticles;
  it('should return the count of articles', async () => {
    const response = await request(app).get('/articles/count');
    expect(response.status).toBe(200);
    expect(typeof response.body.count).toBe('number');
    countArticles = response.body.count;
  });

  it('should create a article', async () => {
    const response = await request(app).post('/articles').send(article);
    expect(response.status).toBe(201);

    expect(response.body.title).toBe(article.title);
    expect(response.body.url).toBe(article.url);
    expect(response.body.imageUrl).toBe(article.imageUrl);
    expect(response.body.newsSite).toBe(article.newsSite);
    expect(response.body.summary).toBe(article.summary);
    expect(response.body.featured).toBe(article.featured);

    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('publishedAt');
    expect(response.body).toHaveProperty('updatedAt');

    article._id = response.body._id;
  });

  it('should return the new count of articles', async () => {
    const response = await request(app).get('/articles/count');
    expect(response.status).toBe(200);
    expect(typeof response.body.count).toBe('number');
    expect(response.body.count).toBe(countArticles + 1);
  });

  it('should find the article created', async () => {
    const response = await request(app).get(`/articles/${article._id}`);
    expect(response.status).toBe(200);

    expect(response.body.title).toBe(article.title);
    expect(response.body.url).toBe(article.url);
    expect(response.body.imageUrl).toBe(article.imageUrl);
    expect(response.body.newsSite).toBe(article.newsSite);
    expect(response.body.summary).toBe(article.summary);
    expect(response.body.featured).toBe(article.featured);

    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('publishedAt');
    expect(response.body).toHaveProperty('updatedAt');
  });

  it('should find a list of articles with the article created', async () => {
    const response = await request(app).get('/articles');
    expect(response.status).toBe(200);

    expect(response.body).toBeInstanceOf(Array);

    expect(response.body.find((e) => e._id === article._id)).toBeTruthy();
  });

  it('should update the article', async () => {
    article.title = 'New title';
    article.url = 'New url';

    const responseUpdate = await request(app)
      .put(`/articles/${article._id}`)
      .send(article);
    expect(responseUpdate.status).toBe(200);

    expect(responseUpdate.body.title).toBe(article.title);
    expect(responseUpdate.body.url).toBe(article.url);
    expect(responseUpdate.body.imageUrl).toBe(article.imageUrl);
    expect(responseUpdate.body.newsSite).toBe(article.newsSite);
    expect(responseUpdate.body.summary).toBe(article.summary);
    expect(responseUpdate.body.featured).toBe(article.featured);

    expect(responseUpdate.body).toHaveProperty('_id');
    expect(responseUpdate.body).toHaveProperty('publishedAt');
    expect(responseUpdate.body).toHaveProperty('updatedAt');

    expect(responseUpdate.body._id).toBe(article._id);

    const responseGet = await request(app).get(`/articles/${article._id}`);
    expect(responseGet.status).toBe(200);

    expect(responseGet.body.title).toBe(article.title);
    expect(responseGet.body.url).toBe(article.url);
    expect(responseGet.body.imageUrl).toBe(article.imageUrl);
    expect(responseGet.body.newsSite).toBe(article.newsSite);
    expect(responseGet.body.summary).toBe(article.summary);
    expect(responseGet.body.featured).toBe(article.featured);
  });

  it('should delete the article', async () => {
    const responseUpdate = await request(app).delete(
      `/articles/${article._id}`
    );
    expect(responseUpdate.status).toBe(200);

    const responseGet = await request(app).get(`/articles/${article._id}`);
    expect(responseGet.status).toBe(404);
  });

  it('should return the new count of articles', async () => {
    const response = await request(app).get('/articles/count');
    expect(response.status).toBe(200);
    expect(typeof response.body.count).toBe('number');
    expect(response.body.count).toBe(countArticles);
  });
});

describe('CRUD Article - Exceptions expected', () => {
  const article = {
    title:
      'SpaceX Falcon 9 rockets scheduled to launch five Starlink missions in a row',
    url: 'https://www.teslarati.com/spacex-falcon-9-five-starlink-launches-in-a-row/',
    imageUrl:
      'https://www.teslarati.com/wp-content/uploads/2020/06/Starlink-V1-L8-Falcon-9-B1059-LC40-061220-Richard-Angle-prelaunch-4-c.jpg',
    newsSite: 'Teslarati',
    summary:
      'In lieu of commercial missions ready to fly, SpaceX Falcon 9 rockets are currently scheduled to launch at least five batches of...',
    featured: false,
    launches: [
      {
        provider: 'Launch Library 2',
      },
    ],
    events: [
      {
        provider: 'Event Library 2',
      },
    ],
  };
  it('should send a error when trying to create a article without a title', async () => {
    const temporaryArticle = Object.assign(article);
    temporaryArticle.title = undefined;
    const response = await request(app)
      .post('/articles')
      .send(temporaryArticle);
    expect(response.status).toBe(400);
  });

  it('should send a error when trying to create a participation without a mandaory field', async () => {
    const temporaryParticipation = Object.assign(article);
    temporaryParticipation.title = undefined;
    let response = await request(app)
      .post('/articles')
      .send(temporaryParticipation);
    expect(response.status).toBe(400);

    temporaryParticipation.title = article.title;
    temporaryParticipation.url = undefined;
    response = await request(app)
      .post('/articles')
      .send(temporaryParticipation);
    expect(response.status).toBe(400);

    temporaryParticipation.url = article.url;
    temporaryParticipation.imageUrl = undefined;
    response = await request(app)
      .post('/articles')
      .send(temporaryParticipation);
    expect(response.status).toBe(400);

    temporaryParticipation.imageUrl = article.imageUrl;
    temporaryParticipation.newsSite = undefined;
    response = await request(app)
      .post('/articles')
      .send(temporaryParticipation);
    expect(response.status).toBe(400);

    temporaryParticipation.newsSite = article.newsSite;
    temporaryParticipation.featured = undefined;
    response = await request(app)
      .post('/articles')
      .send(temporaryParticipation);
    expect(response.status).toBe(400);
  });

  it('should send a error when trying to update a article that does not exist', async () => {
    const response = await request(app).put(`/articles/invalidId`);
    expect(response.status).toBe(400);
  });

  it('should send a error when trying to delete a article that does not exist', async () => {
    const response = await request(app).delete(`/articles/invalidId`);
    expect(response.status).toBe(400);
  });

  it('should send a error when trying to find a article that does not exist', async () => {
    const response = await request(app).get(`/articles/invalidId`);
    expect(response.status).toBe(400);
  });
});
