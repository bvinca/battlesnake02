// tests/hunt-smaller-snakes.test.js

import { findClosestPrey, getDirectionsToPrey } from "../src/hunt-smaller-snakes.js";

describe("hunt-smaller-snakes.js (global-scope version)", () => {
  describe("findClosestPrey", () => {
    beforeEach(() => {
      global.myHead = undefined;
      global.myLength = undefined;
      global.opponents = undefined;
    });

    it("returns null if there are no smaller snakes", () => {
      global.myHead = { x: 5, y: 5 };
      global.myLength = 5;
      global.opponents = [
        { body: [{ x: 6, y: 5 }, { x: 6, y: 6 }, { x: 6, y: 7 }, { x: 6, y: 8 }, { x: 6, y: 9 }], length: 5 },
        { body: [{ x: 3, y: 5 }, { x: 3, y: 4 }, { x: 3, y: 3 }, { x: 3, y: 2 }, { x: 3, y: 1 }], length: 5 },
      ];
      expect(findClosestPrey()).toBeNull();
    });

    it("returns the closest smaller snake's head", () => {
      global.myHead = { x: 5, y: 5 };
      global.myLength = 5;
      global.opponents = [
        { body: [{ x: 7, y: 5 }, { x: 7, y: 6 }, { x: 7, y: 7 }], length: 3 },
        { body: [{ x: 4, y: 5 }], length: 1 },
        { body: [{ x: 8, y: 5 }], length: 1 },
      ];
      expect(findClosestPrey()).toEqual({ x: 4, y: 5 });
    });

    it("skips snakes with empty bodies", () => {
      global.myHead = { x: 5, y: 5 };
      global.myLength = 5;
      global.opponents = [
        { body: [], length: 1 },
        { body: [{ x: 3, y: 6 }], length: 1 },
      ];
      expect(findClosestPrey()).toEqual({ x: 3, y: 6 });
    });
  });

  describe("getDirectionsToPrey", () => {
    beforeEach(() => {
      global.myHead = { x: 5, y: 5 };
      global.myLength = 5;
      // global.opponents will be set per test
    });

    it("returns [] if preyHead is null", () => {
      global.opponents = []; // so findClosestPrey() returns null
      expect(getDirectionsToPrey()).toEqual([]);
    });

    it("returns left if prey is left", () => {
      global.opponents = [
        { body: [{ x: 3, y: 5 }], length: 1 }
      ];
      expect(getDirectionsToPrey()).toEqual(["left"]);
    });

    it("returns right if prey is right", () => {
      global.opponents = [
        { body: [{ x: 7, y: 5 }], length: 1 }
      ];
      expect(getDirectionsToPrey()).toEqual(["right"]);
    });

    it("returns up if prey is up", () => {
      global.opponents = [
        { body: [{ x: 5, y: 8 }], length: 1 }
      ];
      expect(getDirectionsToPrey()).toEqual(["up"]);
    });

    it("returns down if prey is down", () => {
      global.opponents = [
        { body: [{ x: 5, y: 2 }], length: 1 }
      ];
      expect(getDirectionsToPrey()).toEqual(["down"]);
    });

    it("returns both left and up for diagonal", () => {
      global.opponents = [
        { body: [{ x: 3, y: 7 }], length: 1 }
      ];
      expect(getDirectionsToPrey()).toEqual(["left", "up"]);
    });

    it("returns both right and down for diagonal", () => {
      global.opponents = [
        { body: [{ x: 8, y: 2 }], length: 1 }
      ];
      expect(getDirectionsToPrey()).toEqual(["right", "down"]);
    });
  });
});
