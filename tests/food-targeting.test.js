import { findClosestFood, getDirectionToFood } from '../src/food-targeting';

describe('findClosestFood', () => {
  it('returns undefined if no food is provided', () => {
    expect(findClosestFood({ x: 0, y: 0 }, [])).toBeUndefined();
    expect(findClosestFood({ x: 0, y: 0 })).toBeUndefined();
  });

  it('returns the closest food by Manhattan distance', () => {
    const myHead = { x: 2, y: 2 };
    const food = [
      { x: 0, y: 0 }, // distance = 4
      { x: 3, y: 2 }, // distance = 1 (closest)
      { x: 5, y: 5 }, // distance = 6
    ];

    const closest = findClosestFood(myHead, food);
    expect(closest).toEqual({ x: 3, y: 2 });
  });

  it('returns the first closest food if there are multiple at the same distance', () => {
    const myHead = { x: 0, y: 0 };
    const food = [
      { x: 1, y: 1 }, // distance = 2
      { x: 2, y: 0 }, // distance = 2
    ];

    const closest = findClosestFood(myHead, food);
    expect(closest).toEqual({ x: 1, y: 1 });
  });
});

describe('getDirectionToFood', () => {
  it('returns undefined if no food is passed', () => {
    expect(getDirectionToFood({ x: 1, y: 1 })).toBeUndefined();
  });

  it('returns ["left"] if food is to the left', () => {
    expect(getDirectionToFood({ x: 3, y: 1 }, { x: 2, y: 1 })).toEqual([
      'left',
    ]);
  });

  it('returns ["right"] if food is to the right', () => {
    expect(getDirectionToFood({ x: 3, y: 1 }, { x: 5, y: 1 })).toEqual([
      'right',
    ]);
  });

  it('returns ["up"] if food is above', () => {
    expect(getDirectionToFood({ x: 3, y: 1 }, { x: 3, y: 3 })).toEqual(['up']);
  });

  it('returns ["down"] if food is below', () => {
    expect(getDirectionToFood({ x: 3, y: 3 }, { x: 3, y: 1 })).toEqual([
      'down',
    ]);
  });

  it('returns both directions if needed (e.g. ["right", "up"])', () => {
    expect(getDirectionToFood({ x: 1, y: 1 }, { x: 2, y: 3 })).toEqual([
      'right',
      'up',
    ]);
  });

  it('returns empty array if already at the food location', () => {
    expect(getDirectionToFood({ x: 2, y: 2 }, { x: 2, y: 2 })).toEqual([]);
  });
});
