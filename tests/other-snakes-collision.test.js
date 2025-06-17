// tests/other-snakes-collision.test.js
import { jest } from '@jest/globals';

jest.unstable_mockModule('../src/tail-collision.js', () => ({
  checkTailCollision: jest.fn(),
  isAboutToEat: jest.fn(),
}));

const tailCollision = await import('../src/tail-collision.js');
const { checkOtherSnakesCollision } = await import(
  '../src/other-snakes-collision.js'
);

describe('checkOtherSnakesCollision', () => {
  const myHead = { x: 5, y: 5 };
  const myId = 'me';

  beforeEach(() => {
    tailCollision.checkTailCollision.mockImplementation(
      (_, __, ___, safe) => safe,
    );
  });

  it('does not mark any direction unsafe if no threats', () => {
    const opponents = [{ id: 'op1', body: [{ x: 0, y: 0 }], health: 100 }];
    const safe = { up: true, down: true, left: true, right: true };
    const result = checkOtherSnakesCollision(myHead, opponents, myId, [], {
      ...safe,
    });
    expect(result).toEqual(safe);
  });

  it('marks unsafe if adjacent to opponent body', () => {
    const opponents = [
      {
        id: 'op1',
        body: [
          { x: 4, y: 5 },
          { x: 6, y: 5 },
          { x: 5, y: 4 },
          { x: 5, y: 6 },
        ],
        health: 100,
      },
    ];
    const safe = { up: true, down: true, left: true, right: true };
    const result = checkOtherSnakesCollision(myHead, opponents, myId, [], {
      ...safe,
    });
    expect(result).toEqual({
      up: false,
      down: false,
      left: false,
      right: false,
    });
  });

  it('ignores tail if about to move', () => {
    tailCollision.isAboutToEat.mockReturnValue(false);
    const opponents = [
      {
        id: 'op1',
        body: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 4, y: 5 },
        ],
        health: 50,
      },
    ];
    const safe = { up: true, down: true, left: true, right: true };
    const result = checkOtherSnakesCollision(myHead, opponents, myId, [], {
      ...safe,
    });
    expect(result.left).toBe(true);
  });

  it('includes tail if full health', () => {
    tailCollision.isAboutToEat.mockReturnValue(false);
    const opponents = [
      {
        id: 'op1',
        body: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 4, y: 5 },
        ],
        health: 100,
      },
    ];
    const safe = { up: true, down: true, left: true, right: true };
    const result = checkOtherSnakesCollision(myHead, opponents, myId, [], {
      ...safe,
    });
    expect(result.left).toBe(false);
  });

  it('skips checking self snake', () => {
    const opponents = [{ id: myId, body: [{ x: 4, y: 5 }], health: 100 }];
    const safe = { up: true, down: true, left: true, right: true };
    const result = checkOtherSnakesCollision(myHead, opponents, myId, [], {
      ...safe,
    });
    expect(result.left).toBe(true);
  });

  it('respects tail collision check result', () => {
    tailCollision.checkTailCollision.mockImplementation((_, __, ___, safe) => {
      safe.down = false;
      return safe;
    });
    const opponents = [{ id: 'op1', body: [{ x: 0, y: 0 }], health: 100 }];
    const safe = { up: true, down: true, left: true, right: true };
    const result = checkOtherSnakesCollision(myHead, opponents, myId, [], {
      ...safe,
    });
    expect(result.down).toBe(false);
  });
});
