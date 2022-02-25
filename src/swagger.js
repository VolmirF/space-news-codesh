const fs = require('fs');
const swaggerAutogen = require('swagger-autogen')();

const outputFile = './docs/swagger_output.json';
const endpointsFiles = fs.readdirSync('./src/routes');

const doc = {
  info: {
    version: '1.0.0',
    title: 'Space News Codesh API',
    description: 'Documentation of Space News Codesh API.',
  },
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Articles',
      // description: 'Endpoints',
    },
  ],
  // securityDefinitions: {
  //   api_key: {
  //     type: 'apiKey',
  //     name: 'api_key',
  //     in: 'header',
  //   },
  //   petstore_auth: {
  //     type: 'oauth2',
  //     authorizationUrl: 'https://petstore.swagger.io/oauth/authorize',
  //     flow: 'implicit',
  //     scopes: {
  //       read_pets: 'read your pets',
  //       write_pets: 'modify pets in your account',
  //     },
  //   },
  // },
  definitions: {
    Article: {
      _id: '6217951e81f99f25077865fe',
      title:
        'SpaceX Falcon 9 rockets scheduled to launch five Starlink missions in a row',
      url: 'https://www.teslarati.com/spacex-falcon-9-five-starlink-launches-in-a-row/',
      imageUrl:
        'https://www.teslarati.com/wp-content/uploads/2020/06/Starlink-V1-L8-Falcon-9-B1059-LC40-061220-Richard-Angle-prelaunch-4-c.jpg',
      newsSite: 'Teslarati',
      summary:
        'In lieu of commercial missions ready to fly, SpaceX Falcon 9 rockets are currently scheduled to launch at least five batches of...',
      publishedAt: '2022-02-24T12:09:56.000Z',
      updatedAt: '2022-02-24T15:15:50.408Z',
      featured: false,
      launches: [
        {
          id: 'b7b24770-f9dd-40eb-adad-da95e917e55d',
          provider: 'Launch Library 2',
        },
      ],
      events: [
        {
          id: '861795c5-e694-4d3e-b22f-a356a31cd5d8',
          provider: 'Event Library 2',
        },
      ],
    },
    NewArticle: {
      $title:
        'SpaceX Falcon 9 rockets scheduled to launch five Starlink missions in a row',
      $url: 'https://www.teslarati.com/spacex-falcon-9-five-starlink-launches-in-a-row/',
      $imageUrl:
        'https://www.teslarati.com/wp-content/uploads/2020/06/Starlink-V1-L8-Falcon-9-B1059-LC40-061220-Richard-Angle-prelaunch-4-c.jpg',
      $newsSite: 'Teslarati',
      summary:
        'In lieu of commercial missions ready to fly, SpaceX Falcon 9 rockets are currently scheduled to launch at least five batches of...',
      $featured: false,
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
    },
  },
};

swaggerAutogen(
  outputFile,
  endpointsFiles.map((e) => './src/routes/' + e),
  doc
);
