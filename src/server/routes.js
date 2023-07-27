import { faker } from '@faker-js/faker';

const registerRoutes = (app) => {
  app.get('/getSampleData', (req, res) => {
    let result = faker.helpers.multiple(
      () => {
        return {
          userId: faker.string.uuid(),
          username: faker.internet.userName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          birthdate: faker.date.birthdate(),
          registeredAt: faker.date.past(),
        };
      },
      {
        count: 50,
      }
    );
    res.send(result);
  });
};

export default registerRoutes;
