const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
const db = require("../db/connection");
const app = require(`../app`);
const request = require("supertest");

beforeEach(() => seed(testData));
afterAll(() => {
  db.end();
});

describe(`GET /api/categories`, () => {
  test(`200: responds with an array of categories`, () => {
    return request(app)
      .get(`/api/categories`)
      .expect(200)
      .then(({ body }) => {
        const categories = body.categories;
        expect(categories.length > 0).toBe(true);
        expect(Array.isArray(categories)).toBe(true);
        categories.forEach((category) => {
          expect(typeof category.slug).toBe("string");
          expect(typeof category.description).toBe("string");
        });
      });
  });
});
describe(`GET incorrect path`, () => {
  test(`404 - page not found`, () => {
    return request(app)
      .get(`/api/cats`)
      .expect(404)
      .then(({ body }) => {
        const message = body.message;
        expect(message).toBe("page not found");
      });
  });
});
describe(`GET /api/reviews/:review_id`, () => {
  test(`200: responds with an object`, () => {
    const review_id = 1;
    return request(app)
      .get(`/api/reviews/${review_id}`)
      .expect(200)
      .then(({ body }) => {
        const review = body.review;
        expect(review).toEqual({
          review_id: 1,
          title: "Agricola",
          designer: "Uwe Rosenberg",
          owner: "mallionaire",
          review_img_url:
            "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
          review_body: "Farmyard fun!",
          category: "euro game",
          created_at: expect.any(String),
          votes: 1,
        });
      });
  });
  test(`review_id is not a number`, () => {
    return request(app)
      .get(`/api/reviews/holla`)
      .expect(400)
      .then(({ body }) => {
        const message = body.message;
        expect(message).toBe("bad request");
      });
  });
  test(`review_id is a number that is out of range`, () => {
    return request(app)
      .get(`/api/reviews/1000000`)
      .expect(404)
      .then(({ body }) => {
        const message = body.message;
        expect(message).toBe("not found");
      });
  });
});

describe(`GET /api/users`, () => {
  test(`200: responds with an array of users`, () => {
    return request(app)
      .get(`/api/users`)
      .expect(200)
      .then(({ body }) => {
        const users = body.users;
        expect(users.length > 0).toBe(true);
        expect(Array.isArray(users)).toBe(true);
        users.forEach((user) => {
          expect(typeof user.username).toBe("string");
          expect(typeof user.name).toBe("string");
          expect(typeof user.avatar_url).toBe("string");
        });
      });
  });
});
