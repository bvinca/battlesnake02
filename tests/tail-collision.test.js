import { isAboutToEat, checkTailCollision } from '../src/tail-collision.js';

describe('isAboutToEat', () => {
  const head = { x: 5, y: 5 };

  it('returns true if food is to the left of head', () => {
    const food = [{ x: 4, y: 5 }];
    expect(isAboutToEat(head, food)).toBe(true);
  });

  it('returns true if food is to the right of head', () => {
    const food = [{ x: 6, y: 5 }];
    expect(isAboutToEat(head, food)).toBe(true);
  });

  it('returns true if food is above the head (up)', () => {
    const food = [{ x: 5, y: 6 }];
    expect(isAboutToEat(head, food)).toBe(true);
  });

  it('returns true if food is below the head (down)', () => {
    const food = [{ x: 5, y: 4 }];
    expect(isAboutToEat(head, food)).toBe(true);
  });

  it('returns false if no food is adjacent', () => {
    const food = [{ x: 1, y: 1 }, { x: 8, y: 8 }];
    expect(isAboutToEat(head, food)).toBe(false);
  });
});

describe('checkTailCollision', () => {
  const myHead = { x: 5, y: 5 };

  it('returns unchanged isMoveSafe if no opponents', () => {
    const isMoveSafe = { up: false, down: false, left: false, right: false };
    const result = checkTailCollision(myHead, [], [], { ...isMoveSafe });
    expect(result).toEqual(isMoveSafe);
  });

  it('allows move onto tail if tail is about to move (health < 100, not about to eat)', () => {
    const opponents = [{
      body: [{ x: 10, y: 10 }, { x: 5, y: 4 }], // tail is below my head
      health: 90
    }];
    const food = []; // no food = not about to eat

    const isMoveSafe = {
      up: false,
      down: false,
      left: false,
      right: false
    };

    const result = checkTailCollision(myHead, opponents, food, { ...isMoveSafe });

    expect(result.down).toBe(true);  // Now safe to move onto tail
    expect(result.up).toBe(false);
  });

  it('does not allow move onto tail if health = 100 (tail won’t move)', () => {
    const opponents = [{
      body: [{ x: 10, y: 10 }, { x: 5, y: 4 }],
      health: 100
    }];
    const food = [];

    const isMoveSafe = {
      up: false,
      down: false,
      left: false,
      right: false
    };

    const result = checkTailCollision(myHead, opponents, food, { ...isMoveSafe });

    expect(result.down).toBe(false);  // Tail won’t move
  });

  it('does not allow move onto tail if snake is about to eat', () => {
    const opponents = [{
      body: [{ x: 5, y: 6 }, { x: 5, y: 4 }],
      health: 90
    }];
    const food = [{ x: 5, y: 7 }];  // food is up from head

    const isMoveSafe = {
      up: false,
      down: false,
      left: false,
      right: false
    };

    const result = checkTailCollision(myHead, opponents, food, { ...isMoveSafe });

    expect(result.down).toBe(false); // Tail won't move because it's about to eat
  });

  it('allows multiple directions if multiple tails are about to move', () => {
    const opponents = [
      {
        body: [{ x: 10, y: 10 }, { x: 4, y: 5 }], // left
        health: 20
      },
      {
        body: [{ x: 9, y: 9 }, { x: 6, y: 5 }], // right
        health: 50
      }
    ];
    const food = [];  // no food around, tails will move

    const isMoveSafe = {
      up: false,
      down: false,
      left: false,
      right: false
    };

    const result = checkTailCollision(myHead, opponents, food, { ...isMoveSafe });

    expect(result.left).toBe(true);
    expect(result.right).toBe(true);
    expect(result.up).toBe(false);
    expect(result.down).toBe(false);
  });

  it('ignores empty opponent snakes', () => {
    const opponents = [
      {
        body: [],
        health: 50
      }
    ];

    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true
    };

    const result = checkTailCollision(myHead, opponents, [], { ...isMoveSafe });
    expect(result).toEqual(isMoveSafe);
  });
});


