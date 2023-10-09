process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
const shoppingList = require("../fakeDb");

const apple = { name: "apple", price: 200 };

beforeEach(() => {
  shoppingList.push(apple);
});

afterEach(() => {
  shoppingList.length = 0;
});

describe("Shopping Item Routes", () => {
  describe("GET /items", () => {
    it("should return a list of items", async () => {
      const response = await request(app).get("/items");
      expect(response.statusCode).toBe(200);
      expect(response.body.items).toHaveLength(1);
    });
  });

  describe("GET /items/:name", () => {
    it("should return a single item", async () => {
      const response = await request(app).get(`/items/${apple.name}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.item).toEqual(apple);
    });

    it("should respond with 404 if the item is not found", async () => {
      const response = await request(app).get("/items/nonexistent");
      expect(response.statusCode).toBe(404);
    });
  });

  describe("POST /items", () => {
    it("should create a new item", async () => {
      const newItemData = {
        name: "Taco",
        price: 0,
      };
      const response = await request(app).post("/items").send(newItemData);
      expect(response.statusCode).toBe(200);
      expect(response.body.item).toHaveProperty("name", newItemData.name);
      expect(response.body.item).toHaveProperty("price", newItemData.price);
    });
  });

  describe("PATCH /items/:name", () => {
    it("should update a single item", async () => {
      const updatedItem = { name: "Troll" };
      const response = await request(app)
        .patch(`/items/${apple.name}`)
        .send(updatedItem);
      expect(response.statusCode).toBe(200);
      expect(response.body.item).toEqual(updatedItem);
    });

    it("should respond with 404 if the item is not found", async () => {
      const response = await request(app).patch("/items/nonexistent");
      expect(response.statusCode).toBe(404);
    });
  });

  describe("DELETE /items/:name", () => {
    it("should delete a single item", async () => {
      const response = await request(app).delete(`/items/${apple.name}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ message: "Deleted" });
    });
  });
});
