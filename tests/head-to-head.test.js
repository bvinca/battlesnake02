// tests/head-to-head.test.js
import { checkHeadToHeadCollision } from '../src/head-to-head.js';

describe('checkHeadToHeadCollision', () => {
  const myHead = { x: 5, y: 5 };

  it('should not mark any directions unsafe when no opponents are nearby', () => {
    const opponents = [
      { body: [{ x: 0, y: 0 }], length: 3 },
    ];
    const safe = { up: true, down: true, left: true, right: true };
    const result = checkHeadToHeadCollision(myHead, opponents, 3, { ...safe });
    expect(result).toEqual(safe);
  });

  it('should mark direction unsafe if both could move to same square', () => {
    const opponents = [
      { body: [{ x: 7, y: 5 }], length: 3 }  // can move left to 6,5
    ];
    const safe = { up: true, down: true, left: true, right: true };
    const result = checkHeadToHeadCollision({ x: 5, y: 5 }, opponents, 3, { ...safe });
    expect(result.right).toBe(false);
  });

  it('should not mark direction unsafe if opponent is shorter', () => {
    const opponents = [
      { body: [{ x: 7, y: 5 }], length: 2 },  // same position but shorter
    ];
    const safe = { up: true, down: true, left: true, right: true };
    const result = checkHeadToHeadCollision({ x: 5, y: 5 }, opponents, 3, { ...safe });
    expect(result.right).toBe(true);
  });

  it('should mark multiple directions unsafe with multiple threats', () => {
    const opponents = [
      { body: [{ x: 3, y: 5 }], length: 4 },  // can move right into 4,5
      { body: [{ x: 5, y: 3 }], length: 3 },  // can move up into 5,4
    ];
    const safe = { up: true, down: true, left: true, right: true };
    const result = checkHeadToHeadCollision({ x: 5, y: 5 }, opponents, 3, { ...safe });
    expect(result.left).toBe(false);   // conflict at 4,5
    expect(result.down).toBe(false);   // conflict at 5,4
    expect(result.up).toBe(true);
    expect(result.right).toBe(true);
  });
});
