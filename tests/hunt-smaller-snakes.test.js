// tests/hunt-smaller-snakes.test.js

import {
  findClosestPrey,
  getDirectionsToPrey,
} from '../src/hunt-smaller-snakes.js';

describe('hunt-smaller-snakes.js (global-scope version)', () => {
  describe('findClosestPrey', () => {
    beforeEach(() => {
      globalThis.myHead = undefined;
      globalThis.myLength = undefined;
      globalThis.opponents = undefined;
    });

    it('returns undefined if there are no smaller snakes', () => {
      globalThis.myHead = { x: 5, y: 5 };
      globalThis.myLength = 5;
      globalThis.opponents = [
        {
          body: [
            { x: 6, y: 5 },
            { x: 6, y: 6 },
            { x: 6, y: 7 },
            { x: 6, y: 8 },
            { x: 6, y: 9 },
          ],
          length: 5,
        },
        {
          body: [
            { x: 3, y: 5 },
            { x: 3, y: 4 },
            { x: 3, y: 3 },
            { x: 3, y: 2 },
            { x: 3, y: 1 },
          ],
          length: 5,
        },
      ];
      expect(
        findClosestPrey(
          globalThis.myHead,
          globalThis.myLength,
          globalThis.opponents,
        ),
      ).toBeUndefined();
    });

    it('returns the closest smaller snakes head', () => {
      globalThis.myHead = { x: 5, y: 5 };
      globalThis.myLength = 5;
      globalThis.opponents = [
        {
          body: [
            { x: 7, y: 5 },
            { x: 7, y: 6 },
            { x: 7, y: 7 },
          ],
          length: 3,
        },
        { body: [{ x: 4, y: 5 }], length: 1 },
        { body: [{ x: 8, y: 5 }], length: 1 },
      ];
      expect(
        findClosestPrey(
          globalThis.myHead,
          globalThis.myLength,
          globalThis.opponents,
        ),
      ).toEqual({ x: 4, y: 5 });
    });

    it('skips snakes with empty bodies', () => {
      globalThis.myHead = { x: 5, y: 5 };
      globalThis.myLength = 5;
      globalThis.opponents = [
        { body: [], length: 1 },
        { body: [{ x: 3, y: 6 }], length: 1 },
      ];
      expect(
        findClosestPrey(
          globalThis.myHead,
          globalThis.myLength,
          globalThis.opponents,
        ),
      ).toEqual({ x: 3, y: 6 });
    });
  });

  describe('getDirectionsToPrey', () => {
    beforeEach(() => {
      globalThis.myHead = { x: 5, y: 5 };
      globalThis.myLength = 5;
      // global.opponents will be set per test
    });

    it('returns [] if preyHead is undefined', () => {
      const preyHead = undefined;
      expect(getDirectionsToPrey(globalThis.myHead, preyHead)).toEqual([]);
    });

    it('returns left if prey is left', () => {
      const preyHead = { x: 3, y: 5 };
      expect(getDirectionsToPrey(globalThis.myHead, preyHead)).toEqual([
        'left',
      ]);
    });

    it('returns right if prey is right', () => {
      const preyHead = { x: 7, y: 5 };
      expect(getDirectionsToPrey(globalThis.myHead, preyHead)).toEqual([
        'right',
      ]);
    });

    it('returns up if prey is up', () => {
      const preyHead = { x: 5, y: 8 };
      expect(getDirectionsToPrey(globalThis.myHead, preyHead)).toEqual(['up']);
    });

    it('returns down if prey is down', () => {
      const preyHead = { x: 5, y: 2 };
      expect(getDirectionsToPrey(globalThis.myHead, preyHead)).toEqual([
        'down',
      ]);
    });

    it('returns both left and up for diagonal', () => {
      const preyHead = { x: 3, y: 7 };
      expect(getDirectionsToPrey(globalThis.myHead, preyHead)).toEqual(
        expect.arrayContaining(['left', 'up']),
      );
    });

    it('returns both right and down for diagonal', () => {
      const preyHead = { x: 8, y: 2 };
      expect(getDirectionsToPrey(globalThis.myHead, preyHead)).toEqual(
        expect.arrayContaining(['right', 'down']),
      );
    });
  });
});
