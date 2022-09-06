const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
const db = require("../db/connection");
const app = require(`../app`);
const request = require("supertest");

beforeEach(() => seed(testData));
afterAll(() => {
  if (db.end) db.end();
});

describe.only(`GET /api/categories`, () => {
  test(`200: responds with an array of categories`, () => {
    return request(app)
      .get(`/api/categories`)
      .expect(200)
      .then(({ body }) => {
        const categories = body.categories;
        expect(categories.length > 0).toBe(true);
        expect(typeof categories).toBe("object");
        categories.forEach((category) => {
          expect(typeof category.slug).toBe("string");
          expect(typeof category.description).toBe("string");
        });
      });
  });
});
