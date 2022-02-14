const { Pokemon, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Pokemon model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Pokemon.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name", () => {
        Pokemon.create({ name: "Pikachu" });
      });
    });
  });

  describe("Id", () => {
    it("Should Create an ID", async () => {
      await Pokemon.create({ name: "pikachu" });
      const poke = await Pokemon.findOne({ where: { name: "pikachu" } });
      expect(poke.dataValues).to.have.own.property("id");
      expect(poke.dataValues.id).to.not.equal("");
    });
  });

  describe("HP", () => {
    it("Must have a property hp ", async () => {
      await Pokemon.create({ name: "pikachu", hp: 30 });
      const poke = await Pokemon.findOne({ where: { name: "pikachu" } });
      expect(poke.dataValues).to.have.own.property("hp");
    });

    it("HP must be 30", async () => {
      const poke = await Pokemon.findOne({ where: { name: "pikachu" } });
      expect(poke.dataValues.HP).to.not.equal(30);
    });
  });

  describe("attack", () => {
    it("Must have a property attack", async () => {
      await Pokemon.create({ name: "pikachu", attack: "200" });
      const poke = await Pokemon.findOne({ where: { name: "pikachu" } });
      expect(poke.dataValues).to.have.own.property("attack");
    });

    it("attack must be 200", async () => {
      const poke = await Pokemon.findOne({ where: { name: "pikachu" } });
      expect(poke.dataValues.attack).to.not.equal("200");
    });
  });

  describe("defense", () => {
    it("Must have a property defense", async () => {
      await Pokemon.create({ name: "pikachu", defense: "90" });
      const poke = await Pokemon.findOne({ where: { name: "pikachu" } });
      expect(poke.dataValues).to.have.own.property("defense");
    });

    it("defense must be 90", async () => {
      const poke = await Pokemon.findOne({ where: { name: "pikachu" } });
      expect(poke.dataValues.id).to.not.equal("90");
    });
  });
});
